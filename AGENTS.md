# Daniel GRD · Prototipo web de LocalFlow

Esta carpeta contiene el código fuente exportado de la versión cyborg, ya desplegada en privado. Daniel GRD es tatuador y artista urbano de Medellín. El sitio reúne cinco secciones en una sola página: portada (`#inicio`), quién es Daniel (`#daniel`), portafolio de tatuajes (`#tatuajes`), Pangola (`#pangola`) y catálogo de Piraña (`#pirana`).

## Dirección visual

- **Daniel GRD** usa negro, marfil y rojo, con una portada cyborg.
- **Pangola** es el estudio y mirador del Popular 2, en Medellín. Usa tonos cálidos, una cuadrícula ámbar y marcos angulares.
- **Piraña** es la marca de ropa urbana. Usa negro, amarillo y rojo, con franjas industriales.

Conserva la identidad de cada universo y la coherencia entre los tres al recorrer la página.

## Estructura y ejecución local

Es un sitio estático de HTML, CSS y JavaScript sin framework. Abre `index.html` directamente en un navegador moderno. No requiere instalación ni compilación.

- `index.html` contiene las cinco secciones, la navegación, el catálogo, los diálogos y la metaetiqueta de robots.
- `styles.css` define las paletas, las fuentes, las transiciones y el diseño adaptable.
- `app.js` gestiona el menú móvil, la sección activa al desplazarse, los cambios de universo, el portafolio, el selector de Pangola y el pedido de Piraña.
- `assets/` contiene las imágenes WebP, el icono `icon.png`, las fuentes locales `open-sans*.woff` y su licencia `open-sans-license.txt`. La portada carga `assets/hero-cyborg.webp` desde CSS. El selector de Pangola alterna `assets/pangola-view.webp` y `assets/pangola-terrace.webp` desde JavaScript.
- `robots.txt` indica a los rastreadores que no recorran el sitio.

## Comportamientos y contenido de muestra

- Conserva el menú móvil, la navegación por anclas, el indicador de sección activa y los cambios de color de la cabecera al pasar de un universo a otro.
- Conserva los filtros y el contador del portafolio. La foto ampliada permite recorrer las piezas del filtro activo con los botones o las flechas del teclado.
- En Pangola, conserva el selector «El mirador» y «La terraza» y actualiza juntos la foto, el texto alternativo y el pie.
- Mantén identificadas la portada cyborg y las vistas de Pangola como imágenes ilustrativas, el tatuaje de lettering como muestra y las prendas de Piraña como ejemplos.
- El pedido de muestra de Piraña permite elegir la talla, prepara un mensaje con la prenda y la talla y abre el selector de chats de WhatsApp mediante `wa.me` sin destinatario. Conecta un número directo solo cuando el usuario confirme el número oficial.

## Alcance y privacidad

Trabaja sobre los archivos locales. Despliega solo si el usuario lo solicita y pide su aprobación antes de ampliar la visibilidad del sitio. Si un cambio afecta la interfaz, comprueba la navegación y el diseño en escritorio y móvil.
