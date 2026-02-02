"use client";

import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Cpu, Cloud, Terminal, Activity, Workflow } from "lucide-react";

const projects = [
  {
    title: "Job Management 2.0 APIs",
    description:
      "High-performance REST APIs for real-time technician resource allocation and job management at Verizon",
    technologies: ["Java", "Spring", "REST APIs", "Redis"],
    impact: "Optimized technician resource allocation in real time for field operations",
    icon: Workflow,
  },
  {
    title: "GenAI Data Pipeline",
    description:
      "Built AI data pipelines for model training, enabling Generative AI tagging and performance reporting",
    technologies: ["Python", "AI/ML", "Data Pre-processing", "ElasticSearch"],
    impact: "Enabled GenAI tagging capabilities and improved model training efficiency",
    icon: Cpu,
  },
  {
    title: "AWS Cloud Migration",
    description:
      "Large-scale migration of Configuration Items from on-premise data centers to AWS cloud infrastructure",
    technologies: ["AWS", "Terraform", "Concourse", "Infrastructure as Code"],
    impact: "Successfully migrated enterprise workloads to cloud with improved scalability",
    icon: Cloud,
  },
  {
    title: "Linux Patching Automation",
    description:
      "Automated SUSE Linux patching system using Python and Ansible for enterprise servers",
    technologies: ["Python", "Ansible", "SUSE Linux", "Automation"],
    impact: "Reduced manual patching effort by 80%, improving security compliance",
    icon: Terminal,
  },
  {
    title: "Observability & SRE Portal",
    description:
      "Onboarded multiple systems into centralized observability portals for improved monitoring and incident response",
    technologies: ["ELK Stack", "Nagios", "Monitoring", "SRE"],
    impact: "Reduced Mean Time To Resolution (MTTR) for production incidents",
    icon: Activity,
  },
];

export function ProjectsSection() {
  return (
    <section id="projects" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-primary" />
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary">
            Featured Projects
          </h2>
        </div>

        <div className="space-y-8">
          {projects.map((project, index) => {
            const IconComponent = project.icon;
            return (
              <div
                key={index}
                className="group relative p-6 rounded-xl bg-card/50 border border-border/50 hover:border-primary/30 hover:bg-card transition-all duration-300"
              >
                <div className="flex items-start gap-4">
                  <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                    <IconComponent className="w-6 h-6 text-primary" />
                  </div>

                  <div className="flex-1 space-y-3">
                    <div className="flex items-start justify-between">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
                        {project.title}
                      </h3>
                      <ArrowUpRight className="w-5 h-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {project.description}
                    </p>

                    <p className="text-sm text-primary/80 italic">
                      Impact: {project.impact}
                    </p>

                    <div className="flex flex-wrap gap-2 pt-2">
                      {project.technologies.map((tech, tIndex) => (
                        <Badge
                          key={tIndex}
                          variant="secondary"
                          className="text-xs font-normal bg-secondary/50 text-primary hover:bg-secondary"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
