import { z } from "zod";

const persianToEnglishNumbers = (input: string): string => {
  const numMap: { [key: string]: string } = {
    "\u06F0": "0",
    "\u06F1": "1",
    "\u06F2": "2",
    "\u06F3": "3",
    "\u06F4": "4",
    "\u06F5": "5",
    "\u06F6": "6",
    "\u06F7": "7",
    "\u06F8": "8",
    "\u06F9": "9",
  };

  return input.replace(/[\u06F0-\u06F9]/g, (match) => {
    return numMap[match] || match;
  });
};
export const CreateCvFormSchema = z.object({
  fullName: z.string().trim().min(1, {
    message: "نام و نام خانوادگی را وارد کنید",
  }),

  phoneNumber: z
    .string()
    .transform((value) => value.trim())
    .transform(persianToEnglishNumbers)
    .refine((value) => value.length > 0, {
      message: "شماره موبایل خود را وارد کنید",
    })
    .refine(
      (value) => {
        return /^(?:\+?98|0)?9\d{9}$/.test(value);
      },
      {
        message: "شماره موبایل اشتباه است",
      }
    ),
  birthday: z.string().trim().min(1, {
    message: "تاریخ تولد را وارد کنید",
  }),

  email: z.string().email({ message: "فرمت ایمیل نامعتبر است" }),
  militaryStatus: z.object({
    value: z.string(),
    label: z.string(),
  }),
  sex: z.object({
    value: z.string(),
    label: z.string(),
  }),
  image: z.any()
});
