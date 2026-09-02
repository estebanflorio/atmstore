// Asigna (o quita) el rol de administrador a un usuario, vía custom claim
// de Firebase Auth. Corre local, con permisos de administrador.
//
// Uso:
//   node scripts/set-admin.js tu@email.com
//   node scripts/set-admin.js tu@email.com --quitar
//
// Requiere haber iniciado sesión al menos una vez en la tienda con ese
// email (Firebase necesita que el usuario ya exista para asignarle el claim).
// Después de correrlo, el usuario tiene que cerrar sesión y volver a
// entrar para que el token nuevo (con el claim) se aplique.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { initializeApp, cert } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

const email = process.argv[2]
const remove = process.argv.includes('--quitar')

if (!email) {
  console.error('\nUso: node scripts/set-admin.js tu@email.com [--quitar]\n')
  process.exit(1)
}

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json')
if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    '\nFalta scripts/serviceAccountKey.json — mismo archivo que usa seed-products.js.\n' +
    'Se genera en: Firebase Console → ⚙️ Configuración del proyecto → Cuentas de servicio.\n'
  )
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))
initializeApp({ credential: cert(serviceAccount) })
const auth = getAuth()

async function main() {
  const user = await auth.getUserByEmail(email).catch(() => null)

  if (!user) {
    console.error(
      `\nNo existe ningún usuario con ese email todavía.\n` +
      `Entrá una vez a /login en la tienda con "${email}" (Google o email/contraseña) y volvé a correr este script.\n`
    )
    process.exit(1)
  }

  await auth.setCustomUserClaims(user.uid, { admin: !remove })

  console.log(
    remove
      ? `✔ ${email} ya no es administrador.`
      : `✔ ${email} ahora es administrador.`
  )
  console.log('  (tiene que cerrar sesión y volver a entrar para que se aplique)')
  process.exit(0)
}

main().catch((err) => {
  console.error('\nAlgo falló:', err.message)
  process.exit(1)
})
