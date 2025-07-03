import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContactButtons from "./contact-buttons";
import Header from "./header";
import Footer from "./footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Header />

        {/* hero Section */}
        <section className="relative bg-gradient-to-br from-blue-900 via-blue-800 to-blue-700 pt-2 md:pt-10">
          {/* main Hero Content */}
          <div className="flex min-h-[85vh] w-full flex-col md:min-h-[90vh] md:flex-row">
            {/* text content */}
            <div className="relative z-20 flex flex-1 items-center py-6 md:w-1/2 md:py-12">
              <div className="mx-auto w-full max-w-[90%] space-y-4 px-4 sm:px-6 md:space-y-8">
                <h1 className="bg-gradient-to-r from-orange-400 via-orange-500 to-blue-300 bg-clip-text font-serif text-2xl leading-[1.1] font-black tracking-tight text-transparent drop-shadow-[0_3px_6px_rgba(0,0,0,0.7)] md:text-4xl lg:text-5xl xl:text-6xl">
                  Proffessional Event Services
                </h1>

                <p className="max-w-2xl rounded-2xl border border-white/20 bg-gradient-to-r from-blue-800/70 to-orange-600/70 px-6 py-4 font-sans text-base leading-relaxed font-medium text-white/95 shadow-2xl backdrop-blur-lg md:px-8 md:py-6 md:text-lg lg:text-xl">
                  From planning to execution, we deliver exceptional events that
                  exceed expectations
                </p>

                <div className="flex flex-wrap gap-3 md:gap-4">
                  <Button
                    asChild
                    size="lg"
                    className="border-2 border-orange-400 bg-gradient-to-r from-orange-500 to-orange-600 text-sm text-white shadow-xl transition-all hover:scale-105 hover:from-orange-600 hover:to-orange-700 hover:shadow-orange-500/40 md:text-base"
                  >
                    <Link href="/services">Our Services</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-2 border-blue-400 bg-gradient-to-r from-blue-600 to-blue-700 text-sm text-white shadow-xl transition-all hover:scale-105 hover:from-blue-700 hover:to-blue-800 hover:shadow-blue-500/40 md:text-base"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* image section */}
            <div className="relative flex flex-1 items-center justify-center p-4 pb-6 md:w-1/2 md:p-6 md:pb-8">
              <div className="relative h-[300px] w-[260px] overflow-hidden rounded-3xl shadow-2xl md:h-[400px] md:w-[320px] lg:h-[480px] lg:w-[380px]">
                <Image
                  src="../../../assets/images/two.jpeg"
                  alt="Professional hostesses"
                  fill
                  className="object-cover object-top"
                  priority
                />

                {/* Color Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 via-blue-800/30 to-orange-500/25"></div>

                <div className="absolute right-4 bottom-4 left-4 z-10 md:right-6 md:bottom-6 md:left-6">
                  <div className="rounded-xl border border-white/20 bg-gradient-to-r from-orange-600/85 to-blue-700/85 p-3 shadow-xl backdrop-blur-md md:rounded-2xl md:p-6">
                    <h3 className="mb-1 font-sans text-base font-bold tracking-wide text-white md:mb-3 md:text-xl">
                      Professional Excellence
                    </h3>
                    <p className="font-sans text-xs leading-relaxed text-white/90 md:text-base">
                      Experienced staff dedicated to making your events
                      memorable and seamless
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="relative z-10 px-4 pb-8 md:px-6 md:pb-12">
            <ContactButtons />
          </div>
        </section>

        {/* <section className="bg-gradient-to-r from-blue-600 to-orange-500 py-20 text-white">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="font-inter mb-6 text-4xl font-bold md:text-6xl">
              Professional Event Services
            </h2>
            <p className="font-roboto mx-auto mb-8 max-w-3xl text-xl md:text-2xl">
              From planning to execution, we deliver exceptional events that
              exceed expectations
            </p>
            <button className="rounded-lg bg-white px-8 py-3 text-lg font-semibold text-blue-600 transition-colors hover:bg-gray-100">
              Get Started
            </button>
          </div>
        </section> */}

        {/* Services Overview */}
        <section className="bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Our Premium Services
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Comprehensive event solutions tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg"
                >
                  <div className="relative h-58 w-full">
                    <Image
                      src={
                        service.image || `/services/service-${index + 1}.jpg`
                      }
                      alt={service.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                      {service.title}
                    </h3>
                    <p className="text-gray-600">{service.description}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                What Our Clients Say
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                We take pride in delivering exceptional service that exceeds
                expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-lg bg-white p-8 shadow-md">
                  <div className="mb-4 flex items-center">
                    <div className="mr-4">
                      <Image
                        src={testimonial.avatar || "/placeholder.svg"}
                        alt={testimonial.name}
                        width={60}
                        height={60}
                        className="rounded-full"
                      />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-800">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">{testimonial.quote}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Elevate Your Next Event?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100">
              Contact us today to discuss how our professional hostesses and
              protocol officers can make your event truly exceptional.
            </p>
            <Button
              asChild
              size="lg"
              className="bg-orange-500 text-white hover:bg-orange-600"
            >
              <Link href="/auth/login?redirect=/client">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Sample data
type Service = {
  title: string;
  description: string;
  image?: string;
};

const services: Service[] = [
  {
    title: "Event Hostesses",
    description:
      "Professional hostesses to welcome and guide your guests, creating a memorable first impression.",
    image: "../../../assets/images/WhatsApp Image 2025-05-01 at 08.35.43.jpeg",
  },
  {
    title: "Protocol Officers",
    description:
      "Expert protocol officers to ensure proper etiquette and procedures are followed at formal events.",
    image: "../../../assets/images/planning13.png",
  },
  {
    title: "Service Traiteur",
    description:
      "We offer customized menus tailored to dietary needs, impeccable presentation, and attentive service. Our commitment to quality, safety, and customer satisfaction sets us apart as a trusted partner for memorable events",
    image:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.35.40 (1).jpeg",
  },
  {
    title: "General logistics",
    description:
      " to the planning, coordination, and execution of all the resources, services, and processes required to ensure the event runs smoothly and successfully",
    image: "../../../assets/images/planning14.png",
  },
  {
    title: "General Cleaning",
    description:
      "We provide thorough residential and commercial cleaning, tailored to meet individual client needs. ranging from offices to cites, for both temporal and permanent cleaning ",
    image: "../../../assets/images/planning16.png",
  },
  {
    title: "Chair and Equipment Rentals",
    description:
      "We offer reliable rentals of chairs and other event essentials, customized to suit your specific needs. Ideal for both small gatherings and large events, available for short-term or long-term use.",
    image: "../../../assets/images/planning18.png",
  },
];

const testimonials = [
  {
    name: "Tayu Joynel",
    position: "CEO, Joyful Events",
    quote:
      "The hostesses provided to serve on buffet tables for our past events were exceptional. Their professionalism and attention to detail made our event run smoothly.",
    avatar:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.39.03 (1).jpeg",
  },
  {
    name: "Kencho Desmond",
    position: "Executive Director, Revobit Cameroon",
    quote:
      "Working with this agency has been a game-changer for our corporate events. Their protocol officers understand exactly what our high-profile guests expect.",
    avatar:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.39 (2).jpeg",
  },
  {
    name: "Che Claris",
    position: "Wedding Planner",
    quote:
      "I have been recommending their services to all my clients. The hostesses are not only professional but also add that special touch to make events memorable.",
    avatar: "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.39.jpeg",
  },
];
