'use client';
import { useCallback, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useLang } from '../../context/LangContext';

interface GalleryDialogProps {
  title: string;
  images: string[];
  open: boolean;
  onClose: () => void;
}

/**
 * Photo gallery in a native <dialog>: the browser handles the focus trap, Esc
 * and the inert background. Arrow keys move between photos; a click on the
 * backdrop closes it.
 */
const GalleryDialog: React.FC<GalleryDialogProps> = ({ title, images, open, onClose }) => {
  const { t } = useLang();
  const ref = useRef<HTMLDialogElement>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const dialog = ref.current;
    if (!dialog) return;
    if (open && !dialog.open) {
      setIndex(0);
      dialog.showModal();
    } else if (!open && dialog.open) {
      dialog.close();
    }
  }, [open]);

  const go = useCallback(
    (step: number) => setIndex((i) => (i + step + images.length) % images.length),
    [images.length]
  );

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1);
    if (e.key === 'ArrowLeft') go(-1);
  };

  return (
    <dialog
      ref={ref}
      aria-label={title}
      onClose={onClose}
      onKeyDown={onKeyDown}
      // The dialog box itself fills the viewport; only clicks that land on it
      // directly (not on its content) are backdrop clicks.
      onClick={(e) => e.target === e.currentTarget && onClose()}
      className="gallery-dialog m-auto w-[min(100vw-2rem,72rem)] max-h-[calc(100svh-2rem)] rounded-2xl border border-border bg-surface p-0 text-fore shadow-2xl backdrop:bg-bg/85 backdrop:backdrop-blur-sm"
    >
      <div className="flex items-center justify-between gap-4 border-b border-border px-4 py-3 md:px-5">
        <p className="font-display font-semibold">{title}</p>
        <div className="flex items-center gap-3">
          <span className="font-mono text-xs text-muted">
            {index + 1} {t.gallery.of} {images.length}
          </span>
          <button
            type="button"
            onClick={onClose}
            aria-label={t.gallery.close}
            className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted transition hover:border-accent hover:text-accent"
          >
            <FaTimes />
          </button>
        </div>
      </div>

      <div className="relative bg-bg">
        <div className="relative aspect-[16/10] w-full">
          {open && (
            <Image
              key={images[index]}
              src={images[index]}
              alt={`${title} — ${index + 1} ${t.gallery.of} ${images.length}`}
              fill
              sizes="(max-width: 1200px) 100vw, 72rem"
              className="animate-fade-in object-contain"
            />
          )}
        </div>
        {images.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label={t.gallery.prev}
              className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-fore shadow-lg transition hover:border-accent hover:text-accent"
            >
              <FaChevronLeft />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label={t.gallery.next}
              className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-border bg-surface/90 text-fore shadow-lg transition hover:border-accent hover:text-accent"
            >
              <FaChevronRight />
            </button>
          </>
        )}
      </div>

      <div className="flex gap-2 overflow-x-auto px-4 py-3 md:px-5">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`${i + 1} ${t.gallery.of} ${images.length}`}
            aria-current={i === index}
            className={`relative aspect-[16/10] w-24 shrink-0 overflow-hidden rounded-lg border-2 transition md:w-28 ${
              i === index ? 'border-accent' : 'border-transparent opacity-60 hover:opacity-100'
            }`}
          >
            {open && <Image src={src} alt="" fill sizes="112px" className="object-cover object-top" />}
          </button>
        ))}
      </div>
    </dialog>
  );
};

export default GalleryDialog;
