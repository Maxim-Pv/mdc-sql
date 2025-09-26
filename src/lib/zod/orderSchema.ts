import z from 'zod';

const nameRegex = /^[А-Яа-яA-Za-zЁё .'-]+$/;
export const phoneRegex = /^\+7\d{10}$/;

export const orderSchema = z
  .object({
    fullName: z.string().trim().min(2, 'Введите ФИО').regex(nameRegex, 'Только буквы, пробел и дефис'),
    email: z.string().trim().email('Некорректный email'),

    phone: z.string().refine(
      (val) => {
        const digits = val.replace(/\D/g, '');
        return /^7\d{10}$/.test(digits);
      },
      { message: 'Введите номер телефона' },
    ),

    region: z.string().trim().optional().or(z.literal('')),
    pickupPoint: z.string().trim().optional().or(z.literal('')),
    address: z.string().trim().optional().or(z.literal('')),

    comment: z.string().trim().max(500, 'Не более 500 символов').optional().or(z.literal('')),

    delivery: z.enum(['cdek', 'post', 'pickup']),
    payment: z.enum(['card', 'cash']),
  })
  .superRefine((data, ctx) => {
    const need = (cond: boolean, path: (keyof typeof data)[], message: string) => {
      if (cond) {
        ctx.addIssue({ code: z.ZodIssueCode.custom, message, path });
      }
    };

    if (data.delivery === 'cdek') {
      need(!data.region, ['region'], 'Укажите город');
      need(!data.pickupPoint, ['pickupPoint'], 'Выберите пункт получения');
    }

    if (data.delivery === 'post') {
      need(!data.region, ['region'], 'Укажите город');
      need(!data.address, ['address'], 'Укажите адрес или индекс');
    }

    // Если при "pickup" тоже нужен город — раскомментить:
    // if (data.delivery === "pickup") {
    //   need(!data.region, ["region"], "Укажите город");
    // }
  });

export type OrderForm = z.infer<typeof orderSchema>;
