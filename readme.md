## Front End

Portfolio desarrollado con Angular y custom Bootstrap.

Este es el frontend Single Page Aplication para el portfolio personal hecho con <b>Angular</b>.


## Sitio <b>SPA</b>

* <a href="https://sebastiansala-portfolio.web.app" target="_blank">Link al sitio live: sebastiansala-portfolio.web.app</a>


## Tecnologías usadas:

* Angular 15.2.0
* Typescript
* Bootstrap 5.2
* Scss para customizar bootstrap
* UpTimeRobot para monitorear el estado del backend y tenerlo siempre corriendo por más que sea en un servicio gratuito que apaga la app cuando no se usa. https://uptimerobot.com/


## Desiciones de diseño:

* Se aplicó los principios de Programación Orientada a Objetos, división en componentes y comunicación a través de servicios y directivas para comunicación entre componentes y división en capas. Tratando siempre de respetar los principios SOLID.
* Para el versionado se siguió la canvención  <a href="https://semver.org/" target="_blank">Semantic versioning</a>
* La decición de usar distintos métodos para cosas similares (ej: @Input/@Output para comunicación entre componentes en algunas entidades y Servicios y eventos para otras) es porque este es un proyecto de práctica y quise explorar distintas formas para cumplir los objetivos y para generar criterio y en el futuro poder decidir con experiencia cual es la más apropiada, aunque le quite consistencia al proyecto actual.
* Principios SOLID
* Flujo de trabajo GIT Flow.
* Versionado Semantic Versioning 2.0.0


## Estado Actual:

* Frontend dinámico responsivo
* Login y creación, edición y eliminado en modales
* Subir imágenes directamente del disco local del usuario al servidor de firebase para usarlas como perfil, logo, banner, etc, en vez de usr URLs de imágenes de internet.
* Customizado bootstrap a través de SCSS para una paleta de colores personoalizada, que se indetifica con las tendencias modernas.
* Se aplicaron principios de UX para una mejor experiencia de usuario
* Se permite crear nuevos usuarios y logearse para editar sus datos propios
* Accesibilidad para usuarios con visión reducida (opción para aumentar el tamaño de todo el texto proporcionalmente)


## Actualmente implementando:

* Status de "cargando" para indicar al usuario que su acción se llevo a cabo y se está esperando la respuesta del servidor, Actualmente, implementado en la carga principal del usuario, falta para el resto de los accesos a la base de datos.


## Desarrollador

* Sebastián Sala - *Diseño e implementación del Sistema*


## Web del proyecto

* https://sebastiansala-portfolio.web.app