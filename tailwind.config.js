/** @type {import('tailwindcss').Config} */
// Paleta de marca "atmstore": blanco + rojo, con gris medio para detalles.
// Se mantienen los nombres de token originales (ink/paper/lime/acid/violet)
// para no tener que tocar clases en cada componente — lo que cambió es
// el significado: antes eran para tema oscuro, ahora para tema claro.
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#ffffff',      // fondo principal (antes: fondo oscuro)
        paper: '#1a1a1a',    // texto principal (antes: texto claro)
        surface: '#f7f7f7',  // fondo de tarjetas / imágenes
        surface2: '#efefef', // hover / paneles (carrito)
        line: '#e5e5e5',     // bordes
        lime: '#d0141e',     // rojo de marca — acento primario (antes: lima)
        acid: '#a10f17',     // rojo oscuro — hover del acento (antes: lima claro)
        violet: '#8a8a8a'    // gris medio — detalles secundarios (antes: violeta)
      },
      fontFamily: {
        display: ['Syne', 'sans-serif'],
        mono: ['DM Mono', 'monospace']
      }
    }
  },
  plugins: []
}
