interface FloatingIcon {
  id: string;
  icon: string;
  className: string;
  delay: string;
  animationClass: string;
  parallaxFactor: number; // multiplier for mouse movement translation
}

export const FLOATING_ICONS: FloatingIcon[] = [
  {
    id: 'tractor',
    icon: '🚜',
    className: 'top-[12%] left-[6%] text-4xl opacity-20 hidden md:block',
    delay: '0s',
    animationClass: 'animate-float-slow',
    parallaxFactor: 30,
  },
  {
    id: 'gear',
    icon: '⚙️',
    className: 'top-[22%] right-[10%] text-5xl opacity-15 hidden lg:block',
    delay: '1.5s',
    animationClass: 'animate-rotate-slow',
    parallaxFactor: -25,
  },
  {
    id: 'wrench',
    icon: '🔧',
    className: 'bottom-[15%] left-[8%] text-3xl opacity-25 hidden md:block',
    delay: '0.8s',
    animationClass: 'animate-float-fast',
    parallaxFactor: 20,
  },
  {
    id: 'bolt',
    icon: '🔩',
    className: 'bottom-[28%] right-[14%] text-4xl opacity-20 hidden lg:block',
    delay: '2.2s',
    animationClass: 'animate-float-slow',
    parallaxFactor: -35,
  },
  {
    id: 'water',
    icon: '💧',
    className: 'top-[45%] left-[15%] text-3xl opacity-15 hidden xl:block',
    delay: '1.2s',
    animationClass: 'animate-pulse-slow',
    parallaxFactor: 15,
  },
  {
    id: 'sparkle-left',
    icon: '✦',
    className: 'top-[28%] left-[24%] text-yellow-300/40 text-2xl hidden md:block',
    delay: '0.4s',
    animationClass: 'animate-pulse-slow',
    parallaxFactor: 10,
  },
  {
    id: 'sparkle-right',
    icon: '✦',
    className: 'bottom-[42%] right-[32%] text-green-300/30 text-xl hidden lg:block',
    delay: '1.9s',
    animationClass: 'animate-pulse-slow',
    parallaxFactor: -12,
  },
  {
    id: 'hammer',
    icon: '🔨',
    className: 'top-[16%] left-[45%] text-3xl opacity-10 hidden xl:block',
    delay: '0.5s',
    animationClass: 'animate-float-slow',
    parallaxFactor: 18,
  },
  {
    id: 'seedling',
    icon: '🌱',
    className: 'bottom-[20%] left-[32%] text-3xl opacity-15 hidden xl:block',
    delay: '2.5s',
    animationClass: 'animate-float-fast',
    parallaxFactor: 25,
  }
];
