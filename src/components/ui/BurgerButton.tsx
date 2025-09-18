import clsx from "clsx";

export default function BurgerButton({
  open,
  onClick,
}: {
  open: boolean;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      aria-label="Меню"
      className="relative w-[30px] h-[30px] sm:w-[40px] sm:h-[40px] flex items-center justify-center group z-60 cursor-pointer"
    >
      <span
        className={clsx(
          "absolute w-[25px] sm:w-[30px] h-[2px] bg-white rounded transition-transform duration-300",
          open ? "rotate-45" : "-translate-y-[8px]"
        )}
      />
      <span
        className={clsx(
          "absolute w-[25px] sm:w-[30px] h-[2px] bg-white rounded transition-opacity duration-300",
          open ? "opacity-0" : "opacity-100"
        )}
      />
      <span
        className={clsx(
          "absolute w-[25px] sm:w-[30px] h-[2px] bg-white rounded transition-transform duration-300",
          open ? "-rotate-45" : "translate-y-[8px]"
        )}
      />
    </button>
  );
}
