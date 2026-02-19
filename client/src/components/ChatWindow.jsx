import { useState, useRef, useEffect } from "react";
import { sendMessage } from "../services/api";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { TypingIndicator } from "./TypingIndicator";
import { motion, AnimatePresence } from "framer-motion";
import { Send } from "lucide-react";

export default function ChatWindow() {
    const [messages, setMessages] = useState([
        { text: "Hello! I'm your mental health support assistant. How are you feeling today?", sender: "bot" }
    ]);
    const [input, setInput] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMsg = { text: input, sender: "user" };
        setMessages((prev) => [...prev, userMsg]);
        setInput("");
        setIsTyping(true);

        try {
            const reply = await sendMessage(input);
            const botMsg = { text: reply, sender: "bot" };
            setMessages((prev) => [...prev, botMsg]);
        } catch (error) {
            console.error("Failed to send message", error);
            setMessages((prev) => [...prev, { text: "I'm having trouble connecting right now. Please try again.", sender: "bot" }]);
        } finally {
            setIsTyping(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            handleSend();
        }
    };

    return (
        <div className="flex flex-col h-full bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 font-sans">
            {/* Header */}
            <div className="bg-white/80 backdrop-blur-md border-b border-emerald-100 p-3 md:p-4 shadow-sm sticky top-0 z-10">
                <h1 className="text-lg md:text-xl font-semibold text-emerald-900">Mindful Chat</h1>
                <p className="text-xs md:text-sm text-emerald-600">Here to listen and support</p>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-2 md:p-4 space-y-4">
                <AnimatePresence initial={false}>
                    {messages.map((msg, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10, scale: 0.95 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            transition={{ duration: 0.3 }}
                            className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
                        >
                            <div
                                className={`max-w-[85%] md:max-w-[80%] p-3 md:p-4 rounded-2xl shadow-sm text-sm leading-relaxed ${msg.sender === "user"
                                    ? "bg-gradient-to-r from-emerald-500 to-teal-600 text-white rounded-br-none shadow-emerald-200"
                                    : "bg-white/90 backdrop-blur-sm text-slate-700 border border-emerald-100 rounded-bl-none shadow-sm"
                                    }`}
                            >
                                {msg.text.split('\n').map((line, i) => (
                                    <p key={i} className={i > 0 ? "mt-2" : ""}>{line}</p>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>

                {isTyping && (
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        className="flex justify-start"
                    >
                        <TypingIndicator />
                    </motion.div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="bg-white/80 backdrop-blur-md p-3 md:p-4 border-t border-emerald-100 sticky bottom-0 z-10">
                <div className="flex gap-2 md:gap-3 max-w-3xl mx-auto">
                    <Input
                        className="rounded-full bg-white border-emerald-200 focus:ring-emerald-400 text-base shadow-sm"
                        placeholder="Type your message..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyDown={handleKeyDown}
                        disabled={isTyping}
                    />
                    <Button
                        onClick={handleSend}
                        variant="primary"
                        size="icon"
                        className="rounded-full h-10 w-10 shrink-0 shadow-md shadow-emerald-200"
                        disabled={!input.trim() || isTyping}
                        aria-label="Send message"
                    >
                        <Send className="w-5 h-5" />
                    </Button>
                </div>
            </div>
        </div>
    );
}
