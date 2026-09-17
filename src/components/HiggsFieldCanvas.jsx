import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// Custom GLSL Vertex Shader for Higgs Field Particles
const higgsVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  uniform float uScrollProgress;
  uniform float uHiggsCoupling;
  uniform vec3 uColorCyan;
  uniform vec3 uColorPurple;
  uniform vec3 uColorEmerald;
  
  attribute float aSize;
  attribute float aPhase;
  attribute float aSpeed;
  attribute vec3 aRandomDir;

  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistToMouse;

  // Simplex-like pseudo 3D noise
  vec3 curl(vec3 p) {
    float x = sin(p.y * 1.5 + uTime * 0.4) * cos(p.z * 1.2 + aPhase);
    float y = sin(p.z * 1.5 + uTime * 0.4) * cos(p.x * 1.2 + aPhase);
    float z = sin(p.x * 1.5 + uTime * 0.4) * cos(p.y * 1.2 + aPhase);
    return vec3(x, y, z) * 0.45;
  }

  void main() {
    vec3 pos = position;

    // Zero-point harmonic vibration
    vec3 noiseDisp = curl(pos * 0.15 + vec3(aPhase));
    pos += noiseDisp * (1.0 + sin(uTime * aSpeed + aPhase) * 0.3);

    // Dynamic scroll rotation and drift
    float scrollAngle = uScrollProgress * 3.14159 * 1.5;
    mat2 rotY = mat2(cos(scrollAngle * 0.3), -sin(scrollAngle * 0.3), sin(scrollAngle * 0.3), cos(scrollAngle * 0.3));
    pos.xz = rotY * pos.xz;

    // Higgs Field Coupling: Raycasted Cursor Interaction
    // In 3D space, mouse is projected near z = 0
    vec3 mouse3D = vec3(uMouse.x * 14.0, uMouse.y * 9.0, 0.0);
    vec3 diff = mouse3D - pos;
    float dist = length(diff);
    vDistToMouse = dist;

    // When particles encounter the cursor field, they "acquire mass", decelerate, and condense
    float fieldRadius = 6.5;
    if (dist < fieldRadius) {
      float force = (1.0 - dist / fieldRadius) * uHiggsCoupling;
      // Inward pull + spiral swirl simulating mass acquisition in gauge field
      vec3 swirl = cross(normalize(diff + vec3(0.001)), vec3(0.0, 0.0, 1.0));
      pos += normalize(diff) * force * 2.2 + swirl * force * 1.4;
    }

    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    gl_Position = projectionMatrix * mvPosition;

    // Dynamic particle point size (larger near camera and when excited by cursor)
    float massExcitement = smoothstep(6.5, 0.0, dist) * 2.5;
    gl_PointSize = (aSize * 18.0 * (1.0 + massExcitement)) / -mvPosition.z;

    // Dynamic color gradient based on zero-point frequency and mouse mass condensation
    float colorMix = sin(aPhase + uTime * 0.5) * 0.5 + 0.5;
    vec3 baseColor = mix(uColorCyan, uColorPurple, colorMix);
    
    // Near cursor: energize toward quantum emerald and white singularity
    if (dist < fieldRadius) {
      float energyFactor = pow(1.0 - dist / fieldRadius, 1.8);
      baseColor = mix(baseColor, uColorEmerald, energyFactor * 0.7);
      baseColor = mix(baseColor, vec3(1.0, 1.0, 1.0), energyFactor * 0.5);
    }

    vColor = baseColor;
    vAlpha = smoothstep(30.0, 4.0, -mvPosition.z) * (0.6 + massExcitement * 0.35);
  }
`;

// Custom GLSL Fragment Shader for luminous quantum sparks
const higgsFragmentShader = `
  varying vec3 vColor;
  varying float vAlpha;
  varying float vDistToMouse;

  void main() {
    // Radial circular falloff with hot white core
    vec2 coord = gl_PointCoord - vec2(0.5);
    float dist = length(coord);
    if (dist > 0.5) discard;

    // Gaussian glow profile
    float intensity = exp(-dist * dist * 18.0);
    float core = smoothstep(0.12, 0.0, dist) * 1.5;

    vec3 finalColor = vColor * intensity + vec3(1.0) * core;
    float alpha = (intensity + core * 0.5) * vAlpha;

    gl_FragColor = vec4(finalColor, clamp(alpha, 0.0, 1.0));
  }
