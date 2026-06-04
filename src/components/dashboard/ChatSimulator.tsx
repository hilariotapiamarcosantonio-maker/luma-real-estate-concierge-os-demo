import React, { useEffect, useRef } from 'react';
import { ChatMessage, ConversationNode } from '@/data/conversationFlows';
import { LeadQualification } from '@/data/demoLeads';
import { Smartphone, Check, ShieldAlert, Sparkles, MapPin, Image as ImageIcon, FileText, Download, UserCheck } from 'lucide-react';

interface ChatSimulatorProps {
  messages: ChatMessage[];
  currentNode: ConversationNode | null;
  isTyping: boolean;
  leadName: string;
  leadPhone: string;
  leadStatus: string;
  qualification: LeadQualification;
  onSelectOption: (text: string, value: string, nextNodeId: string, fieldToUpdate?: string) => void;
  onResetChat: () => void;
}

export const ChatSimulator: React.FC<ChatSimulatorProps> = ({
  messages,
  currentNode,
  isTyping,
  leadName,
  leadPhone,
  leadStatus,
  qualification,
  onSelectOption,
  onResetChat,
}) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  // Renderizador de tarjetas de recursos simulados
  const renderResourceCard = (msg: ChatMessage) => {
    switch (msg.resourceType) {
      case 'map': {
        // Ubicación demo: Residencial Aurora, Santo Domingo Este, RD
        const address = "Av. San Vicente de Paúl, Santo Domingo Este, República Dominicana (Demo)";

        return (
          <div className="w-full mt-2 bg-zinc-950/80 border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-[#c5a880]/30">
            {/* Mini Mapa de Vector CSS */}
            <div className="h-28 w-full bg-[linear-gradient(rgba(0,0,0,0.55),rgba(0,0,0,0.55)),repeating-linear-gradient(0deg,transparent,transparent_20px,rgba(255,255,255,0.02)_20px,rgba(255,255,255,0.02)_21px),repeating-linear-gradient(90deg,transparent,transparent_20px,rgba(255,255,255,0.02)_20px,rgba(255,255,255,0.02)_21px)] bg-zinc-900 relative flex items-center justify-center overflow-hidden border-b border-zinc-800">
              <div className="absolute top-1/2 left-0 w-full h-[1.5px] bg-zinc-800/40 transform rotate-12"></div>
              <div className="absolute top-1/3 left-0 w-full h-[1.5px] bg-zinc-800/40 transform -rotate-6"></div>
              <div className="absolute left-1/3 top-0 w-[1.5px] h-full bg-zinc-800/40 transform rotate-45"></div>
              <div className="absolute left-2/3 top-0 w-[1.5px] h-full bg-zinc-800/40 transform -rotate-12"></div>
              
              {/* Pin parpadeante */}
              <div className="relative z-10 flex flex-col items-center">
                <div className="w-8 h-8 rounded-full bg-[#c5a880]/20 flex items-center justify-center border border-[#c5a880]/40 animate-ping absolute"></div>
                <div className="w-8 h-8 rounded-full bg-zinc-900/90 flex items-center justify-center border border-[#c5a880] shadow-[0_0_15px_rgba(197,168,128,0.4)] relative">
                  <MapPin className="w-4 h-4 text-[#c5a880]" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <h5 className="text-[11px] font-semibold text-zinc-300">Residencial Aurora — Ubicación Demo</h5>
              <p className="text-[10px] text-zinc-500 mt-0.5 leading-snug">{address}</p>
              <div className="mt-2.5 flex items-center justify-between border-t border-zinc-900/80 pt-2.5">
                <span className="text-[9px] text-[#c5a880] font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span> Santo Domingo Este, RD
                </span>
                <button className="px-2.5 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/30 hover:text-white text-[9px] font-medium text-zinc-400 transition-colors">
                  Ver ubicación demo
                </button>
              </div>
            </div>
          </div>
        );
      }

      case 'gallery': {
        return (
          <div className="w-full mt-2 bg-zinc-950/80 border border-zinc-800 rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:border-[#c5a880]/30">
            {/* Grid de Renders con degradados premium simulados */}
            <div className="p-2 grid grid-cols-3 gap-1.5">
              {/* Render Grande */}
              <div className="col-span-2 h-24 rounded-lg bg-gradient-to-tr from-zinc-900 to-zinc-855 border border-zinc-800/80 relative overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-transparent to-transparent opacity-60"></div>
                <div className="absolute bottom-1.5 left-2">
                  <span className="text-[7px] text-[#c5a880] uppercase tracking-wider font-semibold">Render Fachada · Residencial Aurora</span>
                </div>
                <ImageIcon className="w-5 h-5 text-zinc-800" />
              </div>
              {/* Renders Pequeños */}
              <div className="h-24 grid grid-rows-2 gap-1.5">
                <div className="rounded-md bg-gradient-to-br from-zinc-900 to-zinc-800 border border-zinc-800/60 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute bottom-1 left-1">
                    <span className="text-[5px] text-zinc-500 uppercase font-semibold">Interiores</span>
                  </div>
                  <ImageIcon className="w-3 h-3 text-zinc-800" />
                </div>
                <div className="rounded-md bg-gradient-to-br from-zinc-850 to-zinc-950 border border-zinc-855 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 bg-black/75 flex items-center justify-center">
                    <span className="text-[9px] text-[#c5a880] font-bold tracking-wider font-sans">+12 Renders</span>
                  </div>
                  <ImageIcon className="w-3 h-3 text-zinc-900" />
                </div>
              </div>
            </div>
            <div className="p-2.5 border-t border-zinc-900/80 flex items-center justify-between text-xs">
              <div className="flex flex-col">
                <span className="text-[11px] font-semibold text-zinc-300">Galería Residencial Aurora</span>
                <span className="text-[9px] text-zinc-500">Diseño arquitectónico simulado · Demo oficial</span>
              </div>
              <button className="px-2 py-1 rounded bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/30 hover:text-white text-[9px] font-medium text-zinc-400 transition-colors">
                Ver galería demo
              </button>
            </div>
          </div>
        );
      }

      case 'pdf': {
        return (
          <div className="w-full mt-2 bg-zinc-950/80 border border-zinc-800 rounded-xl overflow-hidden p-3 shadow-lg transition-all duration-300 hover:border-[#c5a880]/30 flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-red-950/30 border border-red-900/40 flex items-center justify-center shrink-0">
              <FileText className="w-5 h-5 text-red-400" />
            </div>
            <div className="flex-1 min-w-0">
              <h5 className="text-[11px] font-semibold text-zinc-300 truncate">Brochure_Residencial_Aurora_Demo.pdf</h5>
              <div className="flex items-center gap-2 mt-0.5">
                <span className="text-[9px] text-zinc-500">Demo · Documento PDF ficticio</span>
                <span className="text-zinc-700">•</span>
                <span className="text-[9px] text-emerald-400 font-medium flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Simulado
                </span>
              </div>
            </div>
            <button className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-[#c5a880]/30 text-zinc-400 hover:text-white transition-colors">
              <Download className="w-3.5 h-3.5" />
            </button>
          </div>
        );
      }

      case 'summary': {
        return (
          <div className="w-full mt-2 bg-gradient-to-b from-zinc-950 to-zinc-900 border border-[#c5a880]/20 rounded-xl p-3.5 shadow-[0_4px_20px_rgba(197,168,128,0.05)] relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-[1.5px] bg-gradient-to-r from-transparent via-[#c5a880]/40 to-transparent"></div>
            
            <div className="flex items-center justify-between border-b border-zinc-800/60 pb-2 mb-2">
              <span className="text-[10px] font-bold text-[#c5a880] uppercase tracking-wider flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Aurora Concierge · Calificación Completada
              </span>
              <span className="px-2 py-0.5 rounded bg-emerald-950/40 text-emerald-400 border border-emerald-900/40 text-[8px] font-semibold uppercase tracking-wider">
                Demo
              </span>
            </div>

            <div className="space-y-1.5 text-[10px] text-zinc-300 font-sans">
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Perfil:</span>
                <span className="font-semibold text-zinc-200">{qualification.intent || "Inversión"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Tiempos:</span>
                <span className="font-semibold text-zinc-200">{qualification.type || "Proyecto en Plano"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Zona de Interés:</span>
                <span className="font-semibold text-zinc-200">{qualification.zone || "Sto. Dgo. Este"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Presupuesto:</span>
                <span className="font-semibold text-[#c5a880]">{qualification.budget || "US$250,000+"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Forma de Pago:</span>
                <span className="font-semibold text-zinc-200">{qualification.paymentMethod || "Cuotas"}</span>
              </div>
              <div className="flex justify-between border-b border-zinc-900 pb-1">
                <span className="text-zinc-500">Interés en Cita:</span>
                <span className="font-semibold text-emerald-400 flex items-center gap-0.5">
                  <Check className="w-2.5 h-2.5" /> Sí, agendar
                </span>
              </div>
            </div>

            <div className="mt-3 p-2 rounded-lg bg-zinc-900/60 border border-zinc-800 text-[9px] text-zinc-400 leading-normal">
              <span className="font-semibold text-[#c5a880]">Handoff Asesora:</span> Los datos están estructurados para seguimiento comercial con Laura Méndez. Este lead puede enviarse luego a un CRM inmobiliario.
            </div>
          </div>
        );
      }

      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full glass-panel rounded-2xl overflow-hidden border border-zinc-800/60 bg-zinc-950/20">
      {/* Header del Chat */}
      <div className="p-4 border-b border-zinc-800/60 bg-zinc-950/50 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center shrink-0">
            <Smartphone className="w-5 h-5 text-[#c5a880]" />
          </div>
          <div>
            <h4 className="font-medium text-sm text-zinc-100 flex items-center gap-1.5">
              Aurora Concierge
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            </h4>
            <p className="text-[11px] text-zinc-500">
              En línea · Canal de calificación demo · Residencial Aurora
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <span className="text-[10px] text-zinc-400 block font-medium">Prospecto: {leadName}</span>
            <span className="text-[9px] text-zinc-500 block">{leadPhone}</span>
          </div>
          {leadStatus === 'manual' && (
            <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-medium bg-red-950/40 text-red-400 border border-red-900/40">
              <ShieldAlert className="w-3 h-3" /> Control manual
            </span>
          )}
          <button
            onClick={onResetChat}
            className="px-3 py-1.5 rounded-md text-xs font-medium bg-zinc-900 border border-zinc-800 hover:bg-zinc-800/60 hover:text-white text-zinc-300 transition-colors shrink-0"
          >
            Reiniciar flujo
          </button>
        </div>
      </div>

      {/* Cuerpo de Mensajes */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[radial-gradient(#ffffff03_1px,transparent_1px)] [background-size:16px_16px]">
        {messages.map((msg) => {
          const isBot = msg.sender === 'bot';
          return (
            <div
              key={msg.id}
              className={`flex w-full ${isBot ? 'justify-start' : 'justify-end'}`}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-4 py-3 text-xs leading-relaxed ${
                  isBot
                    ? 'bg-zinc-900/80 border border-zinc-800/60 text-zinc-200 rounded-tl-none'
                    : 'bg-[#c5a880] text-zinc-950 font-medium rounded-tr-none shadow-[0_4px_12px_rgba(197,168,128,0.15)]'
                }`}
              >
                {/* Nombre de emisor para bot */}
                {isBot && (
                  <div className="flex items-center gap-1 mb-1 text-[10px] font-semibold text-[#c5a880] uppercase tracking-wider">
                    <Sparkles className="w-3 h-3 text-[#c5a880]" />
                    Aurora Concierge
                  </div>
                )}
                
                {msg.resourceType ? (
                  renderResourceCard(msg)
                ) : (
                  <p className="whitespace-pre-line">{msg.text}</p>
                )}
                
                <div className="flex items-center justify-end gap-1 mt-1.5 text-[9px] opacity-60">
                  <span>{msg.timestamp}</span>
                  {!isBot && <Check className="w-3 h-3 text-zinc-900" />}
                </div>
              </div>
            </div>
          );
        })}

        {/* Indicador de Escritura */}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-zinc-900/60 border border-zinc-800/40 rounded-2xl rounded-tl-none px-4 py-2.5 flex items-center gap-2">
              <span className="text-[10px] text-zinc-400 font-medium animate-pulse">
                Aurora Concierge está escribiendo
              </span>
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/60 animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/60 animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#c5a880]/60 animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input / Opciones Interactivas */}
      <div className="p-4 border-t border-zinc-800/60 bg-zinc-950/40 flex flex-col gap-4">
        {leadStatus === 'manual' ? (
          <div className="text-center py-2 px-4 rounded-xl bg-zinc-900/50 border border-zinc-800/80">
            <p className="text-xs text-zinc-400">
              La conversación ha sido transferida a la asesora humana.
            </p>
            <p className="text-[11px] text-[#c5a880] mt-0.5">
              Laura Méndez toma el control — demo de intervención manual.
            </p>
          </div>
        ) : currentNode && currentNode.options && currentNode.options.length > 0 && !isTyping ? (
          <div>
            <p className="text-[10px] font-semibold text-zinc-500 uppercase tracking-wider mb-2.5 text-center">
              Continuar calificación
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {currentNode.options.map((opt, idx) => (
                <button
                  key={idx}
                  onClick={() =>
                    onSelectOption(
                      opt.text,
                      opt.value,
                      opt.nextNode,
                      opt.fieldToUpdate
                    )
                  }
                  className="w-full py-2.5 px-3 rounded-xl text-[11px] text-center border bg-zinc-900 border-zinc-800 hover:border-[#c5a880]/60 text-zinc-200 hover:text-white hover:bg-[#c5a880]/5 transition-all duration-200"
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ) : isTyping ? (
          <div className="text-center py-3">
            <span className="text-[11px] text-zinc-500 italic">
              Procesando calificación del prospecto...
            </span>
          </div>
        ) : (
          <div className="text-center py-2 px-4 rounded-xl bg-[#c5a880]/5 border border-[#c5a880]/20">
            <p className="text-xs text-zinc-300">
              Calificación completada con éxito.
            </p>
            <p className="text-[10px] text-[#c5a880] mt-0.5 font-medium">
              Asesora notificada. Demo: En espera de intervención de Laura Méndez.
            </p>
          </div>
        )}

        {/* Input Decorativo Desactivado Tipo Chat */}
        <div className="flex items-center gap-2 border-t border-zinc-900/60 pt-3">
          <div className="flex-1 bg-zinc-900/80 border border-zinc-800/80 rounded-full px-4 py-2 flex items-center justify-between text-xs text-zinc-500 cursor-not-allowed">
            <span>Mensaje simulado...</span>
            <div className="flex gap-2.5 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-zinc-700"></span>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-zinc-900 border border-zinc-800/80 flex items-center justify-center shrink-0 text-zinc-600 cursor-not-allowed">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
              <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};
