import Link from 'next/link';
import { Sparkles, MessageSquare, Target, Zap, ChevronRight, Building2 } from 'lucide-react';

export const metadata = {
  title: 'Aurora Concierge Inmobiliario | Demo Oficial Luma Premium',
  description: 'Concierge inmobiliario demo para responder preguntas frecuentes, filtrar prospectos y preparar al asesor con información clara antes de la llamada o cita.',
};

export default function LandingPage() {
  return (
    <div className="flex-1 flex flex-col min-h-screen bg-zinc-950 text-zinc-100 font-sans selection:bg-[#c5a880]/30 selection:text-white">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(197,168,128,0.07),transparent_50%)] pointer-events-none" />
      <div className="absolute top-1/4 left-1/10 w-96 h-96 bg-[radial-gradient(circle_at_center,rgba(197,168,128,0.03),transparent_60%)] pointer-events-none filter blur-3xl" />

      {/* Demo Banner */}
      <div className="bg-[#c5a880]/10 border-b border-[#c5a880]/20 py-2 px-4 text-center">
        <p className="text-[10px] text-[#c5a880] font-semibold uppercase tracking-widest">
          Demo Oficial · Luma Premium · Datos ficticios · No representa un cliente real
        </p>
      </div>

      {/* Header */}
      <header className="h-20 shrink-0 flex items-center justify-between px-6 md:px-12 border-b border-zinc-900/60 bg-zinc-950/40 backdrop-blur-md z-10">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-xl bg-[#c5a880]/10 border border-[#c5a880]/20 flex items-center justify-center">
            <Building2 className="w-4 h-4 text-[#c5a880]" />
          </div>
          <div className="flex flex-col">
            <span className="font-serif text-sm font-semibold tracking-wide text-zinc-100 leading-none">
              Aurora Concierge Inmobiliario
            </span>
            <span className="text-[9px] font-semibold tracking-widest text-zinc-500 uppercase mt-0.5">
              Demo Oficial · Luma Premium
            </span>
          </div>
        </div>

        <div>
          <Link
            href="/dashboard"
            className="inline-flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-semibold bg-[#c5a880] text-zinc-950 hover:bg-[#b3946c] transition-all duration-300 shadow-[0_4px_15px_rgba(197,168,128,0.15)] hover:shadow-none"
          >
            Probar Demo Interactiva
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
      </header>

      {/* Hero Section */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 md:px-12 py-16 max-w-5xl mx-auto text-center z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-zinc-900/80 border border-zinc-800 text-[10px] uppercase tracking-widest text-[#c5a880] mb-6">
          <Sparkles className="w-3.5 h-3.5" />
          Ecosistema Luma Premium
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl font-serif font-light leading-[1.1] mb-6 text-zinc-100 max-w-4xl">
          Concierge inmobiliario para calificar <br className="hidden sm:inline" />
          <span className="italic font-medium gold-gradient-text">prospectos y preparar al asesor</span>
        </h1>

        <p className="text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed mb-4">
          Concierge inmobiliario demo para responder preguntas frecuentes, filtrar prospectos y preparar al asesor con información clara antes de la llamada o cita.
        </p>

        <p className="text-xs text-zinc-500 max-w-xl leading-relaxed mb-10">
          Demo oficial de Luma Premium con conversación simulada, recursos del proyecto y resumen comercial para asesores.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-20">
          <Link
            href="/dashboard"
            className="px-8 py-3.5 rounded-xl text-xs font-semibold bg-[#c5a880] text-zinc-950 hover:bg-[#b3946c] transition-all duration-300 shadow-[0_4px_20px_rgba(197,168,128,0.2)] hover:shadow-none flex items-center justify-center gap-2"
          >
            Iniciar Simulación de Demo
            <ChevronRight className="w-4 h-4" />
          </Link>
          <a
            href="#value-proposition"
            className="px-8 py-3.5 rounded-xl text-xs font-semibold bg-zinc-900 border border-zinc-800 hover:border-zinc-700/60 text-zinc-300 hover:text-white transition-all duration-300 flex items-center justify-center"
          >
            Ver Propuesta de Valor
          </a>
        </div>

        {/* Feature Grid */}
        <section id="value-proposition" className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left w-full border-t border-zinc-900 pt-16 mb-16">
          <div className="glass-panel p-6 rounded-2xl border border-zinc-900/60 hover:border-zinc-800/80 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c5a880] mb-4">
              <MessageSquare className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-zinc-100 mb-2">
              Conversación Exclusiva
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Un asistente digital con tono de concierge que saluda y perfila al prospecto respetando el estatus de su marca inmobiliaria, evitando respuestas automáticas robóticas.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-900/60 hover:border-zinc-800/80 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c5a880] mb-4">
              <Target className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-zinc-100 mb-2">
              Calificación Estructurada
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Filtra intención (vivir vs. invertir), entrega (planos vs. listo), zona, presupuesto y forma de pago. Genera un resumen ejecutivo inmediato para la asesora.
            </p>
          </div>

          <div className="glass-panel p-6 rounded-2xl border border-zinc-900/60 hover:border-zinc-800/80 transition-all duration-300">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-[#c5a880] mb-4">
              <Zap className="w-5 h-5" />
            </div>
            <h3 className="font-serif text-lg font-medium text-zinc-100 mb-2">
              Control Manual Oportuno
            </h3>
            <p className="text-xs text-zinc-400 leading-relaxed">
              Alerta en tiempo real a la asesora de ventas para intervenir manualmente en la conversación en el momento idóneo y cerrar la cita bancaria/comercial.
            </p>
          </div>
        </section>

        {/* Proyecto Demo Info */}
        <section className="w-full glass-panel rounded-3xl p-8 border border-zinc-900/60 text-left max-w-4xl mx-auto mb-10">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6 border-b border-zinc-900 pb-5">
            <div>
              <h3 className="font-serif text-2xl font-light text-zinc-100">
                Proyecto Demo: Residencial Aurora
              </h3>
              <p className="text-xs text-zinc-500 mt-1">
                Santo Domingo Este, República Dominicana · Datos ficticios de demostración
              </p>
            </div>
            <span className="px-3 py-1 rounded-md bg-[#c5a880]/10 border border-[#c5a880]/20 text-[10px] font-semibold text-[#c5a880] uppercase tracking-wider">
              Demo Oficial
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-2">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Asesora Demo</span>
              <h4 className="text-base font-semibold text-zinc-200">Laura Méndez</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                ventas@demo-lumapremium.com<br />
                +1 (809) 000-0000
              </p>
            </div>

            <div className="space-y-2 border-l border-zinc-900 md:pl-6">
              <span className="text-[10px] font-semibold text-[#c5a880] uppercase tracking-wider">Flujo de Demo</span>
              <h4 className="text-base font-semibold text-[#c5a880]">7 nodos conversacionales</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Saludo → Interés → Tipo → Zona → Presupuesto → Recursos → Resumen
              </p>
            </div>

            <div className="space-y-2 border-l border-zinc-900 md:pl-6">
              <span className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider">Integración CRM</span>
              <h4 className="text-base font-semibold text-zinc-200">Preparado para conectar</h4>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Este lead puede enviarse luego a un CRM inmobiliario para seguimiento comercial.
              </p>
            </div>
          </div>
        </section>

        {/* CRM Integration Message */}
        <div className="w-full max-w-4xl mx-auto p-4 rounded-2xl bg-zinc-900/40 border border-zinc-800/60 text-center">
          <p className="text-xs text-zinc-400 leading-relaxed">
            Demo preparada para integrarse con CRM, Google Sheets, WhatsApp Business API o sistema privado según alcance del cliente.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="h-16 shrink-0 border-t border-zinc-900/60 bg-zinc-950 flex items-center justify-between px-6 md:px-12 text-xs text-zinc-500 z-10">
        <p>© 2026 Luma Premium. Todos los derechos reservados.</p>
        <p className="font-serif italic text-gold">Aurora Concierge Inmobiliario · Demo Oficial</p>
      </footer>
    </div>
  );
}
