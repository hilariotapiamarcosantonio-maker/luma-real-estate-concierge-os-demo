'use client';

import React, { useState } from 'react';
import { demoLeads, Lead, LeadQualification } from '@/data/demoLeads';
import { conversationFlows, ChatMessage } from '@/data/conversationFlows';
import { LeadList } from '@/components/dashboard/LeadList';
import { ChatSimulator } from '@/components/dashboard/ChatSimulator';
import { LeadProfile } from '@/components/dashboard/LeadProfile';
import { ArrowLeft, Users, Activity, Building2 } from 'lucide-react';
import Link from 'next/link';

export default function DashboardPage() {
  const [activeLeadId, setActiveLeadId] = useState<string>('lead-1');
  
  // Estado para la navegación por pestañas en móvil
  const [activeTab, setActiveTab] = useState<'leads' | 'chat' | 'profile'>('leads');

  // Inicializar leads directamente en el estado
  const [leads, setLeads] = useState<Lead[]>(() => demoLeads);
  
  // Inicializar historial de conversaciones directamente en el estado
  const [conversations, setConversations] = useState<Record<string, {
    messages: ChatMessage[];
    currentNodeId: string | null;
    isTyping: boolean;
  }>>(() => {
    const initialConversations: Record<string, {
      messages: ChatMessage[];
      currentNodeId: string | null;
      isTyping: boolean;
    }> = {};

    // Prospecto Inversionista A: Empieza recién entrante
    initialConversations['lead-1'] = {
      messages: [
        {
          id: '1',
          sender: 'lead',
          text: 'Hola, me interesa el catálogo de apartamentos en Residencial Aurora.',
          timestamp: '09:12 AM'
        },
        {
          id: '2',
          sender: 'bot',
          text: conversationFlows.start.botMessage as string,
          timestamp: '09:13 AM'
        }
      ],
      currentNodeId: 'start',
      isTyping: false
    };

    // Prospecto Familiar B: Conversación a medias
    initialConversations['lead-2'] = {
      messages: [
        {
          id: '1',
          sender: 'lead',
          text: 'Buenas tardes. Busco opciones de viviendas familiares en Santo Domingo Este.',
          timestamp: 'Ayer, 04:28 PM'
        },
        {
          id: '2',
          sender: 'bot',
          text: conversationFlows.start.botMessage as string,
          timestamp: 'Ayer, 04:29 PM'
        },
        {
          id: '3',
          sender: 'lead',
          text: 'Comprar para Vivir',
          timestamp: 'Ayer, 04:29 PM'
        },
        {
          id: '4',
          sender: 'bot',
          text: conversationFlows.project_type.botMessage as string,
          timestamp: 'Ayer, 04:30 PM'
        },
        {
          id: '5',
          sender: 'lead',
          text: 'Proyecto Listo (Entrega Inmediata)',
          timestamp: 'Ayer, 04:30 PM'
        },
        {
          id: '6',
          sender: 'bot',
          text: conversationFlows.zone_select.botMessage as string,
          timestamp: 'Ayer, 04:31 PM'
        }
      ],
      currentNodeId: 'zone_select',
      isTyping: false
    };

    // Prospecto Fuera de Perfil C: Ya cerrado y descalificado
    initialConversations['lead-3'] = {
      messages: [
        {
          id: '1',
          sender: 'lead',
          text: '¿Tienen algún alquiler temporal amueblado por US$400 al mes?',
          timestamp: 'Hace 2 días'
        },
        {
          id: '2',
          sender: 'bot',
          text: 'Hola. Aurora Concierge Inmobiliario se especializa exclusivamente en la venta y estructuración de portafolios inmobiliarios residenciales en República Dominicana (con presupuestos de adquisición a partir de US$100,000).\n\nLamentablemente, no contamos con catálogo de alquileres temporales en ese rango de precios. Le deseamos el mayor de los éxitos en su búsqueda.',
          timestamp: 'Hace 2 días'
        }
      ],
      currentNodeId: null,
      isTyping: false
    };

    return initialConversations;
  });

  const activeLead = leads.find((l) => l.id === activeLeadId);
  const activeChat = conversations[activeLeadId] || { messages: [], currentNodeId: null, isTyping: false };

  // Manejar selección de lead y auto-navegación de tab en móvil
  const handleSelectLead = (leadId: string) => {
    setActiveLeadId(leadId);
    setActiveTab('chat');
  };

  // Reiniciar la conversación de un lead
  const handleResetChat = () => {
    if (!activeLead) return;

    setConversations((prev) => ({
      ...prev,
      [activeLead.id]: {
        messages: [
          {
            id: '1',
            sender: 'lead',
            text: activeLead.id === 'lead-1'
              ? 'Hola, me interesa el catálogo de apartamentos en Residencial Aurora.'
              : activeLead.id === 'lead-2'
              ? 'Buenas tardes. Busco opciones de viviendas familiares en Santo Domingo Este.'
              : '¿Tienen algún alquiler temporal amueblado por US$400 al mes?',
            timestamp: '09:12 AM'
          },
          {
            id: '2',
            sender: 'bot',
            text: activeLead.id === 'lead-3'
              ? 'Hola. Aurora Concierge Inmobiliario se especializa exclusivamente en la venta...'
              : conversationFlows.start.botMessage as string,
            timestamp: '09:13 AM'
          }
        ],
        currentNodeId: activeLead.id === 'lead-3' ? null : 'start',
        isTyping: false
      }
    }));

    // Reiniciar también los datos perfilados en el lead
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === activeLead.id
          ? {
              ...l,
              status: activeLead.id === 'lead-1' ? 'entrante' : activeLead.id === 'lead-2' ? 'calificando' : 'descalificado',
              qualification: {
                score: activeLead.id === 'lead-3' ? 15 : 0,
                summary: activeLead.id === 'lead-3'
                  ? 'No califica para portafolio de venta. Interés de alquiler fuera del rango de precios mínimo.'
                  : 'Lead capturado. Esperando interacción inicial.'
              }
            }
          : l
      )
    );
  };

  // Manejar respuesta interactiva
  const handleSelectOption = (
    text: string,
    value: string,
    nextNodeId: string,
    fieldToUpdate?: string
  ) => {
    if (!activeLead || !activeChat) return;

    const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    // 1. Agregar mensaje del lead
    const leadMsg: ChatMessage = {
      id: Math.random().toString(),
      sender: 'lead',
      text: text,
      timestamp: timeString
    };

    const updatedMessages = [...activeChat.messages, leadMsg];

    // Actualizar datos del lead en el pipeline de forma estrictamente tipada
    const updatedQual = { ...activeLead.qualification };
    if (fieldToUpdate) {
      const key = fieldToUpdate as keyof LeadQualification;
      if (key === 'intent') {
        updatedQual.intent = value as 'Comprar para Vivir' | 'Invertir';
      } else if (key === 'type') {
        updatedQual.type = value as 'Proyecto en Plano' | 'Proyecto Listo';
      } else if (key === 'zone') {
        updatedQual.zone = value;
      } else if (key === 'budget') {
        updatedQual.budget = value;
      } else if (key === 'paymentMethod') {
        updatedQual.paymentMethod = value;
      } else if (key === 'appointmentInterest') {
        updatedQual.appointmentInterest = value as 'Sí, agendar' | 'Por ahora no';
      }
    }

    // Actualizar el estado del lead a 'calificando' si estaba como nuevo
    let nextStatus = activeLead.status;
    if (activeLead.status === 'entrante') {
      nextStatus = 'calificando';
    }

    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === activeLead.id
          ? {
              ...l,
              status: nextStatus,
              qualification: updatedQual,
              lastMessage: text,
              lastMessageTime: 'Ahora'
            }
          : l
      )
    );

    // Actualizar chat agregando el mensaje del lead e iniciando el "escribiendo..."
    setConversations((prev) => ({
      ...prev,
      [activeLead.id]: {
        messages: updatedMessages,
        currentNodeId: nextNodeId,
        isTyping: true
      }
    }));

    // 2. Simular tiempo de escritura de la IA (1.2 segundos)
    setTimeout(() => {
      const nextNode = conversationFlows[nextNodeId];
      if (!nextNode) return;

      // Obtener el mensaje del bot
      let botText = "";
      if (typeof nextNode.botMessage === 'function') {
        botText = nextNode.botMessage(updatedQual);
      } else {
        botText = nextNode.botMessage;
      }

      const timeString = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

      const botMsg: ChatMessage = {
        id: Math.random().toString(),
        sender: 'bot',
        text: botText,
        timestamp: timeString
      };

      // Inyectar recursos visuales según el nodo de destino
      let extraMsgs: ChatMessage[] = [];
      if (nextNodeId === 'resource_delivery') {
        extraMsgs = [
          {
            id: 'res-map-' + Math.random().toString(),
            sender: 'bot',
            text: '📍 Ubicación del Proyecto',
            timestamp: timeString,
            resourceType: 'map'
          },
          {
            id: 'res-gallery-' + Math.random().toString(),
            sender: 'bot',
            text: '🖼️ Renders Exclusivos',
            timestamp: timeString,
            resourceType: 'gallery'
          },
          {
            id: 'res-pdf-' + Math.random().toString(),
            sender: 'bot',
            text: '📄 Brochure Digital Residencial Aurora',
            timestamp: timeString,
            resourceType: 'pdf'
          }
        ];
      } else if (nextNodeId === 'finish_qualified') {
        extraMsgs = [
          {
            id: 'res-summary-' + Math.random().toString(),
            sender: 'bot',
            text: '📋 Resumen de Calificación',
            timestamp: timeString,
            resourceType: 'summary'
          }
        ];
      }

      // Si es el nodo final de calificación
      let finalStatus = nextStatus;
      if (nextNode.isEnd) {
        if (nextNodeId === 'finish_qualified') {
          finalStatus = 'calificado';
          updatedQual.summary = `Prospecto calificado por Aurora Concierge. Interés en ${updatedQual.type} (${updatedQual.zone}). Presupuesto de ${updatedQual.budget}. Modalidad: ${updatedQual.paymentMethod}. Listo para llamada y cita comercial con Laura Méndez.`;
        } else {
          finalStatus = 'manual';
          updatedQual.summary = `Calificación inicial completada. Interés en catálogo en ${updatedQual.zone}. Presupuesto ${updatedQual.budget}. Requiere envío de recursos del proyecto Residencial Aurora.`;
        }
      }

      setLeads((prevLeads) =>
        prevLeads.map((l) =>
          l.id === activeLead.id
            ? {
                ...l,
                status: finalStatus,
                qualification: updatedQual,
                lastMessage: botText.substring(0, 60) + "..."
              }
            : l
        )
      );

      setConversations((prev) => ({
        ...prev,
        [activeLead.id]: {
          messages: [...updatedMessages, botMsg, ...extraMsgs],
          currentNodeId: nextNode.isEnd ? null : nextNodeId,
          isTyping: false
        }
      }));

      // Si termina de calificar en móvil, mover a la ficha resumen
      if (nextNode.isEnd) {
        setActiveTab('profile');
      }
    }, 1200);
  };

  // Tomar control manual
  const handleTakeControl = () => {
    if (!activeLead) return;
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === activeLead.id
          ? {
              ...l,
              status: 'manual',
              qualification: {
                ...l.qualification,
                summary: (l.qualification.summary || "") + "\n\n[Asesora Laura Méndez tomó el control manual de la conversación]."
              }
            }
          : l
      )
    );
  };

  // Agendar cita
  const handleScheduleAppointment = () => {
    if (!activeLead) return;
    setLeads((prevLeads) =>
      prevLeads.map((l) =>
        l.id === activeLead.id
          ? {
              ...l,
              status: 'cita_pendiente',
              temperature: 'hot',
              qualification: {
                ...l.qualification,
                summary: (l.qualification.summary || "") + "\n\n[Cita coordinada y agendada en calendario comercial con Laura Méndez]."
              }
            }
          : l
      )
    );
  };

  const currentNode = activeChat.currentNodeId ? conversationFlows[activeChat.currentNodeId] : null;

  return (
    <div className="flex-1 flex flex-col h-screen overflow-hidden bg-zinc-950 text-zinc-100">
      {/* Barra de Navegación del Dashboard */}
      <header className="h-16 shrink-0 border-b border-zinc-900 bg-zinc-950 flex items-center justify-between px-6 z-10">
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-zinc-700/60 hover:text-white transition-all text-zinc-400"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div className="h-4 w-[1px] bg-zinc-800"></div>
          <div className="flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#c5a880]" />
            <span className="font-serif text-sm italic font-medium tracking-wide text-gold">Aurora</span>
            <span className="text-[11px] font-semibold tracking-wider text-zinc-500 uppercase">
              Concierge · Demo
            </span>
          </div>
        </div>

        {/* Stats rápidos (solo desktop) */}
        <div className="hidden md:flex items-center gap-6 text-xs text-zinc-400">
          <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-900">
            <Users className="w-3.5 h-3.5 text-gold" />
            <span>Prospectos Activos: <strong className="text-zinc-200">3</strong></span>
          </div>
          <div className="flex items-center gap-2 bg-zinc-900/50 px-3 py-1.5 rounded-lg border border-zinc-900">
            <Activity className="w-3.5 h-3.5 text-emerald-400" />
            <span>Proyecto: <strong className="text-zinc-200">Residencial Aurora</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-2.5">
          <span className="w-2 h-2 rounded-full bg-[#c5a880] shadow-[0_0_8px_rgba(197,168,128,0.6)]"></span>
          <span className="text-xs font-medium text-zinc-300 tracking-wide font-sans">
            Demo Oficial
          </span>
        </div>
      </header>

      {/* Selector de Pestañas en Móvil */}
      <div className="lg:hidden shrink-0 px-4 flex border-b border-zinc-900 bg-zinc-950/20">
        <button
          onClick={() => setActiveTab('leads')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'leads' ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-zinc-500'
          }`}
        >
          Prospectos
        </button>
        <button
          onClick={() => setActiveTab('chat')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'chat' ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-zinc-500'
          }`}
        >
          Conversación
        </button>
        <button
          onClick={() => setActiveTab('profile')}
          className={`flex-1 py-3 text-center text-xs font-semibold border-b-2 transition-all ${
            activeTab === 'profile' ? 'border-[#c5a880] text-[#c5a880]' : 'border-transparent text-zinc-500'
          }`}
        >
          Ficha Resumen
        </button>
      </div>

      {/* Grid Principal de la Demo */}
      <main className="flex-1 overflow-hidden p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Panel Izquierdo: Lista de Prospectos (Lg: 3 cols) */}
        <section className={`${activeTab === 'leads' ? 'block' : 'hidden'} lg:block lg:col-span-3 h-full overflow-hidden`}>
          <LeadList
            leads={leads}
            activeLeadId={activeLeadId}
            onSelectLead={handleSelectLead}
          />
        </section>

        {/* Panel Central: Chat (Lg: 5 cols) */}
        <section className={`${activeTab === 'chat' ? 'block' : 'hidden'} lg:block lg:col-span-5 h-full overflow-hidden`}>
          {activeLead && (
            <ChatSimulator
              messages={activeChat.messages}
              currentNode={currentNode}
              isTyping={activeChat.isTyping}
              leadName={activeLead.name}
              leadPhone={activeLead.phone}
              leadStatus={activeLead.status}
              qualification={activeLead.qualification}
              onSelectOption={handleSelectOption}
              onResetChat={handleResetChat}
            />
          )}
        </section>

        {/* Panel Derecho: Ficha Resumen (Lg: 4 cols) */}
        <section className={`${activeTab === 'profile' ? 'block' : 'hidden'} lg:block lg:col-span-4 h-full overflow-hidden`}>
          {activeLead && (
            <LeadProfile
              lead={activeLead}
              onTakeControl={handleTakeControl}
              onScheduleAppointment={handleScheduleAppointment}
            />
          )}
        </section>
      </main>
    </div>
  );
}
