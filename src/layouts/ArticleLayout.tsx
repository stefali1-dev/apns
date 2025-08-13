import { useState } from 'react';
import Layout from "./NavbarLayout";
import { subscribeUser } from '@/lib/services/subscriptionService';

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setLoading(true);
        setMessage(null);

        try {
            const result = await subscribeUser(email);
            if (result.success) {
                setMessage({ type: 'success', text: 'Te-ai abonat cu succes la newsletter!' });
                setEmail('');
            } else {
                setMessage({ type: 'error', text: result.message || 'A apărut o eroare la abonare.' });
            }
        } catch (error) {
            setMessage({ type: 'error', text: 'A apărut o eroare neașteptată.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <Layout>
            <div className="max-w-3xl mx-auto px-6 bg-white pt-16">
                <main>{children}</main>
            </div>
            <section className="bg-gray-50 py-16 mt-12 w-full">
                <div className="max-w-screen-xl mx-auto px-6 text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-6">Alătură-te comunității noastre</h2>
                    <p className="text-lg text-gray-600 mb-8">
                        Abonează-te la newsletter pentru a primi cele mai noi articole și resurse nutriționale
                    </p>
                    <form onSubmit={handleSubscribe} className="max-w-md mx-auto flex gap-4">
                        <input 
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Adresa ta de email"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#09a252]"
                            required
                            disabled={loading}
                        />
                        <button 
                            type="submit"
                            disabled={loading}
                            className="bg-[#09a252] text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Se procesează...' : 'Abonează-te'}
                        </button>
                    </form>
                    
                    {message && (
                        <div className={`mt-4 p-3 rounded-lg max-w-md mx-auto ${
                            message.type === 'success' 
                                ? 'bg-green-100 text-green-800 border border-green-200' 
                                : 'bg-red-100 text-red-800 border border-red-200'
                        }`}>
                            {message.text}
                        </div>
                    )}
                </div>
            </section>
            <div className="py-4 mx-auto disclaimer text-sm text-gray-600 bg-gray-50 rounded-lg">
                <p className="max-w-3xl mx-auto mb-2"><strong>Notă importantă:</strong> Informațiile din acest articol sunt destinate scopurilor educaționale și nu constituie sfaturi medicale.</p>
            </div>
        </Layout>
    )
}
