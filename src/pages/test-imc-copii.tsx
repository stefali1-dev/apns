// pages/test-imc-copii.tsx
import Head from 'next/head';
import ChildBMITest from '../components/ChildBMITest';

export default function TestIMCCopii() {
  return (
    <>
      <Head>
        <title>Test IMC pentru Copii - Evaluare cu Percentile | Asociația de Nutriție</title>
        <meta 
          name="description" 
          content="Test IMC specializat pentru copii de 2-18 ani cu percentile adaptate vârstei și genului. Evaluare gratuită și recomandări pentru părinți." 
        />
        <meta name="keywords" content="IMC copii, percentile IMC, test greutate copii, nutritie pediatrica, sanatate copii" />
        <meta property="og:title" content="Test IMC pentru Copii cu Percentile" />
        <meta property="og:description" content="Evaluare specializată IMC pentru copii cu percentile adaptate vârstei. Ghid complet pentru părinți." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://asociatia-nutritie.ro/test-imc-copii" />
      </Head>
      
      <ChildBMITest />
    </>
  );
}