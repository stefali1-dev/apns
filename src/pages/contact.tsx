import React, { useState } from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';

interface ContactPageProps {
    tel_1?: string;
    tel_2?: string;
    contact_email?: string;
    address_street?: string;
    address_city?: string;
}

const ContactPage: React.FC<ContactPageProps> = ({
    tel_1 = '0727 590 656',
    tel_2 = '0311 234 567',
    contact_email = 'contact@appns.ro',
    address_street = '',
    address_city = 'Iași'
}) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        subject: '',
        message: '',
        privacy: false,
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitSuccess, setSubmitSuccess] = useState(false);
    const [submitError, setSubmitError] = useState('');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value, type } = e.target;
        const checked = type === 'checkbox' ? (e.target as HTMLInputElement).checked : undefined;

        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setSubmitError('');

        try {
            // Replace with your actual API endpoint
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                setSubmitSuccess(true);
                setFormData({
                    name: '',
                    email: '',
                    phone: '',
                    subject: '',
                    message: '',
                    privacy: false,
                });
            } else {
                setSubmitError('A apărut o eroare. Vă rugăm să încercați din nou.');
            }
        } catch (error) {
            setSubmitError('Eroare de rețea. Vă rugăm să încercați din nou.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <Layout>
            <Head>
                <title>Contact - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
                <meta name="description" content="Contactează APNS pentru programe educaționale, consultanță nutrițională, parteneriate sau volunteering. Suntem aici să te ajutăm cu orice întrebări despre nutriția sănătoasă." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>


            <div className="bg-green-50 min-h-screen">

                {/* Hero Section */}
                <section className="bg-[#09a252] relative overflow-hidden">

                    <div className="relative max-w-screen-xl mx-auto px-6 py-20">
                        <div className="text-center text-white">
                            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Contactează-ne
                            </h1>

                            <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                                Ai întrebări despre nutriție sau vrei să colaborăm? Echipa noastră îți stă la dispoziție
                            </p>
                        </div>
                    </div>
                </section>

                {/* Transition section */}
                <div className="bg-green-50 py-6">
                    <div className="container mx-auto px-4">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center space-x-4">
                                <span className="h-px w-12 bg-green-300"></span>
                                <span className="text-[#09a252] font-medium">Cum ne poți contacta?</span>
                                <span className="h-px w-12 bg-green-300"></span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Main content */}
                <div className="container mx-auto px-4 py-8">
                    <div className="max-w-3xl mx-auto">
                        {/* Contact information */}
                        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Datele noastre de contact</h2>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {/* Phones and email */}
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-1">Telefon</h3>
                                            <p className="mb-1">{tel_1}</p>
                                            {/* <p>{tel_2}</p> */}
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-1">Email</h3>
                                            <p>{contact_email}</p>
                                        </div>
                                    </div>

                                </div>

                                {/* Address and social */}
                                <div className="space-y-6">
                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-1">Adresă</h3>
                                            <p className="mb-1">{address_street}</p>
                                            <p>{address_city}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start">
                                        <div className="bg-green-100 p-3 rounded-full mr-4 flex-shrink-0">
                                            <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1"></path>
                                            </svg>
                                        </div>
                                        <div>
                                            <h3 className="font-semibold text-green-800 mb-1">Social media</h3>
                                            <div className="flex space-x-4 mt-2">
                                                <a href="https://www.facebook.com/100079147316822" className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition-colors">
                                                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                                                    </svg>
                                                </a>
                                                <a href="https://www.instagram.com/apns.iasi/" className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition-colors">
                                                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z" />
                                                    </svg>
                                                </a>
                                                <a href="https://www.tiktok.com/@apns.iasi" className="bg-green-100 hover:bg-green-200 p-2 rounded-full transition-colors">
                                                    <svg className="w-5 h-5 text-[#09a252]" viewBox="0 0 512 512" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M412.19,118.66a109.27,109.27,0,0,1-9.45-5.5,132.87,132.87,0,0,1-24.27-20.62c-18.1-20.71-24.86-41.72-27.35-56.43h.1C349.14,23.9,350,16,350.13,16H267.69V334.78c0,4.28,0,8.51-.18,12.69,0,.52-.05,1-.08,1.56,0,.23,0,.47-.05.71,0,.06,0,.12,0,.18a70,70,0,0,1-35.22,55.56,68.8,68.8,0,0,1-34.11,9c-38.41,0-69.54-31.32-69.54-70s31.13-70,69.54-70a68.9,68.9,0,0,1,21.41,3.39l.1-83.94a153.14,153.14,0,0,0-118,34.52,161.79,161.79,0,0,0-35.3,43.53c-3.48,6-16.61,30.11-18.2,69.24-1,22.21,5.67,45.22,8.85,54.73v.2c2,5.6,9.75,24.71,22.38,40.82A167.53,167.53,0,0,0,115,470.66v-.2l.2.2C155.11,497.78,199.36,496,199.36,496c7.66-.31,33.32,0,62.46-13.81,32.32-15.31,50.72-38.12,50.72-38.12a158.46,158.46,0,0,0,27.64-45.93c7.46-19.61,9.95-43.13,9.95-52.53V176.49c1,.6,14.32,9.41,14.32,9.41s19.19,12.3,49.13,20.31c21.48,5.7,50.42,6.9,50.42,6.9V131.27C453.86,132.37,433.27,129.17,412.19,118.66Z"/>
                                                    </svg>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Contact form */}
                        <div id="contact-form" className="bg-white rounded-lg shadow-lg p-8 mb-8">
                            <h2 className="text-2xl font-bold text-[#09a252] mb-4">Trimite-ne un mesaj</h2>
                            <p className="mb-6">Completează formularul de mai jos și te vom contacta în cel mai scurt timp posibil.</p>

                            {submitSuccess ? (
                                <div className="bg-green-100 border border-green-400 text-[#09a252] px-4 py-3 rounded relative mb-6">
                                    <strong className="font-bold">Succes!</strong>
                                    <span className="block sm:inline"> Mesajul tău a fost trimis. Vă vom contacta în curând.</span>
                                </div>
                            ) : null}

                            {submitError ? (
                                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-6">
                                    <strong className="font-bold">Eroare!</strong>
                                    <span className="block sm:inline"> {submitError}</span>
                                </div>
                            ) : null}

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label htmlFor="name" className="block text-sm font-medium text-green-800 mb-1">
                                            Nume complet
                                        </label>
                                        <input
                                            type="text"
                                            id="name"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email" className="block text-sm font-medium text-green-800 mb-1">
                                            Email
                                        </label>
                                        <input
                                            type="email"
                                            id="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-green-800 mb-1">
                                        Telefon (opțional)
                                    </label>
                                    <input
                                        type="tel"
                                        id="phone"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-green-800 mb-1">
                                        Mesaj
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        rows={5}
                                        value={formData.message}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 border border-green-300 rounded-lg focus:ring-green-500 focus:border-green-500"
                                        required
                                    ></textarea>
                                </div>

                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input
                                            id="privacy"
                                            name="privacy"
                                            type="checkbox"
                                            checked={formData.privacy}
                                            onChange={handleChange}
                                            className="h-4 w-4 text-[#09a252] border-green-300 rounded focus:ring-green-500"
                                            required
                                        />
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="privacy" className="text-gray-600">
                                            Sunt de acord cu <a href="/confidentialitate" className="text-[#09a252] underline" target="_blank" rel="noopener noreferrer">politica de confidențialitate</a> a Asociației pentru Promovarea Nutriției Sănătoase
                                        </label>
                                    </div>
                                </div>

                                <div>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full bg-[#09a252] text-white py-3 px-6 rounded-lg hover:bg-[#09a252] transition duration-300 font-medium disabled:opacity-70"
                                    >
                                        {isSubmitting ? 'Se trimite...' : 'Trimite mesajul'}
                                    </button>
                                </div>
                            </form>
                        </div>

                        {/* Call to action */}
                        <div className="bg-gradient-to-r from-[#09a252] to-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
                            <h2 className="text-3xl font-bold mb-4">Hai să colaborăm!</h2>
                            <p className="text-lg mb-6">Suntem mereu deschiși la noi parteneriate și proiecte. Contactează-ne pentru a discuta despre cum putem lucra împreună pentru o comunitate mai sănătoasă.</p>
                            <a href="#contact-form" className="bg-white text-[#09a252] hover:bg-green-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-block">
                                Programează o întâlnire
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
};

export default ContactPage;