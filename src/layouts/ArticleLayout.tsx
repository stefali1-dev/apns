import Layout from "./NavbarLayout";

export default function ArticleLayout({ children }: { children: React.ReactNode }) {
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
                    <form className="max-w-md mx-auto flex gap-4">
                        <input type="email"
                            placeholder="Adresa ta de email"
                            className="flex-1 px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-[#09a252]" />
                        <button type="submit"
                            className="bg-[#09a252] text-white px-6 py-3 rounded-lg shadow hover:bg-green-800 transition-colors">
                            Abonează-te
                        </button>
                    </form>

                </div>
            </section>
            <div className="py-4 mx-auto disclaimer text-sm text-gray-600 bg-gray-50 rounded-lg">
                <p className="max-w-3xl mx-auto mb-2"><strong>Notă importantă:</strong> Informațiile din acest articol sunt destinate scopurilor educaționale și nu constituie sfaturi medicale.</p>
            </div>
        </Layout>
    )
}
