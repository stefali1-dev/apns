// pages/enroll.tsx
import Head from 'next/head';
import Image from 'next/image';
import { Button } from '@/components/Button';
import Layout from '@/layouts/NavbarLayout';

const EnrollPage = () => {
  // Default contact information (can be replaced with props/context later)
  const contact_phone = "0727 590 656";
  const contact_email = "contact@appns.ro";

  return (
    <Layout>
      <Head>
        <title>Înscrie-te ca voluntar - APNS</title>
        <meta name="description" content="Alătură-te echipei de voluntari APNS și contribuie la educația nutrițională din România. Aplicare online simplă în 3 pași." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <style jsx>{`
        .gradient-bg {
          background: linear-gradient(135deg, #10b968 0%, #059646 100%);
        }
      `}</style>

      <div className="bg-green-50 min-h-screen">
        {/* Hero section */}
        <div className="relative gradient-bg text-white overflow-hidden">
          <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full -translate-x-32 -translate-y-32"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/5 rounded-full translate-x-48 translate-y-48"></div>
          </div>

          <div className="container mx-auto px-4 pt-16 pb-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Devino voluntar</h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
                Alătură-te echipei noastre și contribuie la promovarea unui stil de viață sănătos în comunitatea noastră
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button style="primary" href="#detalii" text="Află cum să te înscrii" />
                <Button style="secondary" href="#contact" text="Contactează-ne acum" />
              </div>
            </div>
          </div>
        </div>

        {/* Transition section */}
        <div className="bg-green-50 py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-4">
                <span className="h-px w-12 bg-green-300"></span>
                <span className="text-[#09a252] font-medium">Fii parte din schimbare</span>
                <span className="h-px w-12 bg-green-300"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div id="detalii" className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-[#09a252] mb-6">Cum te poți înscrie în asociația noastră</h2>

            <div className="mb-8">
              <p className="text-lg mb-4">
                Ne bucurăm că dorești să te alături echipei noastre de voluntari dedicați! Procesul de înscriere este simplu și direct:
              </p>

              <div className="bg-green-100 p-6 rounded-lg mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Pași pentru înscriere:</h3>
                <ol className="list-decimal pl-5 space-y-3">
                  <li>Contactează-ne prin una din metodele de mai jos</li>
                  <li>Vei primi contractul de voluntariat prin email</li>
                  <li>Completează și semnează contractul</li>
                  <li>Returnează contractul semnat</li>
                  <li>Vei fi contactat pentru o scurtă sesiune de orientare</li>
                </ol>
              </div>
            </div>

            <div id="contact" className="grid md:grid-cols-2 gap-8 mb-8">
              <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Contactează-ne telefonic</h3>
                <p className="mb-3">Ne poți suna pentru a discuta despre posibilitățile de voluntariat:</p>
                <p className="text-xl font-bold text-[#09a252]">{contact_phone}</p>
                <p className="text-sm text-[#09a252] mt-2">Program: Luni-Vineri, 9:00-17:00</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Contactează-ne prin email</h3>
                <p className="mb-3">Trimite-ne un email cu datele tale de contact și interesul pentru voluntariat:</p>
                <p className="text-xl font-bold text-[#09a252]">{contact_email}</p>
                <p className="text-sm text-[#09a252] mt-2">Răspundem în maxim 48 de ore</p>
              </div>
            </div>

            <div className="bg-green-100 p-6 rounded-lg mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Contractul de voluntariat</h3>
              <p className="mb-3">După ce ne contactezi, vei primi contractul de voluntariat care include:</p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Drepturile și obligațiile părților</li>
                <li>Perioada de voluntariat</li>
                <li>Activitățile în care te poți implica</li>
                <li>Beneficiile voluntariatului</li>
              </ul>
              <p className="mt-3">
                Contractul semnat poate fi returnat prin email (scanat) sau fizic la sediul asociației.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-green-800 mb-4">De ce să devii voluntar?</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start">
                  <div className="bg-green-200 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p>Contribui la o cauză importantă pentru sănătatea comunității</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-200 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p>Înveți de la specialiști în domeniul nutriției</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-200 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p>Dezvolți abilități de comunicare și organizare</p>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-200 p-2 rounded-full mr-3 mt-1">
                    <svg className="w-5 h-5 text-[#09a252]" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path>
                    </svg>
                  </div>
                  <p>Primești certificat de voluntariat pentru activitatea prestată</p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-[#09a252] to-[#09a252] text-white p-6 rounded-lg mb-6 text-center">
              <h3 className="text-xl font-bold mb-3">Pregătit să faci o diferență?</h3>
              <p className="mb-4">
                Alătură-te echipei noastre de voluntari și contribuie la educația nutrițională în comunitate!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button style="primary" href="/contact" text="Contactează-ne" />
                <Button style="secondary" href="#" text="Află mai multe" />
              </div>
            </div>

            <div className="mt-6">
              <h3 className="text-xl font-semibold text-green-800 mb-4">Întrebări frecvente</h3>
              <div className="space-y-4">
                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Ce pregătire trebuie să am pentru a deveni voluntar?</h4>
                  <p>
                    Nu este necesară o pregătire specifică. Căutăm persoane entuziasmaste, care doresc să învețe și să contribuie la promovarea unui stil de viață sănătos.
                  </p>
                </div>
                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Câte ore pe săptămână trebuie să dedic voluntariatului?</h4>
                  <p>
                    Programul este flexibil și depinde de disponibilitatea ta. Poți aloca minim 2-4 ore pe săptămână, în funcție de proiectele în care dorești să te implici.
                  </p>
                </div>
                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Ce activități voi desfășura ca voluntar?</h4>
                  <p>
                    Activitățile includ organizarea de evenimente educaționale, asistență la workshopuri de nutriție, crearea de materiale informative și participarea la campanii de conștientizare.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnrollPage;