// utils/bmi.ts - Funcții pentru calcularea IMC

export interface BMIResult {
  bmi: number;
  category: string;
  categoryColor: string;
  description: string;
  recommendations: string[];
  riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
}

export interface ChildBMIResult extends BMIResult {
  percentile: number;
  percentileCategory: string;
  ageGroup: string;
}

// Calculează IMC pentru adulți
export function calculateAdultBMI(weight: number, height: number): BMIResult {
  const bmi = weight / ((height / 100) ** 2);
  
  let category: string;
  let categoryColor: string;
  let description: string;
  let recommendations: string[];
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';

  if (bmi < 18.5) {
    category = 'Subponderal';
    categoryColor = 'text-blue-600';
    description = 'Greutatea ta este sub valorile normale. Este important să îți îmbunătățești aportul nutritiv.';
    riskLevel = 'moderate';
    recommendations = [
      'Consultă un nutriționist pentru un plan de creștere în greutate',
      'Consumă alimente bogate în nutrienți și calorii sănătoase',
      'Fă exerciții de rezistență pentru a construi masa musculară',
      'Monitorizează regulat greutatea și sănătatea'
    ];
  } else if (bmi >= 18.5 && bmi < 25) {
    category = 'Greutate normală';
    categoryColor = 'text-[#09a252]';
    description = 'Felicitări! Greutatea ta se află în intervalul normal și sănătos.';
    riskLevel = 'low';
    recommendations = [
      'Menține stilul de viață actual',
      'Continuă să ai o alimentație echilibrată',
      'Practică exerciții fizice regulate',
      'Monitorizează periodic greutatea'
    ];
  } else if (bmi >= 25 && bmi < 30) {
    category = 'Supraponderal';
    categoryColor = 'text-yellow-600';
    description = 'Ai un ușor exces de greutate. Cu mici ajustări poți reveni la greutatea ideală.';
    riskLevel = 'moderate';
    recommendations = [
      'Adoptă o alimentație mai echilibrată',
      'Crește activitatea fizică la 150 min/săptămână',
      'Consultă un nutriționist pentru un plan personalizat',
      'Monitorizează progresul săptămânal'
    ];
  } else {
    category = 'Obezitate';
    categoryColor = 'text-red-600';
    description = 'Greutatea ta prezintă riscuri pentru sănătate. Este important să acționezi acum.';
    riskLevel = 'high';
    recommendations = [
      'Consultă urgent un medic specialist',
      'Lucrează cu un nutriționist pentru un plan de slăbire',
      'Începe treptat cu exerciții fizice adaptate',
      'Monitorizează și alte indicatori de sănătate'
    ];
  }

  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    categoryColor,
    description,
    recommendations,
    riskLevel
  };
}

// Date pentru percentile IMC copii (simplificat - în realitate ar trebui să fie mai complex)
type Percentile = { p5: number; p15: number; p50: number; p85: number; p95: number };
type AgePercentiles = { [age: number]: Percentile };

const childBMIPercentiles: { male: AgePercentiles; female: AgePercentiles } = {
  // Exemple de percentile pentru băieți și fete pe grupe de vârstă
  // În implementarea reală, aceasta ar trebui să fie o bază de date complexă
  male: {
    2: { p5: 14.7, p15: 15.3, p50: 16.5, p85: 17.8, p95: 19.3 },
    3: { p5: 14.3, p15: 14.8, p50: 15.8, p85: 17.0, p95: 18.3 },
    4: { p5: 14.0, p15: 14.5, p50: 15.5, p85: 16.8, p95: 18.0 },
    5: { p5: 13.8, p15: 14.2, p50: 15.3, p85: 16.8, p95: 18.2 },
    10: { p5: 14.2, p15: 14.8, p50: 16.6, p85: 19.6, p95: 22.6 },
    15: { p5: 16.5, p15: 17.4, p50: 20.2, p85: 23.6, p95: 26.8 },
    18: { p5: 17.8, p15: 18.9, p50: 21.7, p85: 25.2, p95: 28.7 }
  },
  female: {
    2: { p5: 14.4, p15: 15.0, p50: 16.2, p85: 17.4, p95: 18.8 },
    3: { p5: 14.1, p15: 14.6, p50: 15.6, p85: 16.9, p95: 18.1 },
    4: { p5: 13.9, p15: 14.3, p50: 15.4, p85: 16.8, p95: 18.0 },
    5: { p5: 13.7, p15: 14.2, p50: 15.2, p85: 16.9, p95: 18.3 },
    10: { p5: 14.0, p15: 14.6, p50: 16.4, p85: 19.3, p95: 22.1 },
    15: { p5: 16.0, p15: 17.0, p50: 19.4, p85: 22.7, p95: 25.7 },
    18: { p5: 17.2, p15: 18.2, p50: 20.7, p85: 24.0, p95: 27.0 }
  }
};

