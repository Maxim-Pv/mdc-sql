'use client';

import CustomSelect from '@/components/ui/inputs/customSelect/CustomSelect';
import { FormInput } from '@/components/ui/inputs/formInput/FormInput';
import { useCart } from '@/providers/CartContext';
import { IconCircleMinus, IconCirclePlus, IconTrashX, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useMemo, useRef, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import st from './styles.module.css';

type DeliveryMethod = 'cdek' | 'post' | 'pickup';
type PaymentMethod = 'card' | 'tinkoff';

type CheckoutForm = {
  firstName: string;
  email: string;
  phone: string;
  region: string;
  pickupPoint?: string; // ПВЗ для СДЭК
  address?: string; // адрес/индекс для Почты РФ
  comment?: string;
  delivery: DeliveryMethod;
  payment: PaymentMethod;
};
interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, total, increment, decrement, removeItem } = useCart();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const regions = useMemo(() => ['Москва', 'Санкт-Петербург', 'Казань', 'Новосибирск'], []);
  const pickupPoints = useMemo(() => ['ПВЗ—Тверская, 7', 'ПВЗ—Литейный, 10', 'ПВЗ—Невский, 24'], []);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutForm>({
    defaultValues: {
      firstName: '',
      email: '',
      phone: '',
      region: '',
      pickupPoint: '',
      address: '',
      comment: '',
      delivery: 'cdek',
      payment: 'card',
    },
  });

  const delivery = watch('delivery');

  useEffect(() => {
    if (isOpen && items.length === 0) onClose();
  }, [items, isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  useEffect(() => {
    if (delivery === 'cdek') {
      setValue('address', '');
    } else if (delivery === 'post') {
      setValue('pickupPoint', '');
    } else {
      setValue('pickupPoint', '');
      setValue('address', '');
    }
  }, [delivery, setValue]);

  if (!isOpen) return null;

  const onSubmit = async (data: CheckoutForm) => {
    console.log('ORDER:', { items, total, ...data });
    onClose();
  };

  const scrollToForm = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  return (
    <div className={st.overlay} onClick={onClose}>
      <div className={clsx(st.modal, 'flex flex-col')} onClick={(e) => e.stopPropagation()}>
        <button className={st.close} onClick={onClose} aria-label="Закрыть">
          <IconX size={24} />
        </button>
        <h2 className="mb-4 text-xl leading-[30px] font-semibold sm:text-[20px]">Ваш заказ</h2>

        <div className="flex-1 border-t border-b border-[#e5e7eb] sm:p-[10px]">
          {items.map((item) => (
            <div key={`${item.id}-${item.size}`} className="flex items-center gap-[10px] py-[10px] last:mb-0 lg:mb-4">
              <div className="flex flex-1 items-center gap-[10px]">
                <div className={st.imageWrapper}>
                  <Image src={item.image} alt={item.name} width={60} height={80} className={st.cartItemImage} />
                  {/* кнопка удаления для мобилок */}
                  <button
                    className={st.trashButtonMobile}
                    onClick={() => removeItem(item.id, item.size)}
                    aria-label="Удалить"
                  >
                    <IconX size={15} stroke={2} />
                  </button>
                </div>

                <div className="flex min-h-[50px] flex-1 flex-col justify-between text-[10px] sm:text-sm lg:max-w-[170px]">
                  <p className="font-medium uppercase">{item.name}</p>
                  <p className="text-xs text-gray-500">Размер: {item.size}</p>
                </div>
              </div>
              <div className="flex min-h-[50px] flex-col items-center justify-between lg:flex-row lg:gap-10">
                <div className="flex items-center lg:gap-2">
                  <button className={st.iconButton} onClick={() => decrement(item.id, item.size)}>
                    <IconCircleMinus className="h-[15px] w-[15px] lg:h-[24px] lg:w-[24px]" />
                  </button>
                  <output className="min-w-[25px] text-center text-xs font-medium lg:text-lg">{item.qty}</output>
                  <button className={st.iconButton} onClick={() => increment(item.id, item.size)}>
                    <IconCirclePlus className="h-[15px] w-[15px] lg:h-[24px] lg:w-[24px]" />
                  </button>
                </div>
                <p className="items-center text-xs font-medium lg:min-w-[90px] lg:text-lg">
                  {item.price * item.qty} р.
                </p>
              </div>
              <button className={st.trashButton + ' ml-[10px]'} onClick={() => removeItem(item.id, item.size)}>
                <IconTrashX size={24} />
              </button>
            </div>
          ))}
        </div>

        <div className="mb-2 flex items-center justify-end gap-2 pt-[20px] text-sm lg:pt-[30px] lg:text-lg">
          <span>Сумма:</span>
          <span className="font-semibold">{total} р.</span>
        </div>

        {!showForm && (
          <div className="pt-[20px]">
            <button className={st.btnOrder} onClick={scrollToForm}>
              Оформить заказ
            </button>
          </div>
        )}

        {showForm && (
          <div ref={formRef} className="mt-4 sm:px-[10px]">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="grid grid-cols-1 gap-4">
                <FormInput
                  name="firstName"
                  control={control}
                  error={errors.firstName}
                  placeholder="Ваше ФИО*"
                  className={st.input}
                />
                <FormInput
                  name="email"
                  control={control}
                  error={errors.email}
                  placeholder="Ваш mail (для получения трек-кода)*"
                  className={st.input}
                />
                <FormInput
                  name="phone"
                  control={control}
                  error={errors.phone}
                  placeholder="+7 (999) 999-99-99"
                  className={st.input}
                  isMasked
                />
              </div>

              <fieldset className="space-y-2 lg:space-y-4">
                <legend className="text-sm font-medium lg:text-lg">Доставка</legend>
                <div className="flex flex-col gap-3">
                  {[
                    { value: 'cdek', label: 'СДЭК' },
                    { value: 'post', label: 'Почта России' },
                    { value: 'pickup', label: 'Самовывоз из офиса КСЦ' },
                  ].map((option) => (
                    <label key={option.value} className="inline-flex cursor-pointer items-center gap-2">
                      <Controller
                        name="delivery"
                        control={control}
                        render={({ field }) => (
                          <input
                            type="radio"
                            value={option.value}
                            checked={field.value === option.value}
                            onChange={() => field.onChange(option.value)}
                          />
                        )}
                      />
                      <span className="text-xs sm:text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </fieldset>

              {delivery !== 'pickup' && (
                <Controller
                  name="region"
                  control={control}
                  rules={{ required: 'Выберите город' }}
                  render={({ field }) => (
                    <CustomSelect
                      {...field}
                      options={regions.map((r) => ({ label: r, value: r }))}
                      placeholder="Ваш город"
                      wrapperClassName={st.selectWrapper}
                      selectClassName={st.select}
                      error={errors.region}
                    />
                  )}
                />
              )}

              {delivery === 'cdek' && (
                <>
                  <Controller
                    name="pickupPoint"
                    control={control}
                    rules={{ required: 'Выберите пункт получения' }}
                    render={({ field }) => (
                      <CustomSelect
                        {...field}
                        options={pickupPoints.map((p) => ({
                          label: p,
                          value: p,
                        }))}
                        placeholder="Пункт получения"
                        wrapperClassName={st.selectWrapper}
                        selectClassName={st.select}
                        error={errors.pickupPoint}
                      />
                    )}
                  />

                  <div className="h-[180px] w-full overflow-hidden rounded border border-gray-300 sm:h-[220px]">
                    {/* подключить карту СДЭК / Яндекс */}
                    <div className="grid h-full w-full place-items-center bg-gray-100 text-sm text-gray-500">
                      Карта ПВЗ (плейсхолдер)
                    </div>
                  </div>
                </>
              )}

              {delivery === 'post' && (
                <Controller
                  name="address"
                  control={control}
                  rules={{ required: 'Укажите адрес или индекс' }}
                  render={({ field }) => (
                    <textarea
                      {...field}
                      placeholder="Адрес и индекс"
                      className={clsx(
                        'min-h-[90px] w-full resize-y rounded border px-3 py-2',
                        errors.address && 'border-red-500',
                        st.input,
                      )}
                    />
                  )}
                />
              )}

              <Controller
                name="comment"
                control={control}
                render={({ field }) => (
                  <textarea
                    {...field}
                    placeholder="Комментарий*"
                    className={clsx('min-h-[70px] w-full resize-y rounded border px-3 py-4', st.input)}
                  />
                )}
              />

              <fieldset className="space-y-2">
                <legend className="text-sm text-gray-600">Способ оплаты</legend>
                <div className="flex flex-col gap-3">
                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <Controller
                      name="payment"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="card"
                          checked={field.value === 'card'}
                          onChange={() => field.onChange('card')}
                        />
                      )}
                    />
                    <span>Банковской картой (Visa, Mastercard)</span>
                  </label>

                  <label className="inline-flex cursor-pointer items-center gap-2">
                    <Controller
                      name="payment"
                      control={control}
                      render={({ field }) => (
                        <input
                          type="radio"
                          value="tinkoff"
                          checked={field.value === 'tinkoff'}
                          onChange={() => field.onChange('tinkoff')}
                        />
                      )}
                    />
                    <span>Долями от Тинькофф</span>
                  </label>
                </div>
              </fieldset>

              <div className={st.modalFooter}>
                <div className="flex w-full flex-col items-start justify-between gap-[30px]">
                  <div className="flex flex-col gap-2">
                    <div className="text-xs lg:text-lg">
                      <span className="mr-1 text-gray-600">Сумма:</span>
                      <span>{total} р.</span>
                    </div>
                    <p className="text-xs font-semibold lg:text-lg">Итоговая сумма: {total} р.</p>
                  </div>
                  <button className={st.btnOrder}>Оформить заказ</button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
