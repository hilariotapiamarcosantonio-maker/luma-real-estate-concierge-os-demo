export interface LeadQualification {
  intent?: 'Comprar para Vivir' | 'Invertir';
  type?: 'Proyecto en Plano' | 'Proyecto Listo';
  zone?: string;
  budget?: string;
  paymentMethod?: string;
  appointmentInterest?: 'Sí, agendar' | 'Por ahora no';
  score?: number; // 0 - 100
  summary?: string;
  suggestManual?: boolean;
}

export interface Lead {
  id: string;
  name: string;
  phone: string;
  avatar: string;
  status: 'entrante' | 'calificando' | 'calificado' | 'descalificado' | 'manual' | 'cita_pendiente';
  temperature: 'hot' | 'warm' | 'cold';
  source: string;
  date: string;
  lastMessage: string;
  lastMessageTime: string;
  qualification: LeadQualification;
}

// Prospectos ficticios para demo — No representan clientes reales
export const demoLeads: Lead[] = [
  {
    id: "lead-1",
    name: "Prospecto Inversionista A",
    phone: "+1 (829) 555-0192",
    avatar: "PA",
    status: "entrante",
    temperature: "hot",
    source: "Meta Ads",
    date: "Hoy, 09:12 AM",
    lastMessage: "Hola, me interesa el catálogo de apartamentos en Residencial Aurora.",
    lastMessageTime: "09:12 AM",
    qualification: {
      score: 0,
      summary: "Prospecto capturado vía Meta Ads. Esperando interacción inicial con Aurora Concierge."
    }
  },
  {
    id: "lead-2",
    name: "Prospecto Familiar B",
    phone: "+1 (809) 555-0143",
    avatar: "PB",
    status: "calificando",
    temperature: "warm",
    source: "Referido Directo",
    date: "Ayer, 04:30 PM",
    lastMessage: "Busco opciones de viviendas familiares en Santo Domingo Este.",
    lastMessageTime: "Ayer",
    qualification: {
      intent: "Comprar para Vivir",
      type: "Proyecto Listo",
      zone: "Santo Domingo Este",
      score: 65,
      summary: "Busca apartamento familiar con entrega inmediata en Santo Domingo Este. Calificando presupuesto."
    }
  },
  {
    id: "lead-3",
    name: "Prospecto Fuera de Perfil C",
    phone: "+1 (849) 555-0111",
    avatar: "PC",
    status: "descalificado",
    temperature: "cold",
    source: "Meta Ads",
    date: "Hace 2 días",
    lastMessage: "Busco alquiler temporal amueblado por US$400 al mes.",
    lastMessageTime: "2 días",
    qualification: {
      budget: "Menos de US$50k",
      score: 15,
      summary: "No califica para portafolio de venta de Residencial Aurora. Interés de alquiler fuera del rango mínimo.",
      suggestManual: false
    }
  }
];
