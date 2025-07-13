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
  const secondaryClasses = "bg-green-800 text-white hover:bg-green-900 border border-[#09a252]";

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
  orgCif = "12345678",
  orgIban = "RO12RNCB0000000000001234",
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
          <div className="container mx-auto px-4 pt-16 pb-12 relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-1 rounded-full bg-green-800 text-green-100 text-sm font-medium mb-4">
                Susține-ne misiunea
              </span>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight">
                Redirecționează 3.5% din impozit
              </h1>
              <p className="text-xl mb-8 max-w-2xl mx-auto">
                Sprijină programele noastre nutriționale pentru comunitate fără să te coste nimic, prin redirecționarea unei părți din impozitul pe venit
              </p>

              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <DonateButton style="primary" href="#persoane-fizice" text="Pentru persoane fizice" />
                <DonateButton style="secondary" href="#persoane-juridice" text="Pentru companii" />
              </div>
            </div>
          </div>

          {/* Imagine ilustrativă */}
          <div className="relative mx-auto max-w-4xl px-4 pb-16">
            <div className="absolute inset-0 bg-green-800 opacity-20 transform rotate-1 rounded-xl mx-8 my-4"></div>
            <div className="relative bg-white rounded-xl shadow-2xl overflow-hidden">
              <img
                className="w-full h-64 sm:h-72 md:h-80 object-cover rounded-lg"
                src="/images/apns.png"
                alt="Redirecționează impozitul"
                style={{ objectPosition: '50% 65%' }}
              />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-green-900 to-transparent p-4 md:p-6">
                {/* Optional overlay content */}
              </div>
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
              <div className="bg-green-100 p-6 rounded-lg mt-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">Beneficiile redirecționării:</h3>
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
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#09a252]">Pentru persoane fizice: 3.5% din impozitul pe venit</h2>
              </div>

              <p className="mb-4">
                Conform Codului Fiscal (Legea 227/2015) cu modificările ulterioare, persoanele fizice pot direcționa 3.5% din impozitul pe veniturile obținute în anul precedent către entități nonprofit.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Cine poate redirecționa 3.5%?</h3>
                <p className="mb-2">Contribuabilii care au realizat în anul anterior venituri din:</p>
                <ul className="list-disc pl-5 space-y-1 mb-4">
                  <li>Salarii și asimilate salariilor</li>
                  <li>Pensii</li>
                  <li>Activități independente impuse pe bază de normă de venit</li>
                  <li>Cedarea folosinței bunurilor</li>
                  <li>Investiții</li>
                  <li>Activități agricole, silvicultură și piscicultură</li>
                </ul>
                <p className="text-sm text-[#09a252]">
                  Notă: Pentru veniturile obținute în regim de reținere la sursă (salarii, pensii), impozitul este calculat și reținut de angajator sau casa de pensii.
                </p>
              </div>

              <h3 className="text-xl font-semibold text-[#09a252] mb-4">Cum poți redirecționa 3.5% către asociația noastră?</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Completează formularul 230</h4>
                    <p className="mb-2">
                      Pentru veniturile din salarii și pensii, trebuie să completezi formularul 230 "Cerere privind destinația sumei reprezentând până la 3,5% din impozitul anual datorat".
                    </p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <DonateButton
                        style="secondary"
                        href="https://static.anaf.ro/static/10/Anaf/formulare/230_OPANAF_15_2021.pdf"
                        text="Descarcă formularul 230"
                        external
                      />
                      <DonateButton
                        style="secondary"
                        href="/documents/instructiuni-230.pdf"
                        text="Instrucțiuni de completare"
                        external
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Completează datele asociației noastre în formular</h4>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mb-2">
                      <p className="font-medium mb-1">Denumire entitate nonprofit:</p>
                      <p className="mb-2">{orgName}</p>

                      <p className="font-medium mb-1">Cod de identificare fiscală (CIF):</p>
                      <p className="mb-2">{orgCif}</p>

                      <p className="font-medium mb-1">Cont bancar (IBAN):</p>
                      <p>{orgIban}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Depune formularul completat</h4>
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
                    <p className="mt-2 text-sm text-[#09a252]">
                      Formularul trebuie depus până la data de 25 mai a anului curent pentru veniturile realizate în anul precedent.
                    </p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">4</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Trimite-ne o copie (opțional)</h4>
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

            {/* Persoane juridice */}
            <div id="persoane-juridice" className="bg-white rounded-lg shadow-lg p-8 mb-8">
              <div className="flex items-center mb-6">
                <div className="bg-green-100 p-3 rounded-full mr-4">
                  <svg className="w-6 h-6 text-[#09a252]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                  </svg>
                </div>
                <h2 className="text-2xl font-bold text-[#09a252]">Pentru companii: 20% din impozitul pe profit</h2>
              </div>

              <p className="mb-4">
                Conform Codului Fiscal (Legea 227/2015), persoanele juridice pot direcționa până la 20% din impozitul pe profit datorat către entități nonprofit.
              </p>

              <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Aspecte importante:</h3>
                <ul className="list-disc pl-5 space-y-2">
                  <li>Sponsorizările se înregistrează în contabilitate ca și cheltuieli de sponsorizare</li>
                  <li>Suma direcționată nu poate depăși 0,75% din cifra de afaceri anuală</li>
                  <li>Beneficiul fiscal se acordă doar pentru sponsorizările către entități nonprofit înregistrate în Registrul entităților/unităților de cult</li>
                  <li>Redirecționarea poate fi făcută cumulat, în limita a 20% din impozitul pe profit</li>
                </ul>
              </div>

              <h3 className="text-xl font-semibold text-[#09a252] mb-4">Cum poate compania ta să redirecționeze din impozitul pe profit?</h3>

              <div className="space-y-6 mb-8">
                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">1</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Încheie un contract de sponsorizare</h4>
                    <p className="mb-2">Primul pas este încheierea unui contract de sponsorizare între compania ta și asociația noastră.</p>
                    <div className="flex flex-wrap gap-2 mt-3">
                      <DonateButton
                        style="secondary"
                        href="/documents/model-contract-sponsorizare.doc"
                        text="Descarcă model contract"
                        external
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">2</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Efectuează plata sponsorizării</h4>
                    <p>Efectuează plata sumei de sponsorizare prin transfer bancar în contul asociației noastre, menționând în descriere "Sponsorizare conform contract nr. [număr contract]".</p>
                    <div className="bg-green-50 border border-green-200 p-4 rounded-lg mt-2">
                      <p className="font-medium mb-1">Cont bancar (IBAN):</p>
                      <p>{orgIban}</p>
                    </div>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">3</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Înregistrează sponsorizarea în contabilitate</h4>
                    <p>Suma sponsorizată se înregistrează ca și cheltuială de sponsorizare și se evidențiază distinct în declarația de impozit pe profit.</p>
                    <p className="mt-2 text-sm text-[#09a252]">Sugestie pentru departamentul contabil: Folosiți contul contabil 6582 "Donații și subvenții acordate" pentru înregistrarea sponsorizării.</p>
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-green-200 rounded-full w-8 h-8 flex items-center justify-center text-[#09a252] font-bold mr-4 flex-shrink-0 mt-1">4</div>
                  <div>
                    <h4 className="font-medium text-green-800 mb-1">Aplică reducerea fiscală</h4>
                    <p>La calculul impozitului pe profit, suma sponsorizată (în limita a 20% din impozitul pe profit) se deduce direct din impozitul pe profit datorat.</p>
                  </div>
                </div>
              </div>

              <div className="bg-[#09a252] text-white p-6 rounded-lg text-center">
                <h3 className="text-xl font-bold mb-2">Devino partener corporativ</h3>
                <p className="mb-4">Pe lângă redirecționarea din impozitul pe profit, compania ta poate deveni un partener strategic în promovarea nutriției sănătoase.</p>
                <div className="py-4">
                  <DonateButton style="primary" href="/contact" text="Discută cu noi" />
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

                <div className="border-b border-green-200 pb-4">
                  <h4 className="font-medium text-[#09a252] mb-2">Pentru firmă, sponsorizarea este deductibilă fiscal?</h4>
                  <p>Da, suma sponsorizată se deduce direct din impozitul pe profit datorat, în limita a 20% din acesta, dar nu mai mult de 0,75% din cifra de afaceri.</p>
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
                  style="secondary"
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