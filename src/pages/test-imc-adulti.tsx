// pages/test-imc-adulti.tsx
import Head from 'next/head';
import AdultBMITest from '../components/AdultBMITest';

export default function TestIMCAdulti() {
  return (
    <>
      <Head>
        <title>Test IMC pentru Adulți - Asociația de Nutriție</title>
        <meta 
          name="description" 
          content="Calculează gratuit Indicele de Masă Corporală (IMC) și primește recomandări personalizate de la nutriționistul nostru. Test complet pentru adulți." 
        />
        <meta name="keywords" content="IMC, indice masa corporala, test greutate, nutritie, sanatate" />
        <meta property="og:title" content="Test IMC Gratuit pentru Adulți" />
        <meta property="og:description" content="Află dacă greutatea ta este în intervalul normal cu testul nostru IMC gratuit." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://asociatia-nutritie.ro/test-imc-adulti" />
      </Head>
      
      <AdultBMITest />
    </>
  );
}