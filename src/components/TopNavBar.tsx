"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Github, Linkedin, Instagram } from "lucide-react";

interface TopNavBarProps {
  sections?: { id: string; label: string }[];
}

export default function TopNavBar({
  sections = [],
}: TopNavBarProps) {
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (!el) continue;

        const rect = el.getBoundingClientRect();
        if (rect.top <= 150 && rect.bottom >= 150) {
          setActiveSection(sec.id);
          break;
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [sections]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 80,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="w-full bg-white border-b border-purple-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        
        {/* LEFT: Title + Description */}
        <div>
          <h1 className="text-2xl font-bold text-purple-700">GPA Calculator</h1>
          <p className="text-sm text-gray-600 -mt-1">
            School + Standardized GPA Dashboard
          </p>
        </div>

        {/* CENTER: Section Jump Links */}
        <div className="hidden md:flex space-x-6">
          {sections.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollTo(sec.id)}
              className={`
                text-sm font-medium transition-colors
                ${activeSection === sec.id
                  ? "text-purple-700 font-semibold"
                  : "text-gray-600 hover:text-purple-600"}
              `}
            >
              {sec.label}
            </button>
          ))}
        </div>

        {/* RIGHT: Chart Page + Social Icons */}
        <div className="flex items-center space-x-4">

          {/* GPA Chart Page Link */}
          <Link
            href="/gpa-chart"
            className="px-3 py-1.5 text-sm rounded-lg bg-purple-600 text-white hover:bg-purple-700 transition"
          >
            GPA Chart
          </Link>

          {/* Social Icons */}
          <a
            href="https://github.com/dmace27"
            target="_blank"
            className="text-gray-600 hover:text-purple-700"
          >
            <Github size={22} />
          </a>

          <a
            href="https://www.linkedin.com/in/daniel-mace-a6837130a"
            target="_blank"
            className="text-gray-600 hover:text-purple-700"
          >
            <Linkedin size={22} />
          </a>

          <a
            href="https://instagram.com/danielmace27"
            target="_blank"
            className="text-gray-600 hover:text-purple-700"
          >
            <Instagram size={22} />
          </a>
        </div>
      </div>
    </nav>
  );
}
