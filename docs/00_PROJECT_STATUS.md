# Luma Real Estate Concierge OS - Estado del Proyecto

* **Nombre del Proyecto:** Luma Real Estate Concierge OS
* **Ruta Local:** `F:\Luma Real Estate Concierge OS`
* **Objetivo del MVP:** Crear una interfaz interactiva de alto impacto visual y copywriting premium, orientada a la venta/demostración comercial del sistema de calificación inicial de leads inmobiliarios de Luma Premium. La demo debe poder grabarse en un video fluido de 60-90 segundos para preventas de RD$75,000+.
* **Estado Actual:** Fase 1 - Inicialización del Proyecto

---

## 🔒 Reglas de Seguridad y Limitaciones del Sandbox
1. **Sin Git Push:** No realizar acciones de git push a repositorios remotos.
2. **Sin Despliegues Automáticos:** No realizar deploys a producción o hosting externo.
3. **Sin Conexiones Reales:** No conectar APIs reales de WhatsApp, n8n, Google Sheets o CRM privado.
4. **Sin Datos Sensibles:** No utilizar nombres reales de clientes ni marcas de terceros (como AlterEstate). Nombres neutros y ficticios unicamente.
5. **No Sobrecomplicar:** Arquitectura simple y modular basada en el estado del cliente en Next.js.

---

## ⚙️ Simulación y Datos Locales
* **Chat Simulator:** El flujo de conversación funciona en base a un árbol de decisiones con botones preestablecidos. Esto elimina la necesidad de LLMs o procesamiento de lenguaje en la demo, garantizando que el video de 60-90 segundos sea 100% predecible y fluido.
* **Ficha de Lead:** Se actualiza dinámicamente en memoria React a medida que el usuario simula las respuestas del lead.
* **Acciones Comerciales:** Botones como "Tomar control manual" y "Agendar cita" modifican los estados visuales del lead en el pipeline y muestran alertas simuladas de éxito.

---

## 🚀 Cómo Correr el Proyecto Localmente
1. Clonar o acceder a la carpeta del proyecto en `F:\Luma Real Estate Concierge OS`.
2. Instalar dependencias:
   ```bash
   npm install
   ```
3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```
4. Abrir en el navegador: [http://localhost:3000](http://localhost:3000).

---

## ⏭️ Próxima Fase Recomendada (Post-MVP)
* Integración de Webhooks con n8n para recibir leads reales de Meta Ads.
* Sincronización en tiempo real con Google Sheets o CRM mediante REST API.
* Conexión con Meta/Twilio API para envío de mensajes interactivos reales.
