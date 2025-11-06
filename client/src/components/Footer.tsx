import { Link } from "wouter";
import { Sparkles, Mail, Phone, MapPin } from "lucide-react";
import { SiGithub, SiLinkedin, SiX } from "react-icons/si";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export function Footer() {
  return (
    <footer className="bg-card border-t border-card-border" data-testid="footer-main">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl">AI Services</span>
            </div>
            <p className="text-muted-foreground mb-4">
              Transformando negócios com soluções de IA de ponta. Inovação, qualidade e resultados.
            </p>
            <div className="flex gap-2">
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-github">
                <SiGithub className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-linkedin">
                <SiLinkedin className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="hover-elevate" data-testid="button-social-twitter">
                <SiX className="h-5 w-5" />
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Serviços</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/influencers">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Influenciadores IA
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/agents">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Agents IA
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/micro-saas">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Micro-SaaS
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/services/saas">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    SaaS Completo
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Empresa</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/about">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Sobre Nós & Portfólio
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/blog">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Blog
                  </span>
                </Link>
              </li>
              <li>
                <a href="#contact">
                  <span className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    Contato
                  </span>
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-lg mb-4">Contato</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-2 text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span className="text-sm">contato@aiservices.com</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span className="text-sm">+55 11 9999-9999</span>
              </li>
              <li className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span className="text-sm">São Paulo, Brasil</span>
              </li>
            </ul>
            <div className="mt-4">
              <h4 className="font-medium mb-2">Newsletter</h4>
              <div className="flex gap-2">
                <Input placeholder="Seu email" className="flex-1" data-testid="input-newsletter" />
                <Button data-testid="button-subscribe">Assinar</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2025 AI Services Marketplace. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
}
