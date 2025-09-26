import clsx from 'clsx';
import { useEffect } from 'react';

export default function DrawerMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  useEffect(() => {
    if (open) {
      document.body.classList.add('body-lock');
    } else {
      document.body.classList.remove('body-lock');
    }
    return () => document.body.classList.remove('body-lock');
  }, [open]);

  return (
    <div
      className={clsx('fixed inset-0 z-40', open ? 'pointer-events-auto' : 'pointer-events-none')}
      aria-hidden={!open}
    >
      <div
        onClick={onClose}
        className={clsx(
          'absolute inset-0 bg-black/50 transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
      />

      <aside
        className={clsx(
          'absolute inset-y-0 right-0 bg-black/80 text-white',
          'w-full max-w-[300px] sm:max-w-[400px]',
          'h-full overflow-y-auto overscroll-contain',
          'transition-transform duration-300 will-change-transform',
          open ? 'translate-x-0' : 'translate-x-full',
        )}
      >
        <nav className="mt-24 flex flex-col gap-6 px-8">
          <a href="/" className="hover:font-bold">
            КАРТА ГРАЖДАНИНА
          </a>
          <a href="/merch" className="hover:font-bold">
            МЕРЧ
          </a>
          <a href="/news" className="hover:font-bold">
            НОВОСТИ
          </a>
          <a href="/currency" className="hover:font-bold">
            КУРС ВАЛЮТ
          </a>
          <a href="/embassy" className="hover:font-bold">
            ПОСОЛЬСТВО
          </a>
          <a href="/culture" className="hover:font-bold">
            КУЛЬТУРА
          </a>
          <a href="/#contacts" className="hover:font-bold">
            КОНТАКТЫ
          </a>
        </nav>
      </aside>
    </div>
  );
}
