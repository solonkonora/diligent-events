import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function HeroSection() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <Image
          src="../../../assets/images/two.jpeg"
          alt="Professional Event Services"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-orange-600/70"></div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>
      <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-[calc(100vh-4rem)] items-center pt-16 md:min-h-[calc(100vh-5rem)] md:pt-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
            {/* Text Content */}
            <div className="text-center lg:text-left">
              <h1 className="m-4 text-3xl leading-tight font-bold md:text-4xl lg:text-5xl xl:text-6xl">
                <span className="text-white">Create </span>
                <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
                  Unforgettable
                </span>
                <br />
                <span className="text-white">Events with </span>
                <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
                  Excellence
                </span>
              </h1>

              <p className="mx-auto mb-6 max-w-2xl text-lg text-blue-100 md:text-2xl lg:mx-0">
                We provide comprehensive event services including professional
                hostesses, catering, logistics, and equipment rentals.
              </p>

              {/* CTA Buttons */}
              <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
                <Button
                  asChild
                  size="lg"
                  className="transform rounded-xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30"
                >
                  <Link href="/auth/login?redirect=/client">
                    Book Your Event
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13 7l5 5-5 5M6 12h12"
                      />
                    </svg>
                  </Link>
                </Button>

                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
                >
                  <Link href="/services">
                    View Services
                    <svg
                      className="ml-2 h-5 w-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </Link>
                </Button>
              </div>

              {/* trust Indicators */}
              <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200 lg:justify-start">
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium">
                    500+ Events Completed
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium">
                    Professional Staff
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-2 w-2 rounded-full bg-orange-400"></div>
                  <span className="text-sm font-medium">24/7 Support</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="relative z-10">
                {/* main Image Card */}
                <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
                  <div className="relative h-80 w-full overflow-hidden rounded-2xl">
                    <Image
                      src="/assets/images/five.jpeg"
                      alt="Professional Event Services"
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

                    {/* floating Service Cards */}
                    <div className="absolute -top-4 -right-4 rounded-xl bg-orange-500 p-4 text-white shadow-xl">
                      <div className="text-2xl font-bold">100%</div>
                      <div className="text-sm">Satisfaction</div>
                    </div>
                  </div>

                  {/* service Preview */}
                  <div className="mt-4 grid grid-cols-3 gap-4">
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                      <div className="mb-1 text-2xl text-orange-400">🎭</div>
                      <div className="text-xs font-medium text-white">
                        Hostesses
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                      <div className="mb-1 text-2xl text-orange-400">🍽️</div>
                      <div className="text-xs font-medium text-white">
                        Catering
                      </div>
                    </div>
                    <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
                      <div className="mb-1 text-2xl text-orange-400">🪑</div>
                      <div className="text-xs font-medium text-white">
                        Rentals
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* floating Elements */}
              <div className="absolute -top-8 -left-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-80"></div>
              <div className="absolute -right-6 -bottom-6 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-60 delay-1000"></div>
            </div>
          </div>
        </div>
      </div>

      {/* scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
        <div className="animate-bounce">
          <svg
            className="h-6 w-6 text-white/70"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";

// export default function HeroSection() {
//   return (
//     <section className="relative min-h-screen overflow-hidden bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-16 md:pt-20">
//       {/* Background Image with Overlay */}
//       <div className="absolute inset-0">
//         <Image
//           src="../../../assets/images/two.jpeg"
//           alt="Professional Event Services"
//           fill
//           className="object-cover"
//           priority
//         />
//         <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 via-blue-800/80 to-orange-600/70"></div>
//       </div>

//       {/* Decorative Elements */}
//       <div className="absolute top-32 left-10 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl"></div>
//       <div className="absolute right-10 bottom-20 h-96 w-96 rounded-full bg-blue-500/20 blur-3xl"></div>

//       {/* Hero Content */}
//       <div className="relative z-10 flex min-h-[calc(100vh-8rem)] items-center py-8 md:min-h-[calc(100vh-5rem)]">
//         <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
//           <div className="grid grid-cols-1 items-center gap-8 lg:grid-cols-2 lg:gap-12">
//             {/* text content */}
//             <div className="text-center lg:text-left">
//               {/* main heading */}
//               <h1 className="mb-6 text-4xl leading-tight font-bold md:text-5xl lg:text-6xl xl:text-7xl">
//                 <span className="text-white">Create </span>
//                 <span className="bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
//                   Unforgettable
//                 </span>
//                 <br />
//                 <span className="text-white">Events with </span>
//                 <span className="bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
//                   Excellence
//                 </span>
//               </h1>

