import ArticleLayout from "@/layouts/ArticleLayout";
import Image from "next/image";

export default function GoutArticle(){
    return (
        <ArticleLayout>
  <header className="article-header">
    <h1 className="text-3xl font-bold text-green-800 mb-4">Guta: Înțelegere și Control prin Alimentație Corectă</h1>
    <div className="article-meta flex items-center text-sm text-[#09a252] mb-6">
      <span className="mr-4"><i className="fas fa-calendar-alt mr-1"></i> 7 Iunie 2025</span>
      <span className="mr-4"><i className="fas fa-user mr-1"></i> Palade Andra Gabriela</span>
      <span><i className="fas fa-tag mr-1"></i> Gută, Nutriție, Acid Uric</span>
    </div>
    <div className="article-featured-image mb-8 px-0 md:px-32">
    <Image
        src="/images/gout.png"
        alt="Gută și nutriție"
        width={800}
        height={400}
        className="w-full rounded-lg shadow-md"
    />
      <p className="text-sm text-gray-600 mt-2 italic">Alimentația corectă joacă un rol esențial în controlul gutei.</p>
    </div>
  </header>

  <div className="article-content text-gray-800 leading-relaxed">
    <div className="article-intro mb-6">
      <p className="text-lg font-medium text-green-900 mb-4">Guta este o afecțiune metabolică frecventă, caracterizată prin episoade recurente de inflamație articulară dureroasă, care afectează milioane de persoane la nivel global și are un impact semnificativ asupra calității vieții. Asociația pentru Promovarea Nutriției Sănătoase își propune să ofere publicului informații clare, bazate pe dovezi științifice despre gută și despre modul în care alimentația corectă poate controla crizele provocate de această afecțiune.</p>
    </div>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Ce este guta?</h2>
      <p className="mb-4">Este cea mai frecventă formă de artrită inflamatorie. Este o boală gravă, care durează toată viața și care necesită un tratament continuu, precum și unele modificări ale stilului de viață pentru a fi controlată.</p>
      <p className="mb-4">Dacă nu este tratată, guta avansată poate duce în aceeași măsură la pierderea locului de muncă, handicap fizic și diminuare a calității vieții ca în cazul poliartritei reumatoide avansate.</p>
      
      <div className="info-box bg-green-50 border-l-4 border-green-500 p-4 mb-6 rounded-r-lg">
        <h3 className="text-lg font-semibold text-green-800 mb-2">Știați că?</h3>
        <p className="text-gray-700">În România, peste 5% din populația adultă este afectată de gută, iar mulți nu sunt conștienți că alimentația și stilul de viață pot influența semnificativ evoluția bolii.</p>
        <p className="text-gray-700 mt-2">În trecut, guta era cunoscută drept „boala regilor". Această denumire provine din asocierea bolii cu mesele îmbelșugate, bogate în carne roșie, vin și alte alimente scumpe, accesibile doar aristocrației.</p>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Factori de risc</h2>
      <p className="mb-4">Factori de risc comuni care pot duce la acutizarea gutei:</p>
      
      <div className="grid md:grid-cols-2 gap-6 mb-6">
        <div>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li><strong>Hiperuricemia</strong> - Nivelurile ridicate de acid uric, peste 6,8 mg/dL, pot duce la atacuri de gută. <strong>Cel mai bun nivel de acid uric</strong> pentru o persoană cu gută este sub <strong>6,0 mg/dL</strong> - indiferent de vârstă sau sex.</li>
            <li><strong>Istoricul familial/genetica</strong> - <strong>Una din patru</strong> persoane cu gută are un istoric familial al bolii.</li>
            <li><strong>Vârsta</strong> - Guta poate apărea la bărbați între 30 și 50 de ani și la femei între 60 și 70 de ani.</li>
            <li><strong>Genul</strong> - Guta afectează bărbații mai des decât femeile.</li>
            <li><strong>Etnia</strong> - Unele grupuri etnice sunt mai predispuse la gută decât altele.</li>
          </ul>
        </div>
        <div>
          <ul className="list-disc ml-5 space-y-2 text-gray-700">
            <li><strong>Obezitatea</strong> - Doar unul din 10 oameni știe că obezitatea poate contribui la un risc crescut de gută.</li>
            <li><strong>Alte probleme de sănătate</strong> - Guta este asociată cu hipertensiune arterială, boli de inimă, diabet și boli renale.</li>
            <li><strong>Leziuni articulare</strong> - Persoanele cu articulații deteriorate anterior sunt mai predispuse atacurilor de gută.</li>
            <li><strong>Dieta</strong> - Multe alimente pot crește nivelul de acid uric din sânge.</li>
            <li><strong>Medicamente</strong> - Utilizarea anumitor medicamente poate crește nivelul de acid uric din sânge.</li>
          </ul>
        </div>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Obiective privind dieta și stilul de viață</h2>
      <ul className="list-disc ml-5 space-y-2 text-gray-700 mb-6">
        <li>Atingerea și menținerea unei greutăți sănătoase - IMC &lt;23</li>
        <li>Stabilirea și menținerea unor obiceiuri alimentare sănătoase</li>
        <li>Limitarea alimentelor bogate în purine</li>
        <li>Consumul de alimente care ajută la scăderea nivelului de acid uric</li>
      </ul>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Recomandări generale pentru stilul de viață</h2>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">1. Activitate fizică</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Se recomandă cel puțin 150 de minute pe săptămână de exercițiu aerobic moderat</li>
          <li>Activitatea fizică regulată ajută la scăderea acidului uric din sânge și reduce inflamația</li>
          <li>Alegeți exerciții adaptate condiției dvs.: mers pe jos, înot, ciclism sau gimnastică ușoară</li>
          <li><strong>Evitați efortul intens</strong> sau de mare impact imediat</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">2. Importanța hidratării</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Consumați multe lichide, apă - cel puțin ~8 pahare pe zi (≈2 litri)</li>
          <li>Hidratarea adecvată ajută la eliminarea acidului uric prin urină</li>
          <li>Evitați băuturile îndulcite și alcoolul - în special berea</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">3. Impactul stresului și gestionarea acestuia</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Stresul fizic sau emoțional intens poate agrava guta indirect</li>
          <li>Stresul poate conduce la obiceiuri nesănătoase</li>
          <li>Încercați tehnici de gestionare a stresului: exerciții de respirație, yoga, meditație</li>
          <li>Asigurați-vă că dormiți suficient (7-8 ore/noapte)</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">4. Monitorizarea greutății și a glicemiei</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Mențineți evidența greutății corporale</li>
          <li>O reducere de 5-10% a greutății poate îmbunătăți semnificativ controlul glicemic</li>
          <li>Evitați dietele "șoc" sau înfometarea</li>
        </ul>
      </div>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">5. Cunoașteți-vă nivelul acidului uric - și „mergeți pe șase"</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li>Cunoașterea nivelului de acid uric este la fel de importantă ca și cunoașterea celorlalte valori de referință sănătoase</li>
          <li>Un <strong>nivel sănătos</strong> al <strong>acidului uric</strong> de <strong>6,0 mg/dL sau mai mic</strong></li>
          <li>Verificați nivelurile de acid uric la fiecare șase luni</li>
        </ul>
      </div>
    </section>

    <section className="mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Recomandări dietetice</h2>
      <p className="mb-4">O dietă echilibrată este esențială pentru controlul gutei. Se va axa pe alimente cu conținut scăzut de purine, bogate în nutrienți.</p>
      
      <div className="mb-6">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">Regula semaforului</h3>
        <p className="mb-4">Regula semaforului împarte alimentele în <strong>trei categorii</strong>, asemănător culorilor unui semafor:</p>
        
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-lg font-semibold text-red-600 mb-2">Alimente interzise sau de evitat</h3>
            <p className="text-gray-700 text-sm">Aceste alimente conțin substanțe care pot agrava boala sau pot declanșa crize</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-lg font-semibold text-yellow-500 mb-2">Alimente de consumat cu moderație</h3>
            <p className="text-gray-700 text-sm">Pot fi consumate în cantități limitate și ocazional</p>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-green-100">
            <h3 className="text-lg font-semibold text-[#09a252] mb-2">Alimente permise</h3>
            <p className="text-gray-700 text-sm">Sigure și recomandate, nu cresc riscul de apariție a crizelor</p>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-[#09a252] mb-3">Alimente permise</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold text-[#09a252] mb-2">Proteine slabe</h4>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Carne albă slabă (pui, curcan) fără piele</li>
              <li>Pește cu conținut redus de purine (somon, cod, biban etc.)</li>
              <li>Ouăle (3-4/săptămână)</li>
              <li>Lactate degresate (lapte, iaurt)</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-[#09a252] mb-2">Alte alimente</h4>
            <ul className="list-disc ml-5 space-y-1 text-gray-700">
              <li>Legume și leguminoase (fasole, linte, năut)</li>
              <li>Fructe proaspete (cireșe, fructe de pădure, mere)</li>
              <li>Cereale integrale (pâine integrală, ovăz, orez brun)</li>
              <li>Grăsimi "sănătoase" (ulei de măsline, avocado, nuci)</li>
              <li>Băuturi: apă, cafea neîndulcită, ceaiuri fără zahăr</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-red-600 mb-3">Alimente interzise</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li><strong>Carne roșie</strong> și organe (ficat, rinichi, creier)</li>
              <li>Anumite fructe de mare (șprot, anșoa, sardine, hering)</li>
              <li><strong>Alcoolul</strong> (în special berea și tarie)</li>
              <li>Băuturi îndulcite cu zahăr sau fructoză</li>
            </ul>
          </div>
          <div>
            <ul className="list-disc ml-5 space-y-2 text-gray-700">
              <li>Dulciuri concentrate în zahăr</li>
              <li>Făinoase rafinate și ultrarafinate</li>
              <li>Grăsimi "nesănătoase" (alimente prăjite, fast-food)</li>
              <li>Sirop de porumb bogat în fructoză</li>
            </ul>
          </div>
        </div>
      </div>
      
      <div className="mb-8">
        <h3 className="text-xl font-semibold text-yellow-500 mb-3">Alimente de consumat cu moderație</h3>
        <ul className="list-disc ml-5 space-y-2 text-gray-700">
          <li><strong>Carne roșie slabă</strong> (vită, porc sau miel slab) - maxim 1-2 ori/săptămână</li>
          <li><strong>Fructe cu indice glicemic mai mare</strong>: pepene, struguri, banane coapte, mango</li>
          <li><strong>Pâine albă, orez alb, cartofi</strong> - înlocuiți cu variante integrale cât posibil</li>
          <li><strong>Sare</strong> - moderați consumul</li>
        </ul>
      </div>
    </section>

    <div className="conclusion bg-green-50 p-6 rounded-lg mb-8">
      <h2 className="text-2xl font-bold text-green-800 mb-4">Concluzie</h2>
      <p className="mb-4">Tratamentul medicamentos este pe primul loc când vine vorba de gută, dar nutriția reprezintă un pilon esențial în prevenirea și gestionarea gutei.</p>
      <p className="mb-4">O alimentație echilibrată, adaptată nevoilor individuale și bogată în alimente cu un conținut scăzut în purine poate contribui la reducerea nivelului de acid uric, la prevenirea crizelor dureroase și la îmbunătățirea calității vieții persoanelor afectate.</p>
      <p>Asociația pentru Promovarea Nutriției Sănătoase recomandă o abordare integrată în managementul gutei, care să includă: adoptarea unui regim alimentar adecvat, menținerea unei greutăți corporale optime, hidratarea corectă, limitarea consumului de alcool și controlul factorilor asociați precum hipertensiunea, dislipidemia sau diabetul.</p>
      <p className="mt-4">Consultarea periodică cu un medic reumatolog și cu un nutriționist specializat este esențială pentru personalizarea intervenției și pentru obținerea rezultatelor pe termen lung. Printr-un stil de viață sănătos și bine informat, guta poate fi controlată eficient.</p>
    </div>

    <div className="references">
      <h2 className="text-xl font-bold text-green-800 mb-4">Surse și referințe</h2>
      <ul className="list-disc ml-6 space-y-2 text-gray-700">
        <li>JHONS HOPKINS MEDICINE - <a href="https://www.hopkinsmedicine.org/" className="text-[#09a252] hover:underline">www.hopkinsmedicine.org</a></li>
        <li>Cleveland Clinic - <a href="https://my.clevelandclinic.org" className="text-[#09a252] hover:underline">my.clevelandclinic.org</a></li>
        <li>Guts UK - <a href="https://gutscharity.org.uk/" className="text-[#09a252] hover:underline">gutscharity.org.uk</a></li>
        <li>American Gastroenterological Association - <a href="https://gastro.org/" className="text-[#09a252] hover:underline">gastro.org</a></li>
        <li>World Gastroenterology Organisation - <a href="https://www.worldgastroenterology.org/" className="text-[#09a252] hover:underline">www.worldgastroenterology.org</a></li>
        <li>IFFGD - International Foundation for Gastrointestinal Disorders - <a href="https://iffgd.org/" className="text-[#09a252] hover:underline">iffgd.org</a></li>
      </ul>
    </div>
  </div>

  <div className="article-footer mt-8 pt-6 border-t border-green-200">
    <div className="flex flex-wrap justify-between items-center">
      <div className="tags mb-4 md:mb-0">
        <span className="font-semibold text-[#09a252]">Subiecte:</span>
        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Gută</a>
        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Acid Uric</a>
        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm mr-2 hover:bg-green-200">Nutriție</a>
        <a href="#" className="inline-block bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm hover:bg-green-200">Artrită</a>
      </div>
      <div className="share">
        <span className="font-semibold text-[#09a252] mr-2">Distribuie:</span>
        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-facebook-f"></i></a>
        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-twitter"></i></a>
        <a href="#" className="inline-block text-[#09a252] hover:text-green-900 mr-3"><i className="fab fa-linkedin-in"></i></a>
        <a href="#" className="inline-block text-[#09a252] hover:text-green-900"><i className="fas fa-envelope"></i></a>
      </div>
    </div>
  </div>
</ArticleLayout>

    );
}