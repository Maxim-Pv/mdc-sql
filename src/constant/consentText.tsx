"use client";

import { useConsentContent } from "@/components/hooks/useConsentContent";

export default function ConsentText() {
  const { heading, fields, paragraphs, footer } = useConsentContent();
  return (
    <div className="text-sm leading-6 text-black space-y-4">
      <p className="font-semibold text-center">{heading}</p>
      <div className="flex flex-col gap-3">
        <p className="">
          {fields.name}{" "}
          <span className="inline-block border-b border-black min-w-[100px] w-[90%]">
            &nbsp;
          </span>
          ,
          <br />
          <span className="pl-4">{fields.nameHint}</span>
        </p>
        <p>
          {fields.address}{" "}
          <span className="inline-block border-b border-black min-w-[100px] w-full">
            &nbsp;
          </span>
          <br />
          <span className="pl-4">{fields.addressHint}</span>
        </p>
      </div>
      {paragraphs.map((text, idx) => (
        <p key={idx}>{text}</p>
      ))}
      <div className="flex pt-4 w-full justify-between">
        <p className="flex flex-col text-start">
          <span className="inline-block border-b border-black min-w-[100px] sm:min-w-[150px]">
            &nbsp;
          </span>
          <span className="pl-2">{footer.dateLabel}</span>
        </p>
        <p className="flex flex-col text-end">
          <span className="inline-block border-b border-black min-w-[120px] sm:min-w-[200px]">
            &nbsp;
          </span>
          <span className="pr-2">{footer.signLabel}</span>
        </p>
      </div>
    </div>
  );
}
