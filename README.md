# Tienda de Plantillas — esqueleto

PWA para vender plantillas digitales de sublimado/estampado: catálogo, carrito
y checkout. Stack: React + Vite + Tailwind + Firebase (Firestore/Storage/Functions)
+ Mercado Pago.

Este es un **esqueleto funcional**: la UI corre de punta a punta con datos
mock, pero el pago y la entrega real todavía son un placeholder (ver
"Qué falta conectar" abajo).

## Setup

```bash
npm install
cp .env.example .env       # completar con las claves de tu proyecto Firebase
npm run dev
```

Abre en `http://localhost:5173`. Sin `.env` completo la app igual arranca:
`useProducts` cae automáticamente a `src/data/mockProducts.js`.

## Estructura

```
src/
  components/
    layout/    Header, Footer, shell de la página
    catalog/   ProductCard, ProductGrid
    cart/      CartDrawer, CartItem
    ui/        Button y demás componentes chicos reutilizables
  context/     CartContext (estado del carrito, persiste en sessionStorage)
  hooks/       useProducts (lee Firestore, cae a mock si está vacío)
  lib/         firebase.js (init del SDK)
  pages/       Home, ProductDetail, Cart, Checkout, ThankYou
  data/        mockProducts.js (datos de desarrollo)
functions/     Firebase Functions (Mercado Pago) — stub, ver TODOs en index.js
firestore.rules / storage.rules   Reglas de acceso
```

## Cargar productos reales

```bash
cp scripts/products.seed.example.json scripts/products.seed.json
```
Completá ese archivo con tus productos. Poné las imágenes (y el `.zip` final si ya lo tenés) en `scripts/product-images/<id-del-producto>/`, referenciadas con paths relativos desde ahí.

Necesitás una clave de servicio de Firebase (Console → ⚙️ Configuración del proyecto → Cuentas de servicio → "Generar nueva clave privada") guardada como `scripts/serviceAccountKey.json` — nunca se commitea, ya está en `.gitignore`.

Editá `STORAGE_BUCKET` al principio de `scripts/seed-products.js` con el mismo valor de `VITE_FIREBASE_STORAGE_BUCKET` de tu `.env`, y corré:

```bash
npm run seed
```

Podés correrlo de nuevo cuando quieras — hace upsert por `id`, no duplica productos. Las imágenes quedan públicas en `previews/<id>/`; el `.zip` final (si lo subís) queda privado en `final/<id>.zip`, listo para cuando conectemos la entrega por Mercado Pago.

## Qué falta conectar

| Pieza | Estado | Dónde |
|---|---|---|
| Catálogo real | Resuelto — ver sección "Cargar productos reales" arriba | `npm run seed` |
| Preview images | Resuelto — las sube el mismo script | `scripts/product-images/` |
| Crear preferencia de pago | Stub sin implementar | `functions/index.js` → `createPreference` |
| Webhook de Mercado Pago | Stub sin implementar | `functions/index.js` → `mercadopagoWebhook` |
| Envío del link de descarga | No implementado | Dentro del webhook, una vez verificado el pago |
| Icons de PWA (192/512) | Faltan los PNG reales | `public/icons/` (referenciados en `vite.config.js`) |

## Deploy

- **Frontend**: `npm run build` → Vercel (ya usás `estebans-projects-aa532663`) o `firebase deploy --only hosting`.
- **Functions + rules**: `firebase deploy --only functions,firestore:rules,storage:rules`.

## Modelo de datos sugerido (`products`)

```js
{
  name: string,
  price: number,       // en ARS, sin decimales
  category: string,
  tags: string[],
  previewImage: string, // URL pública en Storage (previews/)
  description: string,
  files: string[]       // paths en Storage (final/) — nunca públicos
}
```
