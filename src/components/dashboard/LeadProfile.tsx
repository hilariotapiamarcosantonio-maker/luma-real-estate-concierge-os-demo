import React from 'react';
import { Lead } from '@/data/demoLeads';
import { ShieldCheck, MessageSquareWarning, Calendar, User, DollarSign, MapPin, Award, CheckCircle2, ChevronRight } from 'lucide-react';

interface LeadProfileProps {
  lead: Lead;
  onTakeControl: () => void;
  onScheduleAppointment: () => void;
}

export const LeadProfile: React.FC<LeadProfileProps> = ({
  lead,
  onTakeControl,
  onScheduleAppointment,
}) => {
  const { qualification, status } = lead;

  // Calcular porcentaje de completado de la calificación
  const fields = ['intent', 'type', 'zone', 'budget', 'paymentMethod', 'appointmentInterest'];
  const completedFields = fields.filter((f) => !!qualification[f as keyof typeof qualification]);
  const progressPercent = Math.round((completedFields.length / fields.length) * 100);

  // Calcular Score simulado dinámico
  const calculateScore = () => {
    if (lead.id === 'lead-3') return 15; // Prospecto C frío — fuera de perfil
    let base = 0; // score 0 hasta que empiece a calificar
    if (completedFields.length === 0) return 0; // Lead entrante sin datos
    base = 20; // base si ya inició calificación
    if (qualification.intent === 'Invertir') base += 20;
    if (qualification.type === 'Proyecto en Plano') base += 15;
    if (qualification.zone === 'Santo Domingo Este') base += 15;
    if (qualification.budget === 'US$250k+') base += 20;
    if (qualification.appointmentInterest === 'Sí, agendar') base += 10;
    return Math.min(base, 100);
  };

  const score = qualification.score || calculateScore();

  // Generar resumen ejecutivo dinámico basado en las respuestas acumuladas
  const generateDynamicSummary = () => {
    if (lead.id === 'lead-3') {
      return qualification.summary || "No califica para portafolio de venta. Interés de alquiler fuera del rango de precios mínimo.";
    }

    if (completedFields.length === 0) {
      return "Esperando interacción inicial de calificación con el prospecto.";
    }

    const summaryParts = [];
    if (qualification.intent) summaryParts.push(qualification.intent === 'Invertir' ? 'Inversionista' : 'Comprador final');
    if (qualification.type) summaryParts.push(qualification.type === 'Proyecto en Plano' ? 'interesado en planos' : 'buscando entrega inmediata');
    if (qualification.zone) summaryParts.push(`en la zona de ${qualification.zone}`);
    if (qualification.budget) summaryParts.push(`con un presupuesto de ${qualification.budget}`);
    if (qualification.paymentMethod) summaryParts.push(`bajo modalidad de ${qualification.paymentMethod}`);

    let text = `El prospecto se perfila como ${summaryParts.join(', ')}.`;

    if (qualification.appointmentInterest === 'Sí, agendar') {
      text += " Ha solicitado agendar una videollamada de 10 minutos para ver opciones.";
    }

    return text;
  };

  const getScoreColorClass = (val: number) => {
    if (val >= 75) return 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5';
    if (val >= 40) return 'text-amber-400 border-amber-500/20 bg-amber-500/5';
    return 'text-red-400 border-red-500/20 bg-red-500/5';
  };

  return (
    <div className="flex flex-col h-full gap-4 overflow-y-auto pr-1">
      {/* Panel Ficha Resumen */}
      <div className="glass-panel rounded-2xl p-4 border border-zinc-800/60 flex flex-col gap-4">
        <div className="border-b border-zinc-800/40 pb-3 flex items-center justify-between">
          <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
            Ficha del Prospecto
          </h3>
          <span className="text-[10px] text-zinc-500">ID: {lead.id}</span>
        </div>

        {/* Info Lead */}
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-serif text-lg font-bold text-gold shrink-0">
            {lead.avatar}
          </div>
          <div>
            <h4 className="font-semibold text-zinc-100 text-base">{lead.name}</h4>
            <p className="text-xs text-zinc-400">{lead.phone}</p>
          </div>
        </div>

        {/* Score & Progreso */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-xl border flex flex-col items-center justify-center text-center ${getScoreColorClass(score)}`}>
            <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Score Comercial
            </span>
            <span className="text-2xl font-serif font-bold">{score} pts</span>
          </div>

          <div className="p-3 rounded-xl border border-zinc-800/80 bg-zinc-900/20 flex flex-col items-center justify-center text-center">
            <span className="text-[9px] font-semibold uppercase tracking-wider text-zinc-500 mb-0.5">
              Calificación
            </span>
            <span className="text-2xl font-serif font-bold text-zinc-300">{progressPercent}%</span>
          </div>
        </div>

        {/* Barra de progreso visual */}
        <div className="space-y-1.5">
          <div className="flex justify-between items-center text-[10px]">
            <span className="text-zinc-500 font-medium">Progreso Aurora Concierge</span>
            <span className="text-gold font-medium">{completedFields.length} de {fields.length} campos</span>
          </div>
          <div className="w-full h-1.5 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800/40">
            <div
              className="h-full bg-gradient-to-r from-gold/50 to-gold rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
        </div>

        {/* Campos de Calificación */}
        <div className="space-y-2.5">
          <h5 className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
            Campos Perfilados
          </h5>
          
          <div className="grid grid-cols-1 gap-2 text-xs">
            {/* Intención */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-900/60">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-zinc-600" /> Intención
              </span>
              <span className={`font-medium ${qualification.intent ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
                {qualification.intent || 'Pendiente'}
              </span>
            </div>

            {/* Tipo */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-900/60">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <Award className="w-3.5 h-3.5 text-zinc-600" /> Entrega
              </span>
              <span className={`font-medium ${qualification.type ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
                {qualification.type || 'Pendiente'}
              </span>
            </div>

            {/* Zona */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-900/60">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-zinc-600" /> Zona
              </span>
              <span className={`font-medium ${qualification.zone ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
                {qualification.zone || 'Pendiente'}
              </span>
            </div>

            {/* Presupuesto */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-900/60">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <DollarSign className="w-3.5 h-3.5 text-zinc-600" /> Presupuesto
              </span>
              <span className={`font-medium ${qualification.budget ? 'text-[#c5a880]' : 'text-zinc-600 italic'}`}>
                {qualification.budget || 'Pendiente'}
              </span>
            </div>

            {/* Forma de Pago */}
            <div className="flex items-center justify-between p-2 rounded-lg bg-zinc-900/30 border border-zinc-900/60">
              <span className="text-zinc-500 flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-zinc-600" /> Forma Pago
              </span>
              <span className={`font-medium ${qualification.paymentMethod ? 'text-zinc-200' : 'text-zinc-600 italic'}`}>
                {qualification.paymentMethod || 'Pendiente'}
              </span>
            </div>
          </div>
        </div>

        {/* Resumen Ejecutivo */}
        <div className="p-3.5 rounded-xl border border-zinc-800/80 bg-zinc-900/40 space-y-1.5">
          <span className="text-[10px] font-semibold tracking-wider text-[#c5a880] uppercase flex items-center gap-1">
            <CheckCircle2 className="w-3 h-3 text-gold" />
            Resumen Ejecutivo para Laura Méndez
          </span>
          <p className="text-xs text-zinc-300 leading-relaxed font-sans">
            {generateDynamicSummary()}
          </p>
        </div>
      </div>

      {/* Panel Próximos Pasos & CTAs */}
      <div className="glass-panel rounded-2xl p-4 border border-zinc-800/60 flex flex-col gap-3.5">
        <h4 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase border-b border-zinc-800/40 pb-2">
          Acción Comercial
        </h4>

        {/* Botones */}
        <div className="flex flex-col gap-2">
          {/* Tomar control manual */}
          <button
            onClick={onTakeControl}
            disabled={status === 'manual'}
            className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all duration-200 ${
              status === 'manual'
                ? 'bg-zinc-900/50 border-zinc-800/40 text-zinc-500 cursor-not-allowed'
                : 'bg-zinc-900 border-zinc-800 hover:border-red-900/40 text-zinc-200 hover:text-red-400 hover:bg-red-950/10'
            }`}
          >
            <MessageSquareWarning className="w-4 h-4" />
            Tomar Control Manual
          </button>

          {/* Agendar Cita */}
          <button
            onClick={onScheduleAppointment}
            disabled={status === 'cita_pendiente' || lead.id === 'lead-3'}
            className={`w-full py-3 px-4 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 border transition-all duration-200 ${
              status === 'cita_pendiente'
                ? 'bg-emerald-950/20 border-emerald-900/40 text-emerald-400 cursor-default'
                : lead.id === 'lead-3'
                ? 'bg-zinc-900/20 border-zinc-900/40 text-zinc-600 cursor-not-allowed'
                : 'bg-[#c5a880] border-[#c5a880] text-zinc-950 hover:bg-[#b3946c] shadow-[0_4px_12px_rgba(197,168,128,0.15)] hover:shadow-none'
            }`}
          >
            <Calendar className="w-4 h-4" />
            {status === 'cita_pendiente' ? 'Cita Agendada' : 'Agendar Cita en Calendario'}
          </button>
        </div>

        {/* Próximos Pasos Recomendados */}
        <div className="mt-1 space-y-2">
          <span className="text-[10px] font-semibold tracking-wider text-zinc-500 uppercase">
            Próximos Pasos Sugeridos
          </span>
          
          <div className="space-y-1.5 text-xs text-zinc-400">
            {lead.id === 'lead-3' ? (
              <div className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-zinc-600 shrink-0 mt-0.5" />
                <span>Ninguno. Aurora Concierge ya filtró el prospecto y le envió información general.</span>
              </div>
            ) : status === 'entrante' ? (
              <div className="flex items-start gap-2 animate-pulse">
                <ChevronRight className="w-3.5 h-3.5 text-gold shrink-0 mt-0.5" />
                <span>Esperar que Aurora Concierge realice el primer contacto y la calificación inicial.</span>
              </div>
            ) : status === 'calificando' ? (
              <div className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <span>Monitorear respuestas del prospecto. No intervenir salvo que haga una pregunta libre.</span>
              </div>
            ) : status === 'cita_pendiente' ? (
              <div className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                <span>Laura Méndez llama al prospecto en la fecha agendada. Revisar resumen ejecutivo antes.</span>
              </div>
            ) : (
              <div className="flex items-start gap-2">
                <ChevronRight className="w-3.5 h-3.5 text-[#c5a880] shrink-0 mt-0.5" />
                <span>Momento ideal para que Laura Méndez intervenga personalmente y presente Residencial Aurora.</span>
              </div>
            )}
          </div>
        </div>

        {/* CRM Integration Note */}
        <div className="mt-2 p-3 rounded-xl bg-zinc-900/30 border border-zinc-900/60">
          <p className="text-[9px] text-zinc-500 leading-relaxed text-center">
            Este lead puede enviarse luego a un CRM inmobiliario para seguimiento comercial.<br />
            <span className="text-zinc-600">Demo preparada para integrarse con CRM, Google Sheets, WhatsApp Business API o sistema privado.</span>
          </p>
        </div>
      </div>
    </div>
  );
};
