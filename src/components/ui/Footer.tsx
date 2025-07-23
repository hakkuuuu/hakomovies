import { HeartIcon } from '@heroicons/react/24/solid';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#201f31]/80 backdrop-blur-md border-t border-white/5 py-12 mt-8">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center justify-center mb-2">
            <span className="text-white/80">Made with</span>
            <HeartIcon className="h-5 w-5 mx-1 text-[#ffbade]" />
            <span className="text-white/80">by</span>
            <span className="ml-1 text-[#ffbade] font-semibold">Raul Barquilla Jr.</span>
          </div>
          <p className="text-sm text-white/60">
            © {currentYear} All Rights Reserved
          </p>
        </div>
      </div>
    </footer>
  );
}; 