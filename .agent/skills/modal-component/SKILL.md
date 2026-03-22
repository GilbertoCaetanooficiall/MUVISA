---
name: modal-component
description: Use this skill whenever the user asks to create a modal, dialog, popup, or overlay with backdrop blur, animations, and the ability to close via ESC, click-outside, or a close button. This skill ensures the modal renders correctly over the entire viewport (including admin sidebars and headers) using React createPortal.
---

# Modal Component Skill

Use this skill whenever you need to create a modal/dialog/popup in the MUVISA Next.js (App Router) project.

---

## Step 1 — Check if the reusable Modal component already exists

Before creating anything, check if `src/components/ui/Modal.tsx` already exists:

```bash
# Search for the file
ls src/components/ui/Modal.tsx
```

If it **already exists**, skip to **Step 3** and use it directly.

If it **does not exist**, proceed to **Step 2**.

---

## Step 2 — Create the reusable `Modal` component

Create the file at `src/components/ui/Modal.tsx` with the following exact content:

```tsx
'use client';

import { useEffect, useCallback, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
  maxWidth?: string; // e.g. 'max-w-md', 'max-w-xl', 'max-w-2xl'
}

export default function Modal({ open, onClose, children, maxWidth = 'max-w-md' }: ModalProps) {
  // Lock background scroll when open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  // Close on ESC key
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') onClose();
  }, [onClose]);

  useEffect(() => {
    if (open) document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [open, handleKeyDown]);

  if (!open) return null;

  return createPortal(
    <div
      className="fixed inset-0 z-[999] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-fade-in overflow-y-auto overscroll-contain"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className={`relative bg-white dark:bg-slate-900 rounded-[2.5rem] w-full ${maxWidth} shadow-2xl border border-white/10 animate-scale-in m-auto`}
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>,
    document.body
  );
}
```

### Key design decisions:
- `createPortal` renders into `document.body`, ensuring the backdrop covers **the entire viewport**, not just the parent container (critical for admin dashboards with sidebars).
- `z-[999]` places the modal above all other UI layers.
- `bg-black/60 backdrop-blur-sm` creates a dark blurred overlay.
- `m-auto` combined with the flex container perfectly centers the modal.
- Clicking the backdrop (`onClick={onClose}`) closes the modal; `stopPropagation` prevents clicks inside from bubbling up.
- `animate-fade-in` and `animate-scale-in` are Tailwind custom keyframe animations (see Step 2b).

---

## Step 2b — Ensure animations are defined in `globals.css` or Tailwind config

Check `src/app/globals.css` for these animation keyframes. Add them if missing:

```css
@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}

@keyframes scale-in {
  from { opacity: 0; transform: scale(0.95); }
  to { opacity: 1; transform: scale(1); }
}

.animate-fade-in {
  animation: fade-in 0.2s ease-out forwards;
}

.animate-scale-in {
  animation: scale-in 0.2s ease-out forwards;
}
```

Alternatively, they can be registered in `tailwind.config.ts`:

```ts
extend: {
  keyframes: {
    'fade-in': { from: { opacity: '0' }, to: { opacity: '1' } },
    'scale-in': { from: { opacity: '0', transform: 'scale(0.95)' }, to: { opacity: '1', transform: 'scale(1)' } },
  },
  animation: {
    'fade-in': 'fade-in 0.2s ease-out forwards',
    'scale-in': 'scale-in 0.2s ease-out forwards',
  },
}
```

---

## Step 3 — Use the Modal in a page or component

Import and use the `<Modal>` component. Always follow this structure:

```tsx
import Modal from '@/components/ui/Modal';

// State to control open/close
const [isModalOpen, setIsModalOpen] = useState(false);

// When the modal content references state that could be null (e.g., editingItem),
// wrap the content in a null guard INSIDE the modal:
<Modal open={!!editingItem} onClose={() => setEditingItem(null)}>
  <div className="p-10 pt-12">
    {editingItem && (
      <>
        {/* Modal content here — safe to use editingItem */}
        <h2>{editingItem.name}</h2>
        <button onClick={() => setEditingItem(null)}>Fechar</button>
      </>
    )}
  </div>
</Modal>
```

### Rules to always follow:
1. **Always use `{state && <> ... </>}` null guard** inside the modal when the content depends on a nullable state (e.g. `editingCoupon`, `editingPlan`). This prevents TypeScript errors like `Cannot read property of null`.
2. **Never conditionally render `<Modal>` itself** — always render it and control visibility via the `open` prop. This ensures proper portal mounting/unmounting.
3. **Padding goes on the inner `<div>`**, not on the Modal itself: `<div className="p-10 pt-12">`.
4. **The close `X` button** should be `absolute` positioned inside the inner div, e.g. `className="absolute top-8 right-8 ..."`.
5. **Use `maxWidth` prop** to control the modal width: `max-w-md` (default), `max-w-xl`, `max-w-2xl`.

---

## Step 4 — Standard modal content structure

Use this consistent pattern for modal headers and forms:

```tsx
<Modal open={isModalOpen} onClose={() => setIsModalOpen(false)}>
  <div className="p-10 pt-12">
    {/* Close button */}
    <button
      onClick={() => setIsModalOpen(false)}
      className="absolute top-8 right-8 text-slate-400 hover:text-slate-900 dark:hover:text-white transition-all bg-slate-50 dark:bg-white/5 p-2 rounded-full"
    >
      <X size={20} />
    </button>

    {/* Modal header with icon */}
    <div className="flex items-center gap-3 mb-10 mt-4">
      <div className="bg-primary/10 p-3 rounded-2xl">
        <IconComponent className="text-primary" size={24} />
      </div>
      <h3 className="text-2xl font-black text-slate-900 dark:text-white tracking-tight">
        Título do Modal
      </h3>
    </div>

    {/* Form or content */}
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Fields */}
      <div className="space-y-6">
        <div>
          <label className="text-[10px] font-black uppercase tracking-widest text-slate-400 mb-2 block">
            Nome do campo
          </label>
          <input
            className="w-full bg-transparent border border-slate-200 dark:border-white/10 rounded-2xl py-4 px-6 font-black focus:ring-2 focus:ring-primary outline-none transition-all"
            placeholder="Placeholder"
            required
          />
        </div>
      </div>

      {/* Submit button */}
      <button
        type="submit"
        className="w-full py-5 bg-primary text-white font-black rounded-2xl shadow-[0_15px_30px_rgba(14,86,224,0.3)] hover:brightness-110 active:scale-[0.98] transition-all uppercase tracking-widest"
      >
        Confirmar
      </button>
    </form>
  </div>
</Modal>
```

---

## Step 5 — Verify it works

After implementing, verify:
- [ ] Modal opens when the trigger is clicked
- [ ] Backdrop covers entire screen (including sidebar and topbar)
- [ ] Clicking outside the white card closes the modal
- [ ] Pressing ESC closes the modal
- [ ] Background page does not scroll while modal is open
- [ ] Animations (fade-in + scale-in) play on open
- [ ] No TypeScript errors in the browser console
- [ ] On small screens, the modal is scrollable if content overflows
