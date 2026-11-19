import { useEffect, useRef } from 'react';
let locks = 0;
let previousOverflow = '';
export function useDialog(open: boolean) {
  const ref = useRef<HTMLDialogElement>(null);
  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) dialog.showModal();
    if (!open && dialog.open) dialog.close();
    if (!open) return;
    if (locks++ === 0) {
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    }
    return () => {
      if (dialog.open) dialog.close();
      if (--locks === 0) document.body.style.overflow = previousOverflow;
    };
  }, [open]);
  return ref;
}
