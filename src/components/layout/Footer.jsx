import { Phone, Mail } from 'lucide-react'
import { InstagramIcon, FacebookIcon } from '../ui/SocialIcons'

// TODO: reemplazar los placeholders (teléfono, mail, usuarios de redes)
// por los datos reales de atmstore.
const CONTACT = {
  whatsapp: '541136189525', // sin espacios, guiones ni "+"
  instagram: 'https://instagram.com/atumanera.sublimados',
  facebook: 'https://facebook.com/atm.sublimados',
  email: 'hola@emprendeatumanera.com.ar', // TODO: confirmar cuando tengas la casilla de Zoho lista
  phoneDisplay: '11 3618-9525'
}

export function Footer() {
  return (
    <footer className="bg-surface border-t border-line mt-24">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-12">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 pb-10 mb-10 border-b border-line">
          <div>
            <h2 className="font-display text-xl text-paper">atmstore</h2>
            <p className="text-paper/60 text-sm mt-1">Plantillas para sublimar y estampar.</p>
          </div>

          <div className="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-paper/70">
            <a href={`https://wa.me/${CONTACT.whatsapp}`} target="_blank" rel="noreferrer" className="flex items-center gap-2 hover:text-lime transition-colors">
              <Phone size={16} />
              {CONTACT.phoneDisplay}
            </a>
            <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-2 hover:text-lime transition-colors">
              <Mail size={16} />
              {CONTACT.email}
            </a>
            <div className="flex items-center gap-3">
              <a href={CONTACT.instagram} target="_blank" rel="noreferrer" aria-label="Instagram" className="hover:text-lime transition-colors">
                <InstagramIcon size={20} />
              </a>
              <a href={CONTACT.facebook} target="_blank" rel="noreferrer" aria-label="Facebook" className="hover:text-lime transition-colors">
                <FacebookIcon size={20} />
              </a>
            </div>
          </div>
        </div>

        <div id="faq" className="grid gap-8 md:grid-cols-3 text-sm text-paper/60">
          <div>
            <h3 className="font-display text-paper mb-2">Licencias</h3>
            <p>Cada plantilla se vende para uso personal. La licencia comercial (reventa de productos sublimados) se indica en cada producto cuando está disponible.</p>
          </div>
          <div>
            <h3 className="font-display text-paper mb-2">Entrega</h3>
            <p>Descarga digital inmediata tras confirmar el pago. El link llega por mail y queda disponible en "Mis compras".</p>
          </div>
          <div>
            <h3 className="font-display text-paper mb-2">Formatos</h3>
            <p>PNG en alta resolución (300dpi). Algunos packs incluyen PDF y SVG editable — se aclara en cada ficha.</p>
          </div>
        </div>

        <p className="text-paper/40 text-xs mt-10 pt-6 border-t border-line">
          © {new Date().getFullYear()} atmstore. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  )
}
