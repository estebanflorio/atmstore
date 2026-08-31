import { Link, useSearchParams } from 'react-router-dom'

export function ThankYou() {
  const [params] = useSearchParams()
  const order = params.get('order')

  return (
    <div className="max-w-md mx-auto text-center py-12">
      <h1 className="font-display text-2xl mb-3">¡Gracias por tu compra!</h1>
      <p className="text-paper/60 text-sm mb-6">
        Te enviamos el link de descarga por mail. También podés descargarlo
        desde acá una vez que esté conectada la entrega real.
      </p>
      {order && <p className="text-paper/30 text-xs mb-6">Orden: {order}</p>}
      <Link to="/" className="text-lime text-sm underline">Volver al catálogo</Link>
    </div>
  )
}
