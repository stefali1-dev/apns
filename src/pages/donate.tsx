import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Layout from '@/layouts/NavbarLayout';

interface DonatePageProps {
  orgName?: string;
  orgCif?: string;
  orgIban?: string;
  contactEmail?: string;
}

const DonateButton: React.FC<{
  style: 'primary' | 'secondary';
  href: string;
  text: string;
  external?: boolean;
}> = ({ style, href, text, external = false }) => {
  const baseClasses = "inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all duration-200 text-center";
  const primaryClasses = "bg-white text-[#09a252] hover:bg-green-50 shadow-lg hover:shadow-xl";
  const secondaryClasses = "bg-[#09a252] text-white hover:bg-green-900 border border-[#09a252]";

  const classes = `${baseClasses} ${style === 'primary' ? primaryClasses : secondaryClasses}`;

  if (external) {
    return (
      <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
        {text}
      </a>
    );
  }

  return (
    <Link href={href} className={classes}>
      {text}
    </Link>
  );
};

const DonatePage: React.FC<DonatePageProps> = ({
  orgName = "Asociația pentru Promovarea Nutriției Sănătoase",
  orgCif = "46079240",
  orgIban = "RO68BRDE240SV60062942400",
  contactEmail = "contact@appns.ro"
}) => {
  return (
    <Layout>
      <Head>
        <title>Donează prin redirecționarea 3.5% din impozit - APNS</title>
        <meta name="description" content="Redirecționează 3.5% din impozitul pe venit către APNS prin formularul 230. Susții educația nutrițională fără costuri suplimentare. Termenul limită: 26 mai 2025." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="bg-green-50 min-h-screen">
        {/* Hero section */}
        <div className="relative bg-[#09a252] text-white overflow-hidden">
          <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Redirecționează 3.5% din impozit
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Sprijină programele noastre nutriționale pentru comunitate fără să te coste nimic, prin redirecționarea unei părți din impozitul pe venit
              </p>
            </div>
          </div>

          {/* Imagine ilustrativă */}
          <div className="relative mx-auto max-w-4xl px-4 pb-16">
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
              <img
                className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg"
                src="/images/header.jpg"
                alt="Redirecționează impozitul"
                style={{ objectPosition: '50% 65%' }}
              />
            </div>
          </div>
        </div>

        {/* Secțiune de tranziție */}
        <div className="bg-green-50 py-6">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-flex items-center space-x-4">
                <span className="h-px w-12 bg-green-300"></span>
                <span className="text-[#09a252] font-medium">Cum funcționează?</span>
                <span className="h-px w-12 bg-green-300"></span>
              </div>
            </div>
          </div>
        </div>

        {/* Main content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            {/* Introducere */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-4">Ce înseamnă redirecționarea impozitului?</h2>
              <p className="mb-4">
                Conform legislației din România, contribuabilii pot alege să redirecționeze o parte din impozitul pe venit sau profit către organizații non-profit, inclusiv asociații precum a noastră.
              </p>
              <p className="mb-4">
                Acești bani reprezintă o parte din impozitul pe care deja îl plătești statului. Nu este o donație suplimentară, ci doar o redirecționare a unor fonduri care oricum ar merge la bugetul de stat.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-3">Beneficiile redirecționării:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Nu te costă nimic în plus</li>
                  <li>Susții programe nutriționale pentru comunitate</li>
                  <li>Contribui direct la proiecte cu impact social</li>
                  <li>Procesul este simplu și legal</li>
                </ul>
              </div>
            </div>

            {/* Persoane fizice */}
            <div id="persoane-fizice" className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <h2 className="text-2xl font-bold text-[#09a252]">Pentru persoane fizice: 3.5% din impozitul pe venit</h2>
              </div>

              <p className="mb-4">
                Conform Codului Fiscal (Legea 227/2015) cu modificările ulterioare, persoanele fizice pot direcționa 3.5% din impozitul pe veniturile obținute în anul precedent către entități nonprofit.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-gray-800 mb-4">Cine poate redirecționa 3.5%?</h3>
                <p className="mb-2">Contribuabilii care au realizat în anul anterior venituri din:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Salarii și asimilate salariilor</li>
                  <li>Pensii</li>
                  <li>Activități independente impuse pe bază de normă de venit</li>
                  <li>Cedarea folosinței bunurilor</li>
                  <li>Investiții</li>
                  <li>Activități agricole, silvicultură și piscicultură</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-[#09a252] mb-4">Cum poți redirecționa 3.5% către asociația noastră?</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div>
                    <h4 className="font-semibold  mb-1 text-lg"><strong>1.</strong> Completează formularul 230</h4>
                    <p className="mb-2">
                      Pentru veniturile din salarii și pensii, trebuie să completezi formularul 230 "Cerere privind destinația sumei reprezentând până la 3,5% din impozitul anual datorat".
                    </p>
                    <div className="mt-3">
                      <DonateButton
                      style="secondary"
                      href="https://static.anaf.ro/static/10/Anaf/formulare/230_OPANAF_15_2021.pdf"
                      text="Descarcă formularul 230"
                      external
                      />
                      <span className="block text-sm text-gray-500 mt-2">
                      (PDF oficial ANAF, se poate completa digital sau tipări)
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="w-full">
                    <h4 className="font-semibold mb-1 text-lg"><strong>2. </strong>Completează datele asociației noastre în formular</h4>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-2 w-full">
                      <p className="font-medium mb-1">Denumire entitate nonprofit:</p>
                      <p className="mb-2 font-bold">{orgName}</p>

                      <p className="font-medium mb-1">Cod de identificare fiscală (CIF):</p>
                      <p className="mb-2 font-bold">{orgCif}</p>

                      <p className="font-medium mb-1">Cont bancar (IBAN):</p>
                      <p className="font-bold">{orgIban}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div>
                    <h4 className="font-semibold mb-1 text-lg"><strong>3. </strong>Depune formularul completat</h4>
                    <p className="mb-2">Ai trei opțiuni pentru depunerea formularului:</p>
                    <ul className="list-disc pl-5 space-y-2">
                      <li>
                        <span className="font-medium">Online</span> - Prin intermediul serviciului Spațiul Privat Virtual (SPV) de pe site-ul ANAF
                      </li>
                      <li>
                        <span className="font-medium">Direct</span> - La registratura administrației financiare de care aparții
                      </li>
                      <li>
                        <span className="font-medium">Prin poștă</span> - Cu scrisoare recomandată cu confirmare de primire
                      </li>
                    </ul>
                  </div>
                </div>

                <div className="flex items-start">
                  <div>
                    <h4 className="font-semibold mb-1 text-lg"><strong>4. </strong>Trimite-ne o copie (opțional)</h4>
                    <p>
                      Dacă dorești, ne poți trimite o copie a formularului depus la{' '}
                      <a href={`mailto:${contactEmail}`} className="text-[#09a252] underline">
                        {contactEmail}
                      </a>
                      {' '}pentru a putea urmări mai bine fondurile redirecționate.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-[#09a252] text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Ai nevoie de ajutor cu completarea formularului?</h3>
                <p className="mb-5">Suntem aici să te ajutăm! Contactează-ne și îți vom oferi asistență gratuită pentru procesul de redirecționare.</p>
                <div className="py-4">
                  <DonateButton style="primary" href="/contact" text="Contactează-ne" />
                </div>
              </div>
            </div>


            {/* Întrebări frecvente */}
            <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <h2 className="text-2xl font-bold text-[#09a252] mb-6">Întrebări frecvente</h2>

              <div className="space-y-4">
                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Ce reprezintă, de fapt, această redirecționare?</h4>
                  <p>Este o parte din impozitul pe care l-ai plătit deja statului, pe care legea îți permite să o redirecționezi către o organizație non-profit la alegerea ta. Nu te costă nimic în plus și nu este o donație.</p>
                </div>

                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Pot direcționa doar o parte din cei 3.5%?</h4>
                  <p>Nu, procentul de 3.5% este fix și nu poate fi împărțit între mai multe organizații. Trebuie să alegi o singură entitate beneficiară pentru un an fiscal.</p>
                </div>

                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">E nevoie să completez formularul în fiecare an?</h4>
                  <p>Da, formularul 230 trebuie completat și depus anual. Poți opta pentru redirecționare pe o perioadă de maximum 2 ani consecutivi prin bifarea căsuței corespunzătoare.</p>
                </div>

                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Trebuie să atașez documente suplimentare la formularul 230?</h4>
                  <p>Nu este necesar să atașezi alte documente. Formularul 230 completat corect este suficient.</p>
                </div>

                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Ce se întâmplă cu banii redirecționați?</h4>
                  <p>Statul va transfera suma corespunzătoare procentului de 3.5% din impozitul tău pe venit direct în contul asociației noastre. Acești bani vor fi folosiți pentru finanțarea programelor și proiectelor nutriționale organizate de asociația noastră.</p>
                </div>
              </div>
            </div>

            {/* Call to action */}
            <div className="bg-gradient-to-r from-[#09a252] to-[#09a252] rounded-lg shadow-lg p-8 text-white text-center">
              <h2 className="text-3xl font-bold mb-4">Sprijinul tău contează!</h2>
              <p className="text-lg mb-6">Prin redirecționarea unui procent din impozit contribui direct la promovarea unui stil de viață sănătos în comunitatea noastră.</p>
              <div className="flex flex-wrap justify-center gap-4">
                <DonateButton
                  style="primary"
                  href="https://static.anaf.ro/static/10/Anaf/formulare/230_OPANAF_15_2021.pdf"
                  text="Descarcă formularul 230"
                  external
                />
                <DonateButton
                  style="primary"
                  href="/contact"
                  text="Contactează-ne pentru asistență"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default DonatePage;  