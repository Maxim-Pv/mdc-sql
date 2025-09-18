"use client";

import { City } from "@/types/city";
import { EventModalData } from "@/types/news";
import { createContext, ReactNode, useContext, useState } from "react";

type ModalType = keyof ModalPropsMap;

type ModalPropsMap = {
  consent: undefined;
  city: { city: City | null };
  document: { data: { title: string; image: string; text: string } };
  cart: undefined;
  eventNews: { data: EventModalData };
  // дргуие модалки
};

type ModalContextType = {
  openModal: <T extends ModalType>(type: T, props?: ModalPropsMap[T]) => void;
  closeModal: () => void;
  isOpen: boolean;
  type: ModalType | null;
  props: ModalPropsMap[ModalType] | undefined;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error("useModal must be used within ModalProvider");
  return ctx;
};

export const ModalProvider = ({ children }: { children: ReactNode }) => {
  const [type, setType] = useState<ModalType | null>(null);
  const [props, setProps] = useState<ModalPropsMap[ModalType] | undefined>();

  const openModal = <T extends ModalType>(type: T, props?: ModalPropsMap[T]) => {
    setType(type);
    setProps(props);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setType(null);
    setProps(undefined);
    document.body.style.overflow = "";
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen: !!type,
        type,
        props,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};
