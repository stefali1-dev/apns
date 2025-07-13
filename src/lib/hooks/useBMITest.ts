// hooks/useBMITest.ts
import { useState, useCallback } from 'react';
import { BMIResult, ChildBMIResult } from '../utils/bmi';

interface UseBMITestReturn {
  isLoading: boolean;
  error: string | null;
  result: BMIResult | ChildBMIResult | null;
  calculate: (calculator: () => Promise<BMIResult | ChildBMIResult>) => Promise<void>;
  reset: () => void;
  setError: (error: string) => void;
}

export function useBMITest(): UseBMITestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<BMIResult | ChildBMIResult | null>(null);

  const calculate = useCallback(async (calculator: () => Promise<BMIResult | ChildBMIResult>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);
    
    try {
      // Simulăm un delay pentru UX mai bun
      await new Promise(resolve => setTimeout(resolve, 1000));
      const calculationResult = await calculator();
      setResult(calculationResult);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare la calculare');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsLoading(false);
    setError(null);
    setResult(null);
  }, []);

  const handleSetError = useCallback((errorMessage: string) => {
    setError(errorMessage);
  }, []);

  return {
    isLoading,
    error,
    result,
    calculate,
    reset,
    setError: handleSetError
  };
}

// Hook specializat pentru validarea input-urilor
export function useBMIInputValidation() {
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});

  const validateField = useCallback((field: string, value: any, rules: ValidationRule[]) => {
    const errors = rules.reduce((acc, rule) => {
      const error = rule.validate(value);
      if (error) acc[field] = error;
      return acc;
    }, {} as {[key: string]: string});

    setValidationErrors(prev => {
      let updated = { ...prev, ...errors };
      if (Object.keys(errors).length === 0 && prev[field]) {
        // Remove the field key entirely if no errors
        const { [field]: _, ...rest } = updated;
        updated = rest;
      }
      return updated;
    });

    return Object.keys(errors).length === 0;
  }, []);

  const clearErrors = useCallback(() => {
    setValidationErrors({});
  }, []);

  return {
    validationErrors,
    validateField,
    clearErrors,
    hasErrors: Object.values(validationErrors).some(error => error !== undefined)
  };
}

interface ValidationRule {
  validate: (value: any) => string | null;
}

export const validationRules = {
  required: (fieldName: string): ValidationRule => ({
    validate: (value) => !value ? `${fieldName} este obligatoriu` : null
  }),
  
  numberRange: (min: number, max: number, fieldName: string): ValidationRule => ({
    validate: (value) => {
      const num = parseFloat(value);
      if (isNaN(num)) return `${fieldName} trebuie să fie un număr valid`;
      if (num < min || num > max) return `${fieldName} trebuie să fie între ${min} și ${max}`;
      return null;
    }
  }),
  
  integerRange: (min: number, max: number, fieldName: string): ValidationRule => ({
    validate: (value) => {
      const num = parseInt(value);
      if (isNaN(num)) return `${fieldName} trebuie să fie un număr întreg valid`;
      if (num < min || num > max) return `${fieldName} trebuie să fie între ${min} și ${max}`;
      return null;
    }
  })
};

// Hook pentru persistența datelor în sessionStorage (opțional)
export function useBMIDataPersistence(testType: 'adult' | 'child') {
  const storageKey = `bmi_${testType}_data`;

  const saveData = useCallback((data: any) => {
    try {
      sessionStorage.setItem(storageKey, JSON.stringify(data));
    } catch (error) {
      console.warn('Nu s-au putut salva datele în sessionStorage:', error);
    }
  }, [storageKey]);

  const loadData = useCallback(() => {
    try {
      const saved = sessionStorage.getItem(storageKey);
      return saved ? JSON.parse(saved) : null;
    } catch (error) {
      console.warn('Nu s-au putut încărca datele din sessionStorage:', error);
      return null;
    }
  }, [storageKey]);

  const clearData = useCallback(() => {
    try {
      sessionStorage.removeItem(storageKey);
    } catch (error) {
      console.warn('Nu s-au putut șterge datele din sessionStorage:', error);
    }
  }, [storageKey]);

  return { saveData, loadData, clearData };
}