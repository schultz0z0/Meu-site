import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { motion } from "framer-motion";
import { 
  Calendar, 
  Clock, 
  ArrowRight,
  Mail,
  CheckCircle2
} from "lucide-react";

export default function Blog() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch("/api/public/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
        credentials: "include"
      });

      if (response.ok) {
        setSubscribed(true);
        setEmail("");
      }
    } catch (error) {
      console.error("Newsletter signup error:", error);
    }
  };

  const blogPosts = [
    {
      title: "Como a IA Está Transformando o E-commerce em 2024",
      excerpt: "Descubra as principais tendências de inteligência artificial que estão revolucionando a experiência de compra online.",
      category: "IA & Negócios",
      date: "15 Jan 2024",
      readTime: "5 min",
      image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80"
    },
    {
      title: "Machine Learning na Prática: Cases de Sucesso",
      excerpt: "Conheça empresas que aumentaram seus resultados em até 40% utilizando modelos preditivos.",
      category: "Case Studies",
      date: "10 Jan 2024",
      readTime: "8 min",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80"
    },
    {
      title: "Chatbots Inteligentes: Guia Completo para Iniciantes",
      excerpt: "Aprenda a implementar chatbots com IA que realmente entendem seus clientes.",
      category: "Tutorial",
      date: "5 Jan 2024",
      readTime: "6 min",
      image: "https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=800&q=80"
    },
    {
      title: "Automação com IA: Por Onde Começar?",
      excerpt: "Um roadmap prático para automatizar processos usando inteligência artificial.",
      category: "Guias",
      date: "28 Dez 2023",
      readTime: "7 min",
      image: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800&q=80"
    },
    {
      title: "Tendências de IA para 2024: O Que Esperar",
      excerpt: "Análise das tecnologias emergentes que vão dominar o mercado este ano.",
      category: "Tendências",
      date: "20 Dez 2023",
      readTime: "10 min",
      image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&q=80"
    },
    {
      title: "Segurança em Projetos de IA: Boas Práticas",
      excerpt: "Como proteger seus dados e modelos de IA contra vulnerabilidades.",
      category: "Segurança",
      date: "15 Dez 2023",
      readTime: "9 min",
      image: "https://images.unsplash.com/photo-1563986768609-322da13575f3?w=800&q=80"
    }
  ];

  const categories = ["Todos", "IA & Negócios", "Case Studies", "Tutorial", "Guias", "Tendências", "Segurança"];
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredPosts = selectedCategory === "Todos" 
    ? blogPosts 
    : blogPosts.filter(post => post.category === selectedCategory);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-24">
        <section className="py-20 px-6 bg-gradient-to-br from-purple-50 via-blue-50 to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
          <div className="max-w-5xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Badge className="mb-4">Blog</Badge>
              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Insights sobre
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600">
                  Inteligência Artificial
                </span>
              </h1>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Artigos, tutoriais e análises sobre as últimas tendências em IA e desenvolvimento.
              </p>
            </motion.div>
          </div>
        </section>

        <section className="py-16 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-wrap gap-2 mb-12 justify-center">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={selectedCategory === category ? "default" : "outline"}
                  onClick={() => setSelectedCategory(category)}
                  className="transition-all"
                >
                  {category}
                </Button>
              ))}
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-20">
              {filteredPosts.map((post, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover-elevate transition-all group cursor-pointer h-full flex flex-col">
                    <div className="relative h-48 overflow-hidden">
                      <img 
                        src={post.image} 
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <div className="absolute top-4 left-4">
                        <Badge>{post.category}</Badge>
                      </div>
                    </div>
                    <div className="p-6 flex-1 flex flex-col">
                      <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-4 w-4" />
                          {post.date}
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="h-4 w-4" />
                          {post.readTime}
                        </div>
                      </div>
                      <h3 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-muted-foreground mb-4 flex-1">
                        {post.excerpt}
                      </p>
                      <Button variant="ghost" className="w-full group/btn">
                        Ler Artigo
                        <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card 
              id="newsletter" 
              className="p-8 md:p-12 bg-gradient-to-r from-purple-600 via-blue-600 to-cyan-600 text-white border-none"
            >
              <div className="max-w-2xl mx-auto text-center">
                {!subscribed ? (
                  <>
                    <Mail className="h-12 w-12 mx-auto mb-4" />
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                      Receba Conteúdo Exclusivo
                    </h2>
                    <p className="text-lg mb-8 text-white/90">
                      Inscreva-se na nossa newsletter e receba artigos, dicas e novidades sobre IA diretamente no seu email.
                    </p>
                    <form onSubmit={handleNewsletterSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                      <Input
                        type="email"
                        placeholder="Seu melhor email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white/20"
                      />
                      <Button 
                        type="submit" 
                        variant="secondary"
                        size="lg"
                        className="whitespace-nowrap"
                      >
                        Inscrever-se
                      </Button>
                    </form>
                    <p className="text-sm text-white/70 mt-4">
                      Sem spam. Cancele quando quiser.
                    </p>
                  </>
                ) : (
                  <div className="py-8">
                    <CheckCircle2 className="h-16 w-16 mx-auto mb-4" />
                    <h2 className="text-3xl font-bold mb-2">Inscrição Confirmada!</h2>
                    <p className="text-lg text-white/90">
                      Obrigado por se inscrever. Você receberá nossos próximos artigos em breve.
                    </p>
                  </div>
                )}
              </div>
            </Card>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
