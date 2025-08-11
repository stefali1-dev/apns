'use client';

import { useState } from 'react';
import { calculateAdultBMI, validateBMIInput, BMIResult } from '@/lib/utils/bmi';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

export default function AdultBMITest() {
  const [weight, setWeight] = useState<string>('');
  const [height, setHeight] = useState<string>('');
  const [result, setResult] = useState<BMIResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isCalculating, setIsCalculating] = useState(false);

  // Helper function to calculate dot position on the segmented BMI bar
  const calculateDotPosition = (bmi: number) => {
    // The bar has 4 equal sections (25% each):
    // Section 1: <18.5 BMI (0-25% of bar)
    // Section 2: 18.5-25 BMI (25-50% of bar)  
    // Section 3: 25-30 BMI (50-75% of bar)
    // Section 4: 30+ BMI (75-100% of bar)
    
    if (bmi < 18.5) {
      // Map 15-18.5 BMI to 0-25% of bar
      const clampedBmi = Math.max(bmi, 15);
      return (clampedBmi - 15) / (18.5 - 15) * 25;
    } else if (bmi < 25) {
      // Map 18.5-25 BMI to 25-50% of bar
      return 25 + ((bmi - 18.5) / (25 - 18.5)) * 25;
    } else if (bmi < 30) {
      // Map 25-30 BMI to 50-75% of bar
      return 50 + ((bmi - 25) / (30 - 25)) * 25;
    } else {
      // Map 30-40 BMI to 75-100% of bar
      const clampedBmi = Math.min(bmi, 40);
      return 75 + ((clampedBmi - 30) / (40 - 30)) * 25;
    }
  };

  const handleCalculate = async () => {
    setError('');
    setResult(null);

    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    const validationError = validateBMIInput(weightNum, heightNum);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsCalculating(true);

    // Simulăm un delay pentru efectul de loading
    await new Promise(resolve => setTimeout(resolve, 1000));

    const bmiResult = calculateAdultBMI(weightNum, heightNum);
    setResult(bmiResult);
    setIsCalculating(false);
  };

  const resetTest = () => {
    setWeight('');
    setHeight('');
    setResult(null);
    setError('');
  };

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-white py-12">
        <div className="max-w-4xl mx-auto px-6">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-12"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Calculează-ți <span className="text-[#09a252]">Indicele de Masă Corporală</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Află în doar 2 minute dacă greutatea ta este în intervalul normal.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Formularul de input */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="bg-white p-8 rounded-xl shadow-lg"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Introdu datele tale</h2>

              <div className="space-y-6">
                {/* Input greutate */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Greutatea (kg)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value)}
                      placeholder="Ex: 70"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      min="1"
                      max="500"
                      step="0.1"
                    />
                  </div>
                </div>

                {/* Input înălțime */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Înălțimea (cm)
                  </label>
                  <div className="relative">
                    <input
                      type="number"
                      value={height}
                      onChange={(e) => setHeight(e.target.value)}
                      placeholder="Ex: 175"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent text-lg"
                      min="1"
                      max="250"
                      step="0.1"
                    />
                  </div>
                </div>

                {/* Error message */}
                <AnimatePresence>
                  {error && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg"
                    >
                      {error}
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Buton calculare */}
                <button
                  onClick={handleCalculate}
                  disabled={!weight || !height || isCalculating}
                  className="w-full bg-[#09a252] text-white font-semibold py-4 px-6 rounded-lg hover:bg-[#09a252] disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2"
                >
                  {isCalculating ? (
                    <>
                      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                      Calculez...
                    </>
                  ) : (
                    <>
                      Calculează IMC
                    </>
                  )}
                </button>
              </div>

              {/* Info suplimentară */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <h3 className="text-sm font-semibold text-green-900 mb-2">Știai că?</h3>
                <p className="text-sm text-[#09a252]">
                  IMC este un indicator util, dar nu ia în considerare masa musculară.
                  Pentru o evaluare completă, recomandăm consultarea unui specialist.
                </p>
              </div>
            </motion.div>

            {/* Rezultate */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-lg flex flex-col"
            >
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Rezultatele tale</h2>

              <div className="flex-grow">
                <AnimatePresence mode="wait">
                  {!result && !isCalculating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                        📊
                      </div>
                      <p className="text-gray-500">
                        Completează formularul pentru a vedea rezultatele
                      </p>
                    </motion.div>
                  )}

                  {isCalculating && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="text-center py-12"
                    >
                      <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#09a252]"></div>
                      </div>
                      <p className="text-gray-600">Calculez rezultatul...</p>
                    </motion.div>
                  )}

                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      className="space-y-6"
                    >
                      {/* IMC Score */}
                      <div className="text-center">
                        <div className="text-6xl font-bold text-gray-900 mb-2">
                          {result.bmi}
                        </div>
                        <div className={`text-2xl font-semibold ${result.categoryColor} mb-2`}>
                          {result.category}
                        </div>
                        <p className="text-gray-600">{result.description}</p>
                      </div>

                      {/* Visual indicator */}
                      <div className="relative mb-0">
                        <div className="h-4 rounded-full overflow-hidden flex">
                          {/* Subponderal: <18.5 */}
                          <div className="flex-1 bg-yellow-500" style={{ width: '25%' }}></div>
                          {/* Normal: 18.5-25 */}
                          <div className="flex-1 bg-[#09a252]" style={{ width: '25%' }}></div>
                          {/* Supraponderal: 25-30 */}
                          <div className="flex-1 bg-yellow-500" style={{ width: '25%' }}></div>
                          {/* Obezitate: 30+ */}
                          <div className="flex-1 bg-red-600" style={{ width: '25%' }}></div>
                        </div>
                        <div
                          className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 shadow-md"
                          style={{
                            left: `${calculateDotPosition(result.bmi)}%`
                          }}
                        ></div>
                      </div>
                      <div className="flex justify-between text-xs text-gray-500 mt-2">
                        <span>15</span>
                        <span>18.5</span>
                        <span>25</span>
                        <span>30</span>
                        <span>40+</span>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Action buttons - Always at bottom */}
              <div className="mt-6">
                <AnimatePresence>
                  {result && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="space-y-3"
                    >
                      <button
                        onClick={resetTest}
                        className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                      >
                        Calculează din nou
                      </button>
                        <button
                        className="w-full bg-[#09a252] text-white font-semibold py-3 px-6 rounded-lg hover:bg-[#09a252] transition-colors duration-300"
                        onClick={() => window.location.assign('/team')}
                        >
                        Vorbește cu un dietetician
                        </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* Info suplimentară */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mt-12 bg-white p-8 rounded-xl shadow-lg"
          >
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Despre Indicele de Masă Corporală</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ce este IMC?</h3>
                <p className="text-gray-600 mb-4">
                  Indicele de Masă Corporală (IMC) este o măsură care folosește înălțimea și greutatea
                  pentru a determina dacă o persoană are o greutate sănătoasă.
                </p>

                <h3 className="text-lg font-semibold text-gray-900 mb-3">Categoriile IMC</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Sub 18.5:</span>
                    <span className="text-yellow-600 font-medium">Subponderal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>18.5 - 24.9:</span>
                    <span className="text-[#09a252] font-medium">Normal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>25.0 - 29.9:</span>
                    <span className="text-yellow-600 font-medium">Supraponderal</span>
                  </div>
                  <div className="flex justify-between">
                    <span>30.0+:</span>
                    <span className="text-red-600 font-medium">Obezitate</span>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-3">Limitări importante</h3>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <span>Nu diferențiază între masa musculară și grăsime</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <span>Poate fi mai puțin precis pentru sportivi</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <span>Nu ia în considerare distribuția grăsimii</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full mt-2"></div>
                    <span>Vârsta și sexul pot influența interpretarea</span>
                  </li>
                </ul>

                <div className="mt-4 p-3 bg-green-50 rounded-lg">
                  <p className="text-sm text-[#09a252]">
                    <strong>Recomandare:</strong> Folosește IMC ca punct de plecare,
                    dar consultă întotdeauna un dietetician pentru o evaluare completă.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}