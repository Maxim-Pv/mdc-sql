'use client';

import { City } from '@/types/city';
import { EventModalData, EventNewsUpdateProps } from '@/types/event-news';
import { useModal } from '../../context/ModalContext';
import { CartModal } from './cartModal/CartModal';
import CityModal from './cityModal/CityModal';
import ConsentModal from './consentModal/ConsentModal';
import DocumentModal from './docModals/DocumentModal';
import EventNewsAddModal from './eventNewsModal/EventNewsAddModal';
import EventNewsModal from './eventNewsModal/EventNewsModal';

export default function ModalRoot() {
  const { type, props, closeModal } = useModal();

  if (!type) return null;

  switch (type) {
    case 'consent':
      return <ConsentModal isOpen={true} onClose={closeModal} />;
    case 'city':
      const cityProps = props as { city: City | null };
      return <CityModal isOpen={true} onClose={closeModal} city={cityProps.city} />;
    case 'document': {
      const docProps = props as {
        data: { title: string; image: string; text: string };
      };
      return <DocumentModal isOpen={true} onClose={closeModal} data={docProps.data} />;
    }
    case 'eventNews': {
      const data = (props as { data: EventModalData } | undefined)?.data;
      if (!data) return null;
      return <EventNewsModal isOpen onClose={closeModal} data={data} />;
    }
    case 'cart':
      return <CartModal isOpen={true} onClose={closeModal} />;
    case 'eventNewsUpdate': {
      const p = props as EventNewsUpdateProps;
      return <EventNewsAddModal isOpen onClose={closeModal} data={p.data} onSaved={p.onSaved} cacheKey={p.cacheKey} />;
    }

    default:
      return null;
  }
}
