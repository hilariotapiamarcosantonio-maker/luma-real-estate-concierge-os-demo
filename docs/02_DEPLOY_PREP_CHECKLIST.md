# Lista de Comprobación para Despliegue - Luma Real Estate Concierge OS

Este documento certifica que el proyecto ha sido auditado y configurado de forma segura para subirlo a un repositorio de GitHub y desplegarlo en Vercel, permitiendo a Marcos Hilario abrir la demo interactiva en cualquier dispositivo (incluyendo smartphones).

---

## 📊 Estado Actual del Proyecto
* **Linter (`npm run lint`):** Validado y limpio (0 errores, 0 warnings).
* **Compilación (`npm run build`):** Validada y exitosa.
* **Foco:** Demo interactiva de alta fidelidad visual y de copy.
* **Seguridad:** Confirmado que es una **demo simulada**. No existen conexiones a bases de datos vivas, ni claves de API, ni credenciales en el código fuente.

---

## 🔒 Archivos y Carpetas Excluidos (.gitignore)
Se ha configurado `.gitignore` para bloquear fugas de información y archivos innecesarios de gran tamaño. Se excluyen expresamente:
* **Dependencias y compilaciones:** `/node_modules`, `/.next/`, `/out/`, `/build`
* **Configuraciones de entorno:** `.env`, `.env.local`, `.env.*.local`
* **Metadatos y logs:** `.vercel`, `*.log`, `Thumbs.db`, `.DS_Store`
* **Media pesada:** `*.mp4`, `*.mov`, `*.webm`, `/screenshots`, `/recordings`
* **Datos comerciales:** `*.csv`, `*.xlsx`, `*.xls`, `*.vcf`, `/backups`, `/exports`, `/logs`

---

## 🚀 Comandos de Git para Subir el Proyecto a GitHub

Sigue estos pasos en tu terminal local desde la raíz del proyecto para inicializar Git y subirlo a tu cuenta de GitHub de forma segura:

1. **Inicializar el repositorio local:**
   ```bash
   git init
   ```
2. **Agregar todos los archivos permitidos por el .gitignore:**
   ```bash
   git add .
   ```
3. **Realizar el primer commit local:**
   ```bash
   git commit -m "feat: init luma concierge os mvp demo"
   ```
4. **Crear un nuevo repositorio en tu cuenta de GitHub** (puedes llamarlo `luma-real-estate-concierge-os`) y configurarlo como **Público** o **Privado**.
5. **Vincular el repositorio local con GitHub** (reemplaza `TU_USUARIO` con tu nombre de usuario de GitHub):
   ```bash
   git branch -M main
   git remote add origin https://github.com/TU_USUARIO/luma-real-estate-concierge-os.git
   ```
6. **Subir el código a GitHub:**
   ```bash
   git push -u origin main
   ```

---

## ☁️ Instrucciones de Despliegue en Vercel

Una vez que el proyecto esté en GitHub, puedes desplegarlo a producción en menos de 2 minutos siguiendo estos pasos:

1. Inicia sesión en tu cuenta de **[Vercel](https://vercel.com/)**.
2. Haz clic en **"Add New"** y selecciona **"Project"**.
3. Importa el repositorio `luma-real-estate-concierge-os` desde tu cuenta de GitHub conectada.
4. En la configuración de despliegue de Vercel:
   * **Framework Preset:** Next.js (se detecta automáticamente).
   * **Root Directory:** `./`
   * **Build and Output Settings:** Dejar por defecto (`npm run build`).
   * **Environment Variables:** No es necesario configurar ninguna variable en esta fase, ya que todos los datos y flujos son simulados de forma segura en local.
5. Haz clic en **"Deploy"**.
6. ¡Listo! Vercel te entregará una URL pública (ej. `https://luma-real-estate-concierge-os.vercel.app`) para que puedas abrirla en tu laptop o celular y grabar la demo.

---

## ⚠️ Advertencia de Seguridad

> [!WARNING]
> **NO SUBAS SECRETOS NI DATOS REALES DE CLIENTES.**
> Esta versión está diseñada para ser una maqueta visual comercial segura y limpia. Si en el futuro integras APIs reales o secretos de bases de datos mediante archivos `.env.local`, asegúrate de **NO** removerlos de tu `.gitignore` ni subirlos al repositorio público de GitHub. Las claves privadas de WhatsApp API, n8n o CRM deberán configurarse únicamente como variables de entorno seguras dentro de la consola del panel de control de Vercel.
