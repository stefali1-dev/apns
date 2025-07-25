// pages/coming-soon.tsx
import Head from 'next/head';
import { Button } from '@/components/Button';
import Layout from '@/layouts/NavbarLayout';

interface ComingSoonPageProps {
  contact_email?: string;
  contact_phone?: string;
}

const ComingSoonPage: React.FC<ComingSoonPageProps> = ({
  contact_email = "contact@appns.ro",
  contact_phone = "0727 590 656"
}) => {
  return (
    <Layout>
      <Head>
        <title>În curând - APNS</title>
        <meta name="description" content="Această pagină este în curs de dezvoltare. Revino în curând pentru a vedea noul conținut. Asociația pentru Promovarea Nutriției Sănătoase." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-green-50 min-h-screen">
        {/* Hero section */}
        <div className="relative bg-[#09a252] text-white overflow-hidden">
          <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <div className="mb-8">
                {/* Construction/Work in Progress Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 mx-auto mb-4 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
                  <svg
                    className="w-10 h-10 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M11.42 15.17L17.25 21A2.652 2.652 0 0021 17.25l-5.877-5.877M11.42 15.17l2.496-3.03c.317-.384.74-.626 1.208-.766M11.42 15.17l-4.655 5.653a2.548 2.548 0 11-3.586-3.586l6.837-5.63m5.108-.233c.55-.164 1.163-.188 1.743-.14a4.5 4.5 0 004.486-6.336l-3.276 3.277a3.004 3.004 0 01-2.25-2.25l3.276-3.276a4.5 4.5 0 00-6.336 4.486c.091 1.076-.071 2.264-.904 2.95l-.102.085m-1.745 1.437L5.909 7.5H4.5L2.25 3.75l1.5-1.5L7.5 4.5v1.409l4.26 4.26m-1.745 1.437l1.745-1.437m6.615 8.206L15.75 15.75M4.867 19.125h.008v.008h-.008v-.008z"
                    />
                  </svg>
                </div>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                În curând
              </h1>
              <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">
                Această pagină este în curs de dezvoltare. Lucrăm pentru a vă oferi o experiență excelentă.
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <Button style="secondary" href="/" text="Înapoi la pagina principală" />
                <Button style="secondary" href="/contact" text="Contactează-ne" />
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
                <span className="text-[#09a252] font-medium">Revino în curând</span>
                <span className="h-px w-12 bg-green-300"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            
            {/* Main message card */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-6 text-center">
                Pagină în construcție
              </h2>
              
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-green-100 rounded-full">
                  <svg
                    className="w-8 h-8 text-[#09a252]"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                </div>
              </div>

              <p className="text-lg text-center mb-6">
                Ne cerem scuze pentru inconveniență. Echipa noastră lucrează pentru a finaliza această secțiune 
                și a vă oferi informațiile de care aveți nevoie.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Între timp, puteți:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Explora celelalte secțiuni ale site-ului nostru</li>
                  <li>Afla mai multe despre serviciile noastre</li>
                  <li>Ne contacta pentru întrebări specifice</li>
                  <li>Urmări-ne pe rețelele sociale pentru actualizări</li>
                </ul>
              </div>

              <p className="text-center text-gray-600">
                Vă mulțumim pentru înțelegere și pentru că faceți parte din comunitatea APNS!
              </p>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ComingSoonPage;
