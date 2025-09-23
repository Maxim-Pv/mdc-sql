'use client';

import { useCachedOffices } from '@/components/hooks/usedCashedOffices';
import CustomButton from '@/components/ui/customButton/CustomButton';
import { DateTimePicker } from '@/components/ui/dateTimePicker/DateTimePicker';
import CustomSelect from '@/components/ui/inputs/customSelect/CustomSelect';
import { FormCheckbox } from '@/components/ui/inputs/formCheckbox/FormCheckbox';
import { FormInput } from '@/components/ui/inputs/formInput/FormInput';
import { Toast } from '@/components/ui/toast/Toast';
import { regions } from '@/constant/regions';
import { useModal } from '@/providers/ModalContext';
import { pushMailruGoal } from '@/lib/analytics/mailru';
import { scrollToField } from '@/lib/forms/scrollToField';
import { useScrollToError } from '@/lib/forms/useScrollToError';
import { formSchema } from '@/lib/formSchema';
import { FIELD_ORDER, FormValues } from '@/types/registrationFields';
import { zodResolver } from '@hookform/resolvers/zod';
import clsx from 'clsx';
import { useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Controller, useForm, useWatch } from 'react-hook-form';
import st from './styles.module.css';

export const RegistrationForm = () => {
  const t = useTranslations('main.citizenCardForm');
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [dataTimeError, setDataTimeError] = useState<string>('');
  const [toastVisible, setToastVisible] = useState(false);
  const [errorToastVisible, setErrorToastVisible] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>('');

  const { openModal } = useModal();
  const { offices, loading: isOfficeLoading } = useCachedOffices();

  const {
    control,
    handleSubmit,
    formState: { errors, touchedFields, isSubmitting, isSubmitted },
    watch,
    reset,
    clearErrors,
    trigger,
  } = useForm({
    resolver: zodResolver(formSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    shouldFocusError: true,
    defaultValues: {
      firstName: '',
      lastName: '',
      region: '',
      city: '',
      phone: '',
      coupon: '',
      isCitizen: false,
      isNotCitizen: false,
      office: '',
      agree: false,
    },
  });

  const isCitizen = watch('isCitizen');
  const isNotCitizen = watch('isNotCitizen');
  const isChoosedOffice = watch('office');
  const isAgree = watch('agree');

  const selectedOffice = offices?.find((o) => o.id === isChoosedOffice);

  const typedValues = useWatch({
    control,
    name: ['firstName', 'lastName', 'city', 'region'],
  });

  const anyInputTyped = typedValues.some((v) => typeof v === 'string' && v.trim().length > 0);
  const shouldWarnAgree = !isAgree && anyInputTyped;

  useEffect(() => {
    setSelectedDate(null);
    setSelectedTime(null);
    setDataTimeError('');
  }, [isChoosedOffice]);

  const onSubmit = async (data: any) => {
    const officeVal = String(watch('office') ?? '').trim();
    const hasOffice = !!officeVal;
    if (isCitizen) {
      if (!hasOffice) {
        setDataTimeError('Выберите офис');
        scrollToField('office');
        return;
      }
      if (!selectedDate || !selectedTime) {
        setDataTimeError('Выберите дату и время');
        scrollToField('book_time');
        return;
      }
    }
    setDataTimeError('');

    const formData = {
      city: data.city,
      region: data.region,
      promo: data.coupon || '',
      phone: data.phone,
      last_name: data.lastName,
      name: data.firstName,
      citizenship: data.isCitizen ? 'Y' : 'N',
      resource: Number(data.office),
      book_time: `${selectedDate} ${selectedTime}:00`,
    };

    try {
      const res = await fetch('/api/applyCard', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      // const res = await new Promise<Response>((resolve) => {
      //   setTimeout(() => {
      //     resolve(
      //       new Response(JSON.stringify({ message: "ok" }), {
      //         status: 200,
      //         headers: { "Content-Type": "application/json" },
      //       })
      //     );
      //   }, 1000);
      // });
      // console.log(formData);

      if (!res.ok) {
        // ошибка бэка
        setErrorMessage(t('errors.submitFail'));
        setErrorToastVisible(true);
        pushMailruGoal('form_submit_fail');
        return;
      }

      // успех
      reset();
      clearErrors();
      setSelectedDate(null);
      setSelectedTime(null);
      setToastVisible(true);

      pushMailruGoal('form_submit_success');
    } catch (e) {
      // сетевая ошибка
      setErrorMessage(t('errors.submitFail'));
      setErrorToastVisible(true);
      pushMailruGoal('form_submit_fail');
    }
  };

  const onError = useScrollToError<FormValues>(FIELD_ORDER as unknown as string[], () =>
    isCitizen && (!selectedDate || !selectedTime) ? 'book_time' : undefined,
  );

  return (
    <form onSubmit={handleSubmit(onSubmit, onError)} className={st.form} id="form">
      <h2 className="mb-[10px] w-full text-center text-[20px] font-bold uppercase sm:text-left sm:text-[30px] md:w-[56%]">
        {t('title')}
      </h2>
      <p className="mb-[10px] text-center text-[12px] text-gray-700 sm:text-left sm:text-[16px] md:mb-[30px]">
        {t('subtitle')}
      </p>

      <div className="grid grid-cols-1 gap-[30px] pb-[20px] sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        <div data-field="firstName" className="contents">
          <FormInput
            name="firstName"
            control={control}
            error={errors.firstName}
            placeholder={t('placeholders.firstName')}
            className={st.input}
          />
        </div>

        <div data-field="lastName" className="contents">
          <FormInput
            name="lastName"
            control={control}
            error={errors.lastName}
            placeholder={t('placeholders.lastName')}
            className={st.input}
          />
        </div>

        <div data-field="region" className="contents">
          <Controller
            name="region"
            control={control}
            render={({ field }) => (
              <CustomSelect
                {...field}
                options={regions.map((r) => ({ label: r, value: r }))}
                placeholder={t('placeholders.region')}
                wrapperClassName={st.selectWrapper}
                selectClassName={st.select}
                error={errors.region}
              />
            )}
          />
        </div>

        <div data-field="city" className="contents">
          <FormInput
            name="city"
            control={control}
            error={errors.city}
            placeholder={t('placeholders.city')}
            className={st.input}
          />
        </div>

        <div data-field="phone" className="contents">
          <FormInput
            name="phone"
            control={control}
            error={errors.phone && touchedFields.phone ? errors.phone : undefined}
            placeholder={t('placeholders.phone')}
            className={st.input}
            isMasked
          />
        </div>

        <FormInput
          name="coupon"
          control={control}
          error={errors.coupon}
          placeholder={t('placeholders.coupon')}
          className={st.input}
        />

        <div
          data-field="isCitizen"
          className="flex items-center gap-2 text-[12px] whitespace-nowrap sm:text-[16px] xl:col-start-3"
        >
          <FormCheckbox
            name="isCitizen"
            control={control}
            label={t('checkbox.isCitizen')}
            disabled={isNotCitizen}
            className="text-[12px] font-semibold sm:text-[16px] xl:col-start-3"
            trigger={() => trigger(['isCitizen', 'isNotCitizen'])}
          />
        </div>

        <div data-field="isNotCitizen" className="flex items-center gap-2 text-[12px] font-semibold sm:text-[16px]">
          <FormCheckbox
            name="isNotCitizen"
            control={control}
            label={t('checkbox.isNotCitizen')}
            disabled={isCitizen}
            className="text-[12px] sm:text-[16px]"
            trigger={() => trigger(['isCitizen', 'isNotCitizen'])}
          />
        </div>
      </div>

      {isNotCitizen && <p className="text-center text-lg text-red-600">{t('errors.onlyMoldova')}</p>}
      {isCitizen && (
        <>
          <div data-field="office" className="contents">
            <Controller
              name="office"
              control={control}
              render={({ field }) => (
                <CustomSelect
                  {...field}
                  clearable
                  options={offices?.map((o) => ({ label: o.name, value: o.id })) || []}
                  placeholder={t('placeholders.office')}
                  wrapperClassName={st.selectWrapper}
                  selectClassName={`${st.select} ${st.officeSelect}`}
                  error={errors.office}
                  loading={isOfficeLoading}
                />
              )}
            />
          </div>
          {isChoosedOffice && (
            <div data-field="book_time" className="contents">
              <DateTimePicker
                onSelect={(date, time) => {
                  setSelectedDate(date);
                  setSelectedTime(time);
                  setDataTimeError('');
                }}
                onDateChange={(date) => {
                  setSelectedDate(date);
                  setSelectedTime(null);
                  setDataTimeError('');
                }}
                selectedOfficeId={isChoosedOffice}
                selectedOfficeName={selectedOffice?.name ?? null}
                showErrors={isSubmitted}
                closedMessage="В выбранный день офис не работает. Пожалуйста, выберите другую дату"
              />
            </div>
          )}
        </>
      )}

      <div className="mt-5">
        <div>
          <CustomButton type="submit" full title={t('submit')} disabled={isNotCitizen} loading={isSubmitting} />
        </div>
        <div className="mt-2 flex min-h-[20px] w-full justify-center">
          {(touchedFields.isCitizen || touchedFields.isNotCitizen || isSubmitted) && errors.isCitizen?.message && (
            <p className="text-center text-sm text-red-500 sm:text-left">{errors.isCitizen.message}</p>
          )}
          {dataTimeError && !isCitizen && (
            <p className="text-center text-sm text-red-500 sm:text-left">{dataTimeError}</p>
          )}
        </div>
      </div>

      <div data-field="agree" className="contents">
        <FormCheckbox
          name="agree"
          control={control}
          label={t('checkbox.agree')}
          className="text-xs sm:text-sm"
          labelClassName={clsx(
            'whitespace-wrap hover:underline cursor-pointer',
            shouldWarnAgree && '!text-red-600 !font-semibold',
          )}
          error={!!errors.agree}
          onLabelClick={() => openModal('consent')}
        />
      </div>

      {toastVisible && (
        <Toast title={t('toast.title')} description={t('toast.description')} onClose={() => setToastVisible(false)} />
      )}

      {errorToastVisible && (
        <Toast
          title={t('toast.errorTitle')}
          description={errorMessage}
          onClose={() => setErrorToastVisible(false)}
          variant="error"
        />
      )}
    </form>
  );
};
