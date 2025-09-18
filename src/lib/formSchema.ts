import { z } from "zod";

export const nameRegex = /^[А-Яа-яA-Za-z\-]+$/;
export const cityRegex = /^[А-Яа-яA-Za-z\-]+$/;
export const phoneRegex = /^\+7\d{10}$/;

export const formSchema = z
  .object({
    firstName: z
      .string()
      .min(1, "Введите имя")
      .regex(nameRegex, "Только буквы и дефис"),

    lastName: z
      .string()
      .min(1, "Введите фамилию")
      .regex(nameRegex, "Только буквы и дефис"),

    phone: z.string().refine(
      (val) => {
        const digits = val.replace(/\D/g, "");
        return /^7\d{10}$/.test(digits);
      },
      { message: "Введите номер телефона" }
    ),

    region: z.string().optional(),
    city: z
      .string()
      .min(1, "Укажите город")
      .regex(cityRegex, "Только буквы и дефис"),
    coupon: z.string().optional(),

    isCitizen: z.boolean(),
    isNotCitizen: z.boolean(),

    office: z.string().min(1, "Выберите офис"),

    agree: z.boolean().refine((val) => val === true, {
      message: "Необходимо согласие на обработку данных",
    }),
  })
  .superRefine((data, ctx) => {
    if (data.isCitizen && data.isNotCitizen) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Выберите только один вариант",
        path: ["isNotCitizen"],
      });
    }

    if (!data.isCitizen && !data.isNotCitizen) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Укажите ваш статус",
        path: ["isCitizen"],
      });
    }

    if (data.isCitizen && !data.office) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Выберите офис",
        path: ["office"],
      });
    }
  });

export type FormData = z.infer<typeof formSchema>;
