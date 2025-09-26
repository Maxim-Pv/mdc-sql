'use client';

import { CdekDeliveryPicker } from '@/components/delivery/cdek/CdekDeliveryPicker';
import CitySelect from '@/components/delivery/cdek/CitySelect';
import { FormInput } from '@/components/ui/inputs/formInput/FormInput';
import { useCart } from '@/providers/CartContext';
import { useScrollToError } from '@/lib/forms/useScrollToError';
import { calcWeight } from '@/lib/shipping';
import { OrderForm, orderSchema } from '@/lib/zod/orderSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { IconCircleMinus, IconCirclePlus, IconTrashX, IconX } from '@tabler/icons-react';
import clsx from 'clsx';
import Image from 'next/image';
import { useCallback, useEffect, useRef, useState } from 'react';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import st from './styles.module.css';

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function CartModal({ isOpen, onClose }: CartModalProps) {
  const { items, total, increment, decrement, removeItem, clearCart } = useCart();
  const [showForm, setShowForm] = useState(false);
  const formRef = useRef<HTMLDivElement | null>(null);

  const {
    control,
    handleSubmit,
    watch,
    setValue,
    register,
    formState: { errors, isSubmitting },
  } = useForm<OrderForm>({
    resolver: zodResolver(orderSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: false,
    defaultValues: {
      fullName: '',
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

  useEffect(() => {
    register('pickupPoint');
    register('address');
  }, [register]);

  const delivery = watch('delivery');
  const selectedPvzCode = watch('pickupPoint');
  const cityName = watch('region');

  const [uiCity, setUiCity] = useState({ code: '44', name: 'Москва' });
  // локально только для "Итого"
  const [shipping, setShipping] = useState<{
    price: number | null;
    days: string | null;
  }>({
    price: null,
    days: null,
  });

  const handleQuoteChange = useCallback((price: number | null, days: string | null) => {
    setShipping((prev) => (prev.price === price && prev.days === days ? prev : { price, days }));
  }, []);

  // Жизненный цикл модалки
  useEffect(() => {
    if (isOpen && items.length === 0) onClose();
  }, [items, isOpen, onClose]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Очистка адреса/ПВЗ при смене варианта доставки
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

  const onError = useScrollToError<OrderForm>([
    'fullName',
    'email',
    'phone',
    'region',
    'pickupPoint',
    'address',
    'comment',
    'delivery',
    'payment',
  ]);

  const onSubmit: SubmitHandler<OrderForm> = async (data) => {
    console.log('ORDER:', { items, total, ...data });
    clearCart();
    onClose();
  };

  const scrollToForm = () => {
    setShowForm(true);
    requestAnimationFrame(() => {
      formRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  };

  if (!isOpen) return null;

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
            <form onSubmit={handleSubmit(onSubmit, onError)} className="space-y-4">
              <div className="grid grid-cols-1 gap-5">
                <div data-field="fullName" className="contents">
                  <FormInput
                    name="fullName"
                    control={control}
                    error={errors.fullName}
                    placeholder="Ваше ФИО*"
                    className={st.input}
                  />
                </div>
                <div data-field="email" className="contents">
                  <FormInput
                    name="email"
                    control={control}
                    error={errors.email}
                    placeholder="Ваш mail (для получения трек-кода)*"
                    className={st.input}
                  />
                </div>
                <div data-field="phone" className="contents">
                  <FormInput
                    name="phone"
                    control={control}
                    error={errors.phone}
                    placeholder="+7 (999) 999-99-99"
                    className={st.input}
                    isMasked
                  />
                </div>
              </div>

              <div className="mb-[30px] flex flex-col gap-[30px]">
                <span className="text-sm font-medium lg:text-lg">Доставка</span>

                <div data-field="region" className="contents">
                  <Controller
                    name="region"
                    control={control}
                    render={({ field, fieldState }) => (
                      <CitySelect
                        value={uiCity.code}
                        onChange={(code, name) => {
                          setUiCity({ code, name });
                          setValue('region', name, { shouldValidate: true });
                          setValue('pickupPoint', '', { shouldValidate: true }); // смена города = сброс ПВЗ
                          setValue('comment', '');
                        }}
                        placeholder="Ваш город"
                        className={st.select}
                        error={fieldState.error}
                      />
                    )}
                  />
                </div>

                <div className="flex flex-col gap-3" role="radiogroup" aria-label="Способ доставки">
                  <Controller
                    name="delivery"
                    control={control}
                    render={({ field }) => (
                      <>
                        {[
                          { value: 'cdek', label: 'СДЭК' },
                          { value: 'post', label: 'Почта России' },
                          { value: 'pickup', label: 'Самовывоз из офиса КСЦ' },
                        ].map((option) => {
                          const id = `delivery-${option.value}`;
                          const labelId = `${id}-label`;
                          return (
                            <div key={option.value} className="inline-flex items-center gap-2">
                              <input
                                id={id}
                                type="radio"
                                name={field.name}
                                value={option.value}
                                checked={field.value === option.value}
                                onChange={() => field.onChange(option.value)}
                                aria-labelledby={labelId}
                                className="cursor-pointer"
                              />
                              <span id={labelId} className="text-xs select-none sm:text-sm">
                                {option.label}
                              </span>
                            </div>
                          );
                        })}
                      </>
                    )}
                  />
                </div>

                {delivery === 'cdek' && (
                  <>
                    <CdekDeliveryPicker
                      key={cityName || 'no-city'}
                      city={uiCity}
                      totalWeightGrams={calcWeight(items)}
                      valuePvz={selectedPvzCode || ''}
                      onChangePvz={(code, address) => {
                        setValue('pickupPoint', code, { shouldValidate: true });
                        // setValue("comment", address ? `ПВЗ: ${address}` : "");
                      }}
                      onQuoteChange={handleQuoteChange}
                      error={errors.pickupPoint}
                    />

                    {/* Отображение доставки и Итого (опционально) */}
                    {/* <div className="text-sm text-gray-700 mt-2">
                    <div>Доставка: {shipping.price != null ? `${shipping.price} р.` : "—"}</div>
                    <div>{shipping.days ? `Срок: ${shipping.days} дн.` : ""}</div>
                    <div className="font-semibold mt-1">Итого: {(shipping.price ?? 0) + total} р.</div>
                  </div> */}
                  </>
                )}
              </div>

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

                  {/* <label className="inline-flex items-center gap-2 cursor-pointer">
                    <Controller
                      name="payment"
                      control={control}
                      render={({ field }) => (
                        <input type="radio" value="tinkoff" checked={field.value === "tinkoff"} onChange={() => field.onChange("tinkoff")} />
                      )}
                    />
                    <span>Долями от Тинькофф</span>
                  </label> */}
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
                  <button type="submit" className={st.btnOrder}>
                    Оформить заказ
                  </button>
                </div>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}
