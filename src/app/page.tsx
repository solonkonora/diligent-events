import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-4 py-20 md:py-32 mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Hostess & Protocol Services
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Elevate your events with our professional hostesses and protocol
                officers. We ensure your guests receive the highest level of
                service and attention.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button
                  asChild
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white"
                >
                  <Link href="/services">Our Services</Link>
                </Button>
                <Button
                  asChild
                  size="lg"
                  variant="outline"
                  className="bg-white/10 text-white hover:bg-white/20 border-white"
                >
                  <Link href="/contact">Contact Us</Link>
                </Button>
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <Image
                src="https://images.pexels.com/photos/5778258/pexels-photo-5778258.jpeg?auto=compress&cs=tinysrgb&w=400?height=600&width=600"
                alt="Professional hostesses"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
