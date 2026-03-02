import Link from "next/link";

export default function Footer() {
    return (
        <footer className="bg-[#03060C] text-gray-400 pt-16 pb-8 border-t border-white/10 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-2">
                        <h3 className="text-2xl font-bold text-white mb-4">CryptoVoip</h3>
                        <p className="max-w-sm">
                            We provide technology that thinks securely. Connect every CCTV brand,
                            protect your video, and enhance your digital foundation with advanced AI.
                        </p>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Quick Links</h4>
                        <ul className="space-y-2">
                            <li><Link href="/about-us" className="hover:text-primary transition">About Us</Link></li>
                            <li><Link href="/solutions" className="hover:text-primary transition">Solutions</Link></li>
                            <li><Link href="/mdm" className="hover:text-primary transition">MDM Product</Link></li>
                            <li><Link href="/contact" className="hover:text-primary transition">Contact</Link></li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="text-lg font-bold text-white mb-4">Contact Info</h4>
                        <ul className="space-y-2">
                            <li>contact@cryptovoip.in</li>
                            <li>+1 (555) 123-4567</li>
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
