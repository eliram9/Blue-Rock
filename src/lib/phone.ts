/* Shared by the contact form (instant feedback) and /api/contact (the real
   gate). Accepts any punctuation the visitor types - "240-750-4889",
   "(240) 750 4889", "+1 240.750.4889" - and returns the number in one
   display format, or null if it isn't a valid US/NANP number. Area code and
   exchange can't start with 0 or 1, which catches most typos and fillers
   like "1234567890". */
export function formatUsPhone(input: string): string | null {
    const digits = input.replace(/\D/g, "").replace(/^1(?=\d{10}$)/, "");
    const match = /^([2-9]\d{2})([2-9]\d{2})(\d{4})$/.exec(digits);
    return match ? `(${match[1]}) ${match[2]}-${match[3]}` : null;
}

export const PHONE_ERROR = "Please enter a valid 10-digit US phone number.";