// Calculează IMC pentru copii cu percentile
export function calculateChildBMI(
  weight: number, 
  height: number, 
  age: number, 
  gender: 'male' | 'female'
): ChildBMIResult {
  const bmi = weight / ((height / 100) ** 2);
  
  // Găsește cea mai apropiată vârstă din tabelele de percentile
  const availableAges = Object.keys(childBMIPercentiles[gender]).map(Number);
  const closestAge = availableAges.reduce((prev, curr) => 
    Math.abs(curr - age) < Math.abs(prev - age) ? curr : prev
  );
  
  const percentiles = childBMIPercentiles[gender][closestAge];
  
  // Calculează percentila aproximativ
  let percentile: number;
  let percentileCategory: string;
  let category: string;
  let categoryColor: string;
  let description: string;
  let riskLevel: 'low' | 'moderate' | 'high' | 'very-high';
  
  if (bmi < percentiles.p5) {
    percentile = 3;
    percentileCategory = 'Sub percentila 5';
    category = 'Subponderal';
    categoryColor = 'text-blue-600';
    description = 'Copilul tău are o greutate sub valorile normale pentru vârsta și înălțimea sa.';
    riskLevel = 'moderate';
  } else if (bmi < percentiles.p15) {
    percentile = 10;
    percentileCategory = 'Percentila 5-15';
    category = 'Greutate scăzută';
    categoryColor = 'text-blue-500';
    description = 'Greutatea copilului este ușor sub normalul pentru vârsta sa.';
    riskLevel = 'low';
  } else if (bmi < percentiles.p85) {
    percentile = 50;
    percentileCategory = 'Percentila 15-85';
    category = 'Greutate normală';
    categoryColor = 'text-[#09a252]';
    description = 'Excelent! Copilul tău are o greutate normală și sănătoasă.';
    riskLevel = 'low';
  } else if (bmi < percentiles.p95) {
    percentile = 90;
    percentileCategory = 'Percentila 85-95';
    category = 'Risc de suprapondere';
    categoryColor = 'text-yellow-600';
    description = 'Copilul tău prezintă risc de suprapondere. Este important să monitorizezi alimentația.';
    riskLevel = 'moderate';
  } else {
    percentile = 97;
    percentileCategory = 'Peste percentila 95';
    category = 'Supraponderal';
    categoryColor = 'text-red-600';
    description = 'Copilul tău are suprapondere. Recomandăm consultarea unui specialist.';
    riskLevel = 'high';
  }
  
  const recommendations = getChildRecommendations(category, age);
  
  return {
    bmi: Math.round(bmi * 10) / 10,
    category,
    categoryColor,
    description,
    recommendations,
    riskLevel,
    percentile,
    percentileCategory,
    ageGroup: getAgeGroup(age)
  };
}

function getChildRecommendations(category: string, age: number): string[] {
  const baseRecommendations = [
    'Consultă pediatrul pentru o evaluare completă',
    'Menține un program regulat de mese',
    'Încurajează activitatea fizică potrivită vârstei'
  ];
  
  if (category === 'Subponderal' || category === 'Greutate scăzută') {
    return [
      ...baseRecommendations,
      'Consultă un nutriționist pediatric',
      'Asigură-te că copilul consumă suficiente calorii',
      'Monitorizează creșterea și dezvoltarea'
    ];
  } else if (category === 'Risc de suprapondere' || category === 'Supraponderal') {
    return [
      ...baseRecommendations,
      'Limitează alimentele procesate și băuturile dulci',
      'Încurajează consumul de fructe și legume',
      'Crește timpul de activitate fizică zilnică',
      'Stabilește ore fixe pentru mese și gustări'
    ];
  } else {
    return [
      'Continuă cu obiceiurile alimentare actuale',
      'Menține activitatea fizică regulată',
      'Monitorizează periodic creșterea',
      'Încurajează alimentația variată și echilibrată'
    ];
  }
}

function getAgeGroup(age: number): string {
  if (age < 3) return 'Copil mic';
  if (age < 6) return 'Preșcolar';
  if (age < 12) return 'Școlar';
  if (age < 18) return 'Adolescent';
  return 'Tânăr adult';
}

// Funcție helper pentru validarea datelor de intrare
export function validateBMIInput(weight: number, height: number, age?: number): string | null {
  if (weight <= 0 || weight > 500) {
    return 'Greutatea trebuie să fie între 1 și 500 kg';
  }
  
  if (height <= 0 || height > 250) {
    return 'Înălțimea trebuie să fie între 1 și 250 cm';
  }
  
  if (age !== undefined && (age < 2 || age > 18)) {
    return 'Vârsta trebuie să fie între 2 și 18 ani pentru testul copiilor';
  }
  
  return null;
}