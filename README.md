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

## Qué falta conectar

| Pieza | Estado | Dónde |
|---|---|---|
| Catálogo real | Falta cargar productos en Firestore (colección `products`) | Firebase Console o un script de seed |
| Preview images | Falta subir los archivos y usar sus URLs | Firebase Storage, carpeta `previews/` |
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
