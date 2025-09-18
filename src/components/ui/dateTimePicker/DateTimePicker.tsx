import { DateSlider } from "@/components/ui/dateSlider/DateSlider";
import { fetchTimeSlots } from "@/lib/api";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { IconClockHour4 } from "@tabler/icons-react";
import { ru } from "date-fns/locale";
import Spinner from "../spinner/Spinner";
import st from "./styles.module.css";
import { isOfficeClosedOn } from "./OfficeSchedule";

type Props = {
  onSelect: (date: string, time: string) => void;
  onDateChange?: (date: string | null) => void;
  selectedOfficeId: string | null;
  showErrors?: boolean;
  selectedOfficeName?: string | null;
  closedMessage?: string;
};

export const DateTimePicker = ({
  onSelect,
  onDateChange,
  selectedOfficeId,
  showErrors = false,
  selectedOfficeName = null,
  closedMessage = "В выбранный день офис не работает. Пожалуйста, выберите другую дату",
}: Props) => {
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [timeSlots, setTimeSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const groupedSlots: Record<string, string[]> = {
    УТРО: timeSlots.filter((t) => t >= "08:00" && t < "12:00"),
    ДЕНЬ: timeSlots.filter((t) => t >= "12:00" && t < "17:00"),
    ВЕЧЕР: timeSlots.filter((t) => t >= "17:00"),
  };

  const isClosed = isOfficeClosedOn(selectedOfficeName, selectedDate);

  useEffect(() => {
    if (!selectedDate || !selectedOfficeId) return;

    if (isClosed) {
      setTimeSlots([]);
      setSelectedTime(null);
      setLoading(false);
      return;
    }

    const load = async () => {
      setLoading(true);
      try {
        const formattedDate = format(selectedDate, "dd.MM.yyyy");
        const slots = await fetchTimeSlots(selectedOfficeId, formattedDate);
        setTimeSlots(slots);
      } catch (err) {
        console.error("Ошибка загрузки слотов", err);
        setTimeSlots([]);
      } finally {
        setLoading(false);
      }
    };

    load();
  }, [selectedDate, selectedOfficeId, isClosed]);

  const handleTimeSelect = (date: string, time: string) => {
    setSelectedTime(time);
    onSelect(date, time);
  };

  const calculateEndTime = (start: string): string => {
    const [h, m] = start.split(":").map(Number);
    const date = new Date();
    date.setHours(h, m + 10); // предполагаем, что слот = 10 мин
    return format(date, "HH:mm");
  };

  const shouldShowDateError = showErrors && !selectedDate;
  const shouldShowTimeError =
    showErrors &&
    !!selectedDate &&
    !selectedTime &&
    !loading &&
    timeSlots.length > 0 &&
    !isClosed;

  return (
    <div className="mt-6">
      <p className="text-base font-semibold mb-2">Выберите дату*</p>
      <DateSlider
        selectedDate={selectedDate}
        onSelect={(date) => {
          if (selectedDate?.toDateString() === date.toDateString()) return;
          setSelectedDate(date);
          setSelectedTime(null);
          onDateChange?.(format(date, "dd.MM.yyyy"));
        }}
        isDayOff={(d) => isOfficeClosedOn(selectedOfficeName, d)}
      />

      {shouldShowDateError && (
        <p className="text-red-500 text-sm mt-2 text-center" role="alert">
          Пожалуйста, выберите дату
        </p>
      )}

      {selectedDate && (
        <>
          <p className="text-base font-semibold mt-10 mb-3">Выберите время*</p>
          {isClosed ? (
            <div className="w-full flex items-center justify-center min-h-[200px] text-center">
              <p className="text-gray-700 text-base sm:text-xl max-w-[400px]">
                {closedMessage}
              </p>
            </div>
          ) : loading ? (
            <div className="flex items-center justify-center w-full min-h-[200px]">
              <Spinner size={40} color="#FDB51B" />
            </div>
          ) : timeSlots.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-7">
              {["УТРО", "ДЕНЬ", "ВЕЧЕР"].map((period) => (
                <div
                  key={period}
                  className="flex flex-col items-start gap-[10px] sm:gap-[24px] lg:flex-row"
                >
                  <p className="text-sm uppercase mb-1">{period}</p>
                  {groupedSlots[period]?.length ? (
                    <div className="w-full grid gap-[10px] [grid-template-columns:repeat(auto-fill,minmax(70px,1fr))]">
                      {groupedSlots[period].map((time: string) => (
                        <button
                          key={time}
                          type="button"
                          className={`${st.btn} ${
                            selectedTime === time
                              ? "bg-[#FDB51B] text-white"
                              : "bg-gray-100 hover:bg-gray-200"
                          }`}
                          onClick={() =>
                            handleTimeSelect(
                              format(selectedDate, "dd.MM.yyyy"),
                              time
                            )
                          }
                        >
                          {time}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <div className="w-full min-h-[100px] flex items-center justify-center gap-2 sm:min-h-[200px]">
                      <span className="text-gray-400 text-sm">
                        Нет доступного времени
                      </span>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="w-full flex items-center justify-center min-h-[200px]">
              <p className="text-gray-400">Нет доступного времени</p>
            </div>
          )}

          {shouldShowTimeError && (
            <p className="text-red-500 text-sm mt-2 text-center" role="alert">
              Пожалуйста, выберите время
            </p>
          )}
        </>
      )}

      {selectedDate && selectedTime && (
        <div className="w-full flex justify-center mt-10">
          <div className="flex items-center gap-2 text-sm text-gray-800 border border-yellow-400 rounded-[20px] sm:rounded-full p-[10px] mt-4 w-fit">
            <IconClockHour4 color="#234BA0" />
            <span>
              Выбрано{" "}
              <strong className="text-base">
                {format(selectedDate, "d MMMM, EEEE", { locale: ru })} с{" "}
                {selectedTime} по {calculateEndTime(selectedTime)}
              </strong>
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
