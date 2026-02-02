"use client";

import {
  Code2,
  GitBranch,
  Cloud,
  Brain,
  Shield,
  Terminal,
  Database,
  Layers,
  Zap,
  Server,
  Settings,
  Search,
  Activity,
  AlertTriangle,
  Lock,
  BarChart,
  Box,
  Workflow,
  Cpu,
} from "lucide-react";

const skillCategories = [
  {
    title: "Languages",
    icon: Code2,
    skills: [
      { name: "Python", level: "Expert" },
      { name: "Java (Spring)", level: "Advanced" },
      { name: "JavaScript", level: "Intermediate" },
      { name: "PowerShell", level: "Intermediate" },
      { name: "Bash", level: "Advanced" },
      { name: "SQL", level: "Advanced" },
    ],
  },
  {
    title: "DevOps & CI/CD",
    icon: GitBranch,
    skills: [
      { name: "OnePipeline" },
      { name: "Concourse" },
      { name: "Jenkins" },
      { name: "Terraform" },
      { name: "Ansible" },
      { name: "Git" },
    ],
  },
  {
    title: "Cloud & Infrastructure",
    icon: Cloud,
    skills: [
      { name: "AWS EC2" },
      { name: "AWS S3" },
      { name: "AWS Lambda" },
      { name: "Azure" },
      { name: "Docker" },
      { name: "Kubernetes" },
    ],
  },
  {
    title: "Data & AI",
    icon: Brain,
    skills: [
      { name: "Generative AI" },
      { name: "Redis" },
      { name: "ElasticSearch" },
      { name: "AI/ML Pipelines" },
    ],
  },
  {
    title: "Security & SRE",
    icon: Shield,
    skills: [
      { name: "RASP Security" },
      { name: "OSS Fixes" },
      { name: "ELK Stack" },
      { name: "Nagios" },
      { name: "Incident Mgmt" },
    ],
  },
];

export function SkillsSection() {
  return (
    <section id="skills" className="px-6 md:px-12 lg:px-24 py-20 bg-card/30">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-primary" />
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary">
            Skills & Technologies
          </h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => {
            const IconComponent = category.icon;
            return (
              <div key={index} className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <IconComponent className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="font-semibold text-foreground">
                    {category.title}
                  </h3>
                </div>

                <ul className="space-y-2">
                  {category.skills.map((skill, sIndex) => (
                    <li
                      key={sIndex}
                      className="flex items-center justify-between text-sm"
                    >
                      <span className="text-muted-foreground">{skill.name}</span>
                      {skill.level && (
                        <span className="text-xs text-primary/70">
                          {skill.level}
                        </span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
