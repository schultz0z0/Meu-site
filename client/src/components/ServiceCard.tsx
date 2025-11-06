import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  price: string;
  image: string;
  features?: string[];
}

export function ServiceCard({
  id,
  title,
  description,
  category,
  price,
  image,
  features = [],
}: ServiceCardProps) {
  return (
    <Card
      className="overflow-hidden hover-elevate active-elevate-2 transition-all duration-300 hover:shadow-lg flex flex-col"
      data-testid={`card-service-${id}`}
    >
      <div className="aspect-video overflow-hidden bg-muted">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
          data-testid={`img-service-${id}`}
        />
      </div>
      
      <div className="p-6 flex flex-col flex-1">
        <div className="flex items-center justify-between mb-3">
          <Badge variant="secondary" data-testid={`badge-category-${id}`}>
            {category}
          </Badge>
          <span className="text-lg font-bold text-primary" data-testid={`text-price-${id}`}>
            {price}
          </span>
        </div>

        <h3 className="text-xl font-bold mb-2" data-testid={`text-title-${id}`}>
          {title}
        </h3>

        <p className="text-muted-foreground text-sm mb-4 flex-1" data-testid={`text-description-${id}`}>
          {description}
        </p>

        {features.length > 0 && (
          <ul className="space-y-1 mb-4 text-sm">
            {features.slice(0, 3).map((feature, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="text-primary">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}

        <Link href={`/service/${id}`}>
          <Button className="w-full group" data-testid={`button-view-service-${id}`}>
            Ver Detalhes
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
      </div>
    </Card>
  );
}
