import React from 'react';
import { MapPin, Mail, Phone, Rocket, Cloud, Layout, Zap, Briefcase } from 'lucide-react';

export default function AboutSection({ about, profile }) {
  const getIcon = (iconName) => {
    switch (iconName) {
      case 'Cloud':
        return <Cloud className="w-5 h-5 text-sky-500" />;
      case 'Layout':
      case 'Box':
        return <Layout className="w-5 h-5 text-sky-500" />;
      case 'Zap':
      case 'Activity':
        return <Zap className="w-5 h-5 text-sky-500" />;
      case 'Briefcase':
      case 'Code':
      default:
        return <Briefcase className="w-5 h-5 text-sky-500" />;
    }
  };

  const paragraphs = about?.paragraphs || [
    "I am a DevOps Engineer and Full-Stack Software Developer with around 4 years of hands-on experience building, automating, and scaling production web architectures and cloud systems.",
    "I operate AWS environments end-to-end — from provisioning infrastructure with Terraform and Ansible to containerizing microservices with Docker, orchestrating clusters on Kubernetes, and keeping production systems healthy with Prometheus and Grafana proactive telemetry.",
    "On the development side, I design and maintain robust backend APIs with PHP, Python, and MySQL, and build modern responsive frontends using React.js and Node.js. I bridge engineering and operations to ensure releases are automated, predictable, and zero-disruption."
  ];

  const cards = about?.cards || [
    {
      id: 'card-1',
      title: 'DevOps & Cloud (AWS)',
      desc: 'EC2, S3, RDS, VPC, ECS, Lambda, Terraform, Ansible, CI/CD',
      icon: 'Cloud',
    },
    {
      id: 'card-2',
      title: 'Containers & Kubernetes',
      desc: 'Docker, Kubernetes clusters, Microservices architecture, Auto-scaling',
      icon: 'Box',
    },
    {
      id: 'card-3',
      title: 'Monitoring & Observability',
      desc: 'Prometheus, Grafana dashboards, CloudWatch alarms, Incident management',
      icon: 'Activity',
    },
    {
      id: 'card-4',
      title: 'Full-Stack Development',
      desc: 'PHP, Python, MySQL, React.js, Node.js, REST APIs, Linux',
      icon: 'Code',
    },
  ];

  return (
    <section id="about" className="py-16 sm:py-24 bg-transparent relative z-10 px-4 sm:px-6 lg:px-8 border-t border-slate-200/60">
      <div className="max-w-7xl mx-auto">
        
        {/* Top: 2-Column Layout (Photo on Left, Detailed Bio on Right) */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* 1. Left: Profile Photo Card */}
          <div className="md:col-span-5 lg:col-span-4 flex justify-center md:justify-start">
            <div className="relative w-full max-w-[300px] sm:max-w-xs rounded-3xl overflow-hidden border border-slate-200/90 shadow-xl bg-slate-50 group">
              <img
                src={about?.photo || profile?.photo || './akhilesh_profile.png'}
                alt={profile?.name || 'Akhilesh Ravuri'}
                className="w-full h-auto aspect-square object-cover object-top group-hover:scale-105 transition-transform duration-500 ease-out"
              />
              
              {/* Floating Badge */}
              <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-xl border border-slate-200/80 shadow-md flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-sky-50 text-sky-500 flex items-center justify-center flex-shrink-0">
                  <Rocket className="w-4 h-4" />
                </div>
                <div className="text-[11px] font-semibold text-slate-800 leading-tight">
                  <div>Always Learning</div>
                  <div className="text-sky-600">Always Building</div>
                </div>
              </div>
            </div>
          </div>

          {/* 2. Right: Extended Bio & Information */}
          <div className="md:col-span-7 lg:col-span-8 space-y-4">
            <div className="text-xs font-bold font-mono uppercase tracking-wider text-sky-600">
              {about?.tag || 'About Me'}
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 leading-tight">
              {about?.heading || 'Building Better'}{' '}
              <span className="text-sky-500">{about?.headingHighlight || 'Solutions'}</span>
            </h2>

            {/* Expanded Multi-Paragraph Bio */}
            <div className="space-y-3 text-slate-600 text-sm sm:text-base leading-relaxed font-normal pt-1">
              {paragraphs.map((p, idx) => (
                <p key={idx}>{p}</p>
              ))}
            </div>

            {/* Quick Contact & Details Row */}
            <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-4 sm:gap-6">
              <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 font-medium">
                <MapPin className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{about?.location || profile?.location || 'Bengaluru, Karnataka, India'}</span>
              </div>

              <a
                href={`mailto:${about?.email || profile?.email || 'akhileshravuri2001@gmail.com'}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-sky-600 font-medium transition-colors"
              >
                <Mail className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{about?.email || profile?.email || 'akhileshravuri2001@gmail.com'}</span>
              </a>

              <a
                href={`tel:${(about?.phone || profile?.phone || '+91 7095643856').replace(/\s+/g, '')}`}
                className="flex items-center gap-2 text-xs sm:text-sm text-slate-700 hover:text-sky-600 font-medium transition-colors"
              >
                <Phone className="w-4 h-4 text-sky-500 flex-shrink-0" />
                <span>{about?.phone || profile?.phone || '+91 7095643856'}</span>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom: 4 Highlight Cards Moved Below Across Full Width */}
        <div className="mt-12 sm:mt-14 pt-10 border-t border-slate-100 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
          {cards.map((card) => (
            <div
              key={card.id}
              className="p-4 sm:p-5 rounded-2xl bg-sky-50/60 border border-sky-100 hover:border-sky-300 hover:bg-sky-50/90 transition-all flex flex-col justify-between gap-3 shadow-xs hover:shadow-md group"
            >
              <div className="w-10 h-10 rounded-xl bg-white border border-sky-200 flex items-center justify-center flex-shrink-0 shadow-2xs group-hover:scale-110 transition-transform">
                {getIcon(card.icon)}
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-display font-bold text-slate-900 group-hover:text-sky-600 transition-colors leading-snug">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
