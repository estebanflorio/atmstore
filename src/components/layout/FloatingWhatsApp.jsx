import { WhatsAppIcon } from '../ui/SocialIcons'
import { CONTACT } from '../../lib/contact'

// Botón flotante fijo, siempre visible — patrón estándar para arrancar una
// charla directa por WhatsApp sin que el visitante tenga que ir al footer.
export function FloatingWhatsApp() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Escribinos por WhatsApp"
      className="fixed bottom-5 right-5 z-30 w-14 h-14 rounded-full bg-[#25D366] text-white
        flex items-center justify-center shadow-lg hover:scale-105 transition-transform"
    >
      <WhatsAppIcon size={28} />
    </a>
  )
}
