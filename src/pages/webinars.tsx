import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Layout from "@/layouts/NavbarLayout";

// Type definitions
type WebinarStatus = 'upcoming' | 'live' | 'completed';

interface Webinar {
    id: number;
    title: string;
    description: string;
    image: string;
    date: string;
    time: string;
    duration: string;
    presenter: string;
    status: WebinarStatus;
    registrationLink: string;
}

// Registration data interface
interface WebinarRegistration {
    email: string;
    webinarId: number;
    registrationDate: string;
}

// Mock webinars data - in a real app, this would come from an API or database
const mockWebinars: Webinar[] = [
    {
        id: 1,
        title: "Nutriția în Viața de Zi cu Zi",
        description: "Sfaturi simple pentru a integra obiceiuri alimentare sănătoase în viața de zi cu zi.",
        image: "/images/webinar1.jpg",
        date: "2025-06-15",
        time: "18:00",
        duration: "60 min",
        presenter: "Dr. Maria Popescu",
        status: "upcoming", // upcoming, live, completed
        registrationLink: "/register/webinar-1"
    },
    {
        id: 2,
        title: "Importanța Mic Dejunului Echilibrat",
        description: "Descoperă de ce micul dejun este cea mai importantă masă a zilei și cum să îl faci sănătos și gustos.",
        image: "/images/webinar2.jpg",
        date: "2025-06-22",
        time: "10:00",
        duration: "45 min",
        presenter: "Dr. Andrei Ionescu",
        status: "upcoming",
        registrationLink: "/register/webinar-2"
    }
];

