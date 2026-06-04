import { LeadQualification } from './demoLeads';

export interface ChatMessage {
  id: string;
  sender: 'bot' | 'lead';
  text: string;
  timestamp: string;
  resourceType?: 'map' | 'gallery' | 'pdf' | 'summary';
}

export interface ConversationNode {
  id: string;
  botMessage: string | ((qualification: LeadQualification) => string);
  options?: {
    text: string;
    value: string;
    nextNode: string;
    fieldToUpdate?: string;
  }[];
  isEnd?: boolean;
}

export const conversationFlows: Record<string, ConversationNode> = {
  start: {
    id: "start",
    botMessage: "¡Saludos! Gracias por contactar a Aurora Concierge Inmobiliario. Mi nombre es Aurora, su asistente de calificación.\n\nEstamos presentando el proyecto Residencial Aurora en Santo Domingo Este, República Dominicana. Para brindarle una atención a su medida, cuénteme: ¿Su interés principal es comprar un inmueble para vivir o busca realizar una inversión?",
    options: [
      {
        text: "Comprar para Vivir",
        value: "Comprar para Vivir",
        nextNode: "project_type",
        fieldToUpdate: "intent"
      },
      {
        text: "Realizar una Inversión",
        value: "Invertir",
        nextNode: "project_type",
        fieldToUpdate: "intent"
      }
    ]
  },
  project_type: {
    id: "project_type",
    botMessage: "Entendido. Residencial Aurora ofrece opciones para ambos perfiles.\n\n*Comprar en plano (en construcción)* ofrece la ventaja de plusvalía acumulada: usted compra a menor precio por metro cuadrado y gana valor durante la obra, con planes de pago flexibles en cuotas sin interés.\n\n*Comprar listo (entrega inmediata)* le permite habitar o rentar la propiedad de forma inmediata, ideal para un retorno de inversión rápido.\n\n¿Qué tipo de desarrollo se adapta mejor a sus tiempos?",
    options: [
      {
        text: "Proyecto en Plano (Construcción)",
        value: "Proyecto en Plano",
        nextNode: "zone_select",
        fieldToUpdate: "type"
      },
      {
        text: "Proyecto Listo (Entrega Inmediata)",
        value: "Proyecto Listo",
        nextNode: "zone_select",
        fieldToUpdate: "type"
      }
    ]
  },
  zone_select: {
    id: "zone_select",
    botMessage: "Perfecto. La ubicación define la plusvalía y el estilo de vida. Residencial Aurora se encuentra en Santo Domingo Este. ¿Cuál es su zona de preferencia o punto de referencia para esta adquisición?",
    options: [
      {
        text: "Santo Domingo Este (Residencial Aurora)",
        value: "Santo Domingo Este",
        nextNode: "budget_select",
        fieldToUpdate: "zone"
      },
      {
        text: "Zona Este / Los Alcarrizos",
        value: "Zona Este",
        nextNode: "budget_select",
        fieldToUpdate: "zone"
      },
      {
        text: "Flexible — Lo más importante es el precio",
        value: "Zona Flexible",
        nextNode: "budget_select",
        fieldToUpdate: "zone"
      }
    ]
  },
  budget_select: {
    id: "budget_select",
    botMessage: "Excelente selección. Para filtrar las unidades que mejor encajen con su planificación financiera, ¿en qué rango de presupuesto se siente más cómodo?",
    options: [
      {
        text: "US$100,000 - US$180,000",
        value: "US$100k - US$180k",
        nextNode: "payment_method",
        fieldToUpdate: "budget"
      },
      {
        text: "US$180,000 - US$250,000",
        value: "US$180k - US$250k",
        nextNode: "payment_method",
        fieldToUpdate: "budget"
      },
      {
        text: "US$250,000+",
        value: "US$250k+",
        nextNode: "payment_method",
        fieldToUpdate: "budget"
      }
    ]
  },
  payment_method: {
    id: "payment_method",
    botMessage: "Excelente. Para estructurar las opciones de pago óptimas para Residencial Aurora, ¿cuál es su modalidad preferida de compra?",
    options: [
      {
        text: "Fondos Propios / Transferencia",
        value: "Fondos Propios",
        nextNode: "resource_delivery",
        fieldToUpdate: "paymentMethod"
      },
      {
        text: "Financiamiento Bancario",
        value: "Financiamiento Bancario",
        nextNode: "resource_delivery",
        fieldToUpdate: "paymentMethod"
      },
      {
        text: "Plan de Pagos Flexible (Cuotas)",
        value: "Cuotas en Construcción",
        nextNode: "resource_delivery",
        fieldToUpdate: "paymentMethod"
      }
    ]
  },
  resource_delivery: {
    id: "resource_delivery",
    botMessage: "Perfecto. Le acabo de compartir la ubicación exacta de Residencial Aurora, la galería con renders exclusivos y el brochure comercial en formato PDF (demo).\n\nEl proyecto cuenta con amenidades premium: piscina, áreas verdes, seguridad 24/7, estacionamiento y lobby de diseño.\n\nPara analizar los números a detalle, el inventario real y coordinar los siguientes pasos, ¿le interesaría una llamada corta de 10 minutos con nuestra asesora Laura Méndez?",
    options: [
      {
        text: "Sí, agendar llamada con Laura",
        value: "Sí, agendar",
        nextNode: "finish_qualified",
        fieldToUpdate: "appointmentInterest"
      },
      {
        text: "Solo el catálogo por ahora",
        value: "Por ahora no",
        nextNode: "finish_neutral",
        fieldToUpdate: "appointmentInterest"
      }
    ]
  },
  finish_qualified: {
    id: "finish_qualified",
    botMessage: "¡Excelente decisión! He registrado su solicitud de cita. La asesora Laura Méndez tomará contacto con usted en los próximos minutos para coordinar la llamada y revisar las unidades disponibles en Residencial Aurora.\n\nAquí le comparto el resumen de su calificación para que la asesora esté preparada.",
    isEnd: true
  },
  finish_neutral: {
    id: "finish_neutral",
    botMessage: "Comprendo perfectamente. Le he compartido los recursos de Residencial Aurora: ubicación, galería de renders y brochure PDF en este canal. Cuando desee dar el siguiente paso, Aurora Concierge estará disponible para asistirle.\n\n📌 Datos de contacto demo:\nLaura Méndez · ventas@demo-lumapremium.com · +1 (809) 000-0000",
    isEnd: true
  }
};
