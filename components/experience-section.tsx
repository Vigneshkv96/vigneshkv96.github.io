"use client";

import { Badge } from "@/components/ui/badge";
import { ExternalLink } from "lucide-react";

const experience = [
  {
    company: "Verizon",
    role: "DevOps / Software Engineer",
    duration: "June 2021 - Present",
    highlights: [
      "Implemented RASP security and Spring Framework patches, mitigating critical OSS vulnerabilities",
      "Developed Job Management 2.0 APIs, optimizing technician resource allocation in real time",
      "Built AI data pipelines for model training, enabling GenAI tagging and performance reporting",
      "Enhanced production pipelines with Docker, ElasticSearch, and Redis for containerized deployments",
      "Led CI/CD adoption via OnePipeline Release Manager, accelerating UAT and delivery cycles",
    ],
    technologies: [
      "Python",
      "Java",
      "Docker",
      "ElasticSearch",
      "Redis",
      "CI/CD",
      "RASP",
    ],
  },
  {
    company: "Comcast",
    role: "DevOps Engineer II",
    duration: "June 2021 - May 2024",
    highlights: [
      "Migrated Configuration Items (CIs) from data centers to AWS using Terraform & Concourse",
      "Deployed and maintained Logstash environments, improving centralized logging and monitoring",
    ],
    technologies: ["AWS", "Terraform", "Concourse", "Logstash"],
  },
  {
    company: "Cognizant Technologies",
    role: "DevOps Engineer",
    duration: "Dec 2020 - Jun 2021",
    highlights: [
      "Managed configuration integrity for 100+ servers, including critical databases and load balancers",
      "Designed AWS migration roadmaps and technical documentation for enterprise projects",
    ],
    technologies: ["AWS", "Configuration Management", "Documentation"],
  },
  {
    company: "Capgemini",
    role: "Senior Analyst",
    duration: "Aug 2018 - Dec 2020",
    highlights: [
      "Automated SUSE Linux patching with Python & Ansible, reducing manual effort by 80%",
      "Built Terraform scripts for Azure VM deployment and managed global resource decommissioning",
      "Implemented AWS cost optimization mechanisms, cutting monthly cloud spend significantly",
    ],
    technologies: ["Python", "Ansible", "Terraform", "Azure", "AWS", "Linux"],
  },
];

export function ExperienceSection() {
  return (
    <section id="experience" className="px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-primary" />
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary">
            Experience
          </h2>
        </div>

        <div className="space-y-16">
          {experience.map((job, index) => (
            <div
              key={index}
              className="group relative grid md:grid-cols-[200px_1fr] gap-4 md:gap-8"
            >
              <div className="text-sm text-muted-foreground">
                {job.duration}
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors inline-flex items-center gap-2">
                    {job.role}
                    <span className="text-muted-foreground font-normal">
                      {" "}
                      {"·"} {job.company}
                    </span>
                    <ExternalLink className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </h3>
                </div>

                <ul className="space-y-2">
                  {job.highlights.map((highlight, hIndex) => (
                    <li
                      key={hIndex}
                      className="text-muted-foreground text-sm leading-relaxed pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-primary/50 before:rounded-full"
                    >
                      {highlight}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 pt-2">
                  {job.technologies.map((tech, tIndex) => (
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
          ))}
        </div>
      </div>
    </section>
  );
}
