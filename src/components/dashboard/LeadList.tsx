import React from 'react';
import { Lead } from '@/data/demoLeads';
import { MessageSquare, ShieldAlert, Award, Calendar, Radio } from 'lucide-react';

interface LeadListProps {
  leads: Lead[];
  activeLeadId: string;
  onSelectLead: (leadId: string) => void;
}

export const LeadList: React.FC<LeadListProps> = ({ leads, activeLeadId, onSelectLead }) => {
  const getStatusIcon = (status: Lead['status']) => {
    switch (status) {
      case 'entrante':
        return <Radio className="w-3.5 h-3.5 text-blue-400 animate-pulse" />;
      case 'calificando':
        return <MessageSquare className="w-3.5 h-3.5 text-amber-400" />;
      case 'calificado':
        return <Award className="w-3.5 h-3.5 text-emerald-400" />;
      case 'cita_pendiente':
        return <Calendar className="w-3.5 h-3.5 text-purple-400" />;
      case 'manual':
        return <ShieldAlert className="w-3.5 h-3.5 text-red-400" />;
      case 'descalificado':
        return <ShieldAlert className="w-3.5 h-3.5 text-zinc-500" />;
    }
  };

  const getStatusText = (status: Lead['status']) => {
    switch (status) {
      case 'entrante': return 'Nuevo Prospecto';
      case 'calificando': return 'Calificando';
      case 'calificado': return 'Calificado';
      case 'cita_pendiente': return 'Cita Pendiente';
      case 'manual': return 'Intervención Manual';
      case 'descalificado': return 'No Califica';
    }
  };

  const getTemperatureClass = (temp: Lead['temperature']) => {
    switch (temp) {
      case 'hot': return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'warm': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'cold': return 'bg-zinc-800 text-zinc-500 border-zinc-700/50';
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden border border-zinc-800/60">
      <div className="p-4 border-b border-zinc-800/60 bg-zinc-950/40">
        <h3 className="text-xs font-semibold tracking-wider text-zinc-400 uppercase">
          Prospectos Demo
        </h3>
        <p className="text-lg font-serif mt-1 font-medium text-zinc-100">
          Aurora Concierge
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {leads.map((lead) => {
          const isActive = lead.id === activeLeadId;
          return (
            <button
              key={lead.id}
              onClick={() => onSelectLead(lead.id)}
              className={`w-full text-left p-3.5 rounded-xl transition-all duration-200 flex items-start gap-3 border ${
                isActive
                  ? 'bg-[#c5a880]/10 border-[#c5a880]/40 shadow-[0_0_12px_rgba(197,168,128,0.06)]'
                  : 'bg-zinc-900/30 border-transparent hover:bg-zinc-900/50 hover:border-zinc-800/40'
              }`}
            >
              {/* Avatar */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold text-xs tracking-wider shrink-0 ${
                isActive ? 'bg-[#c5a880] text-zinc-950' : 'bg-zinc-800 text-zinc-300'
              }`}>
                {lead.avatar}
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between gap-1.5 mb-1">
                  <h4 className="font-medium text-zinc-100 text-sm truncate">
                    {lead.name}
                  </h4>
                  <span className="text-[10px] text-zinc-500 shrink-0">
                    {lead.lastMessageTime}
                  </span>
                </div>

                <p className="text-xs text-zinc-400 truncate mb-2.5">
                  {lead.lastMessage}
                </p>

                <div className="flex items-center gap-1.5 flex-wrap">
                  {/* Status badge */}
                  <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-medium bg-zinc-900 border border-zinc-800/80 text-zinc-300`}>
                    {getStatusIcon(lead.status)}
                    <span className="ml-0.5">{getStatusText(lead.status)}</span>
                  </span>

                  {/* Temperature badge */}
                  <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-medium border ${getTemperatureClass(lead.temperature)}`}>
                    {lead.temperature === 'hot' ? 'High-Ticket' : lead.temperature === 'warm' ? 'Interesado' : 'Filtro'}
                  </span>
                </div>
              </div>
            </button>
          );
        })}
      </div>
      
      <div className="p-3 border-t border-zinc-800/40 bg-zinc-950/20 text-center">
        <span className="text-[10px] text-zinc-500">
          Demo · Aurora Concierge Inmobiliario
        </span>
      </div>
    </div>
  );
};
