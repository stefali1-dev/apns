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

      <div className="bg-green-50 min-h-screen">
        {/* Hero section */}
        <div className="relative bg-[#09a252] text-white overflow-hidden">
          <div className="container mx-auto px-4 pt-16 pb-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">Devino voluntar</h1>
              <p className="text-xl md:text-2xl mb-10 max-w-2xl mx-auto">
                Alătură-te echipei noastre și contribuie la promovarea unui stil de viață sănătos în comunitatea noastră
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button style="secondary" href="#contact" text="Află cum să te înscrii" />
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

              <div className="mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Pași pentru înscriere:</h3>
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
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contactează-ne telefonic</h3>
                <p className="mb-3">Ne poți suna pentru a discuta despre posibilitățile de voluntariat:</p>
                <p className="text-xl font-bold text-[#09a252]">{contact_phone}</p>
              </div>

              <div className="bg-green-50 p-6 rounded-lg border border-green-200 hover:shadow-md transition-shadow duration-300">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Contactează-ne prin email</h3>
                <p className="mb-3">Trimite-ne un email cu datele tale de contact și interesul pentru voluntariat:</p>
                <p className="text-xl font-bold text-[#09a252]">{contact_email}</p>
              </div>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Contractul de voluntariat</h3>
              <p className="mb-3">După ce ne contactezi, vei primi contractul de voluntariat care include:</p>
              <ul className="list-disc pl-5 space-y-2 text-green-900">
                <li>Drepturile și obligațiile părților</li>
                <li>Perioada de voluntariat</li>
                <li>Activitățile în care te poți implica</li>
                <li>Beneficiile voluntariatului</li>
              </ul>
              <p className="mt-3 text-green-900">
                Contractul semnat poate fi returnat prin email (scanat) sau fizic la sediul asociației.
              </p>
            </div>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-800 mb-4">De ce să devii voluntar?</h3>
              <ol className="list-decimal pl-6 space-y-3 text-green-900">
                <li>Contribui la o cauză importantă pentru sănătatea comunității</li>
                <li>Înveți de la specialiști în domeniul nutriției</li>
                <li>Dezvolți abilități de comunicare și organizare</li>
                <li>Primești certificat de voluntariat pentru activitatea prestată</li>
              </ol>
            </div>

            <div className="bg-[#09a252] text-white p-6 rounded-lg mb-6 text-center">
              <h3 className="text-xl font-bold mb-3">Pregătit să faci o diferență?</h3>
              <p className="mb-4">
                Alătură-te echipei noastre de voluntari și contribuie la educația nutrițională în comunitate!
              </p>
              <div className="flex flex-wrap justify-center gap-4">
                <Button style="secondary" href="#" text="Contactează-ne" />
                <Button style="secondary" href="#" text="Află mai multe" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EnrollPage;