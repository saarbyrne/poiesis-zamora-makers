import { useState } from "react";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
// Validation schemas
const emailSchema = z.string()
  .trim()
  .email({ message: "Por favor, ingresa un email válido" })
  .max(255, { message: "El email es demasiado largo" });

const phoneSchema = z.string()
  .trim()
  .min(8, { message: "El número debe tener al menos 8 dígitos" })
  .max(20, { message: "El número es demasiado largo" })
  .regex(/^[\d\s\+\-\(\)]+$/, { message: "Por favor, ingresa un número de teléfono válido" });

const Index = () => {
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check that at least one field is filled
    if (!email.trim() && !whatsapp.trim()) {
      toast.error("Por favor, ingresa tu email o WhatsApp");
      return;
    }

    setIsSubmitting(true);

    try {
      // Validate email if provided
      if (email.trim()) {
        const emailResult = emailSchema.safeParse(email);
        if (!emailResult.success) {
          toast.error(emailResult.error.errors[0].message);
          setIsSubmitting(false);
          return;
        }
      }

      // Validate WhatsApp if provided
      if (whatsapp.trim()) {
        const phoneResult = phoneSchema.safeParse(whatsapp);
        if (!phoneResult.success) {
          toast.error(phoneResult.error.errors[0].message);
          setIsSubmitting(false);
          return;
        }
      }

      // Prepare form data for Web3Forms
      const formData = {
        access_key: 'a216fdbe-9500-4681-af49-9f1643393f2e',
        subject: 'Poiesis - Nuevo Interesado',
        from_name: 'Poiesis Website',
        ...(email.trim() && { email: email.trim() }),
        ...(whatsapp.trim() && { whatsapp: whatsapp.trim() })
      };

      // Submit to Web3Forms API
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        // Clear form and show success
        setEmail("");
        setWhatsapp("");
        toast.success("¡Gracias por tu interés! Te contactaremos pronto.");
      } else {
        throw new Error('Failed to submit form');
      }
      
    } catch (error) {
      toast.error("Ocurrió un error. Por favor, intenta de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return <div className="min-h-screen flex flex-col px-5 py-10 md:px-10 md:py-20">
      <div className="max-w-[720px] mx-auto w-full flex flex-col items-center">
        {/* Logo */}
        <h1 className="font-display-shade text-[clamp(4rem,14vw,9rem)] text-primary text-center leading-[0.85] mb-3 tracking-tight">
          POIESIS
        </h1>

        {/* Definition */}
        <p className="font-body text-[clamp(1rem,3vw,1.5rem)] text-center text-secondary uppercase tracking-tight mb-8">
          Dar existencia a algo que no existía.
        </p>

        {/* Action Words */}
        <div className="flex flex-col gap-0 w-full mb-8">
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
        <p className="font-body text-[clamp(1.1rem,3vw,1.6rem)] text-center text-secondary leading-tight mb-8 max-w-[700px]">
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
            <input 
              type="email" 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              placeholder="EMAIL" 
              maxLength={255}
              disabled={isSubmitting}
              className="w-full py-4 px-5 pr-12 text-lg font-body border-[3px] border-secondary rounded-full bg-card focus:outline-none focus:border-primary transition-all placeholder:text-secondary placeholder:uppercase disabled:opacity-50 disabled:cursor-not-allowed" 
            />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
          </div>

          {/* Divider */}
          <div className="text-center text-4xl font-body text-secondary">
            O
          </div>

          {/* WhatsApp Input */}
          <div className="relative w-full">
            <input 
              type="tel" 
              value={whatsapp} 
              onChange={e => setWhatsapp(e.target.value)} 
              placeholder="WHATSAPP" 
              maxLength={20}
              disabled={isSubmitting}
              className="w-full py-4 px-5 pr-12 text-lg font-body border-[3px] border-secondary rounded-full bg-card focus:outline-none focus:border-primary transition-all placeholder:text-secondary placeholder:uppercase disabled:opacity-50 disabled:cursor-not-allowed" 
            />
            <Send className="absolute right-5 top-1/2 -translate-y-1/2 w-5 h-5 text-secondary pointer-events-none" />
          </div>

          {/* Submit Button */}
          <Button 
            type="submit" 
            disabled={isSubmitting}
            className="w-full py-6 text-lg font-body uppercase rounded-full bg-primary hover:bg-primary-dark text-primary-foreground shadow-button hover:shadow-button-hover transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "ENVIANDO..." : "ENVIAR →"}
          </Button>
        </form>

        {/* Footer */}
        <div className="text-center mt-auto pt-16 font-body text-[clamp(1rem,2.5vw,1.3rem)] text-secondary uppercase">
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