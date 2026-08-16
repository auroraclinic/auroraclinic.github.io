declare global {
  interface Window {
    changeLanguage?: (lang: string) => void;
  }
}

export function getCurrentLanguage(): string {
  if (typeof document === 'undefined') return 'en';
  const match = document.cookie.match(/googtrans=\/en\/([^;]+)/);
  return match ? match[1] : 'en';
}