`;

// 15,000+ GPU Instanced Higgs Field Particle System
function HiggsParticleField({ scrollProgress, mousePos, particleCount = 16000 }) {
  const pointsRef = useRef();
  const materialRef = useRef();

  const [positions, sizes, phases, speeds, randomDirs] = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    const sz = new Float32Array(particleCount);
    const ph = new Float32Array(particleCount);
    const sp = new Float32Array(particleCount);
    const rd = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      // Cylindrical/spherical cloud distribution with dense core and expansive halo
      const r = Math.pow(Math.random(), 0.6) * 26 + 1.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.9;

      pos[i * 3] = r * Math.cos(phi) * Math.sin(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) + (Math.random() - 0.5) * 8;
      pos[i * 3 + 2] = r * Math.cos(phi) * Math.cos(theta) - 5.0;

      sz[i] = Math.random() * 0.8 + 0.3;
      ph[i] = Math.random() * Math.PI * 2;
      sp[i] = Math.random() * 0.6 + 0.3;

      rd[i * 3] = (Math.random() - 0.5) * 2;
      rd[i * 3 + 1] = (Math.random() - 0.5) * 2;
      rd[i * 3 + 2] = (Math.random() - 0.5) * 2;
    }

    return [pos, sz, ph, sp, rd];
  }, [particleCount]);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(0, 0) },
      uScrollProgress: { value: 0 },
      uHiggsCoupling: { value: 1.25 },
      uColorCyan: { value: new THREE.Color('#00f5ff') },
      uColorPurple: { value: new THREE.Color('#a855f7') },
      uColorEmerald: { value: new THREE.Color('#10b981') },
    }),
    []
  );

  useFrame((state, delta) => {
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value += delta * 0.9;
      
      // Lerp mouse coordinates smoothly
      materialRef.current.uniforms.uMouse.value.lerp(
        new THREE.Vector2(mousePos.current.x, mousePos.current.y),
        0.08
      );
      
      materialRef.current.uniforms.uScrollProgress.value = THREE.MathUtils.lerp(
        materialRef.current.uniforms.uScrollProgress.value,
        scrollProgress.current,
        0.06
      );
    }

    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02 + scrollProgress.current * 0.5;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.03) * 0.08;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aSize"
          count={sizes.length}
          array={sizes}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aPhase"
          count={phases.length}
          array={phases}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aSpeed"
          count={speeds.length}
          array={speeds}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandomDir"
          count={randomDirs.length / 3}
          array={randomDirs}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={higgsVertexShader}
        fragmentShader={higgsFragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

// Quantum Memory Grid: Entangled crystalline lattice & pulsing neon data buses
function QuantumMemoryGrid({ scrollProgress }) {
  const groupRef = useRef();
  const lineMeshRef = useRef();

  // Generate lattice nodes & entangled connections
  const { nodePositions, linePositions } = useMemo(() => {
    const nodes = [];
    const numNodes = 32;
    const radius = 11;

    for (let i = 0; i < numNodes; i++) {
      const u = Math.random();
      const v = Math.random();
      const theta = u * 2.0 * Math.PI;
      const phi = Math.acos(2.0 * v - 1.0);
      const r = radius * Math.cbrt(Math.random()) * 0.85 + 2.5;

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi) - 3.0;

      nodes.push(new THREE.Vector3(x, y, z));
    }

    // Connect nearest nodes with entangled bus lines
    const lineCoords = [];
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        const dist = nodes[i].distanceTo(nodes[j]);
        if (dist < 6.8) {
          lineCoords.push(nodes[i].x, nodes[i].y, nodes[i].z);
          lineCoords.push(nodes[j].x, nodes[j].y, nodes[j].z);
        }
      }
    }

    return {
      nodePositions: nodes,
      linePositions: new Float32Array(lineCoords),
    };
  }, []);

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = -state.clock.elapsedTime * 0.035 + scrollProgress.current * 0.6;
      groupRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.05) * 0.1;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Dynamic line connections */}
      <lineSegments ref={lineMeshRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={linePositions.length / 3}
            array={linePositions}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color="#00f5ff"
          transparent
          opacity={0.22}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* Crystalline Lattice Nodes */}
      {nodePositions.map((pos, idx) => (
        <mesh key={idx} position={[pos.x, pos.y, pos.z]}>
          <octahedronGeometry args={[0.18, 0]} />
          <meshBasicMaterial
            color={idx % 2 === 0 ? '#00f5ff' : '#a855f7'}
            wireframe={idx % 3 === 0}
            transparent
            opacity={0.85}
          />
        </mesh>
      ))}
    </group>
  );
}

// Interactive Camera Controller with Scroll Choreography
function CameraRig({ scrollProgress, mousePos }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 13.5 - scrollProgress.current * 4.0;
    const targetY = -scrollProgress.current * 3.5 + mousePos.current.y * 0.8;
    const targetX = mousePos.current.x * 1.2 + Math.sin(scrollProgress.current * Math.PI) * 1.5;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    camera.lookAt(0, -scrollProgress.current * 2.0, 0);
  });

  return null;
}

export default function HiggsFieldCanvas({ particleCount = 16000 }) {
  const scrollProgress = useRef(0);
  const mousePos = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        scrollProgress.current = window.scrollY / totalScroll;
      }
    };

    const handleMouseMove = (e) => {
      mousePos.current = {
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      };
    };

    const handleTouchMove = (e) => {
      if (e.touches.length > 0) {
        mousePos.current = {
          x: (e.touches[0].clientX / window.innerWidth) * 2 - 1,
          y: -(e.touches[0].clientY / window.innerHeight) * 2 + 1,
        };
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('touchmove', handleTouchMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 13.5], fov: 60, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 2]}
      >
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.4} />
        <CameraRig scrollProgress={scrollProgress} mousePos={mousePos} />
        <HiggsParticleField
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          particleCount={particleCount}
        />
        <QuantumMemoryGrid scrollProgress={scrollProgress} />
      </Canvas>
      {/* Holographic cyber grid & scanlines */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-40 mix-blend-screen" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
