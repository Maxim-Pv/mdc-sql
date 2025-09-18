import { IconChevronLeft, IconChevronRight } from "@tabler/icons-react";
import clsx from "clsx";
import { addMonths, eachDayOfInterval, endOfMonth, format, startOfMonth } from "date-fns";
import { ru } from "date-fns/locale";
import { useState } from "react";
import st from "./styles.module.css";

const weekdaysShort: Record<number, string> = {
  0: "вс",
  1: "пн",
  2: "вт",
  3: "ср",
  4: "чт",
  5: "пт",
  6: "сб",
};

interface Props {
  selectedDate: Date | null;
  onSelect: (d: Date) => void;
  isDayOff?: (d: Date) => boolean;
}

export const DateSlider = ({ selectedDate, onSelect, isDayOff }: Props) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const canGoPrev = startOfMonth(currentMonth) > startOfMonth(today);

  const handleMonthChange = (direction: "prev" | "next") => {
    if (direction === "prev" && !canGoPrev) return;
    setCurrentMonth((prev) => (direction === "prev" ? addMonths(prev, -1) : addMonths(prev, 1)));
  };

  const allDates = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  });

  const visibleDates = allDates.filter((d) => d >= today);

  return (
    <div className="mt-4 w-full">
      <div className="flex justify-center items-center mb-2 gap-5">
        <button
          onClick={() => handleMonthChange("prev")}
          className={clsx("cursor-pointer", !canGoPrev && "opacity-30 cursor-not-allowed")}
          disabled={!canGoPrev}
        >
          <IconChevronLeft />
        </button>
        <span className="text-base font-semibold">{format(currentMonth, "LLLL yyyy", { locale: ru })}</span>
        <button onClick={() => handleMonthChange("next")} className="cursor-pointer">
          <IconChevronRight />
        </button>
      </div>

      <div className="overflow-x-auto py-2 touch-auto">
        <div className="flex gap-2 min-w-max px-1">
          {visibleDates.map((date) => {
            const day = format(date, "d", { locale: ru });
            const weekday = weekdaysShort[date.getDay()];
            const isActive = selectedDate?.toDateString() === date.toDateString();
            const dayOff = isDayOff?.(date) ?? false;

            return (
              <button
                key={date.toISOString()}
                type="button"
                className={clsx(
                  st.btn,
                  isActive ? "bg-[#FDB51B]" : "text-black bg-gray-100 transition-colors",
                  dayOff && "opacity-50",
                  !dayOff && "hover:bg-gray-200"
                )}
                onClick={() => onSelect(date)}
                data-dayoff={dayOff ? "true" : "false"}
              >
                <span className="font-semibold text-base sm:text-xl">{day}</span>
                <span className="text-base text-[#848484]">{weekday}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
