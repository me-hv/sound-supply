/**
 * Sound Supply — Currency & Money Math Utility
 * 
 * Strict integer arithmetic handling prices in paise (1 INR = 100 paise)
 * to eliminate IEEE-754 floating-point inaccuracies in financial calculations.
 */

/**
 * Converts integer paise to rupees.
 * e.g., 3899900 paise -> 38999 rupees
 */
export function paiseToRupees(paise: number): number {
  return Math.round(paise) / 100;
}

/**
 * Converts rupees to integer paise.
 * e.g., 38999 rupees -> 3899900 paise
 */
export function rupeesToPaise(rupees: number): number {
  return Math.round(rupees * 100);
}

export interface FormatInrOptions {
  /** If true, the input value is treated as paise; defaults to true for financial safety */
  isPaise?: boolean;
  /** Whether to show decimal places (e.g. .00); defaults to false for clean Indian retail display */
  showDecimals?: boolean;
}

/**
 * Formats a monetary value to the Indian Rupee representation (e.g., ₹38,999 or ₹1,49,999)
 * Using the standard 'en-IN' numbering system (thousands, lakhs, crores).
 */
export function formatInr(value: number, options: FormatInrOptions = {}): string {
  const { isPaise = false, showDecimals = false } = options;
  const rupees = isPaise ? paiseToRupees(value) : value;

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: showDecimals ? 2 : 0,
    minimumFractionDigits: showDecimals ? 2 : 0,
  }).format(rupees);
}

/**
 * Calculates absolute and percentage savings between MRP and Selling Price.
 */
export function calculateSavings(
  mrp: number,
  selling: number,
  isPaise: boolean = false
): { amount: number; percentage: number; amountFormatted: string } {
  const savings = Math.max(0, mrp - selling);
  const percentage = mrp > 0 ? Math.round((savings / mrp) * 100) : 0;

  return {
    amount: savings,
    percentage,
    amountFormatted: formatInr(savings, { isPaise }),
  };
}

/**
 * Estimates monthly EMI for a 12-month zero/low cost tenure guideline.
 */
export function calculateEstimatedEmi(price: number, tenureMonths: number = 12, isPaise: boolean = false): number {
  const rupees = isPaise ? paiseToRupees(price) : price;
  return Math.round(rupees / tenureMonths);
}
