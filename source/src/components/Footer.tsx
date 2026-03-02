import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#03060C] text-gray-400 pt-16 pb-8 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">CryptoVoip</h3>
                        <p className="max-w-sm">
                            CryptoVoIP developed the open-source OpenNVR platform and the completely offline CV MDM. Alongside our core products, we provide expert VoIP & WebRTC consulting services and custom Voice & Video Bot development. Hire the best industry consultants to win.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about-us" className="hover:text-primary transition">About Us</Link></li>
                            <li><Link href="/solutions" className="hover:text-primary transition">OpenNVR</Link></li>
                            <li><Link href="/mdm" className="hover:text-primary transition">CV MDM</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
                        <ul className="space-y-2">
                            <li>contact@cryptovoip.in</li>
                        </ul>
                    </div>
                </div>
                <div className="pt-8 border-t border-white/10 text-center text-sm">
                    <p>&copy; {new Date().getFullYear()} CryptoVoip Technologies. All rights reserved.</p>
                </div>
            </div>
        </footer>
    );
}
