# Estudio Zou — portfolio

Sitio de 5 páginas de Camila Zoulalian, diseño y desarrollo web.

## Páginas

| Archivo | Qué tiene |
| --- | --- |
| `index.html` (Inicio) | Hero con galería de proyectos, puertas a cada página, proyecto destacado (Kodland) y cierre "Estudio Zou" |
| `sobre-mi.html` | Quién soy (polaroids) y Cómo trabajo (óvalo) |
| `proyectos.html` | Proyectos con video y testimonios de clientes |
| `servicios.html` | Servicios y preguntas frecuentes |
| `contacto.html` | Medios de contacto: Instagram y mail |

Todas comparten la misma navbar y el footer. El contacto tiene su propia página; en la navbar aparece como botón. Cada página termina con un enlace a la siguiente.

La guía de entrega para clientes es un proyecto aparte (`estudio-zou-entrega`).

El inicio tiene que llamarse `index.html`: es el archivo que abre el hosting cuando alguien entra a la dirección de la web.

## Estilos

Los estilos se escriben en `scss/` y se compilan a un solo `css/styles.css`, que trae únicamente las clases que usan las páginas.

```
scss/
  main.scss        punto de entrada
  abstracts/       variables, funciones y mixins (no generan CSS)
  base/            variables CSS, reset, tipografía y animaciones
  components/      piezas que se repiten: etiqueta, ventana, botón, link, encabezado de página, siguiente página
  layout/          navbar, secciones y footer
  pages/           una carpeta por página
    inicio/        hero y galería, puertas, destacado, cierre
    sobre-mi/      about, cómo trabajo
    proyectos/     proyectos, clientes
    servicios/     servicios, FAQs
    contacto/      contacto
  utilities/       accesibilidad (menos movimiento)
```

Para compilar:

```
npm install
npm run build:css     # una vez
npm run watch:css     # mientras editás
```

## Publicar

Netlify publica la carpeta tal cual (no hace falta comando de build, porque `css/styles.css` ya está compilado). Las carpetas `scss/` y `node_modules/` no hacen falta en el sitio publicado, pero `scss/` conviene dejarla en el repositorio.
