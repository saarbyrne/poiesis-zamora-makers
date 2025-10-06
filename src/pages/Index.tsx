import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
const Index = () => {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email && !whatsapp) {
      toast.error("Por favor, ingresa tu email o WhatsApp");
      return;
    }

    // Validate email format if provided
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      toast.error("Por favor, ingresa un email válido");
      return;
    }

    // Create email body
    let emailBody = "Nueva persona interesada en Poiesis:%0D%0A%0D%0A";
    if (email) {
      emailBody += `Email: ${encodeURIComponent(email)}%0D%0A`;
    }
    if (whatsapp) {
      emailBody += `WhatsApp: ${encodeURIComponent(whatsapp)}%0D%0A`;
    }

    // Create mailto link
    const mailtoLink = `mailto:byrne.saar@gmail.com?subject=Poiesis - Nuevo Interesado&body=${emailBody}`;

    // Open email client
    window.location.href = mailtoLink;

    // Clear form
    setEmail("");
    setWhatsapp("");
    toast.success("¡Gracias por tu interés!");
  };
  return <div className="min-h-screen flex flex-col px-5 py-10 md:px-10 md:py-20">
      <div className="max-w-[720px] mx-auto w-full flex flex-col items-center">
        {/* Logo */}
        <h1 className="font-display text-[clamp(3rem,12vw,7rem)] text-primary text-center leading-[0.9] mb-5 text-shadow-3d-primary tracking-tight">
          POIESIS
        </h1>

        {/* Definition */}
        <p className="font-body font-bold text-[clamp(1rem,3vw,1.4rem)] text-center text-secondary uppercase tracking-wide mb-12">
          Dar existencia a algo que no existía.
        </p>

        {/* Action Words */}
        <div className="flex flex-col gap-5 w-full mb-12">
          <div className="font-display text-[clamp(2.5rem,8vw,4.5rem)] text-secondary text-center text-shadow-3d-secondary tracking-widest">
            • EXPERIMENTAR •
          </div>
          <div className="font-display text-[clamp(2.5rem,8vw,4.5rem)] text-secondary text-center text-shadow-3d-secondary tracking-widest">
            • CONSTRUIR •
          </div>
          <div className="font-display text-[clamp(2.5rem,8vw,4.5rem)] text-secondary text-center text-shadow-3d-secondary tracking-widest">
            • CRECER •
          </div>
        </div>

        {/* Description */}
        <p className="font-body font-bold text-[clamp(1.1rem,3vw,1.5rem)] text-center text-secondary leading-relaxed mb-12 max-w-[600px]">
          Buscamos creadores en Zamora para fundar una empresa tecnológica juntos.
          <br />
          No tengo ni idea qué.
          <br />
          Pero es el desafío.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[560px] rounded-[20px] p-8 md:p-10 shadow-card bg-black/[0.04]">
          {/* Email Input */}
          <div className="relative mb-6">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="EMAIL" className="w-full py-4 px-5 pr-12 text-lg font-body font-medium border-[3px] border-input rounded-full bg-card focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground placeholder:font-normal" />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Divider */}
          <div className="text-center text-3xl font-black text-secondary my-5">
            O
          </div>

          {/* WhatsApp Input */}
          <div className="relative mb-6">
            <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WHATSAPP" className="w-full py-4 px-5 pr-12 text-lg font-body font-medium border-[3px] border-input rounded-full bg-card focus:outline-none focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all placeholder:text-muted-foreground placeholder:font-normal" />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground pointer-events-none" />
          </div>

          {/* Submit Button */}
          <button type="submit" className="w-full py-5 text-xl font-black font-body uppercase bg-primary text-primary-foreground rounded-full shadow-button hover:bg-primary-dark hover:-translate-y-0.5 hover:shadow-button-hover active:translate-y-0 transition-all mt-2">
            Enviar →
          </button>
        </form>

        {/* Footer */}
        <div className="text-center mt-16 font-body text-base text-secondary">
          Una iniciativa de{" "}
          <a href="https://www.saarbyrne.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline uppercase">
            Saar Byrne
          </a>
          <br />
          <a href="https://www.saarbyrne.com" target="_blank" rel="noopener noreferrer" className="text-primary font-bold hover:underline uppercase">
            www.saarbyrne.com
          </a>
        </div>
      </div>
    </div>;
};
export default Index;