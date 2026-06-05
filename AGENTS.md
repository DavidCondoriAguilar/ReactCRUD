# Antigravity 2.0 - Guía de Instalación

## Descargar
Visita [antigravity.google/download](https://antigravity.google/download) para descargar Google Antigravity 2.0.

### Requisitos del Sistema
- **macOS**: Versiones con soporte de actualizaciones de seguridad de Apple (actual y dos anteriores). Min Version 12 (Monterey). X86 no soportado.
- **Windows**: Windows 10 (64 bit)
- **Linux**: glibc >= 2.28, glibcxx >= 3.4.25 (ej. Ubuntu 20, Debian 10, Fedora 36, RHEL 8)

## Instalación
Puede aparecer una notificación preguntando si deseas "Keep Both" o "Replace" Antigravity, selecciona "Replace". Se te pedirá reinstalar el IDE durante la instalación. Si no lo instalas ahora y deseas descargarlo después, puedes hacerlo desde el enlace de descarga.

## Crear un Proyecto
Los agentes trabajan dentro de Proyectos, que definen los límites de las carpetas y repositorios a los que pueden acceder.

1. Haz clic en el ícono de carpeta con "+" en la barra lateral izquierda.
2. Haz clic en "New Project".
3. Haz clic en "Add Folder" para asociar una o más carpetas locales o repositorios Git.
4. Haz clic en "Create".
5. (Opcional) Configura los ajustes del Proyecto.

## Iniciar un Agente
1. Escribe tu objetivo o instrucción en el chat y presiona Enter.
2. Elige un modo:
   - **Local Mode**: El agente opera directamente en tus carpetas activas.
   - **New Worktree Mode**: El agente opera en un Git worktree aislado.

## Atajos de Teclado
| Acción | macOS | Windows / Linux |
|--------|-------|-----------------|
| Abrir selector de conversación | ⌘K | Ctrl + K |
| Abrir búsqueda de archivos | ⌘P | Ctrl + P |
| Enfocar input | ⌘L | Ctrl + L |
| Nueva conversación | ⌘N | Ctrl + N |
| Siguiente/Anterior conversación | ⌥↑/↓ | Alt + ↑/↓ |

## Slash Commands
- `/goal`: Ejecuta hasta completar la tarea sin pedir input intermedio.
- `/grill-me`: Pregunta detalles específicos antes de implementar.
- `/schedule`: Programa una instrucción como temporizador único o recurrente.
- `/browser`: Usa el navegador para tareas que lo requieran (requiere Google Chrome y permisos).
