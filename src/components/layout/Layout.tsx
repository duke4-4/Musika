import { ReactNode, useEffect } from "react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { cn } from "@/lib/utils";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export const Layout = ({ children, className }: LayoutProps) => {
  // Smooth scroll behavior and prevent flash of unstyled content
  useEffect(() => {
    // Ensure smooth scrolling
    document.documentElement.style.scrollBehavior = 'smooth';

    // Prevent FOUC (Flash of Unstyled Content)
    document.body.classList.add('loaded');

    return () => {
      document.documentElement.style.scrollBehavior = 'auto';
    };
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-background via-background/98 to-secondary/20">
      {/* Subtle background pattern */}
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_120%,rgba(120,119,198,0.1),rgba(255,255,255,0))] pointer-events-none" />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className={cn(
        "flex-1 relative z-10",
        "animate-fade-in",
        className
      )}>
        <div className="min-h-[calc(100vh-8rem)]">
          {children}
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Scroll to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-50 h-12 w-12 rounded-full bg-gradient-to-r from-primary to-accent shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/40 transition-all duration-300 hover:scale-110 opacity-0 translate-y-4 group"
        style={{
          opacity: typeof window !== 'undefined' && window.scrollY > 300 ? 1 : 0,
          transform: typeof window !== 'undefined' && window.scrollY > 300 ? 'translateY(0)' : 'translateY(1rem)',
        }}
        aria-label="Scroll to top"
      >
        <svg
          className="h-5 w-5 text-primary-foreground mx-auto transition-transform group-hover:-translate-y-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 10l7-7m0 0l7 7m-7-7v18"
          />
        </svg>
      </button>

      {/* Page transition overlay */}
      <div className="fixed inset-0 z-50 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 opacity-0 pointer-events-none transition-opacity duration-500 page-transition-overlay" />
    </div>
  );
};

