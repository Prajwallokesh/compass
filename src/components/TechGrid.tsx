import React from 'react';
import { useScrollReveal } from '../hooks/useScrollReveal';
import {
  Brain,
  Sparkles,
  Cpu,
  ScanFace,
  ShieldAlert,
  Cloud,
  Code2,
  Radio,
  ArrowUpRight,
} from 'lucide-react';

interface TechItem {
  name: string;
  category: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  tags: string[];
}

export const TechGrid: React.FC = () => {
  const sectionRef = useScrollReveal<HTMLElement>();

  const techStack: TechItem[] = [
    {
      name: 'Artificial Intelligence',
      category: 'REASONING & AGENTS',
      description: 'Autonomous problem-solving systems, search heuristics, and cognitive agent architectures.',
      icon: Brain,
      tags: ['Multi-Agent Swarms', 'Reasoning Graphs', 'A* / Minimax'],
    },
    {
      name: 'Generative AI',
      category: 'MODELS & SYNTHESIS',
      description: 'Fine-tuning open-source LLMs, diffusion synthesis, prompt orchestration, and RAG architectures.',
      icon: Sparkles,
      tags: ['LoRA Adapters', 'Ollama / vLLM', 'Vector DBs'],
    },
    {
      name: 'Machine Learning',
      category: 'STATISTICAL LEARNING',
      description: 'Supervised, unsupervised, and deep reinforcement learning pipelines trained on structured data.',
      icon: Cpu,
      tags: ['PyTorch', 'Scikit-Learn', 'Feature Engineering'],
    },
    {
      name: 'Computer Vision',
      category: 'SPATIAL INTELLIGENCE',
      description: 'Real-time object detection, semantic segmentation, camera calibration, and edge perception.',
      icon: ScanFace,
      tags: ['OpenCV', 'YOLOv11', 'Neural Radiance'],
    },
    {
      name: 'Cybersecurity',
      category: 'INFRASTRUCTURE DEFENSE',
      description: 'Applied cryptography, network packet analysis, zero-trust architecture, and secure coding.',
      icon: ShieldAlert,
      tags: ['Pen Testing', 'TLS / Zero-Knowledge', 'Auditing'],
    },
    {
      name: 'Cloud Computing',
      category: 'DISTRIBUTED ARCHITECTURE',
      description: 'Scalable containerization, cluster orchestration, microservices, and serverless compute.',
      icon: Cloud,
      tags: ['Docker / K8s', 'Terraform', 'Serverless APIs'],
    },
    {
      name: 'Web Development',
      category: 'HIGH-PERFORMANCE FRONTEND',
      description: 'Production-ready web systems leveraging TypeScript, modern reactivity, and WebAssembly.',
      icon: Code2,
      tags: ['React 19', 'Next.js / Node', 'Wasm / WebGPU'],
    },
    {
      name: 'IoT & Edge Computing',
      category: 'EMBEDDED HARDWARE',
      description: 'Microcontroller programming, sensor telemetry, edge inference, and robotics integration.',
      icon: Radio,
      tags: ['ESP32 / Arduino', 'MQTT / WebSockets', 'ROS2 Basics'],
    },
  ];

  return (
    <section
      id="tech"
      ref={sectionRef}
      className="reveal-init relative py-28 px-4 sm:px-6 lg:px-8 bg-[#050811]/85 backdrop-blur-[2px]"
    >
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-white/[0.04] border border-white/[0.08] text-cyan-400 font-mono text-xs uppercase tracking-widest mb-4">
            <span>07 // TECHNICAL STACK & SPECIALIZATIONS</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold tracking-tight text-white mb-6">
            Interactive Technology Grid
          </h2>
          <p className="max-w-2xl text-slate-300 text-base sm:text-lg font-light leading-relaxed">
            The core domains mastered, researched, and engineered by student guilds at COMPASS.
          </p>
        </div>

        {/* 8 Elegant Rectangular Tiles */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {techStack.map((tech, idx) => {
            const Icon = tech.icon;
            return (
              <div
                key={idx}
                className="tech-tile group relative p-6 rounded-xl bg-[#080E1E]/70 border border-white/[0.08] overflow-hidden flex flex-col justify-between"
              >
                {/* Subtle hover gradient illumination */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/[0.08] via-indigo-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />

                <div className="relative z-10">
                  {/* Top row: Category tag & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[10px] font-mono tracking-wider text-slate-400 uppercase">
                      {tech.category}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-white/[0.04] border border-white/[0.08] flex items-center justify-center text-cyan-400 group-hover:text-cyan-300 group-hover:border-cyan-500/40 transition-transform duration-250 group-hover:-translate-y-1">
                      <Icon className="w-5 h-5" />
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-base font-bold text-white group-hover:text-cyan-200 transition-all duration-200 group-hover:translate-x-0.5 mb-2">
                    {tech.name}
                  </h3>
                  <p className="text-xs text-slate-300 leading-relaxed mb-6">
                    {tech.description}
                  </p>
                </div>

                {/* Tags & Explore Arrow */}
                <div className="relative z-10 pt-4 border-t border-white/[0.06] flex items-end justify-between">
                  <div className="flex flex-wrap gap-1.5">
                    {tech.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/[0.03] text-slate-300 border border-white/[0.05]"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <div className="w-6 h-6 rounded flex items-center justify-center text-slate-400 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition-all">
                    <ArrowUpRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
