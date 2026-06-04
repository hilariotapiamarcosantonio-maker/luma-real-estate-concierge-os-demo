# Aurora Concierge Inmobiliario — Demo Oficial Luma Premium

> Esta es una demo comercial de Luma Premium con datos ficticios.
> No representa un cliente real ni procesa datos reales.

---

## Descripción

**Aurora Concierge Inmobiliario** es una demo oficial del ecosistema Luma Premium que ilustra cómo una inmobiliaria puede implementar un sistema de concierge conversacional para:

- Responder preguntas frecuentes sobre proyectos
- Filtrar y calificar prospectos automáticamente
- Explicar compra en plano vs propiedad lista
- Enviar recursos del proyecto (ubicación, galería, brochure)
- Identificar presupuesto, interés y urgencia
- Preparar resumen ejecutivo para el asesor
- Empujar hacia cita, llamada o reunión
- Conectar luego con CRM o seguimiento

---

## Proyecto Demo

| Campo | Valor |
|-------|-------|
| **Proyecto ficticio** | Residencial Aurora |
| **Ubicación demo** | Santo Domingo Este, República Dominicana |
| **Asesora demo** | Laura Méndez |
| **Email demo** | ventas@demo-lumapremium.com |
| **Teléfono demo** | +1 (809) 000-0000 |

---

## Tecnología

- **Framework:** Next.js 16+ (App Router)
- **Lenguaje:** TypeScript strict
- **Estilos:** Tailwind CSS v4
- **Animaciones:** Framer Motion
- **Estado:** React useState (100% local, sin backend)

---

## Rutas

| Ruta | Descripción |
|------|-------------|
| `/` | Landing page con propuesta de valor |
| `/dashboard` | Panel de simulación interactiva con 3 prospectos demo |

---

## Flujo Conversacional

1. Saludo inicial de Aurora Concierge
2. Identificación de interés (vivir / invertir)
3. Tipo de proyecto (plano / listo)
4. Zona de preferencia
5. Rango de presupuesto
6. Forma de pago preferida
7. Envío simulado de recursos (ubicación, renders, brochure PDF)
8. Resumen de calificación para asesora
9. CTA: agendar llamada o recibir catálogo

---

## Datos de Demo

Todos los datos son **completamente ficticios**:
- Los prospectos son "Prospecto A", "Prospecto B", "Prospecto C"
- Los teléfonos usan el prefijo 555 (reservado para ficción)
- No se procesan datos reales
- No hay conexión a WhatsApp real
- No hay Google Sheets real
- No hay APIs externas activas

---

## Mock de Endpoints

Si se agrega un formulario o endpoint en el futuro, debe retornar:

```json
{ "success": true, "demo": true, "message": "Lead calificado simulado correctamente." }
```

---

## Integración CRM (Pendiente)

Esta demo está preparada conceptualmente para integrarse con:
- CRM inmobiliario (pendiente según alcance del cliente)
- Google Sheets (modo demo — no conectado)
- WhatsApp Business API (no activo en esta demo)
- Sistema privado del cliente

---

## Instalación local

```bash
npm install
npm run dev
```

Abrir en: `http://localhost:3000`

---

## Estado del proyecto

| Estado | Valor |
|--------|-------|
| Demo local | ✅ Lista para revisión |
| Git init | ❌ Pendiente aprobación de Marcos |
| Deploy Vercel | ❌ Pendiente aprobación de Marcos |
| URL esperada | `https://luma-real-estate-concierge-os-demo.vercel.app/` |

---

## Aviso Legal

Esta demo fue creada por el equipo de **Luma Premium** para fines comerciales de presentación.
No contiene datos reales de clientes. No representa ninguna empresa, proyecto o persona real.
