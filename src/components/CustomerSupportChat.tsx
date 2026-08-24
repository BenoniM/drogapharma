import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageSquare,
  X,
  Phone,
  Send,
  Headphones,
  ExternalLink,
  ChevronRight,
  RotateCcw,
} from "lucide-react";
import logo from "@/assets/logo.jpg";

type Message = {
  id: string;
  sender: "bot" | "user";
  text: string;
  timestamp: string;
  options?: { label: string; action: string }[];
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: "welcome-1",
    sender: "bot",
    text: "👋 Welcome to Droga Pharma Customer Support! How can we assist you today?",
    timestamp: "Just now",
    options: [
      { label: "📞 Call Hotline 6637", action: "call_hotline" },
      { label: "💊 Product Inquiries & Orders", action: "products" },
      { label: "🏢 Branch Locations & Hours", action: "branches" },
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
      { label: "👥 Executive & Management Team", action: "leadership" },
    ],
  },
];

const BOT_RESPONSES: Record<string, { text: string; options?: { label: string; action: string }[] }> = {
  call_hotline: {
    text: "You can reach our dedicated customer care desk directly by dialing **6637** (Toll-Free / Short Code) or landline **+251 11 230 6771** during business hours (Mon-Fri: 8:00 AM - 5:30 PM, Sat: 8:00 AM - 12:30 PM).",
    options: [
      { label: "💬 Chat on WhatsApp", action: "whatsapp" },
      { label: "💊 Check Products", action: "products" },
      { label: "🔙 Back to main menu", action: "main_menu" },
    ],
  },
  products: {
    text: "Droga Pharma supplies quality pharmaceuticals, diagnostics, orthopedic devices, sutures, and specialized healthcare solutions. You can browse our catalog online or request bulk quotes.",
    options: [
      { label: "📦 Browse Products Page", action: "go_products" },
      { label: "📞 Inquire via 6637", action: "call_hotline" },
      { label: "🔙 Back to main menu", action: "main_menu" },
    ],
  },
  branches: {
    text: "Droga Pharma operates across East Africa:\n• **Headquarters**: Addis Ababa, Gulele Subcity, Droga Building\n• **Somaliland**: Cabaaye Bus Station, Downtown Hargeysa\n• **Rwanda**: Plot No. 311 AV KN2, Kigali City",
    options: [
      { label: "📍 View Contact Page", action: "go_contact" },
      { label: "📞 Call 6637", action: "call_hotline" },
      { label: "🔙 Back to main menu", action: "main_menu" },
    ],
  },
  whatsapp: {
    text: "Our representative is available on WhatsApp at **+251 91 366 7537**. Click below to start a direct WhatsApp conversation.",
    options: [
      { label: "🟢 Open WhatsApp Chat", action: "open_whatsapp_link" },
      { label: "🔙 Back to main menu", action: "main_menu" },
    ],
  },
  leadership: {
    text: "Droga Pharma is led by Group CEO Henok Teka, Deputy CEO Dr. Abdi Ermolo, and our experienced Executive Directors. You can view our full updated Organogram and Management Profiles on the About page.",
    options: [
      { label: "🏛️ View Organogram & Profiles", action: "go_about" },
      { label: "🔙 Back to main menu", action: "main_menu" },
    ],
  },
  main_menu: {
    text: "How else can we help you today?",
    options: [
      { label: "📞 Call Hotline 6637", action: "call_hotline" },
      { label: "💊 Product Inquiries", action: "products" },
      { label: "🏢 Branches & Locations", action: "branches" },
      { label: "💬 WhatsApp Support", action: "whatsapp" },
    ],
  },
};

const CustomerSupportChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setHasUnread(false);
      scrollToBottom();
    }
  }, [isOpen, messages]);

  const handleOptionClick = (action: string) => {
    if (action === "open_whatsapp_link") {
      window.open("https://wa.me/251913667537?text=Hello%20Droga%20Pharma%20Support", "_blank");
      return;
    }
    if (action === "go_products") {
      window.location.href = "/products";
      return;
    }
    if (action === "go_contact") {
      window.location.href = "/contact";
      return;
    }
    if (action === "go_about") {
      window.location.href = "/about#governance";
      return;
    }

    const userSelectedLabel =
      Object.values(BOT_RESPONSES).flatMap((r) => r.options || []).find((o) => o.action === action)?.label ||
      INITIAL_MESSAGES[0].options?.find((o) => o.action === action)?.label ||
      action;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: userSelectedLabel,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setIsTyping(true);

    setTimeout(() => {
      const response = BOT_RESPONSES[action] || {
        text: "Thank you for reaching out. Please dial **6637** or message our team on WhatsApp for immediate support.",
        options: BOT_RESPONSES.main_menu.options,
      };

      const botMsg: Message = {
        id: `bot-${Date.now()}`,
        sender: "bot",
        text: response.text,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        options: response.options,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600);
  };

  const handleSendMessage = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const query = inputValue.trim();
    if (!query) return;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      sender: "user",
      text: query,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue("");
    setIsTyping(true);

    setTimeout(() => {
      const lower = query.toLowerCase();
      let botMsg: Message;

      if (lower.includes("phone") || lower.includes("call") || lower.includes("number") || lower.includes("contact") || lower.includes("6637")) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "You can reach Droga Pharma directly by calling our short code hotline **6637** or landline **+251 11 230 6771**.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "📞 Call 6637 Now", action: "call_hotline" },
            { label: "💬 WhatsApp", action: "whatsapp" },
            { label: "🔙 Main Menu", action: "main_menu" },
          ],
        };
      } else if (lower.includes("product") || lower.includes("medicine") || lower.includes("drug") || lower.includes("device") || lower.includes("order")) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "We supply essential medicines, diagnostic devices, and clinical supplies. Would you like to view our products catalog or contact our sales team?",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "📦 Products Catalog", action: "go_products" },
            { label: "📞 Call Hotline 6637", action: "call_hotline" },
          ],
        };
      } else if (lower.includes("organogram") || lower.includes("team") || lower.includes("ceo") || lower.includes("management") || lower.includes("structure")) {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: "Droga Pharma's updated organizational structure and leadership profiles are published on our About page.",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "🏛️ View Organogram", action: "go_about" },
            { label: "🔙 Main Menu", action: "main_menu" },
          ],
        };
      } else {
        botMsg = {
          id: `bot-${Date.now()}`,
          sender: "bot",
          text: `Thank you for your message regarding "${query}". For immediate assistance, dial hotline **6637** or reach us on WhatsApp.`,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
          options: [
            { label: "📞 Dial 6637", action: "call_hotline" },
            { label: "💬 WhatsApp Support", action: "whatsapp" },
            { label: "🔙 Main Menu", action: "main_menu" },
          ],
        };
      }

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleResetChat = () => {
    setMessages(INITIAL_MESSAGES);
  };

  return (
    <aside aria-label="Customer Support and Hotline" className="fixed bottom-6 right-6 z-50">
      {/* Floating Trigger Button */}
      <div className="relative flex items-center">
        {!isOpen && (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1 }}
            className="hidden md:flex items-center gap-2 mr-3 bg-white/95 backdrop-blur-md px-3.5 py-2 rounded-full shadow-lg border border-black/10 text-xs font-semibold text-black cursor-pointer hover:bg-black hover:text-white transition-colors"
            onClick={() => setIsOpen(true)}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
            <span>Support & Hotline: <strong className="font-bold text-[#bfa000] group-hover:text-[#fff200]">6637</strong></span>
          </motion.div>
        )}

        <motion.button
          whileHover={{ scale: 1.06 }}
          whileTap={{ scale: 0.94 }}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={isOpen ? "Close customer support chat" : "Open customer support chat"}
          className="relative flex items-center justify-center w-14 h-14 rounded-full bg-black text-[#FFF200] shadow-2xl border-2 border-[#FFF200] focus:outline-none focus:ring-4 focus:ring-[#FFF200]/30 transition-transform"
        >
          {isOpen ? (
            <X size={26} className="text-white" />
          ) : (
            <>
              <MessageSquare size={24} />
              {hasUnread && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FFF200] opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-4 w-4 bg-[#FFF200] text-[9px] font-bold text-black items-center justify-center">
                    !
                  </span>
                </span>
              )}
            </>
          )}
        </motion.button>
      </div>

      {/* Support Chat Box Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="fixed inset-x-4 bottom-24 sm:inset-x-auto sm:right-6 sm:bottom-24 sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-[0_20px_60px_rgba(0,0,0,0.3)] border border-black/10 overflow-hidden flex flex-col z-50"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-black via-zinc-900 to-black text-white p-4 shrink-0 flex items-center justify-between border-b border-white/10">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-[#FFF200] bg-white flex items-center justify-center p-0.5">
                    <img src={logo} alt="Droga Care" className="w-full h-full object-contain" />
                  </div>
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 border-2 border-black rounded-full" />
                </div>
                <div>
                  <h2 className="font-bold text-sm text-white flex items-center gap-1.5">
                    Droga Care
                    <span className="bg-[#FFF200] text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
                      6637
                    </span>
                  </h2>
                  <p className="text-[11px] text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Customer Support Desk
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <button
                  onClick={handleResetChat}
                  title="Reset conversation"
                  aria-label="Reset conversation"
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <RotateCcw size={15} />
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  aria-label="Close chat window"
                  className="p-2 text-white/60 hover:text-white hover:bg-white/10 rounded-full transition-colors"
                >
                  <X size={18} />
                </button>
              </div>
            </div>

            {/* Quick Action Bar for Instant Hotline Calling */}
            <div className="bg-[#FFF200] px-4 py-2.5 flex items-center justify-between shadow-sm shrink-0">
              <div className="flex items-center gap-2 text-black">
                <Headphones size={16} className="text-black shrink-0" />
                <span className="text-xs font-bold tracking-tight">Direct Hotline Call Center</span>
              </div>
              <a
                href="tel:6637"
                className="inline-flex items-center gap-1.5 bg-black text-[#FFF200] hover:bg-zinc-800 text-xs font-bold px-3 py-1 rounded-full transition-all active:scale-95 shadow-sm"
              >
                <Phone size={12} />
                Dial 6637
              </a>
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 bg-zinc-50/50">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex flex-col ${msg.sender === "user" ? "items-end" : "items-start"}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl p-3.5 text-xs md:text-sm leading-relaxed shadow-sm ${
                      msg.sender === "user"
                        ? "bg-black text-white rounded-br-none"
                        : "bg-white text-zinc-800 border border-zinc-200/80 rounded-bl-none"
                    }`}
                  >
                    <div className="whitespace-pre-line font-medium">{msg.text}</div>
                    <div
                      className={`text-[10px] mt-1.5 ${
                        msg.sender === "user" ? "text-white/50 text-right" : "text-zinc-400 text-left"
                      }`}
                    >
                      {msg.timestamp}
                    </div>
                  </div>

                  {/* Interactive Options / Quick Reply Chips */}
                  {msg.options && msg.options.length > 0 && (
                    <div className="mt-2.5 flex flex-wrap gap-1.5 max-w-[95%]">
                      {msg.options.map((opt, i) => (
                        <button
                          key={i}
                          onClick={() => handleOptionClick(opt.action)}
                          className="text-[11px] font-semibold bg-white hover:bg-black hover:text-[#FFF200] text-zinc-800 px-3 py-1.5 rounded-full border border-zinc-200 shadow-sm transition-all duration-200 flex items-center gap-1 active:scale-95 text-left"
                        >
                          <span>{opt.label}</span>
                          <ChevronRight size={11} className="opacity-60" />
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              {isTyping && (
                <div className="flex items-center gap-1.5 bg-white p-3 rounded-2xl rounded-bl-none border border-zinc-200/80 w-16">
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "0ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "150ms" }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-zinc-400 animate-bounce" style={{ animationDelay: "300ms" }} />
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Quick Link Footer */}
            <div className="px-3 py-2 bg-zinc-100 border-t border-zinc-200 flex items-center justify-between text-[11px] text-zinc-600 shrink-0">
              <a
                href="tel:6637"
                className="flex items-center gap-1 font-bold text-black hover:underline"
              >
                <Phone size={11} className="text-black" />
                Short Code: 6637
              </a>
              <span className="text-zinc-300">|</span>
              <a
                href="https://wa.me/251913667537?text=Hello%20Droga%20Pharma"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-emerald-700 font-semibold hover:underline"
              >
                WhatsApp: +251 91 366 7537
                <ExternalLink size={10} />
              </a>
            </div>

            {/* Input Form */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 bg-white border-t border-zinc-200 flex items-center gap-2 shrink-0"
            >
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about products, hotline, branches..."
                className="flex-1 bg-zinc-100 border border-zinc-200 rounded-full px-4 py-2 text-xs text-black placeholder:text-zinc-400 focus:outline-none focus:border-black focus:bg-white transition-colors"
              />
              <button
                type="submit"
                disabled={!inputValue.trim()}
                aria-label="Send message"
                className="w-9 h-9 rounded-full bg-black text-[#FFF200] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-zinc-800 transition-colors shrink-0 shadow-sm"
              >
                <Send size={15} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </aside>
  );
};

export default CustomerSupportChat;
