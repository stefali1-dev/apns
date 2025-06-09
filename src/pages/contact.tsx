import { useState } from 'react';
import Head from 'next/head';
import Link from 'next/link';

export default function ContactPage() {
    const [selectedFaq, setSelectedFaq] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        type: 'general'
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const contactMethods = [
        {
            icon: "📧",
            title: "Email Principal",
            details: "contact@apns.ro",
            description: "Răspundem în maxim 24 de ore"
        },
        {
            icon: "📞",
            title: "Telefon",
            details: "0721 123 456",
            description: ""
        }
    ];

    const socialMedia = [
        {
            platform: "Facebook",
            handle: "@APNSRomania",
            url: "https://facebook.com/APNSRomania",
            icon: "📘"
        },
        {
            platform: "Instagram",
            handle: "@apns_romania",
            url: "https://instagram.com/apns_romania",
            icon: "📷"
        },
        {
            platform: "LinkedIn",
            handle: "APNS România",
            url: "https://linkedin.com/company/apns-romania",
            icon: "💼"
        },
        {
            platform: "YouTube",
            handle: "APNS România",
            url: "https://youtube.com/@APNSRomania",
            icon: "📺"
        }
    ];

    const faqData = [
        {
            id: 1,
            question: "Cum pot deveni voluntar la APNS?",
            answer: "Apreciez interesul tău! Trimite-ne un CV și o scrisoare de intenție la voluntariat@apns.ro. Organizăm sesiuni de orientare pentru voluntari în fiecare luna, unde vei afla despre programele noastre și cum te poți implica."
        },
        {
            id: 2,
            question: "Oferiți consultații nutriționale individuale?",
            answer: "APNS se concentrează pe educația nutrițională comunitară și nu oferă consultații individuale. Însă putem să te conectăm cu nutriționiști certificați din rețeaua noastră de parteneri."
        },
        {
            id: 3,
            question: "Cum pot invita APNS să țină un workshop la școala copilului meu?",
            answer: "Contactează-ne la educatie@apns.ro cu detaliile școlii (nume, adresă, numărul de elevi). Vom programa o întâlnire cu conducerea școlii pentru a discuta programul educațional potrivit."
        },
        {
            id: 4,
            question: "Sunt întreprindere - cum pot sponsoriza programele APNS?",
            answer: "Ne bucurăm să discutăm despre parteneriate corporate! Scrie-ne la parteneriate@apns.ro cu detaliile companiei și bugetul disponibil. Avem pachete de sponsorizare personalizate."
        },
        {
            id: 5,
            question: "Unde pot găsi materialele educaționale gratuite?",
            answer: "Toate materialele noastre educaționale sunt disponibile gratuit pe secțiunea 'Resurse' a site-ului. Poți descărca ghiduri, broșuri și planuri de lecții pentru diferite grupe de vârstă."
        },
        {
            id: 6,
            question: "Cum pot deveni membru APNS?",
            answer: "Calitatea de membru este deschisă profesioniștilor din domeniul nutriției, educației și sănătății publice. Trimite-ne CV-ul și o scrisoare de motivație la membri@apns.ro pentru a afla despre procesul de înscriere."
        }
    ];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulare trimitere formular
        setTimeout(() => {
            setSubmitStatus('success');
            setIsSubmitting(false);
            setFormData({
                name: '',
                email: '',
                phone: '',
                subject: '',
                message: '',
                type: 'general'
            });
        }, 2000);
    };

    const toggleFaq = (id: number) => {
        setSelectedFaq(selectedFaq === id ? null : id);
    };

    return (
        <>
            <Head>
                <title>Contact - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Contactează APNS pentru programe educaționale, consultanță nutrițională, parteneriate sau volunteering. Suntem aici să te ajutăm cu orice întrebări despre nutriția sănătoasă." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #10b968 0%, #059646 100%);
        }
        
        .card-hover {
          transition: all 0.3s ease;
        }
        
        .card-hover:hover {
          transform: translateY(-5px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.1);
        }

        .contact-card {
          background: white;
          border-radius: 16px;
          padding: 1.5rem;
          box-shadow: 0 4px 12px rgba(0,0,0,0.1);
          transition: all 0.3s ease;
        }

        .contact-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0,0,0,0.15);
        }

        .form-input {
          border: 2px solid #e5e7eb;
          border-radius: 8px;
          padding: 0.75rem;
          transition: border-color 0.3s ease;
        }

        .form-input:focus {
          border-color: #10b968;
          outline: none;
          box-shadow: 0 0 0 3px rgba(16, 185, 104, 0.1);
        }
      `}</style>

            <div className="min-h-screen bg-white">
                {/* Hero Section */}
                <section className="gradient-bg relative overflow-hidden">
                    <div className="absolute inset-0">
                        <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
                        <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
                    </div>

                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Hai să vorbim despre<br />
                                <span className="text-green-200">nutriția sănătoasă</span>
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Suntem aici să răspundem la întrebările tale și să te ajutăm să te implici
                                în misiunea noastră de educație nutrițională.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <div className="text-3xl mb-2">⚡</div>
                                    <div className="font-semibold mb-1">Răspuns Rapid</div>
                                    <div className="text-sm text-green-100">În maxim 24 de ore</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <div className="text-3xl mb-2">🤝</div>
                                    <div className="font-semibold mb-1">Suport Dedicat</div>
                                    <div className="text-sm text-green-100">Echipă de specialiști</div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
                                    <div className="text-3xl mb-2">🌟</div>
                                    <div className="font-semibold mb-1">Resurse Gratuite</div>
                                    <div className="text-sm text-green-100">Materiale educaționale</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Methods */}
                <section className="py-20 bg-gray-50">
                    <div className="max-w-screen-xl mx-auto px-6">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
                                Modalități de contact
                            </h2>
                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Alege modalitatea care ți se potrivește cel mai bine pentru a lua legătura cu noi.
                            </p>
                            {/* ADDED SOCIAL MEDIA ICONS */}
                            <div className="flex justify-center gap-8 mt-8">
                                <a
                                    href="https://facebook.com/APNSRomania"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Facebook"
                                    className="group"
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        className="transition-transform duration-200 group-hover:scale-110"
                                    >
                                        <circle cx="20" cy="20" r="20" fill="#1877F3" />
                                        <path
                                            d="M25.333 20.001h-3.111v9.333h-3.778v-9.333h-2V17.001h2v-1.556c0-2.222 1.111-3.445 3.556-3.445h2.222v2.667h-1.333c-.889 0-1.111.333-1.111 1.111v1.223h2.556l-.334 3h-2.222v9.333h3.778v-9.333h2.223l.334-3z"
                                            fill="#fff"
                                        />
                                    </svg>
                                </a>
                                <a
                                    href="https://instagram.com/apns_romania"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Instagram"
                                    className="group"
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        className="transition-transform duration-200 group-hover:scale-110"
                                    >
                                        <circle cx="20" cy="20" r="20" fill="#E1306C" />
                                        <rect x="12" y="12" width="16" height="16" rx="5" fill="none" stroke="#fff" strokeWidth="2"/>
                                        <circle cx="20" cy="20" r="4" fill="none" stroke="#fff" strokeWidth="2"/>
                                        <circle cx="26" cy="14" r="1" fill="#fff"/>
                                    </svg>
                                </a>
                                <a
                                    href="https://www.tiktok.com/@apns_romania"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="TikTok"
                                    className="group"
                                >
                                    <svg
                                        width="40"
                                        height="40"
                                        viewBox="0 0 40 40"
                                        fill="none"
                                        className="transition-transform duration-200 group-hover:scale-110"
                                    >
                                        <circle cx="20" cy="20" r="20" fill="#000" />
                                        <path
                                            d="M25.5 15.5v6.25a4.25 4.25 0 1 1-4.25-4.25"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                        <path
                                            d="M25.5 17.5c1.1 0 2.5-.9 2.5-2.5V15c-1.1 0-2.5-.9-2.5-2.5V10"
                                            stroke="#fff"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        />
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-6 mb-12 max-w-2xl mx-auto">
                            {contactMethods.map((method, index) => (
                                <div key={index} className="contact-card text-center">
                                    <div className="text-4xl mb-4">{method.icon}</div>
                                    <h3 className="font-bold text-gray-800 mb-2">{method.title}</h3>
                                    <div className="text-green-600 font-semibold mb-2">{method.details}</div>
                                    <p className="text-sm text-gray-600">{method.description}</p>
                                </div>
                            ))}
                        </div>

                        {/* Contact Form */}
                        <div className="max-w-2xl mx-auto">
                            <div className="bg-white rounded-2xl p-8 shadow-lg">
                                <h3 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                                    Trimite-ne un mesaj
                                </h3>

                                {submitStatus === 'success' && (
                                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6 text-center">
                                        <div className="text-green-800 font-semibold mb-1">✅ Mesaj trimis cu succes!</div>
                                        <div className="text-green-700 text-sm">Îți vom răspunde în maxim 24 de ore.</div>
                                    </div>
                                )}

                                <form onSubmit={handleSubmit} className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Nume complet *
                                            </label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input w-full"
                                                placeholder="Introdu numele tău"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Email *
                                            </label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleInputChange}
                                                required
                                                className="form-input w-full"
                                                placeholder="nume@email.com"
                                            />
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Telefon
                                            </label>
                                            <input
                                                type="tel"
                                                name="phone"
                                                value={formData.phone}
                                                onChange={handleInputChange}
                                                className="form-input w-full"
                                                placeholder="0722 123 456"
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                                Tipul solicitării
                                            </label>
                                            <select
                                                name="type"
                                                value={formData.type}
                                                onChange={handleInputChange}
                                                className="form-input w-full"
                                            >
                                                <option value="general">Întrebări generale</option>
                                                <option value="education">Programe educaționale</option>
                                                <option value="volunteer">Volunteering</option>
                                                <option value="partnership">Parteneriate</option>
                                                <option value="donation">Donații</option>
                                                <option value="media">Presă și media</option>
                                            </select>
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Subiect *
                                        </label>
                                        <input
                                            type="text"
                                            name="subject"
                                            value={formData.subject}
                                            onChange={handleInputChange}
                                            required
                                            className="form-input w-full"
                                            placeholder="Pe scurt, despre ce vrei să discutăm"
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-semibold text-gray-700 mb-2">
                                            Mesaj *
                                        </label>
                                        <textarea
                                            name="message"
                                            value={formData.message}
                                            onChange={handleInputChange}
                                            required
                                            rows={5}
                                            className="form-input w-full resize-vertical"
                                            placeholder="Descrie-ne în detaliu solicitarea ta..."
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-green-600 text-white font-bold py-4 px-6 rounded-xl hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
                                    >
                                        {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>


                {/* CTA Section */}
                <section className="py-20 gradient-bg">
                    <div className="max-w-4xl mx-auto px-6 text-center text-white">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">
                            Să construim împreună o România mai sănătoasă
                        </h2>
                        <p className="text-xl mb-8 text-green-100">
                            Indiferent dacă vrei să te implici ca voluntar, să susții financiar programele noastre
                            sau să colaborezi cu noi, suntem aici să te ajutăm.
                        </p>

                        <div className="flex flex-col md:flex-row gap-4 justify-center">
                            <Link
                                href="/donate"
                                className="bg-white text-green-600 font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
                            >
                                💚 Susține-ne prin donații
                            </Link>

                            <Link
                                href="#"
                                className="border-2 border-white text-white font-semibold px-8 py-4 rounded-xl hover:bg-white hover:text-green-600 transition-all duration-300"
                            >
                                🤝 Devino voluntar
                            </Link>
                        </div>

                        <div className="mt-8 text-sm text-green-200">
                            <div>📧 contact@apns.ro | 📞 0721 123 456</div>
                            <div className="mt-2">Strada Sănătății nr. 15, Sector 1, București</div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}