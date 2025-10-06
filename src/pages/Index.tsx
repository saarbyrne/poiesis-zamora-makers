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
        <h1 className="font-display-shade text-[clamp(4rem,14vw,9rem)] text-primary text-center leading-[0.85] mb-3 tracking-tight">
          POIESIS
        </h1>

        {/* Definition */}
        <p className="font-body text-[clamp(1rem,3vw,1.5rem)] text-center text-secondary uppercase tracking-tight mb-12">
          Dar existencia a algo que no existía.
        </p>

        {/* Action Words */}
        <div className="flex flex-col gap-4 w-full mb-12">
          <div className="font-display text-[clamp(2.2rem,7vw,4rem)] text-secondary text-center text-shadow-3d-secondary tracking-tight">
            • EXPERIMENTAR •
          </div>
          <div className="font-display text-[clamp(2.2rem,7vw,4rem)] text-secondary text-center text-shadow-3d-secondary tracking-tight">
            • CONSTRUIR •
          </div>
          <div className="font-display text-[clamp(2.2rem,7vw,4rem)] text-secondary text-center text-shadow-3d-secondary tracking-tight">
            • CRECER •
          </div>
        </div>

        {/* Description */}
        <p className="font-body text-[clamp(1.1rem,3vw,1.6rem)] text-center text-secondary leading-tight mb-12 max-w-[700px]">
          BUSCAMOS CREADORES EN ZAMORA PARA FUNDAR UNA EMPRESA TECNOLÓGICA JUNTOS.
          <br />
          NO TENGO NI IDEA QUÉ.
          <br />
          PERO ES EL DESAFÍO.
        </p>

        {/* Form */}
        <form onSubmit={handleSubmit} className="w-full max-w-[560px] flex flex-col items-center gap-6">
          {/* Email Input */}
          <div className="relative w-full">
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="EMAIL" className="w-full py-4 px-5 pr-12 text-lg font-body border-[3px] border-secondary rounded-full bg-card focus:outline-none focus:border-primary transition-all placeholder:text-secondary placeholder:uppercase" />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
          </div>

          {/* Divider */}
          <div className="text-center text-4xl font-body text-secondary">
            O
          </div>

          {/* WhatsApp Input */}
          <div className="relative w-full">
            <input type="tel" value={whatsapp} onChange={e => setWhatsapp(e.target.value)} placeholder="WHATSAPP" className="w-full py-4 px-5 pr-12 text-lg font-body border-[3px] border-secondary rounded-full bg-card focus:outline-none focus:border-primary transition-all placeholder:text-secondary placeholder:uppercase" />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
          </div>
        </form>

        {/* Footer */}
        <div className="text-center mt-auto pt-20 font-body text-[clamp(1rem,2.5vw,1.3rem)] text-secondary uppercase">
          Una iniciativa de Saar Byrne
          <br />
          <a href="https://www.saarbyrne.com" target="_blank" rel="noopener noreferrer" className="text-[#0000FF] hover:underline">
            www.saarbyrne.com
          </a>
        </div>
      </div>
    </div>;
};
export default Index;