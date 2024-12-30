"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, Moon, Sun } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { DialogTitle } from "@radix-ui/react-dialog";  // Import DialogTitle
import { VisuallyHidden } from "@radix-ui/react-visually-hidden"; // Import VisuallyHidden
import { motion } from "framer-motion";
import { usePathname } from "next/navigation";
import ThemeButton from "./ThemeButton";

const sections = [
  { id: "inicio", label: "Inicio" },
  { id: "servicios", label: "Servicios" },
  { id: "caracteristicas", label: "Características" },
  { id: "contacto", label: "Contacto" },
];

export default function Navbar() {
  const [activeSection, setActiveSection] = useState("inicio");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [theme, setTheme] = useState(false);
  const pathname = usePathname(); // Get the current pathname
  const toggleTheme = () => {
    setTheme(!theme);
    document.body.classList.toggle('.dark', !theme); // Alterna la clase 'dark' en el body
  };
  useEffect(() => {
    const observers = sections.map(({ id }) => {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setActiveSection(id);
            }
          });
        },
        { threshold: 0.5 }
      );

      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }

      return observer;
    });

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      observers.forEach((observer) => observer.disconnect());
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Smooth scrolling behavior
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (element) {
      element.scrollIntoView({ behavior: prefersReducedMotion ? "auto" : "smooth" });
    }
  };

  const getLinkStyles = useCallback(
    (sectionId: string) => {
      const isActive = activeSection === sectionId;
      return `transition-all duration-300 ${
        isActive ? "font-bold text-primary" : "text-gray-600 hover:text-gray-900"
      }`;
    },
    [activeSection]
  );

  return (
    <motion.header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              AquaServ
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                onClick={() => scrollToSection(id)}
                className={getLinkStyles(id)}
              >
                {label}
              </button>
            ))}
            <ThemeButton/>
          </nav>

          {/* Mobile Navigation */}
          <Sheet open={isOpen}  onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button variant="ghost" className="md:hidden" size="icon">
                <Menu className="h-6  w-6 " />
              </Button>
            </SheetTrigger>
            <SheetContent>
              {/* Accessible Dialog Title (visually hidden) */}
              <VisuallyHidden>
                <DialogTitle>Menú de navegación</DialogTitle>
              </VisuallyHidden>
              <nav className="flex  flex-col space-y-4 mt-6">
                {sections.map(({ id, label }) => (
                  <button
                    key={id}
                    onClick={() => {
                      scrollToSection(id);
                      setIsOpen(false); // Close sheet
                    }}
                    className={getLinkStyles(id)}
                  >
                    {label}
                  </button>
                ))}
                
                  <ThemeButton/>
                
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.header>
  );
}