//               {/* Description */}
//               <p className="mx-auto mb-4 text-sm leading-relaxed text-blue-100 md:text-2xl lg:mx-0">
//                 We provide comprehensive event services including professional
//                 hostesses, catering, logistics, and equipment rentals.
//               </p>

//               {/* CTA Buttons */}
//               <div className="mb-8 flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
//                 <Button
//                   asChild
//                   size="lg"
//                   className="transform rounded-xl border-2 border-orange-400/50 bg-gradient-to-r from-orange-500 to-orange-600 px-8 py-4 text-lg font-semibold text-white shadow-2xl transition-all duration-300 hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/30"
//                 >
//                   <Link href="/auth/login?redirect=/client">
//                     Book Your Event
//                     <svg
//                       className="ml-2 h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7l5 5-5 5M6 12h12"
//                       />
//                     </svg>
//                   </Link>
//                 </Button>

//                 <Button
//                   asChild
//                   size="lg"
//                   variant="outline"
//                   className="rounded-xl border-2 border-white/30 bg-white/10 px-8 py-4 text-lg font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-white/50 hover:bg-white/20"
//                 >
//                   <Link href="/services">
//                     View Services
//                     <svg
//                       className="ml-2 h-5 w-5"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M9 5l7 7-7 7"
//                       />
//                     </svg>
//                   </Link>
//                 </Button>
//               </div>

//               {/* Trust Indicators */}
//               <div className="flex flex-wrap items-center justify-center gap-8 text-blue-200 lg:justify-start">
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-orange-400"></div>
//                   <span className="text-sm font-medium">
//                     500+ Events Completed
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-orange-400"></div>
//                   <span className="text-sm font-medium">
//                     Professional Staff
//                   </span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <div className="h-2 w-2 rounded-full bg-orange-400"></div>
//                   <span className="text-sm font-medium">24/7 Support</span>
//                 </div>
//               </div>
//             </div>

//             {/* Visual Content */}
//             <div className="relative mt-8 lg:mt-0">
//               <div className="relative z-10">
//                 {/* Main Image Card */}
//                 <div className="relative rounded-3xl border border-white/20 bg-white/10 p-6 shadow-2xl backdrop-blur-sm">
//                   <div className="relative h-80 w-full overflow-hidden rounded-2xl">
//                     <Image
//                       src="/assets/images/five.jpeg"
//                       alt="Professional Event Services"
//                       fill
//                       className="object-cover"
//                     />
//                     <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>

//                     {/* Floating Service Cards */}
//                     <div className="absolute -top-4 -right-4 rounded-xl bg-orange-500 p-4 text-white shadow-xl">
//                       <div className="text-2xl font-bold">100%</div>
//                       <div className="text-sm">Satisfaction</div>
//                     </div>
//                   </div>

//                   {/* Service Preview */}
//                   <div className="mt-4 grid grid-cols-3 gap-4">
//                     <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
//                       <div className="mb-1 text-2xl text-orange-400">🎭</div>
//                       <div className="text-xs font-medium text-white">
//                         Hostesses
//                       </div>
//                     </div>
//                     <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
//                       <div className="mb-1 text-2xl text-orange-400">🍽️</div>
//                       <div className="text-xs font-medium text-white">
//                         Catering
//                       </div>
//                     </div>
//                     <div className="rounded-xl border border-white/20 bg-white/10 p-3 text-center">
//                       <div className="mb-1 text-2xl text-orange-400">🪑</div>
//                       <div className="text-xs font-medium text-white">
//                         Rentals
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Floating Elements */}
//               <div className="absolute -top-8 -left-8 h-24 w-24 animate-pulse rounded-full bg-gradient-to-br from-orange-400 to-orange-600 opacity-80"></div>
//               <div className="absolute -right-6 -bottom-6 h-32 w-32 animate-pulse rounded-full bg-gradient-to-br from-blue-400 to-blue-600 opacity-60 delay-1000"></div>
//             </div>
//           </div>
//         </div>
//       </div>

//       {/* Scroll Indicator */}
//       <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 transform">
//         <div className="animate-bounce">
//           <svg
//             className="h-6 w-6 text-white/70"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M19 14l-7 7m0 0l-7-7m7 7V3"
//             />
//           </svg>
//         </div>
//       </div>
//     </section>
//   );
// }
