import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./ThemeToggle";

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => location === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out ${
        isScrolled
          ? "bg-background/95 backdrop-blur-lg border-b border-border shadow-lg"
          : "bg-gradient-to-b from-black/70 via-black/50 to-transparent backdrop-blur-sm"
      }`}
      data-testid="header-main"
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex items-center justify-between h-16">
          <Link href="/" data-testid="link-logo">
            <div className="flex items-center gap-2 hover-elevate active-elevate-2 rounded-md px-3 py-2 -ml-3">
              <Sparkles className={`h-6 w-6 ${isScrolled ? 'text-primary' : 'text-white'}`} />
              <span className={`font-bold text-xl ${isScrolled ? '' : 'text-white'}`}>AI Services</span>
            </div>
          </Link>

          <nav className="hidden md:flex items-center gap-1">
            <Link href="/" data-testid="link-nav-home">
              <Button
                variant={isActive("/") ? "secondary" : "ghost"}
                className={`hover-elevate active-elevate-2 ${!isScrolled ? 'text-white hover:bg-white/10' : ''}`}
              >
                Início
              </Button>
            </Link>
            <Link href="/services" data-testid="link-nav-services">
              <Button
                variant={isActive("/services") ? "secondary" : "ghost"}
                className={`hover-elevate active-elevate-2 ${!isScrolled ? 'text-white hover:bg-white/10' : ''}`}
              >
                Serviços
              </Button>
            </Link>
            <Link href="/about" data-testid="link-nav-about">
              <Button
                variant={isActive("/about") ? "secondary" : "ghost"}
                className={`hover-elevate active-elevate-2 ${!isScrolled ? 'text-white hover:bg-white/10' : ''}`}
              >
                Sobre
              </Button>
            </Link>
          </nav>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <Link href="/login" data-testid="link-login">
              <Button 
                variant="ghost" 
                className={`hidden sm:flex hover-elevate active-elevate-2 ${!isScrolled ? 'text-white hover:bg-white/10' : ''}`}
              >
                Entrar
              </Button>
            </Link>
            <Link href="/admin" data-testid="link-admin">
              <Button 
                variant="default" 
                data-testid="button-admin"
                className={!isScrolled ? 'bg-white text-primary hover:bg-white/90' : ''}
              >
                Admin
              </Button>
            </Link>
            <Button
              variant="ghost"
              size="icon"
              className={`md:hidden ${!isScrolled ? 'text-white hover:bg-white/10' : ''}`}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </div>

        {isMobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2" data-testid="mobile-menu">
            <Link href="/">
              <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-home">
                Início
              </Button>
            </Link>
            <Link href="/services">
              <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-services">
                Serviços
              </Button>
            </Link>
            <Link href="/about">
              <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-about">
                Sobre
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="ghost" className="w-full justify-start" data-testid="mobile-link-login">
                Entrar
              </Button>
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}
