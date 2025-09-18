interface DetailBlockProps {
  title: string;
  children?: React.ReactNode;
  list?: string[];
}

export default function DetailBlock({
  title,
  children,
  list,
}: DetailBlockProps) {
  return (
    <div className="flex flex-col gap-1">
      <p className="font-semibold text-[#234BA0]">{title}</p>
      {list ? (
        <ul className="list-disc pl-5 text-[14px] sm:text-[16px] text-[#333] space-y-2">
          {list.map((item, idx) => (
            <li key={idx}>{item}</li>
          ))}
        </ul>
      ) : (
        <div className="text-[#333] text-[14px] sm:text-[16px]">{children}</div>
      )}
    </div>
  );
}
