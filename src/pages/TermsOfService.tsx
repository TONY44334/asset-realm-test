import { useEffect } from "react";
const sections = [
    { id: 'introduction', title: 'Introduction' },
    { id: 'marketplace-terms', title: 'Marketplace Terms' },
    { id: 'website-use', title: 'Terms of Website Use' },
    { id: 'acceptable-use', title: 'Acceptable Use Policy' },
    { id: 'privacy-policy', title: 'Privacy Policy' },
    { id: 'cookie-policy', title: 'Cookie Policy' },
    { id: 'governing-law', title: 'Governing Law & Jurisdiction' },
    { id: 'disclaimer', title: 'Disclaimer & Limitation of Liability' },
];

const TermsOfService = () => {
    useEffect(() => {
        window.scrollTo({ top: 0, behavior: 'smooth' }); 
      }, []);
    return (
        <div className="bg-[#0b0b1a] text-white min-h-screen font-[Orbitron]">
            <div className="max-w-7xl mx-auto flex flex-col  md:flex-row px-4 py-10 gap-8">
                {/* Sidebar */}
                <aside className="md:w-1/4 hidden md:block">
                    <nav className="space-y-4 text-sm">
                        <h2 className="text-purple-500 text-lg mb-4 font-semibold">📘 Sections</h2>
                        {sections.map((section) => (
                            <a
                                key={section.id}
                                href={`#${section.id}`}
                                className="block text-gray-400 hover:text-cyan-400 transition"
                            >
                                {section.title}
                            </a>
                        ))}
                    </nav>
                </aside>

                {/* Main Content */}
                <main className="md:w-3/4 space-y-16">
                    {/* Introduction */}
                    <section id="introduction" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Introduction</h2>
                        <p className="text-gray-300 mb-2">
                            Welcome to Bravyn Studios, a digital studio based in Hyderabad, India, dedicated to empowering developers and creators with high-quality game assets, tools, and services. Whether you're building a small indie game or a large-scale production, our platform is designed to support your creative journey.

                            These Terms of Service ("Terms") outline the rules and responsibilities that apply when you access or use our website, digital marketplace, downloadable content, or any other services provided by Bravyn Studios (collectively, the "Services").

                            By using our platform, you agree to be bound by these Terms. If you do not accept any part of them, you should not use our Services.

                            Bravyn Studios complies with applicable Indian laws, including the Information Technology Act, 2000, and the Indian Contract Act, 1872. We may update these Terms from time to time, and your continued use of our Services means you accept any changes.

                            We are committed to creating a safe, creative, and respectful environment for all users. If you have any questions, feel free to contact our support team.

                            Let’s build something great — together.
                        </p>
                        <p className="text-gray-400">
                            These Terms are aligned with the <strong>Information Technology Act, 2000</strong>, the{" "}
                            <strong>Indian Contract Act, 1872</strong>, and the <strong>Companies Act, 2013</strong>.
                        </p>
                    </section>

                    {/* Marketplace Terms */}
                    <section id="marketplace-terms" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Marketplace Terms</h2>
                        <p className="text-gray-300 mb-4">
                            Our platform allows creators ("Sellers") to license digital assets to users ("Buyers").
                            Licenses grant non-exclusive, non-transferable rights for personal or commercial use,
                            depending on the asset’s terms.
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-2">
                            <li><strong>Assets</strong>: Include models, sprites, UI kits, audio, VFX, etc.</li>
                            <li><strong>Licensed Assets</strong>: Can be used in commercial or personal projects, but redistribution is prohibited.</li>
                            <li><strong>Derivatives</strong>: You may modify assets, but not claim original ownership.</li>
                        </ul>
                    </section>

                    {/* Website Use */}
                    <section id="website-use" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Terms of Website Use</h2>
                        <p className="text-gray-400">
                            By using our site, you agree not to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-1 mt-2">
                            <li>Violate applicable Indian laws or third-party rights.</li>
                            <li>Exploit our services for unauthorized commercial gain.</li>
                            <li>Scrape, hack, or inject malicious code into our site.</li>
                        </ul>
                    </section>

                    {/* Acceptable Use Policy */}
                    <section id="acceptable-use" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Acceptable Use Policy</h2>
                        <p className="text-gray-400 mb-2">
                            Our platform is a community of creators and developers. You agree to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-1">
                            <li>Respect intellectual property and copyright laws.</li>
                            <li>Refrain from harassing or impersonating other users.</li>
                            <li>Not post or share illegal or adult content.</li>
                            <li>Report misuse to our support team immediately.</li>
                        </ul>
                    </section>

                    {/* Privacy Policy */}
                    <section id="privacy-policy" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Privacy Policy</h2>
                        <p className="text-gray-400 mb-2">
                            We value your privacy and comply with the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011.
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-1">
                            <li>We collect basic user data: name, email, and usage logs.</li>
                            <li>Your data is stored securely and never sold.</li>
                            <li>You can request deletion of your data at any time.</li>
                        </ul>
                    </section>

                    {/* Cookie Policy */}
                    <section id="cookie-policy" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Cookie Policy</h2>
                        <p className="text-gray-400 mb-2">
                            We use cookies to:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-1">
                            <li>Maintain session logins</li>
                            <li>Analyze user traffic via analytics tools</li>
                            <li>Improve user experience based on preferences</li>
                        </ul>
                        <p className="text-gray-400 mt-2">
                            You can disable cookies in your browser settings, though some features may not work as intended.
                        </p>
                    </section>

                    {/* Governing Law */}
                    <section id="governing-law" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Governing Law & Jurisdiction</h2>
                        <p className="text-gray-400">
                            These Terms are governed by the laws of India. Any disputes arising out of these Terms shall be subject to the exclusive jurisdiction of the courts in Hyderabad, Telangana.
                        </p>
                    </section>

                    {/* Disclaimer */}
                    <section id="disclaimer" className="scroll-mt-32">
                        <h2 className="text-2xl text-purple-400 font-bold mb-4">Disclaimer & Limitation of Liability</h2>
                        <p className="text-gray-400 mb-2">
                            Our services are provided "as is". Bravyn Studios is not liable for:
                        </p>
                        <ul className="list-disc pl-6 text-gray-400 space-y-1">
                            <li>Loss of data, profits, or revenue</li>
                            <li>Damage from misuse or unauthorized access</li>
                            <li>Downtime or bugs within provided assets</li>
                        </ul>
                    </section>
                </main>
            </div>
        </div>
    );
};

export default TermsOfService;
