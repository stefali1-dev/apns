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

    // Helper function to get percentile box styling based on category
    const getPercentileBoxStyle = (categoryColor: string) => {
        switch (categoryColor) {
            case 'text-yellow-500':
                return {
                    bgColor: 'bg-yellow-50',
                    textColor: 'text-yellow-500',
                    borderColor: 'border-yellow-500'
                };
            case 'text-[#09a252]':
                return {
                    bgColor: 'bg-green-50',
                    textColor: 'text-[#09a252]',
                    borderColor: 'border-[#09a252]'
                };
            case 'text-red-600':
                return {
                    bgColor: 'bg-red-50',
                    textColor: 'text-red-600',
                    borderColor: 'border-red-600'
                };
            default:
                return {
                    bgColor: 'bg-gray-50',
                    textColor: 'text-gray-600',
                    borderColor: 'border-gray-600'
                };
        }
    };

    // Helper function to calculate dot position on the segmented percentile bar
    const calculateDotPosition = (percentile: number) => {
        // The bar has 4 equal sections (25% each):
        // Section 1: 0-5th percentile (Subponderal) - 0-25% of bar
        // Section 2: 5th-85th percentile (Greutate sănătoasă) - 25-50% of bar  
        // Section 3: 85th-95th percentile (Supraponderal) - 50-75% of bar
        // Section 4: 95th-100th percentile (Obezitate) - 75-100% of bar
        
        if (percentile <= 5) {
            // Map 0-5th percentile to 0-25% of bar
            return (percentile / 5) * 25;
        } else if (percentile <= 85) {
            // Map 5th-85th percentile to 25-50% of bar
            return 25 + ((percentile - 5) / (85 - 5)) * 25;
        } else if (percentile <= 95) {
            // Map 85th-95th percentile to 50-75% of bar
            return 50 + ((percentile - 85) / (95 - 85)) * 25;
        } else {
            // Map 95th-100th percentile to 75-100% of bar
            return 75 + ((percentile - 95) / (100 - 95)) * 25;
        }
    };

    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 py-12 relative overflow-hidden">
                {/* Playful background decorations */}
                <div className="absolute inset-0 pointer-events-none">
                    {/* Floating shapes - Positioned symmetrically */}
                    {/* Left side */}
                    <div className="absolute top-20 left-10 w-16 h-16 bg-yellow-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0s', animationDuration: '3s' }}></div>
                    <div className="absolute top-40 left-20 w-12 h-12 bg-pink-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1s', animationDuration: '4s' }}></div>
                    <div className="absolute bottom-40 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2s', animationDuration: '5s' }}></div>
                    <div className="absolute bottom-20 left-16 w-14 h-14 bg-green-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.5s', animationDuration: '3.5s' }}></div>
                    
                    {/* Right side - Mirrored positions */}
                    <div className="absolute top-20 right-10 w-16 h-16 bg-purple-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '1.5s', animationDuration: '3s' }}></div>
                    <div className="absolute top-40 right-20 w-12 h-12 bg-orange-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '2.5s', animationDuration: '4s' }}></div>
                    <div className="absolute bottom-40 right-10 w-20 h-20 bg-teal-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '3s', animationDuration: '5s' }}></div>
                    <div className="absolute bottom-20 right-16 w-14 h-14 bg-indigo-200 rounded-full opacity-20 animate-bounce" style={{ animationDelay: '0.8s', animationDuration: '3.5s' }}></div>

                    {/* Stars - Symmetrically positioned */}
                    {/* Left side stars */}
                    <div className="absolute top-32 left-1/4 text-yellow-300 opacity-30 text-5xl animate-pulse">⭐</div>
                    <div className="absolute top-60 left-1/3 text-pink-300 opacity-30 text-4xl animate-pulse" style={{ animationDelay: '1s' }}>🌟</div>
                    
                    {/* Right side stars - Mirrored */}
                    <div className="absolute top-32 right-1/4 text-purple-300 opacity-30 text-5xl animate-pulse" style={{ animationDelay: '1.5s' }}>⭐</div>
                    <div className="absolute top-60 right-1/3 text-orange-300 opacity-30 text-4xl animate-pulse" style={{ animationDelay: '2.5s' }}>🌟</div>

                    {/* Child-friendly emojis - Symmetrically positioned */}
                    {/* Left side emojis */}
                    <div className="absolute top-1/4 left-5 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '3s' }}>🦋</div>
                    <div className="absolute top-1/2 left-8 text-5xl opacity-20 animate-pulse" style={{ animationDelay: '1.5s' }}>🌻</div>
                    <div className="absolute bottom-1/3 left-5 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '2.5s' }}>🌈</div>
                    <div className="absolute bottom-1/4 left-12 text-5xl opacity-20 animate-pulse" style={{ animationDelay: '4s' }}>🎈</div>
                    
                    {/* Right side emojis - Mirrored */}
                    <div className="absolute top-1/4 right-5 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '3.5s' }}>🐝</div>
                    <div className="absolute top-1/2 right-8 text-5xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}>🌺</div>
                    <div className="absolute bottom-1/3 right-5 text-6xl opacity-20 animate-pulse" style={{ animationDelay: '1s' }}>☀️</div>
                    <div className="absolute bottom-1/4 right-12 text-5xl opacity-20 animate-pulse" style={{ animationDelay: '0.5s' }}>✨</div>

                    {/* Additional playful elements */}
                    {/* Center top and bottom for balance */}
                    <div className="absolute top-12 left-1/2 transform -translate-x-1/2 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '2.8s' }}>☀️</div>
                    <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 text-4xl opacity-20 animate-pulse" style={{ animationDelay: '1.8s' }}>🌙</div>
                    
                    {/* Corner decorations */}
                    <div className="absolute top-16 left-16 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '4.5s' }}>🍎</div>
                    <div className="absolute top-16 right-16 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '3.8s' }}>🥕</div>
                    <div className="absolute bottom-16 left-16 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '2.2s' }}>🥦</div>
                    <div className="absolute bottom-16 right-16 text-3xl opacity-15 animate-pulse" style={{ animationDelay: '1.2s' }}>🌺</div>
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
                                            <div className="flex justify-center mb-2">
                                                <svg 
                                                    className="w-12 h-12"
                                                    fill={gender === 'male' ? '#09a252' : '#9CA3AF'} 
                                                    version="1.1" 
                                                    viewBox="0 0 48.937 48.937"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g>
                                                        <path d="M22.021,34.999 Q24.521,36.499 27.021,34.999" stroke={gender === 'male' ? '#09a252' : '#9CA3AF'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                                                        <circle cx="17.729" cy="28.867" r="2.25"/>
                                                        <circle cx="31.313" cy="28.867" r="2.25"/>
                                                        <path d="M44.645,24.421c1.249-1.011,2.108-2.938,1.75-6.517c0,0-0.832-11.498-8.667-10.332c0,0-2.441-7.721-17.783-4.875
                                                            c-0.863-1.02-2.41-2.186-5.142-2.697c0,0,0.833,1.722,0.956,3.589C13.607,3.734,0.43,5.256,2.728,20.572
                                                            c0,0,0.214,2.983,1.667,4.493v3.217c-0.857,1.123-1.375,2.545-1.375,4.094c0,2.969,1.885,5.484,4.463,6.291
                                                            c3.261,6.242,9.805,10.271,17.068,10.271c7.269,0,13.821-4.041,17.08-10.295c2.54-0.832,4.389-3.327,4.389-6.271
                                                            c0-1.549-0.517-2.975-1.375-4.098L44.645,24.421L44.645,24.421z M39.78,34.937c-0.29,0-0.564-0.065-0.818-0.182
                                                            c-2.039,5.918-7.712,10.182-14.408,10.182c-6.703,0-12.383-4.272-14.415-10.2c-0.269,0.129-0.563,0.2-0.874,0.2
                                                            c-1.244,0-2.242-1.145-2.242-2.562c0-1.414,0.998-2.563,2.242-2.563c0.023,0,0.045,0.008,0.069,0.008
                                                            c0.004-0.582,0.046-1.266,0.117-1.985c1.521-0.433,3.223-2.115,4.326-4.48c0.33-0.708,0.575-1.417,0.745-2.103
                                                            c0.479,1.038,1.443,2.343,3.376,2.987c0,0-0.167-4.666,1.833-5.666c0,0,2.166,2.5,1.833,4c0,0,5.131-1.72,6.224-4.395
                                                            c-0.255,0.693-0.793,2.589,0.275,4.061c0,0,1.5-3.168,2.832-3.5c0,0,1.777,3.459,4.699,5.267c1.112,2.053,2.668,3.484,4.063,3.848
                                                            c0.067,0.713,0.108,1.387,0.112,1.961c0.005,0,0.007-0.002,0.009-0.002c1.243,0,2.24,1.148,2.24,2.564
                                                            C42.02,33.79,41.024,34.937,39.78,34.937z"/>
                                                    </g>
                                                </svg>
                                            </div>
                                            <div className="font-medium">Băiat</div>
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => setGender('female')}
                                            className={`p-4 rounded-lg border-2 transition-all duration-200 ${gender === 'female'
                                                ? 'border-pink-400 bg-pink-50 text-gray-700'
                                                : 'border-gray-200 bg-white text-gray-600 hover:border-pink-200'
                                                }`}
                                        >
                                            <div className="flex justify-center mb-2">
                                                <svg 
                                                    className="w-12 h-12"
                                                    fill={gender === 'female' ? '#EC4899' : '#9CA3AF'} 
                                                    version="1.1" 
                                                    viewBox="0 0 49.071 49.071"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <g>
                                                        <path d="M22.036,32.015 Q24.536,33.515 27.036,32.015" stroke={gender === 'female' ? '#EC4899' : '#9CA3AF'} strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                                                        <circle cx="17.744" cy="25.885" r="2.25"/>
                                                        <circle cx="31.329" cy="25.885" r="2.25"/>
                                                        <path d="M48.235,39.478c-0.285-0.957-0.556-1.861-0.611-2.485c-0.285-3.174-0.146-12.85-0.146-12.954
                                                            c0-12.453-10.278-22.584-22.916-22.584c-12.637,0-22.918,10.131-22.918,22.601c0.004,0.098,0.322,9.833,0.003,13.016
                                                            c-0.064,0.636-0.374,1.561-0.701,2.539c-0.624,1.865-1.271,3.798-0.766,5.07c0.52,1.309,3.049,2.592,4.199,2.825
                                                            c3.139,0.642,7.482-1.629,12.448-3.159c2.388,1.039,5.012,1.606,7.738,1.606c3.237,0,6.119-0.408,8.607-1.188
                                                            c4.512,1.484,8.471,3.312,11.425,2.722c1.183-0.237,3.695-1.479,4.256-2.795C49.403,43.408,48.808,41.411,48.235,39.478z
                                                             M10.153,31.753c-0.016,0.008-0.034,0.01-0.05,0.018c-0.002-0.006-0.005-0.012-0.007-0.018c-0.26,0.125-0.546,0.193-0.846,0.198
                                                            c-1.231-0.019-2.214-1.155-2.214-2.56c0-1.403,0.983-2.543,2.214-2.56c0.009,0.001,0.018,0.001,0.026,0.003
                                                            c0.342,0.584,0.734,1.146,1.178,1.682c-0.352-1.207-0.559-2.443-0.618-3.681c1.148-1.162,2.148-3.028,2.681-5.252
                                                            c0.153-0.64,0.254-1.269,0.315-1.881c2.109,2.528,6.258,5.265,14.365,5.355c0.002,0,0.004,0,0.006,0
                                                            c0.174,0,0.338-0.092,0.428-0.242c0.092-0.152,0.096-0.341,0.011-0.497c-0.332-0.61-1.125-2.4-0.81-3.344
                                                            c0.039-0.116,0.094-0.211,0.166-0.29c0.814,0.66,3.178,2.317,6.334,2.317c1.162,0,2.304-0.229,3.418-0.678
                                                            c0.562,1.899,1.466,3.482,2.484,4.513c-0.06,1.235-0.267,2.473-0.617,3.68c0.442-0.533,0.836-1.098,1.176-1.682
                                                            c1.217,0.036,2.185,1.163,2.185,2.557c0,1.414-0.998,2.562-2.24,2.562c-0.291,0-0.564-0.066-0.818-0.184
                                                            c-2.036,5.91-7.696,10.17-14.38,10.183C17.849,41.941,12.182,37.672,10.153,31.753z"/>
                                                    </g>
                                                </svg>
                                            </div>
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
                            className="bg-white p-8 rounded-xl shadow-lg border-t-4 border-[#09a252] flex flex-col"
                        >
                            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                                Rezultatele evaluării
                            </h2>

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
                                                    <div className="bg-gray-50 border-2 border-gray-300 p-4 rounded-lg">
                                                        <div className="text-3xl font-bold text-gray-900 mb-1">
                                                            {result.bmi}
                                                        </div>
                                                        <div className="text-sm text-gray-600">IMC</div>
                                                    </div>
                                                    <div className={`${getPercentileBoxStyle(result.categoryColor).bgColor} border-2 ${getPercentileBoxStyle(result.categoryColor).borderColor} p-4 rounded-lg`}>
                                                        <div className={`text-3xl font-bold ${getPercentileBoxStyle(result.categoryColor).textColor} mb-1`}>
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
                                                <div className="relative mb-0">
                                                    <div className="h-4 rounded-full overflow-hidden flex">
                                                        {/* Sub percentila 5: Subponderal */}
                                                        <div className="flex-1 bg-yellow-500" style={{ width: '5%' }}></div>
                                                        {/* De la percentila 5 la sub percentila 85: Greutate sănătoasă */}
                                                        <div className="flex-1 bg-[#09a252]" style={{ width: '80%' }}></div>
                                                        {/* De la percentila 85 la sub percentila 95: Supraponderal */}
                                                        <div className="flex-1 bg-yellow-500" style={{ width: '10%' }}></div>
                                                        {/* Percentila 95 sau mai mare: Obezitate */}
                                                        <div className="flex-1 bg-red-600" style={{ width: '5%' }}></div>
                                                    </div>
                                                    <div
                                                        className="absolute top-0 w-4 h-4 bg-white border-2 border-gray-800 rounded-full transform -translate-x-1/2 shadow-md"
                                                        style={{
                                                            left: `${calculateDotPosition(result.percentile)}%`
                                                        }}
                                                    ></div>
                                                </div>
                                                <div className="flex justify-between text-xs text-gray-500 mt-2">
                                                    <span>0</span>
                                                    <span>5</span>
                                                    <span>85</span>
                                                    <span>95</span>
                                                    <span>100</span>
                                                </div>
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
                                                Testează alt copil
                                            </button>
                                            <a
                                                href="/team"
                                                className="w-full bg-[#09a252] text-white font-semibold py-3 px-6 rounded-lg hover:bg-green-700 transition-colors duration-300 text-center block hover:cursor-pointer"
                                            >
                                                Consultă un dietetician
                                            </a>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
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
                                        <span className="text-yellow-500 font-medium">Subponderal</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>De la percentila 5 la sub percentila 85:</span>
                                        <span className="text-[#09a252] font-medium">Greutate sănătoasă</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>De la percentila 85 la sub percentila 95:</span>
                                        <span className="text-yellow-500 font-medium">Supraponderal</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span>Percentila 95 sau mai mare:</span>
                                        <span className="text-red-600 font-medium">Obezitate</span>
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