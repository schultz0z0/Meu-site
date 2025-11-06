import { ServiceCard } from "../ServiceCard";
import influencerImg from "@assets/generated_images/AI_Influencer_service_thumbnail_14717341.png";

export default function ServiceCardExample() {
  return (
    <div className="p-8 max-w-md">
      <ServiceCard
        id="1"
        title="Influenciador IA Premium"
        description="Desenvolvimento completo de avatar virtual com IA generativa para criar conteúdo autêntico e engajador."
        category="Influenciadores IA"
        price="R$ 15.000"
        image={influencerImg}
        features={[
          "Avatar 3D personalizado",
          "Geração automática de conteúdo",
          "Integração com redes sociais",
        ]}
      />
    </div>
  );
}
