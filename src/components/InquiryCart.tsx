import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, X, Send, Trash2, ChevronUp } from "lucide-react";
import { useInquiryStore, type InquiryItem } from "@/stores/inquiryStore";

const InquiryCart = () => {
  const { items, removeItem, clearItems, totalItems } = useInquiryStore();
  const [isOpen, setIsOpen] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", phone: "", company: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      clearItems();
      setSubmitted(false);
      setShowForm(false);
      setIsOpen(false);
    }, 3000);
  };

  return (
    <>
      {/* Floating button */}
      <AnimatePresence>
        {totalItems > 0 && (
          <motion.button
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(true)}
            className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-primary text-primary-foreground shadow-lg flex items-center justify-center"
          >
            <ShoppingBag size={22} />
            <span className="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-foreground text-background text-xs font-bold flex items-center justify-center">
              {totalItems}
            </span>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Slide-over panel */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 z-50 bg-foreground/20 backdrop-blur-sm"
            />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed right-0 top-0 bottom-0 z-50 w-full max-w-md bg-background shadow-2xl flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-border">
                <h2 className="font-display text-lg font-bold text-foreground">
                  Product Inquiry ({totalItems})
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground transition-colors">
                  <X size={20} />
                </button>
              </div>

              {/* Items */}
              <div className="flex-1 overflow-y-auto p-6">
                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-20"
                  >
                    <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Send size={24} className="text-primary" />
                    </div>
                    <h3 className="font-display text-xl font-bold text-foreground mb-2">Inquiry Sent!</h3>
                    <p className="text-muted-foreground text-sm">We'll get back to you within 24 hours.</p>
                  </motion.div>
                ) : showForm ? (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <button type="button" onClick={() => setShowForm(false)} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground mb-2">
                      <ChevronUp size={14} className="rotate-[-90deg]" /> Back to items
                    </button>
                    {[
                      { label: "Full Name *", key: "name", type: "text", required: true },
                      { label: "Email *", key: "email", type: "email", required: true },
                      { label: "Phone", key: "phone", type: "tel", required: false },
                      { label: "Company", key: "company", type: "text", required: false },
                    ].map((field) => (
                      <div key={field.key}>
                        <label className="text-xs font-medium text-muted-foreground block mb-1.5">{field.label}</label>
                        <input
                          type={field.type}
                          required={field.required}
                          value={form[field.key as keyof typeof form]}
                          onChange={(e) => setForm({ ...form, [field.key]: e.target.value })}
                          className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40"
                        />
                      </div>
                    ))}
                    <div>
                      <label className="text-xs font-medium text-muted-foreground block mb-1.5">Additional Notes</label>
                      <textarea
                        rows={3}
                        value={form.message}
                        onChange={(e) => setForm({ ...form, message: e.target.value })}
                        className="w-full px-4 py-2.5 rounded-lg border border-border bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 resize-none"
                      />
                    </div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="btn-primary w-full justify-center mt-2"
                    >
                      <Send size={16} /> Submit Inquiry
                    </motion.button>
                  </form>
                ) : (
                  <div className="flex flex-col gap-4">
                    {items.map((item) => (
                      <motion.div
                        key={item.name}
                        layout
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        className="flex items-start gap-4 p-4 rounded-lg border border-border bg-secondary/50"
                      >
                        <div className="flex-1 min-w-0">
                          <h4 className="font-display text-sm font-semibold text-foreground truncate">{item.name}</h4>
                          <p className="text-muted-foreground text-xs mt-0.5">{item.category}</p>
                          <p className="text-muted-foreground text-xs">{item.manufacturer} · {item.origin}</p>
                        </div>
                        <button
                          onClick={() => removeItem(item.name)}
                          className="text-muted-foreground hover:text-destructive transition-colors flex-shrink-0"
                        >
                          <Trash2 size={14} />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {!submitted && !showForm && items.length > 0 && (
                <div className="p-6 border-t border-border flex flex-col gap-3">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setShowForm(true)}
                    className="btn-primary w-full justify-center"
                  >
                    <Send size={16} /> Send Inquiry
                  </motion.button>
                  <button
                    onClick={clearItems}
                    className="text-xs text-muted-foreground hover:text-destructive transition-colors text-center"
                  >
                    Clear all items
                  </button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};

export default InquiryCart;
