import React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/NavbarLayout';

const PrivacyPolicyPage: React.FC = () => {
  return (
    <Layout>
      <Head>
        <title>Politica de Confidențialitate - APNS | Asociația pentru Promovarea Nutriției Sănătoase</title>
        <meta name="description" content="Politica de confidențialitate a APNS - cum colectăm, folosim și protejăm datele personale ale utilizatorilor noștri." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-green-50 min-h-screen">
        {/* Hero Section */}
        <section className="bg-[#09a252] relative overflow-hidden">
          <div className="relative max-w-screen-xl mx-auto px-6 py-20">
            <div className="text-center text-white">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Politica de Confidențialitate
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-green-100 max-w-3xl mx-auto leading-relaxed">
                Respectăm confidențialitatea datelor tale și ne angajăm să le protejăm
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
                <span className="text-[#09a252] font-medium">Ultima actualizare: 23 iulie 2025</span>
                <span className="h-px w-12 bg-green-300"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Introduction */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Introducere</h2>
              <p className="mb-4">
                Asociația pentru Promovarea Nutriției Sănătoase (APNS) respectă dreptul la confidențialitate al utilizatorilor site-ului nostru și se angajează să protejeze datele personale pe care ni le furnizați.
              </p>
              <p className="mb-4">
                Această Politică de Confidențialitate explică cum colectăm, folosim, stocăm și protejăm informațiile personale pe care le furnizați atunci când folosiți site-ul nostru web sau serviciile noastre.
              </p>
              <p className="text-sm text-gray-600">
                Prin utilizarea site-ului nostru, sunteți de acord cu colectarea și utilizarea informațiilor în conformitate cu această politică.
              </p>
            </div>

            {/* Data Collection */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Ce date personale colectăm</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">1. Newsletter și Ebook-uri</h3>
                  <p className="mb-2">Pentru serviciul nostru de newsletter și pentru descărcarea ebook-urilor gratuite, colectăm:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Adresa de email</strong> - pentru trimiterea materialelor educaționale și newsletter-ului</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    Această colectare este opțională și se face doar cu consimțământul explicit al utilizatorului.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">2. Formularul de Contact</h3>
                  <p className="mb-2">Pentru a ne contacta prin formularul de pe site, colectăm:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li><strong>Numele complet</strong> - pentru personalizarea comunicării</li>
                    <li><strong>Adresa de email</strong> - pentru a vă putea răspunde</li>
                    <li><strong>Numărul de telefon</strong> - opțional, pentru contact telefonic dacă este necesar</li>
                    <li><strong>Mesajul</strong> - conținutul întrebării sau solicitării dumneavoastră</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-3">3. Date colectate automat</h3>
                  <p className="mb-2">Când vizitați site-ul nostru, putem colecta automat:</p>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Adresa IP</li>
                    <li>Tipul de browser și versiunea</li>
                    <li>Paginile vizitate și timpul petrecut pe site</li>
                    <li>Informații despre dispozitivul folosit</li>
                  </ul>
                  <p className="text-sm text-gray-600 mt-2">
                    Aceste date sunt folosite pentru îmbunătățirea funcționalității site-ului și nu sunt asociate cu identitatea dumneavoastră personală.
                  </p>
                </div>
              </div>
            </div>

            {/* How we use data */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Cum folosim datele personale</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pentru newsletter și ebook-uri:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Trimiterea materialelor educaționale despre nutriție</li>
                    <li>Informarea despre evenimentele și activitățile APNS</li>
                    <li>Furnizarea ebook-urilor gratuite solicitate</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Pentru formularul de contact:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Răspunsul la întrebările și solicitările dumneavoastră</li>
                    <li>Furnizarea informațiilor solicitate despre serviciile noastre</li>
                    <li>Organizarea întâlnirilor sau consultațiilor</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">În general, folosim datele pentru:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Îmbunătățirea serviciilor și conținutului site-ului</li>
                    <li>Comunicarea cu utilizatorii noștri</li>
                    <li>Respectarea obligațiilor legale</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data sharing */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Partajarea datelor cu terți</h2>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                <p className="font-semibold text-gray-800 mb-2">APNS nu vinde, nu înhirează și nu partajează datele personale ale utilizatorilor cu terți pentru scopuri comerciale.</p>
              </div>

              <div className="mt-6">
                <p className="mb-4">Putem partaja informațiile doar în următoarele situații limitate:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li><strong>Furnizorii de servicii:</strong> Cu companiile care ne ajută să operăm site-ul (hosting, email marketing) și care sunt obligate contractual să protejeze datele</li>
                  <li><strong>Obligații legale:</strong> Când suntem obligați legal să divulgăm informații autorităților competente</li>
                  <li><strong>Protecția drepturilor:</strong> Pentru protejarea drepturilor, proprietății sau siguranței APNS, utilizatorilor sau publicului</li>
                </ul>
              </div>
            </div>

            {/* Data security */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Securitatea datelor</h2>
              
              <p className="mb-4">
                Implementăm măsuri de securitate tehnice și organizaționale adecvate pentru a proteja datele personale împotriva accesului neautorizat, modificării, divulgării sau distrugerii.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Măsuri tehnice:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Criptarea datelor în tranzit (HTTPS)</li>
                    <li>Securizarea serverelor</li>
                    <li>Actualizări regulate de securitate</li>
                    <li>Backup-uri regulate</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Măsuri organizaționale:</h3>
                  <ul className="list-disc pl-6 space-y-1">
                    <li>Acces restricționat la date</li>
                    <li>Formarea personalului</li>
                    <li>Politici interne de securitate</li>
                    <li>Monitorizarea accesului</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Data retention */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Păstrarea datelor</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Durata de păstrare:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Newsletter:</strong> Până la dezabonare sau până când contul devine inactiv pentru mai mult de 2 ani</li>
                    <li><strong>Formularul de contact:</strong> Maximum 2 ani de la ultima comunicare, pentru a putea răspunde la întrebări de urmărire</li>
                    <li><strong>Date tehnice:</strong> Maximum 2 ani pentru analiza traficului site-ului</li>
                  </ul>
                </div>

                <p className="text-sm text-gray-600">
                  La expirarea acestor perioade, datele vor fi șterse în mod securizat, cu excepția cazurilor în care legea impune păstrarea pentru o perioadă mai lungă.
                </p>
              </div>
            </div>

            {/* User rights */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Drepturile dumneavoastră</h2>
              
              <p className="mb-4">
                Conform Regulamentului General privind Protecția Datelor (GDPR) și legislației românești, aveți următoarele drepturi:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul de acces</h3>
                    <p className="text-sm">Să solicitați o copie a datelor personale pe care le procesăm</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul de rectificare</h3>
                    <p className="text-sm">Să corectați datele inexacte sau incomplete</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul de ștergere</h3>
                    <p className="text-sm">Să solicitați ștergerea datelor personale</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul de restricționare</h3>
                    <p className="text-sm">Să limitați procesarea datelor în anumite circumstanțe</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul la portabilitate</h3>
                    <p className="text-sm">Să primiți datele într-un format structurat</p>
                  </div>

                  <div>
                    <h3 className="font-semibold text-gray-800">Dreptul de opoziție</h3>
                    <p className="text-sm">Să vă opuneți procesării pentru anumite scopuri</p>
                  </div>
                </div>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-2">Cum să vă exercitați drepturile:</h3>
                <p className="mb-2">Pentru a vă exercita aceste drepturi, ne puteți contacta la:</p>
                <ul className="list-disc pl-6 space-y-1">
                  <li>Email: <a href="mailto:contact@appns.ro" className="text-[#09a252] underline">contact@appns.ro</a></li>
                  <li>Telefon: 0727 590 656</li>
                </ul>
              </div>
            </div>

            {/* Cookies */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Cookies și tehnologii similare</h2>
              
              <p className="mb-4">
                Site-ul nostru folosește cookies pentru a îmbunătăți experiența utilizatorului și pentru a analiza traficul.
              </p>

              <div className="space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Tipuri de cookies folosite:</h3>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Cookies esențiale:</strong> Necesare pentru funcționarea site-ului</li>
                    <li><strong>Cookies de performanță:</strong> Pentru analiza traficului și îmbunătățirea site-ului</li>
                    <li><strong>Cookies de preferințe:</strong> Pentru memorarea setărilor utilizatorului</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">Gestionarea cookies:</h3>
                  <p className="mb-2">Puteți controla și șterge cookies prin setările browser-ului dumneavoastră. Dezactivarea cookies-urilor poate afecta funcționarea site-ului.</p>
                </div>
              </div>
            </div>

            {/* Changes to policy */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Modificări ale politicii de confidențialitate</h2>
              
              <p className="mb-4">
                Această Politică de Confidențialitate poate fi actualizată periodic pentru a reflecta modificările în practicile noastre sau în legislație.
              </p>
            
            </div>

            {/* Contact information */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Contact pentru protecția datelor</h2>
              
              <p className="mb-4">
                Pentru orice întrebări despre această Politică de Confidențialitate sau despre procesarea datelor personale, ne puteți contacta:
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Asociația pentru Promovarea Nutriției Sănătoase (APNS)</h3>
                  <ul className="space-y-1 text-sm">
                    <li><strong>Email:</strong> <a href="mailto:contact@appns.ro" className="text-[#09a252] underline">contact@appns.ro</a></li>
                    <li><strong>Telefon:</strong> 0727 590 656</li>
                    <li><strong>Oraș:</strong> Iași, România</li>
                  </ul>
                </div>

                <div>
                  <h3 className="font-semibold text-gray-800 mb-2">Dreptul de plângere</h3>
                  <p className="text-sm">
                    Aveți dreptul să depuneți o plângere la Autoritatea Națională de Supraveghere a Prelucrării Datelor cu Caracter Personal (ANSPDCP) dacă considerați că prelucrarea datelor dumneavoastră încalcă legislația.
                  </p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-to-r from-[#09a252] to-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Ai întrebări despre confidențialitate?</h2>
              <p className="text-lg mb-6">
                Suntem transparenți în ceea ce privește utilizarea datelor tale și suntem aici să răspundem la orice întrebări.
              </p>
              <a 
                href="/contact" 
                className="bg-white text-[#09a252] hover:bg-green-100 font-semibold py-3 px-8 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg inline-block"
              >
                Contactează-ne
              </a>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default PrivacyPolicyPage;
