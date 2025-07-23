'use client';

import { useState } from 'react';
import { calculateChildBMI, validateBMIInput, ChildBMIResult } from '@/lib/utils/bmi';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from './Navbar';

export default function ChildBMITest() {
    const [weight, setWeight] = useState<string>('');
    const [height, setHeight] = useState<string>('');
    const [ageInputType, setAgeInputType] = useState<'years-months' | 'dates'>('years-months');

    // Age in years and months
    const [ageYears, setAgeYears] = useState<string>('');
    const [ageMonths, setAgeMonths] = useState<string>('');

    // Date inputs
    const [birthDate, setBirthDate] = useState<string>('');
    const [measurementDate, setMeasurementDate] = useState<string>(new Date().toISOString().split('T')[0]);

    const [gender, setGender] = useState<'male' | 'female'>('male');
    const [result, setResult] = useState<ChildBMIResult | null>(null);
    const [error, setError] = useState<string>('');
    const [isCalculating, setIsCalculating] = useState(false);

    // Helper function to calculate age from dates
    const calculateAgeFromDates = (birthDate: string, measurementDate: string) => {
        const birth = new Date(birthDate);
        const measurement = new Date(measurementDate);

        let years = measurement.getFullYear() - birth.getFullYear();
        let months = measurement.getMonth() - birth.getMonth();

        if (months < 0) {
            years--;
            months += 12;
        }

        // If we haven't reached the birth day in the current month, subtract a month
        if (measurement.getDate() < birth.getDate()) {
            months--;
            if (months < 0) {
                years--;
                months += 12;
            }
        }

        return { years, months };
    };

    const handleCalculate = async () => {
        setError('');
        setResult(null);

        const weightNum = parseFloat(weight);
        const heightNum = parseFloat(height);

        let ageNum: number;

        if (ageInputType === 'years-months') {
            const years = parseInt(ageYears) || 0;
            const months = parseInt(ageMonths) || 0;
            ageNum = years + (months / 12);
        } else {
            if (!birthDate || !measurementDate) {
                setError('Vă rugăm să completați data nașterii și data măsurătorii.');
                return;
            }
            const ageFromDates = calculateAgeFromDates(birthDate, measurementDate);
            ageNum = ageFromDates.years + (ageFromDates.months / 12);
        }

        const validationError = validateBMIInput(weightNum, heightNum, ageNum);
        if (validationError) {
            setError(validationError);
            return;
        }

        setIsCalculating(true);

        // Simulăm un delay pentru efectul de loading
        await new Promise(resolve => setTimeout(resolve, 1200));

        const bmiResult = calculateChildBMI(weightNum, heightNum, ageNum, gender);
        setResult(bmiResult);
        setIsCalculating(false);
    };

    const resetTest = () => {
        setWeight('');
        setHeight('');
        setAgeYears('');
        setAgeMonths('');
        setBirthDate('');
        setMeasurementDate(new Date().toISOString().split('T')[0]);
        setGender('male');
        setResult(null);
        setError('');
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 relative overflow-hidden">
                {/* Playful background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Floating shapes */}
                    <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                    <div className="absolute top-40 right-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                    <div className="absolute bottom-40 left-20 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
                    <div className="absolute bottom-20 right-10 w-14 h-14 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>

                    {/* Cute stars */}
                    <div className="absolute top-32 right-1/4 text-yellow-300 opacity-30 text-2xl animate-pulse">⭐</div>
                    <div className="absolute top-60 left-1/4 text-pink-300 opacity-30 text-xl animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
                    <div className="absolute bottom-60 right-1/3 text-blue-300 opacity-30 text-2xl animate-pulse" style={{ animationDelay: '2s' }}>✨</div>

                    {/* Friendly emojis */}
                    <div className="absolute top-1/4 left-5 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}>🦋</div>
                    <div className="absolute bottom-1/3 right-5 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>🌈</div>
                </div>

                <div className="max-w-4xl mx-auto px-6 relative z-10">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 mt-4 md:mt-8">
                            IMC pentru <span className="text-[#09a252]">copii și adolescenți</span> 🌟
                        </h1>
                        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                            Să descoperim împreună dacă crești sănătos! Un test simplu și distractiv pentru părinți și copii. 🎈
                        </p>
                    </motion.div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                        {/* Formularul de input */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.1 }}
                            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#09a252]"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Datele copilului
                            </h2>

                            <div className="space-y-6">
                                {/* Age input type selector */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                        Cum preferați să introduceți vârsta?
                                    </label>
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setAgeInputType('years-months')}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${ageInputType === 'years-months'
                                                ? 'border-[#09a252] bg-green-50 text-gray-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-lg font-medium mb-1">📅 Ani și luni</div>
                                            <div className="text-sm text-gray-500">Ex: 8 ani și 6 luni</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setAgeInputType('dates')}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 text-left ${ageInputType === 'dates'
                                                ? 'border-[#09a252] bg-green-50 text-gray-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-lg font-medium mb-1">🗓️ Date naștere</div>
                                            <div className="text-sm text-gray-500">Calculare automată</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Conditional age inputs */}
                                {ageInputType === 'years-months' ? (
                                    <div>
                                        <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                            Vârsta copilului
                                        </label>
                                        <div className="grid grid-cols-2 gap-3">
                                            <div>
                                                <input
                                                    type="number"
                                                    value={ageYears}
                                                    onChange={(e) => setAgeYears(e.target.value)}
                                                    placeholder="8"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                                    min="2"
                                                    max="18"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Ani (2-18)</p>
                                            </div>
                                            <div>
                                                <input
                                                    type="number"
                                                    value={ageMonths}
                                                    onChange={(e) => setAgeMonths(e.target.value)}
                                                    placeholder="6"
                                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                                    min="0"
                                                    max="11"
                                                />
                                                <p className="text-xs text-gray-500 mt-1">Luni (0-11)</p>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="space-y-4">
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                Data nașterii copilului
                                            </label>
                                            <input
                                                type="date"
                                                value={birthDate}
                                                onChange={(e) => setBirthDate(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                                max={measurementDate}
                                            />
                                        </div>
                                        <div>
                                            <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                                Data măsurătorii
                                            </label>
                                            <input
                                                type="date"
                                                value={measurementDate}
                                                onChange={(e) => setMeasurementDate(e.target.value)}
                                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                                min={birthDate}
                                                max={new Date().toISOString().split('T')[0]}
                                            />
                                            <p className="text-xs text-gray-500 mt-1">Implicit: astăzi</p>
                                        </div>
                                    </div>
                                )}

                                {/* Selector gen */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-3">
                                        Genul copilului
                                    </label>
                                    <div className="grid grid-cols-2 gap-3">
                                        <button
                                            type="button"
                                            onClick={() => setGender('male')}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${gender === 'male'
                                                ? 'border-[#09a252] bg-green-50 text-gray-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">👦</div>
                                            <div className="font-medium">Băiat</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGender('female')}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${gender === 'female'
                                                ? 'border-[#09a252] bg-green-50 text-gray-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300'
                                                }`}
                                        >
                                            <div className="text-2xl mb-1">👧</div>
                                            <div className="font-medium">Fată</div>
                                        </button>
                                    </div>
                                </div>

                                {/* Input greutate */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Greutatea (kg)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={weight}
                                            onChange={(e) => setWeight(e.target.value)}
                                            placeholder="Ex: 25"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                            min="1"
                                            max="200"
                                            step="0.1"
                                        />
                                        <div className="absolute right-3 top-3 text-gray-500">kg</div>
                                    </div>
                                </div>

                                {/* Input înălțime */}
                                <div>
                                    <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                                        Înălțimea (cm)
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="number"
                                            value={height}
                                            onChange={(e) => setHeight(e.target.value)}
                                            placeholder="Ex: 120"
                                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#09a252] focus:border-transparent text-lg"
                                            min="50"
                                            max="200"
                                            step="0.1"
                                        />
                                        <div className="absolute right-3 top-3 text-gray-500">cm</div>
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
                                    disabled={!weight || !height ||
                                        (ageInputType === 'years-months' ? !ageYears : (!birthDate || !measurementDate)) ||
                                        isCalculating}
                                    className="w-full bg-gradient-to-r from-[#09a252] to-green-600 text-white font-semibold py-4 px-6 rounded-lg hover:from-green-600 hover:to-green-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl transform hover:scale-105"
                                >
                                    {isCalculating ? (
                                        <>
                                            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                            Analizez...
                                        </>
                                    ) : (
                                        <>
                                            Calculează IMC percentil
                                        </>
                                    )}
                                </button>
                            </div>
                        </motion.div>

                        {/* Rezultate */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 }}
                            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-blue-400"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Rezultatele evaluării
                            </h2>

                            <AnimatePresence mode="wait">
                                {!result && !isCalculating && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="text-center py-12"
                                    >
                                        <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4 text-4xl">
                                            📈
                                        </div>
                                        <p className="text-gray-500">
                                            Completează datele pentru a vedea evaluarea
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
                                        <p className="text-gray-600">Analizez datele copilului...</p>
                                    </motion.div>
                                )}

                                {result && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -20 }}
                                        className="space-y-6"
                                    >
                                        {/* IMC și Percentilă */}
                                        <div className="text-center">
                                            <div className="grid grid-cols-2 gap-4 mb-4">
                                                <div className="bg-gray-50 p-4 rounded-lg">
                                                    <div className="text-3xl font-bold text-gray-900 mb-1">
                                                        {result.bmi}
                                                    </div>
                                                    <div className="text-sm text-gray-600">IMC</div>
                                                </div>
                                                <div className="bg-green-50 p-4 rounded-lg">
                                                    <div className="text-3xl font-bold text-[#09a252] mb-1">
                                                        {result.percentile}%
                                                    </div>
                                                    <div className="text-sm text-gray-600">Percentilă</div>
                                                </div>
                                            </div>

                                            <div className={`text-2xl font-semibold ${result.categoryColor} mb-2`}>
                                                {result.category}
                                            </div>
                                            <div className="text-sm text-gray-600 mb-2">{result.percentileCategory}</div>
                                            <div className="text-sm text-gray-600 mb-4">{result.ageGroup}</div>
                                            <p className="text-gray-700">{result.description}</p>
                                        </div>

                                        {/* Graficul percentilei */}
                                        <div className="bg-gray-50 p-4 rounded-lg">
                                            <h3 className="text-sm font-semibold text-gray-700 mb-3">Poziția în percentile</h3>
                                            <div className="relative">
                                                <div className="h-6 bg-gradient-to-r from-green-300 via-yellow-300 to-red-300 rounded-full"></div>
                                                <div
                                                    className="absolute top-0 w-3 h-6 bg-gray-800 rounded-full transform -translate-x-1/2"
                                                    style={{ left: `${result.percentile}%` }}
                                                ></div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                    <span>5%</span>
                                                    <span>15%</span>
                                                    <span>50%</span>
                                                    <span>85%</span>
                                                    <span>95%</span>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-400 mt-1">
                                                    <span>Sub-<br />normal</span>
                                                    <span>Normal</span>
                                                    <span>Risc</span>
                                                    <span>Supra-<br />ponderal</span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Action buttons */}
                                        <div className="space-y-3">
                                            <button
                                                onClick={resetTest}
                                                className="w-full bg-gray-100 text-gray-700 font-semibold py-3 px-6 rounded-lg hover:bg-gray-200 transition-colors duration-300"
                                            >
                                                Testează alt copil
                                            </button>
                                            <a
                                                href="/team"
                                                className="w-full bg-[#09a252] text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center block hover:cursor-pointer"
                                            >
                                                Consultă un specialist
                                            </a>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </div>

                    {/* Info educațională pentru părinți */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.3 }}
                        className="mt-12 bg-white p-8 rounded-xl shadow-lg"
                    >
                        <h2 className="text-2xl font-bold text-gray-900 mb-6">Ghid pentru părinți: IMC la copii</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Ce sunt percentilele IMC?</h3>
                                <p className="text-gray-600 mb-4">
                                    Percentilele IMC compară greutatea copilului cu alți copii de aceeași vârstă și gen.
                                    De exemplu, percentila 75 înseamnă că copilul cântărește mai mult decât 75% dintre copiii similari.
                                </p>

                                <h3 className="text-lg font-semibold text-gray-900 mb-3">Categoriile pentru copii</h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between">
                                        <span>Sub percentila 5:</span>
                                        <span className="text-[#09a252] font-medium">Subponderal</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Percentila 5-85:</span>
                                        <span className="text-[#09a252] font-medium">Greutate normală</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Percentila 85-95:</span>
                                        <span className="text-yellow-600 font-medium">Risc suprapondere</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Peste percentila 95:</span>
                                        <span className="text-red-600 font-medium">Supraponderal</span>
                                    </div>
                                </div>
                            </div>

                            <div>
                                <h3 className="text-lg font-semibold text-gray-900 mb-3">De ce este diferit față de adulți?</h3>
                                <ul className="space-y-2 text-gray-600 mb-4">
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                        <span>Copiii cresc în ritm diferit</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                        <span>Compoziția corporală se schimbă cu vârsta</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                        <span>Există diferențe între băieți și fete</span>
                                    </li>
                                    <li className="flex items-start gap-2">
                                        <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                                        <span>Pubertatatea influențează dezvoltarea</span>
                                    </li>
                                </ul>

                                <div className="bg-green-50 p-4 rounded-lg">
                                    <h4 className="font-semibold text-green-900 mb-2">Sfat</h4>
                                    <p className="text-sm text-[#09a252]">
                                        Nu vă alarmați dacă copilul nu se află exact în "normal".
                                        Fiecare copil are ritmul său de creștere. Consultați pediatrul
                                        pentru o evaluare completă.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Warning despre interpretare */}
                        <div className="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                            <div className="flex items-start gap-3">
                                <div>
                                    <h4 className="font-semibold text-yellow-800 mb-1">Important de reținut</h4>
                                    <p className="text-sm text-yellow-700">
                                        Acest test este doar orientativ și nu înlocuiește consultul medical.
                                        Pentru o evaluare completă a sănătății copilului, consultați întotdeauna pediatrul.
                                        Factorii genetici, nivelul de activitate și stadiul de dezvoltare pot influența rezultatele.
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