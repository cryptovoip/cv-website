"use client";

import { motion } from "framer-motion";
import { Mail, MapPin, Send, Loader2 } from "lucide-react";
import { useState } from "react";

export default function Contact() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        message: ""
    });
    const [status, setStatus] = useState<{ type: 'success' | 'error' | null, message: string }>({ type: null, message: "" });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setStatus({ type: null, message: "" });

        try {
            const response = await fetch("/api/contact", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setStatus({ type: "success", message: "Message sent! We'll get back to you shortly." });
                setFormData({ firstName: "", lastName: "", email: "", message: "" });
            } else {
                setStatus({ type: "error", message: data.error || "Failed to send message. Please try again." });
            }
        } catch (error) {
            setStatus({ type: "error", message: "An error occurred. Please check your connection." });
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                >
                    <span className="text-primary font-semibold tracking-wider uppercase text-sm mb-4 block">Get in Touch</span>
                    <h1 className="text-4xl md:text-6xl font-bold mb-6">Let&apos;s build something secure together.</h1>
                    <p className="text-lg text-gray-400 mb-10">
                        Reach out to our experts to discuss how CryptoVoip can transform and secure your organization&apos;s technological foundation.
                    </p>

                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <Mail className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email Us</p>
                                <p className="font-semibold">contact@cryptovoip.in</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center">
                                <MapPin className="text-primary w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Headquarters</p>
                                <p className="font-semibold text-sm">Insta Office, DSquare Complex, 18, Roorkee Rd, Daurli, Meerut, Uttar Pradesh 250001</p>
                            </div>
                        </div>
                    </div>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="bg-dark-bg p-8 md:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden"
                >
                    <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50"></div>
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">First Name</label>
                                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="John" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-400 mb-2">Last Name</label>
                                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="Doe" />
                            </div>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Email Address</label>
                            <input type="email" name="email" value={formData.email} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition" placeholder="john@company.com" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-400 mb-2">Message</label>
                            <textarea rows={4} name="message" value={formData.message} onChange={handleChange} required className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition resize-none" placeholder="How can we help you?"></textarea>
                        </div>

                        {status.message && (
                            <div className={`p-4 rounded-xl text-sm font-medium flex items-center gap-2 ${status.type === 'success' ? 'bg-primary/20 text-primary border border-primary/30' : 'bg-red-500/10 text-red-500 border border-red-500/30'}`}>
                                {status.message}
                            </div>
                        )}

                        <button disabled={isSubmitting} className="w-full bg-primary disabled:opacity-70 disabled:cursor-not-allowed text-black font-bold text-lg py-4 rounded-xl hover:bg-primary/90 transition transform hover:scale-[1.02] flex items-center justify-center gap-2">
                            {isSubmitting ? (
                                <>Sending... <Loader2 className="w-5 h-5 animate-spin" /></>
                            ) : (
                                <>Send Message <Send className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>
                </motion.div>
            </div>
        </div>
    );
}
