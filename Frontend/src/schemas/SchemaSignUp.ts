import { z } from 'zod';

export const SchemaSignUp = z.object({
    username: z.string().min(2, { message: "Username must contain at least 2 characters." }),
    password: z.string().min(6, { message: "A password must contain at least 6 characters." }),
    email: z.string().email({ message: "The email address is invalid." }),
    creditCard: z.string().regex(/^\d+$/, { message: "The credit card number must contain only digits." })
        .min(13, { message: "The credit card number must be at least 13 digits long." })
        .max(19, { message: "The credit card number must be at most 19 digits long." }),
    expiryMonth: z.string()
        .regex(/^\d{2}$/, { message: "The expiry month must be in the format MM." })
        .refine((month) => {
            const monthNumber = parseInt(month, 10);
            return monthNumber >= 1 && monthNumber <= 12;
        }, {
            message: "The expiry month must be between 01 and 12."
        }),

    expiryYear: z.string()
        .regex(/^\d{2}$|\d{4}$/, { message: "The expiry year must be in the format YY or YYYY." })
        .refine((year) => {
            const currentYearShort = new Date().getFullYear() % 100;
            const currentYearLong = new Date().getFullYear();
            const yearNumber = parseInt(year, 10);

            if (year.length === 2) {
                return yearNumber >= currentYearShort && yearNumber <= currentYearShort + 20; // הגבלת טווח סביר
            } else if (year.length === 4) {
                return yearNumber >= currentYearLong && yearNumber <= currentYearLong + 20; // הגבלת טווח סביר
            }
            return true;
        }, {
            message: "The expiry year must be between the current year and 20 years from now.",
        }),


    cvv: z.string()
        .regex(/^\d{3,4}$/, { message: "The CVV must be 3 or 4 digits." })


});

export type FormData = z.infer<typeof SchemaSignUp>;