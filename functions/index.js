const { onRequest } = require('firebase-functions/v2/https')
const admin = require('firebase-admin')
// const { MercadoPagoConfig, Preference, Payment } = require('mercadopago')

admin.initializeApp()
const db = admin.firestore()
const bucket = admin.storage().bucket()

/**
 * createPreference
 * Recibe { items: [{ id, name, price }] } desde el checkout del frontend,
 * crea una preferencia de pago en Mercado Pago y devuelve `init_point`
 * para redirigir al usuario.
 *
 * TODO:
 * 1. const client = new MercadoPagoConfig({ accessToken: process.env.MP_ACCESS_TOKEN })
 * 2. Guardar un doc en `orders` con status "pending" antes de crear la preferencia,
 *    usando ese order.id como `external_reference`.
 * 3. Devolver { init_point } al frontend.
 */
exports.createPreference = onRequest({ cors: true }, async (req, res) => {
  res.status(501).json({ error: 'TODO: implementar createPreference con el SDK de Mercado Pago' })
})

/**
 * mercadopagoWebhook
 * Mercado Pago pega acá (IPN) cuando cambia el estado de un pago.
 * NUNCA confiar en el body del webhook solo: siempre re-consultar el pago
 * contra la API de Mercado Pago con el `payment_id` antes de habilitar nada.
 *
 * TODO:
 * 1. Leer payment_id de req.query / req.body según el tipo de notificación.
 * 2. new Payment(client).get({ id: payment_id }) → verificar status === 'approved'.
 * 3. Marcar la orden como pagada en Firestore (`orders/{orderId}`).
 * 4. Por cada item pagado, generar un signed URL de Storage (getSignedUrl,
 *    action: 'read', expires: Date.now() + 48*60*60*1000) sobre el archivo
 *    final en `final/{productId}.zip`.
 * 5. Mandar el mail con los links (Resend / SendGrid / Nodemailer).
 */
exports.mercadopagoWebhook = onRequest({ cors: false }, async (req, res) => {
  res.status(501).send('TODO: implementar verificación + entrega')
})
