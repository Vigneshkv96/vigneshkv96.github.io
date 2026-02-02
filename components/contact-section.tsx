"use client";

import { Github, Linkedin, Mail, Phone, MapPin, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const contact = {
  email: "vigneshkv96@gmail.com",
  phone: "9962623973",
  linkedin: "https://linkedin.com/in/vigneshkv",
  github: "https://github.com/vigneshkv",
  location: "Chennai, Tamil Nadu",
};

const education = {
  degree: "B.E. Electronics & Communications Engineering",
  institution: "Jeppiaar Engineering College",
  location: "Chennai, TN",
  year: "2018",
};

export function ContactSection() {
  return (
    <section id="contact" className="px-6 md:px-12 lg:px-24 py-20 bg-card/30">
      <div className="max-w-4xl">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-px bg-primary" />
          <h2 className="text-sm font-medium tracking-widest uppercase text-primary">
            Contact
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-6">
            <h3 className="text-2xl font-semibold text-foreground">
              {"Let's work together"}
            </h3>
            <p className="text-muted-foreground leading-relaxed">
              {"I'm always open to discussing new opportunities, interesting projects, or partnerships. Feel free to reach out!"}
            </p>

            <div className="space-y-4 pt-4">
              <Link
                href={`mailto:${contact.email}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Mail className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{contact.email}</span>
              </Link>

              <Link
                href={`tel:${contact.phone}`}
                className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors group"
              >
                <div className="p-2 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
                  <Phone className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">+91 {contact.phone}</span>
              </Link>

              <div className="flex items-center gap-3 text-muted-foreground">
                <div className="p-2 rounded-lg bg-primary/10">
                  <MapPin className="w-4 h-4 text-primary" />
                </div>
                <span className="text-sm">{contact.location}</span>
              </div>
            </div>

            <div className="flex items-center gap-4 pt-4">
              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full border-border/50 hover:border-primary hover:bg-primary/10 bg-transparent"
              >
                <Link
                  href={contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="w-5 h-5" />
                  <span className="sr-only">GitHub</span>
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="icon"
                className="rounded-full border-border/50 hover:border-primary hover:bg-primary/10 bg-transparent"
              >
                <Link
                  href={contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="w-5 h-5" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-8 h-px bg-muted-foreground/30" />
              <h3 className="text-sm font-medium tracking-widest uppercase text-muted-foreground">
                Education
              </h3>
            </div>

            <div className="p-6 rounded-xl bg-card/50 border border-border/50">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-lg bg-primary/10 shrink-0">
                  <GraduationCap className="w-6 h-6 text-primary" />
                </div>

                <div className="space-y-1">
                  <h4 className="font-semibold text-foreground">
                    {education.degree}
                  </h4>
                  <p className="text-sm text-muted-foreground">
                    {education.institution}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {education.location} | {education.year}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-20 pt-8 border-t border-border/50 text-center">
          <p className="text-sm text-muted-foreground">
            Designed & Built with care | {new Date().getFullYear()}
          </p>
        </div>
      </div>
    </section>
  );
}