// Registration Modal Component
const WebinarRegistrationModal = ({
    isOpen,
    onClose,
    webinar
}: {
    isOpen: boolean;
    onClose: () => void;
    webinar: Webinar | null;
}) => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [error, setError] = useState('');

    // Reset form when modal opens/closes
    useEffect(() => {
        if (!isOpen) {
            setEmail('');
            setIsSubmitting(false);
            setIsSuccess(false);
            setError('');
        }
    }, [isOpen]);

    // Simulate database save
    const saveRegistration = async (registrationData: WebinarRegistration): Promise<boolean> => {
        // TODO: Replace with actual API call to save registration
        // Simulate API call delay
        await new Promise(resolve => setTimeout(resolve, 2000));

        // Simulate random success/failure (90% success rate)
        const success = true;

        if (success) {
            console.log('Registration saved:', registrationData);
            // In real app, this would be: await api.post('/registrations', registrationData)
            return true;
        } else {
            throw new Error('Eroare la salvarea înregistrării. Te rugăm să încercezi din nou.');
        }
    };

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!webinar) return;

        setError('');

        // Validate email
        if (!email.trim()) {
            setError('Te rugăm să introduci adresa de email.');
            return;
        }

        if (!validateEmail(email)) {
            setError('Te rugăm să introduci o adresă de email validă.');
            return;
        }

        setIsSubmitting(true);

        try {
            const registrationData: WebinarRegistration = {
                email: email.trim(),
                webinarId: webinar.id,
                registrationDate: new Date().toISOString()
            };

            await saveRegistration(registrationData);
            setIsSuccess(true);

            // Close modal after 2 seconds
            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (err) {
            setError(err instanceof Error ? err.message : 'A apărut o eroare neașteptată.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (!isOpen || !webinar) return null;

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-xs flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto">
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-200">
                    <h2 className="text-xl font-semibold text-green-700">
                        Înscrie-te la Webinar
                    </h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-gray-600 transition-colors"
                        disabled={isSubmitting}
                    >
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="p-6">
                    {!isSuccess ? (
                        <>
                            {/* Webinar Info */}
                            <div className="mb-6">
                                <h3 className="font-medium text-gray-900 mb-2">{webinar.title}</h3>
                                <div className="flex items-center text-sm text-gray-500 mb-1">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                    {new Date(webinar.date).toLocaleDateString('ro-RO', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}
                                </div>
                                <div className="flex items-center text-sm text-gray-500">
                                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                    {webinar.time} • {webinar.duration}
                                </div>
                            </div>

                            {/* Form */}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-4">
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                                        Adresa de Email *
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent transition-colors"
                                        placeholder="exemplu@email.com"
                                        disabled={isSubmitting}
                                        required
                                    />
                                </div>

                                {error && (
                                    <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                                        <p className="text-sm text-red-600">{error}</p>
                                    </div>
                                )}

                                <div className="flex gap-3">
                                    <button
                                        type="button"
                                        onClick={onClose}
                                        className="flex-1 px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                                        disabled={isSubmitting}
                                    >
                                        Anulează
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="flex-1 px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center"
                                    >
                                        {isSubmitting ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Se procesează...
                                            </>
                                        ) : (
                                            'Înscrie-te'
                                        )}
                                    </button>
                                </div>
                            </form>
                        </>
                    ) : (
                        /* Success State */
                        <div className="text-center py-4">
                            <div className="bg-green-100 rounded-full p-3 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                            <h3 className="text-lg font-medium text-green-700 mb-2">
                                Înregistrare Reușită!
                            </h3>
                            <p className="text-gray-600 text-sm">
                                Vei primi un email de confirmare cu detaliile webinarului.
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

// WebinarCard component for better organization
const WebinarCard = ({
    webinar,
    onRegisterClick
}: {
    webinar: Webinar;
    onRegisterClick: (webinar: Webinar) => void;
}) => {
    const getStatusBadge = (status: WebinarStatus) => {
        const badges = {
            upcoming: { text: "Viitor", color: "bg-blue-100 text-blue-800" },
            live: { text: "Live", color: "bg-red-100 text-red-800" },
            completed: { text: "Finalizat", color: "bg-gray-100 text-gray-800" }
        };

        const badge = badges[status] || badges.upcoming;

        return (
            <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${badge.color}`}>
                {badge.text}
            </span>
        );
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('ro-RO', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 overflow-hidden group">
            <div className="relative">
                <Image
                    src={webinar.image}
                    alt={webinar.title}
                    width={400}
                    height={200}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    priority={false}
                />
                <div className="absolute top-4 left-4">
                    {getStatusBadge(webinar.status)}
                </div>
            </div>

            <div className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2 line-clamp-2">
                    {webinar.title}
                </h3>

                <p className="text-gray-600 mb-4 text-sm line-clamp-3">
                    {webinar.description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                        {formatDate(webinar.date)}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {webinar.time} • {webinar.duration}
                    </div>

                    <div className="flex items-center text-sm text-gray-500">
                        <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                        </svg>
                        {webinar.presenter}
                    </div>
                </div>

                {webinar.status === 'completed' ? (
                    <Link
                        href={webinar.registrationLink}
                        className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200 font-medium text-sm"
                    >
                        Vizionează
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </Link>
                ) : (
                    <button
                        onClick={() => onRegisterClick(webinar)}
                        className="inline-flex items-center px-4 py-2 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200 font-medium text-sm"
                    >
                        Înscrie-te
                        <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                    </button>
                )}
            </div>
        </div>
    );
};

// EmptyState component
const EmptyState = () => (
    <div className="col-span-full flex flex-col items-center justify-center py-16 px-4">
        <div className="bg-green-50 rounded-full p-6 mb-6">
            <svg className="w-16 h-16 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
        </div>

        <h3 className="text-2xl font-semibold text-green-700 mb-3">
            Aici vom posta webinarele
        </h3>

        <p className="text-gray-600 text-center max-w-md mb-6">
            Ne pregătim să lansăm o serie de webinarii interactive cu experți în sănătate și wellness.
            Abonează-te la newsletter pentru a fi primul care află când vor fi disponibile!
        </p>

        <Link
            href="/newsletter"
            className="inline-flex items-center px-6 py-3 bg-green-700 text-white rounded-lg hover:bg-green-800 transition-colors duration-200 font-medium"
        >
            Abonează-te la Newsletter
            <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
        </Link>
    </div>
);

export default function WebinarsPage() {
    const [webinars, setWebinars] = useState<Webinar[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [selectedWebinar, setSelectedWebinar] = useState<Webinar | null>(null);

    const handleRegisterClick = (webinar: Webinar) => {
        setSelectedWebinar(webinar);
        setModalIsOpen(true);
    };

    const handleCloseModal = () => {
        setModalIsOpen(false);
        setSelectedWebinar(null);
    };

    // Simulate loading webinars (in real app, this would be an API call)
    useEffect(() => {
        const loadWebinars = async () => {
            setLoading(true);
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Toggle between empty and filled state for demo
            // Remove this logic and replace with actual API call
            setWebinars(mockWebinars);
            // setWebinars([]); // Uncomment to see empty state

            setLoading(false);
        };

        loadWebinars();
    }, []);

    return (
        <Layout>
            {/* Hero Section */}
            <div className="bg-white py-12 border-b border-green-100">

                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl font-extrabold text-green-700 mb-4">
                        Webinarii & Evenimente Live
                    </h1>
                    <p className="text-gray-600 text-lg">
                        Participă la webinariile noastre interactive pentru a descoperi cele mai recente informații științifice și recomandări practice în domeniul nutriției și sănătății.
                    </p>
                </div>
            </div>

            {/* Webinars Section */}
            <div className="bg-gray-50 py-16">
                <div className="max-w-7xl mx-auto px-4">
                    {loading ? (
                        // Loading State
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="bg-white rounded-2xl shadow-md border border-gray-200 overflow-hidden">
                                    <div className="w-full h-48 bg-gray-200 animate-pulse"></div>
                                    <div className="p-6 space-y-4">
                                        <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                                        <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4"></div>
                                        <div className="h-10 bg-gray-200 rounded animate-pulse"></div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : webinars.length > 0 ? (
                        // Webinars Grid
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {webinars.map((webinar) => (
                                <WebinarCard
                                    key={webinar.id}
                                    webinar={webinar}
                                    onRegisterClick={handleRegisterClick}
                                />
                            ))}
                        </div>
                    ) : (
                        // Empty State
                        <EmptyState />
                    )}
                </div>
            </div>

            {/* Registration Modal */}
            <WebinarRegistrationModal
                isOpen={modalIsOpen}
                onClose={handleCloseModal}
                webinar={selectedWebinar}
            />
        </Layout>
    );
}