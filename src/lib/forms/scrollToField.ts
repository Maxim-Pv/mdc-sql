type ScrollOpts = {
  focus?: boolean;
  center?: boolean;
  offset?: number; // отступ сверху (если есть фиксированный хедер)
  container?: HTMLElement | Window; // кастомный скролл-контейнер
  delayFocusMs?: number; // задержка перед фокусом, мс
};

function cssEsc(s: string) {
  try {
    return CSS.escape(s);
  } catch {
    return s.replace(/["\\]/g, '\\$&');
  }
}

function getFocusable(root: Element): HTMLElement | null {
  return root.querySelector<HTMLElement>(
    "input:not([type='hidden']), select, textarea, button, [contenteditable='true'], [tabindex]:not([tabindex='-1'])",
  );
}

function getScrollParent(el: Element | null): HTMLElement | Window {
  let node: Element | null = el;
  while (node && node !== document.body) {
    const style = window.getComputedStyle(node);
    const oy = style.overflowY;
    if (/(auto|scroll|overlay)/.test(oy)) return node as HTMLElement;
    node = node.parentElement;
  }
  return window;
}

export function scrollToField(fieldName: string, opts: ScrollOpts = {}) {
  if (typeof window === 'undefined') return;

  const { focus = true, center = true, offset = 0, container, delayFocusMs = 350 } = opts;

  const sel = [`[data-field="${cssEsc(fieldName)}"]`, `[name="${cssEsc(fieldName)}"]`, `#${cssEsc(fieldName)}`].join(
    ', ',
  );

  // 1) Находим «якорь»: фокусируемый элемент, даже если обёртка с display:contents
  const rootEl = document.querySelector<HTMLElement>(sel);
  const target =
    (rootEl && getFocusable(rootEl)) || document.querySelector<HTMLElement>(`[name="${cssEsc(fieldName)}"]`) || rootEl;

  if (!target) return;

  // 2) Выбираем скролл-контейнер
  const scroller = container ?? getScrollParent(target);

  // 3) Считаем позицию
  const targetRect = target.getBoundingClientRect();

  if (scroller === window) {
    const current = window.pageYOffset;
    const viewportH = window.innerHeight;
    const to =
      current + (center ? targetRect.top - (viewportH / 2 - targetRect.height / 2) : targetRect.top - (offset || 0));

    window.scrollTo({ top: Math.max(0, to), behavior: 'smooth' });
  } else {
    const scRect = (scroller as HTMLElement).getBoundingClientRect();
    const current = (scroller as HTMLElement).scrollTop;
    const relTop = targetRect.top - scRect.top;
    const to =
      current +
      (center ? relTop - ((scroller as HTMLElement).clientHeight / 2 - targetRect.height / 2) : relTop - (offset || 0));

    (scroller as HTMLElement).scrollTo({ top: Math.max(0, to), behavior: 'smooth' });
  }

  // 4) Фокус после скролла, без дополнительного «рывка»
  if (focus) {
    setTimeout(() => {
      try {
        (target as any).focus({ preventScroll: true });
      } catch {
        target.focus();
      }
    }, delayFocusMs);
  }
}
