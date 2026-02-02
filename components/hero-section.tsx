"use client";

import { Github, Linkedin, Mail, MapPin, Phone, ArrowDown } from "lucide-react";
import Link from "next/link";

const portfolioData = {
  personal: {
    name: "Vignesh K V",
    title: "Senior DevOps & Backend Engineer",
    location: "Chennai, Tamil Nadu",
    phone: "9962623973",
    email: "vigneshkv96@gmail.com",
    linkedin: "https://linkedin.com/in/vigneshkv",
    github: "https://github.com/vigneshkv",
    summary:
      "Innovative DevOps & Software Engineer with 7+ years of experience in Cloud Automation, Application Security, and Backend Development. Proven success in scaling infrastructure for MNCs like Verizon and Comcast, implementing RASP security, building Generative AI data pipelines, and delivering high-performance APIs.",
  },
};

export function HeroSection() {
  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-12 lg:px-24 py-20">
      <div className="max-w-4xl">
        <div className="flex items-center gap-2 text-muted-foreground mb-6">
          <MapPin className="w-4 h-4" />
          <span className="text-sm tracking-wide uppercase">
            {portfolioData.personal.location}
          </span>
        </div>

        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-foreground mb-4">
          {portfolioData.personal.name}
        </h1>

        <h2 className="text-xl md:text-2xl lg:text-3xl font-medium text-primary mb-8">
          {portfolioData.personal.title}
        </h2>

        <p className="text-base md:text-lg text-muted-foreground leading-relaxed max-w-2xl mb-12">
          {portfolioData.personal.summary}
        </p>

        <div className="flex flex-wrap items-center gap-6 mb-16">
          <Link
            href={portfolioData.personal.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Github className="w-5 h-5" />
            <span className="text-sm">GitHub</span>
          </Link>

          <Link
            href={portfolioData.personal.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Linkedin className="w-5 h-5" />
            <span className="text-sm">LinkedIn</span>
          </Link>

          <Link
            href={`mailto:${portfolioData.personal.email}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Mail className="w-5 h-5" />
            <span className="text-sm">{portfolioData.personal.email}</span>
          </Link>

          <Link
            href={`tel:${portfolioData.personal.phone}`}
            className="flex items-center gap-2 text-muted-foreground hover:text-primary transition-colors"
          >
            <Phone className="w-5 h-5" />
            <span className="text-sm">+91 {portfolioData.personal.phone}</span>
          </Link>
        </div>

        <div className="flex items-center gap-2 text-muted-foreground animate-bounce">
          <ArrowDown className="w-5 h-5" />
          <span className="text-sm">Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}
