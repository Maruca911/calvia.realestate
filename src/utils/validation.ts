export function validateEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

export function validatePhone(phone: string): boolean {
  return /^[+]?[\d\s()-]{7,20}$/.test(phone);
}

export function validateRequired(value: string): boolean {
  return value.trim().length > 0;
}

export interface ValidationError {
  field: string;
  message: string;
}

function validateContactFields(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!validateRequired(data.name as string || '')) errors.push({ field: 'name', message: 'Name is required' });
  if (!validateEmail(data.email as string || '')) errors.push({ field: 'email', message: 'Valid email is required' });
  if (!validatePhone(data.phone as string || '')) errors.push({ field: 'phone', message: 'Valid phone number is required' });
  if (!validateRequired(data.village as string || '')) errors.push({ field: 'village', message: 'Please select a village' });
  return errors;
}

export function validateBuyerStep1(data: Record<string, unknown>): ValidationError[] {
  const errors = validateContactFields(data);
  if (!validateRequired(data.intent as string || '')) errors.push({ field: 'intent', message: 'Please select buy or rent' });
  return errors;
}

export function validateBuyerStep2(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const types = data.propertyType as string[] || [];
  if (types.length === 0) errors.push({ field: 'propertyType', message: 'Select at least one property type' });
  const intent = data.intent as string || '';
  if (intent === 'Buy') {
    if ((data.budget as number || 0) < 300000) errors.push({ field: 'budget', message: 'Minimum budget is \u20AC300,000' });
  } else {
    if ((data.monthlyBudget as number || 0) < 500) errors.push({ field: 'monthlyBudget', message: 'Minimum monthly budget is \u20AC500' });
  }
  if (!validateRequired(data.timeline as string || '')) errors.push({ field: 'timeline', message: 'Please select a timeline' });
  return errors;
}

export function validateBuyerStep3(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!(data.consent as boolean)) errors.push({ field: 'consent', message: 'You must agree to data sharing' });
  return errors;
}

export function validateSellerStep1(data: Record<string, unknown>): ValidationError[] {
  const errors = validateContactFields(data);
  if (!validateRequired(data.listingPurpose as string || '')) errors.push({ field: 'listingPurpose', message: 'Please select a listing purpose' });
  return errors;
}

export function validateSellerStep2(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  const types = data.propertyType as string[] || [];
  if (types.length === 0) errors.push({ field: 'propertyType', message: 'Select at least one property type' });
  const purpose = data.listingPurpose as string || '';
  if (purpose === 'Sale') {
    if ((data.askingPrice as number || 0) < 300000) errors.push({ field: 'askingPrice', message: 'Minimum asking price is \u20AC300,000' });
  } else if (purpose === 'Long-term Rental') {
    if ((data.monthlyRent as number || 0) < 500) errors.push({ field: 'monthlyRent', message: 'Minimum monthly rent is \u20AC500' });
  } else if (purpose === 'Short-term Rental') {
    if ((data.nightlyRate as number || 0) < 50) errors.push({ field: 'nightlyRate', message: 'Minimum nightly rate is \u20AC50' });
  }
  return errors;
}

export function validateSellerStep3(data: Record<string, unknown>): ValidationError[] {
  const errors: ValidationError[] = [];
  if (!validateRequired(data.timeline as string || '')) errors.push({ field: 'timeline', message: 'Please select a timeline' });
  if (!(data.consent as boolean)) errors.push({ field: 'consent', message: 'You must agree to data sharing' });
  return errors;
}
