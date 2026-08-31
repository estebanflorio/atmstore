// Carga (o actualiza) productos reales en Firestore + sube sus imágenes y
// archivo final a Storage. Corre local, con permisos de administrador —
// nunca se deployea ni se sube al repo la clave de servicio.
//
// Uso:
//   1. cp scripts/products.seed.example.json scripts/products.seed.json
//      y completalo con tus productos reales.
//   2. Poné las imágenes (y el .zip final, si ya lo tenés) dentro de
//      scripts/product-images/<id-del-producto>/
//   3. node scripts/seed-products.js
//
// Podés correrlo de nuevo las veces que quieras: hace upsert por `id`,
// no duplica productos.

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import admin from 'firebase-admin'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// TODO: pegá acá el mismo valor que tenés en VITE_FIREBASE_STORAGE_BUCKET (.env)
const STORAGE_BUCKET = 'TU-PROJECT-ID.firebasestorage.app'

const serviceAccountPath = path.join(__dirname, 'serviceAccountKey.json')
if (!fs.existsSync(serviceAccountPath)) {
  console.error(
    '\nFalta scripts/serviceAccountKey.json\n' +
    'Se genera en: Firebase Console → ⚙️ Configuración del proyecto → Cuentas de servicio\n' +
    '→ "Generar nueva clave privada". Guardalo con ese nombre exacto en scripts/.\n' +
    '(Ya está en .gitignore — nunca se commitea.)\n'
  )
  process.exit(1)
}

const seedPath = path.join(__dirname, 'products.seed.json')
if (!fs.existsSync(seedPath)) {
  console.error(
    '\nFalta scripts/products.seed.json\n' +
    'Copiá scripts/products.seed.example.json a scripts/products.seed.json y completalo.\n'
  )
  process.exit(1)
}

const serviceAccount = JSON.parse(fs.readFileSync(serviceAccountPath, 'utf-8'))
const products = JSON.parse(fs.readFileSync(seedPath, 'utf-8'))

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: STORAGE_BUCKET
})

const db = admin.firestore()
const bucket = admin.storage().bucket()

async function uploadPublic(localPath, destPath) {
  await bucket.upload(localPath, {
    destination: destPath,
    public: true,
    metadata: { cacheControl: 'public, max-age=31536000' }
  })
  return `https://storage.googleapis.com/${bucket.name}/${destPath}`
}

async function uploadPrivate(localPath, destPath) {
  await bucket.upload(localPath, { destination: destPath })
}

async function seedProduct(product) {
  const imagesDir = path.join(__dirname, 'product-images')

  const imageUrls = []
  for (const [i, relativePath] of product.images.entries()) {
    const localPath = path.join(imagesDir, relativePath)
    if (!fs.existsSync(localPath)) {
      console.warn(`  ⚠ no encontré ${relativePath}, la salteo`)
      continue
    }
    const ext = path.extname(relativePath)
    const dest = `previews/${product.id}/${i}${ext}`
    imageUrls.push(await uploadPublic(localPath, dest))
  }

  if (product.finalFile) {
    const localPath = path.join(imagesDir, product.finalFile)
    if (fs.existsSync(localPath)) {
      await uploadPrivate(localPath, `final/${product.id}.zip`)
    } else {
      console.warn(`  ⚠ no encontré el archivo final ${product.finalFile}, la salteo`)
    }
  }

  await db.collection('products').doc(product.id).set({
    name: product.name,
    price: product.price,
    category: product.category,
    tags: product.tags || [],
    specs: product.specs || [],
    description: product.description || '',
    images: imageUrls
  })

  console.log(`✔ ${product.name} — ${imageUrls.length} imagen(es)`)
}

async function main() {
  console.log(`Cargando ${products.length} producto(s)...\n`)
  for (const product of products) {
    await seedProduct(product)
  }
  console.log('\nListo. Ya deberían verse en el catálogo (npm run dev).')
  process.exit(0)
}

main().catch((err) => {
  console.error('\nAlgo falló:', err.message)
  process.exit(1)
})
