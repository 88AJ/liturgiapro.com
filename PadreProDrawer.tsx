import React, { useState, useRef, useEffect } from 'react';
import { 
  X, 
  Send, 
  Sparkles, 
  BookOpen, 
  MessageSquare, 
  Bot, 
  User, 
  Loader2,
  Trash2,
  HelpCircle
} from 'lucide-react';
import { LiturgicalDay } from '../../types/liturgia';

interface Message {
  sender: 'user' | 'model';
  text: string;
  timestamp: string;
}

interface PadreProDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  currentDay: LiturgicalDay;
}

export const PadreProDrawer: React.FC<PadreProDrawerProps> = ({
  isOpen,
  onClose,
  currentDay
}) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      sender: 'model',
      text: `¡Paz y bien! Soy el consultor litúrgico Padre PRO. Te acompaño en la preparación de la celebración para el ${currentDay.dia_semana}, ${currentDay.fecha} (${currentDay.titulo_celebracion || currentDay.celebracion}). Puedes consultarme sobre rúbricas de la IGMR, selección de cantos sacros, normas sacramentales o redacción pastoral.`,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const suggestedPrompts = [
    '¿Qué color y ornamentos corresponden hoy?',
    '¿Se debe rezar el Credo y el Gloria?',
    'Sugiéreme 3 cantos de entrada apropiados',
    '¿Cómo se administra el Bautismo dentro de la Misa?'
  ];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  if (!isOpen) return null;

  const handleSend = async (userText?: string) => {
    const textToSend = userText || input;
    if (!textToSend.trim() || isLoading) return;

    const newMsg: Message = {
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, newMsg];
    setMessages(updatedMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/gemini/padre-pro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: updatedMessages,
          context: {
            fecha: currentDay.fecha,
            celebracion: currentDay.titulo_celebracion || currentDay.celebracion,
            tiempo: currentDay.tiempo_liturgico,
            color: currentDay.color,
            grado: currentDay.grado
          }
        })
      });

      const data = await res.json();
      setMessages((prev) => [
        ...prev,
        {
          sender: 'model',
          text: data.reply || 'Ha ocurrido un error al consultar las fuentes magisteriales.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } catch (err) {
      console.error('Error calling Padre PRO:', err);
      setMessages((prev) => [
        ...prev,
        {
          sender: 'model',
          text: 'Disculpa, no pude procesar tu consulta en este momento. Por favor verifica la conexión con el servidor.',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClear = () => {
    setMessages([
      {
        sender: 'model',
        text: 'Historial reiniciado. ¿En qué duda litúrgica o sacramental te puedo asistir?',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }
    ]);
  };

  return (
    <div className="fixed inset-y-0 right-0 w-full sm:w-[420px] bg-[#2D2926] text-[#F9F7F2] border-l border-[#D9D1C3]/30 shadow-2xl z-50 flex flex-col no-print animate-in slide-in-from-right duration-200 font-sans">
      
      {/* Header - Editorial Style */}
      <div className="p-4 border-b border-[#444] flex items-center justify-between bg-[#24201E]">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-sm bg-[#800020] text-[#F9F7F2] flex items-center justify-center font-serif text-sm font-bold shadow-xs">
            LP.
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-sans text-xs font-bold text-[#F9F7F2] uppercase tracking-[0.2em]">Padre PRO</h3>
              <span className="text-[9px] bg-[#800020] text-[#F9F7F2] font-bold px-1.5 py-0.2 rounded-xs uppercase tracking-wider">TEÓLOGO IA</span>
            </div>
            <p className="text-[10px] text-[#AAA] font-serif italic">Misal Romano 3ra Edición & IGMR</p>
          </div>
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleClear}
            title="Limpiar conversación"
            className="p-1.5 rounded-sm text-[#AAA] hover:text-white hover:bg-[#333] transition"
          >
            <Trash2 size={14} />
          </button>
          <button
            onClick={onClose}
            className="p-1.5 rounded-sm text-[#AAA] hover:text-white hover:bg-[#333] transition"
          >
            <X size={16} />
          </button>
        </div>
      </div>

      {/* Suggested Questions */}
      <div className="p-3 bg-[#1A1715] border-b border-[#333] overflow-x-auto flex gap-1.5 text-[11px] whitespace-nowrap">
        {suggestedPrompts.map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(prompt)}
            disabled={isLoading}
            className="px-2.5 py-1 rounded-sm bg-[#2D2926] hover:bg-[#3A3532] text-[#CCC] border border-[#444] transition disabled:opacity-50 font-serif italic text-xs"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 text-xs">
        {messages.map((m, i) => {
          const isModel = m.sender === 'model';
          return (
            <div
              key={i}
              className={`flex flex-col ${isModel ? 'items-start' : 'items-end'}`}
            >
              <div className="flex items-center gap-1.5 mb-1 px-1 text-[10px] text-[#888]">
                {isModel ? <Bot size={11} className="text-[#800020]" /> : <User size={11} />}
                <span className="uppercase tracking-wider">{isModel ? 'Padre PRO' : 'Celebrante'}</span>
                <span>• {m.timestamp}</span>
              </div>
              <div
                className={`p-3.5 rounded-sm max-w-[90%] font-serif text-[14px] leading-relaxed whitespace-pre-line shadow-xs ${
                  isModel
                    ? 'bg-[#F0EDE6] text-[#2D2926] border border-[#D9D1C3]'
                    : 'bg-[#800020] text-[#F9F7F2] font-sans text-xs'
                }`}
              >
                {m.text}
              </div>
            </div>
          );
        })}

        {isLoading && (
          <div className="flex items-center gap-2 text-[#AAA] text-xs p-2 font-serif italic">
            <Loader2 size={13} className="animate-spin text-[#800020]" />
            <span>Consultando fuentes magisteriales y normas litúrgicas...</span>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Box */}
      <div className="p-3 border-t border-[#444] bg-[#24201E]">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
          className="flex items-center gap-1.5"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Pregunta sobre rúbricas, Misal o cantos..."
            disabled={isLoading}
            className="flex-1 bg-[#1A1715] border border-[#444] text-[#F9F7F2] text-xs rounded-sm px-3.5 py-2.5 focus:outline-none focus:border-[#800020] disabled:opacity-50"
          />
          <button
            type="submit"
            disabled={!input.trim() || isLoading}
            className="p-2.5 rounded-sm bg-[#800020] text-[#F9F7F2] font-bold hover:bg-[#660019] transition disabled:opacity-40"
          >
            <Send size={14} />
          </button>
        </form>
      </div>
    </div>
  );
};
