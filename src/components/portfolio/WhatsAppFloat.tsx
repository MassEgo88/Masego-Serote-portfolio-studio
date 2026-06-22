import { whatsappUrl } from "@/lib/contactConfig";

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noreferrer noopener"
      aria-label="Chat with me on WhatsApp"
      className="fixed bottom-5 right-5 z-50 group flex items-center gap-2 rounded-full bg-[#25D366] text-white shadow-lg shadow-black/30 hover:shadow-xl hover:scale-105 transition-all px-4 py-3"
    >
      <svg viewBox="0 0 32 32" className="w-6 h-6 fill-current" aria-hidden>
        <path d="M19.11 17.21c-.27-.14-1.62-.8-1.87-.9-.25-.09-.43-.14-.61.14-.18.27-.7.9-.86 1.08-.16.18-.32.2-.59.07-.27-.14-1.15-.42-2.19-1.35-.81-.72-1.36-1.61-1.52-1.88-.16-.27-.02-.42.12-.55.12-.12.27-.32.41-.48.14-.16.18-.27.27-.45.09-.18.05-.34-.02-.48-.07-.14-.61-1.47-.84-2.02-.22-.53-.45-.46-.61-.47l-.52-.01c-.18 0-.48.07-.73.34-.25.27-.95.93-.95 2.26 0 1.33.97 2.62 1.11 2.8.14.18 1.92 2.93 4.65 4.11.65.28 1.16.45 1.56.58.65.21 1.25.18 1.72.11.52-.08 1.62-.66 1.85-1.3.23-.64.23-1.19.16-1.3-.07-.12-.25-.18-.52-.32zM16.02 5.33c-5.9 0-10.69 4.79-10.69 10.69 0 1.89.5 3.74 1.44 5.36L5 27l5.8-1.52a10.66 10.66 0 0 0 5.21 1.33h.01c5.9 0 10.69-4.79 10.69-10.69S21.92 5.33 16.02 5.33z"/>
      </svg>
      <span className="hidden sm:inline text-sm font-medium pr-1">Chat on WhatsApp</span>
    </a>
  );
}
