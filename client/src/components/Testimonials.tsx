import { Card } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Maria Silva",
    role: "CEO, TechStart",
    avatar: "",
    content: "O desenvolvimento do nosso influenciador IA foi excepcional. Aumentamos o engajamento em 300% nas redes sociais!",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Founder, InnovaCorp",
    avatar: "",
    content: "O agent IA personalizado revolucionou nosso atendimento ao cliente. Recomendo fortemente!",
    rating: 5,
  },
  {
    name: "Ana Costa",
    role: "CTO, DataFlow",
    avatar: "",
    content: "O Micro-SaaS desenvolvido superou todas as expectativas. Profissionalismo e qualidade impecáveis.",
    rating: 5,
  },
];

export function Testimonials() {
  return (
    <section className="py-24 px-6 bg-muted/30" data-testid="section-testimonials">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4" data-testid="text-testimonials-title">
            O Que Nossos Clientes Dizem
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Histórias de sucesso de empresas que transformaram seus negócios com nossas soluções
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="p-6" data-testid={`card-testimonial-${index}`}>
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">"{testimonial.content}"</p>
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={testimonial.avatar} />
                  <AvatarFallback>{testimonial.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-semibold">{testimonial.name}</div>
                  <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
