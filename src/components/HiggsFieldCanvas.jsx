import React, { useRef, useMemo, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

// 3D Cloud Infrastructure Nodes (Kubernetes Pods, AWS EC2/RDS Instances, Microservice Nodes)
function CloudInfrastructureMesh({ scrollProgress, mousePos }) {
  const groupRef = useRef();
  const lineMeshRef = useRef();
  const packetsRef = useRef();

  // Generate Cloud Topology Nodes
  const { nodes, linePositions, packetData } = useMemo(() => {
    const nodeCount = 42;
    const nodeList = [];
    const types = ['k8s-pod', 'aws-ec2', 'db-cluster', 'api-gateway', 'cicd-runner'];

    for (let i = 0; i < nodeCount; i++) {
      const radius = Math.random() * 10 + 2.5;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI * 0.8;

      const x = radius * Math.cos(phi) * Math.sin(theta);
      const y = radius * Math.sin(phi) * 0.9 + (Math.random() - 0.5) * 4;
      const z = radius * Math.cos(phi) * Math.cos(theta) - 3.0;

      const type = types[i % types.length];
      const color =
        type === 'k8s-pod'
          ? '#326CE5' // K8s blue
          : type === 'aws-ec2'
          ? '#FF9900' // AWS orange
          : type === 'db-cluster'
          ? '#00f5ff' // Cyan
          : type === 'cicd-runner'
          ? '#10b981' // Green
          : '#a855f7'; // Purple

      nodeList.push({
        position: new THREE.Vector3(x, y, z),
        type,
        color,
        size: type === 'api-gateway' ? 0.28 : type === 'db-cluster' ? 0.24 : 0.18,
        pulseSpeed: 1.5 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
      });
    }

    // Connect nodes with VPC / Service Mesh connections
    const lineCoords = [];
    const connections = [];

    for (let i = 0; i < nodeList.length; i++) {
      for (let j = i + 1; j < nodeList.length; j++) {
        const dist = nodeList[i].position.distanceTo(nodeList[j].position);
        if (dist < 4.8) {
          lineCoords.push(nodeList[i].position.x, nodeList[i].position.y, nodeList[i].position.z);
          lineCoords.push(nodeList[j].position.x, nodeList[j].position.y, nodeList[j].position.z);
          connections.push({
            start: nodeList[i].position,
            end: nodeList[j].position,
            color: nodeList[i].color,
          });
        }
      }
    }

    // CI/CD Data Packets traveling along network connections
    const packetList = connections.map((conn, idx) => ({
      start: conn.start,
      end: conn.end,
      color: conn.color,
      progress: (idx * 0.13) % 1,
      speed: 0.2 + Math.random() * 0.3,
    }));

    return {
      nodes: nodeList,
      linePositions: new Float32Array(lineCoords),
      packetData: packetList,
    };
  }, []);

  const packetPositions = useMemo(() => new Float32Array(packetData.length * 3), [packetData]);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.elapsedTime * 0.04 + scrollProgress.current * 0.8;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08 + mousePos.current.y * 0.1;
      groupRef.current.rotation.z = mousePos.current.x * 0.08;
    }

    // Update CI/CD Data Packets along connection links
    if (packetsRef.current) {
      const posAttr = packetsRef.current.geometry.attributes.position;
      for (let i = 0; i < packetData.length; i++) {
        const p = packetData[i];
        p.progress = (p.progress + delta * p.speed) % 1;
        const currentPos = new THREE.Vector3().lerpVectors(p.start, p.end, p.progress);
        posAttr.setXYZ(i, currentPos.x, currentPos.y, currentPos.z);
      }
      posAttr.needsUpdate = true;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Network VPC Mesh Lines */}
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
          opacity={0.18}
          blending={THREE.AdditiveBlending}
        />
      </lineSegments>

      {/* CI/CD Data Packets */}
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={packetData.length}
            array={packetPositions}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#00ffcc"
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Cloud Server & Kubernetes Pod Nodes */}
      {nodes.map((node, idx) => (
        <group key={idx} position={[node.position.x, node.position.y, node.position.z]}>
          {/* Server / Pod Core Geometric Node */}
          <mesh>
            {node.type === 'k8s-pod' ? (
              <octahedronGeometry args={[node.size, 0]} />
            ) : node.type === 'aws-ec2' ? (
              <boxGeometry args={[node.size * 1.4, node.size * 1.4, node.size * 1.4]} />
            ) : node.type === 'db-cluster' ? (
              <cylinderGeometry args={[node.size, node.size, node.size * 1.6, 8]} />
            ) : (
              <dodecahedronGeometry args={[node.size, 0]} />
            )}
            <meshBasicMaterial
              color={node.color}
              wireframe={idx % 2 === 0}
              transparent
              opacity={0.85}
            />
          </mesh>

          {/* Node Health Glow Aura */}
          <mesh>
            <sphereGeometry args={[node.size * 1.8, 12, 12]} />
            <meshBasicMaterial
              color={node.color}
              transparent
              opacity={0.12}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        </group>
      ))}
    </group>
  );
}

// Background Cloud Atmosphere Particles (Micro-telemetry & Server Traffic)
function CloudTelemetryParticles({ scrollProgress, mousePos, count = 4000 }) {
  const pointsRef = useRef();

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);

    const palette = [
      new THREE.Color('#38bdf8'), // AWS / Cloud blue
      new THREE.Color('#326CE5'), // Kubernetes blue
      new THREE.Color('#10b981'), // Healthy green
      new THREE.Color('#FF9900'), // AWS Orange
      new THREE.Color('#8b5cf6'), // Microservices Purple
    ];

    for (let i = 0; i < count; i++) {
      const r = Math.random() * 22 + 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = (Math.random() - 0.5) * Math.PI;

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.cos(phi) * 0.8 + (Math.random() - 0.5) * 6;
      pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta) - 4;

      const c = palette[i % palette.length];
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }

    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = -state.clock.elapsedTime * 0.015 + scrollProgress.current * 0.4;
      pointsRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.02) * 0.04;
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
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.45}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

// Camera Movement across Cloud Infrastructure
function CameraController({ scrollProgress, mousePos }) {
  const { camera } = useThree();

  useFrame(() => {
    const targetZ = 12.5 - scrollProgress.current * 3.5;
    const targetY = -scrollProgress.current * 2.5 + mousePos.current.y * 0.6;
    const targetX = mousePos.current.x * 0.8 + Math.sin(scrollProgress.current * Math.PI) * 1.0;

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.05);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.05);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.05);

    camera.lookAt(0, -scrollProgress.current * 1.5, 0);
  });

  return null;
}

export default function HiggsFieldCanvas() {
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

    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <Canvas
        camera={{ position: [0, 0, 12.5], fov: 55, near: 0.1, far: 100 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        dpr={[1, 1.5]}
      >
        <color attach="background" args={['#030712']} />
        <ambientLight intensity={0.5} />
        <CameraController scrollProgress={scrollProgress} mousePos={mousePos} />
        <CloudInfrastructureMesh
          scrollProgress={scrollProgress}
          mousePos={mousePos}
        />
        <CloudTelemetryParticles
          scrollProgress={scrollProgress}
          mousePos={mousePos}
          count={3500}
        />
      </Canvas>
      {/* Subtle cloud architecture grid */}
      <div className="absolute inset-0 bg-cyber-grid pointer-events-none opacity-30 mix-blend-screen" />
      <div className="absolute inset-0 bg-radial-vignette pointer-events-none" />
    </div>
  );
}
