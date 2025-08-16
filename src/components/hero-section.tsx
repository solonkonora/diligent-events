import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative flex h-[90vh] min-h-[400px] w-full items-center justify-center overflow-hidden bg-gray-900">
      {/* Background image */}
      <Image
        src="/assets/images/hero.jpg"
        alt="Event Hero"
        fill
        className="object-cover object-center opacity-80"
        priority
      />
      {/* Overlay for better text contrast */}
      <div className="absolute inset-0 bg-black/40" />
      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-4 text-center">
        <h1 className="mb-4 text-3xl font-bold text-white drop-shadow-lg md:text-5xl">
          Make Your Event Unforgettable
        </h1>
        <p className="mb-8 max-w-xl text-lg text-blue-100 drop-shadow md:text-2xl">
          Professional hostesses, protocols, and event solutions for every
          occasion.
        </p>
        <Button
          asChild
          size="lg"
          className="rounded-xl bg-orange-500 px-6 py-3 text-base font-semibold text-white shadow-lg hover:bg-orange-600 sm:px-8 sm:py-4 sm:text-lg"
        >
          <Link href="/auth/login?redirect=/client">Book Your Event</Link>
        </Button>
      </div>
      {/* Services Preview at the bottom */}
      <div className="absolute bottom-4 left-1/2 z-20 w-[98vw] max-w-xs -translate-x-1/2 px-1 sm:max-w-md md:max-w-lg">
        <div className="grid grid-cols-3 gap-2 sm:grid-cols-3 md:grid-cols-5 md:gap-3">
          {[
            { icon: "🎭", label: "Hostesses" },
            { icon: "🍽️", label: "Catering" },
            { icon: "🪑", label: "Rentals" },
            { icon: "🎀", label: "Deco" },
            { icon: "🧹", label: "Cleaners" },
          ].map((item) => (
            <div
              key={item.label}
              className="dark:border-border dark:bg-background/40 flex flex-col items-center justify-center rounded-xl border border-white/20 bg-white/10 p-1 text-center shadow-md sm:p-2 md:p-2"
            >
              <div className="mb-1 text-base text-orange-400 sm:text-lg md:text-xl dark:text-orange-500">
                {item.icon}
              </div>
              <div className="dark:text-foreground text-xs font-semibold text-white">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
