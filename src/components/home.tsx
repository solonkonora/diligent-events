import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContactButtons from "./contact-buttons";
import Header from "./header";
import Footer from "./footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative flex min-h-screen items-center overflow-hidden bg-sky-200">
          <div className="flex h-full w-full flex-col md:flex-row">
            {/* Text Content */}
            <div className="relative z-10 flex items-center py-12 md:w-1/2">
              <div className="mx-auto w-full max-w-[90%] space-y-8 px-4 sm:px-6">
                <h1 className="bg-gradient-to-r from-blue-800 to-orange-600 bg-clip-text text-3xl leading-tight font-bold text-transparent drop-shadow-[0_2px_2px_rgba(0,0,0,0.4)] md:text-4xl lg:text-5xl">
                  Hostess/Protocol Services & Event Planning
                </h1>

                <p className="max-w-prose rounded-lg border border-blue-300/30 bg-white/50 px-5 py-4 text-base leading-relaxed text-blue-900 backdrop-blur-sm md:text-lg">
                  Elevate your events with our professional hostesses and
                  protocol officers. We ensure your guests receive the highest
                  level of service and attention.
                </p>

                <div className="flex flex-wrap gap-3">
                  <Button
                    asChild
                    size="lg"
                    className="bg-gradient-to-r from-blue-600 to-blue-500 text-sm text-white shadow-lg transition-all hover:from-blue-700 hover:to-blue-600 hover:shadow-blue-500/30 md:text-base"
                  >
                    <Link href="/services">Our Services</Link>
                  </Button>
                  <Button
                    asChild
                    size="lg"
                    className="border-2 border-blue-900 bg-orange-600 text-sm text-white backdrop-blur-sm transition-all hover:border-orange-400 hover:bg-blue-600/20 md:text-base"
                  >
                    <Link href="/contact">Contact Us</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Image Section */}
            <div className="relative h-[50vh] w-full md:h-screen md:w-1/2">
              <Image
                // src="https://images.pexels.com/photos/5778258/pexels-photo-5778258.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1800"
                src="../../../assets/images/two.jpeg"
                alt="Professional hostesses"
                fill
                className="object-cover object-top"
                priority
              />
            </div>
          </div>
          <ContactButtons />
        </section>

        {/* Services Overview */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Our Premium Services
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                We offer a comprehensive range of hostess and protocol services
                tailored to meet the unique needs of your events.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="rounded-lg bg-gray-50 p-8 shadow-md transition-shadow hover:shadow-lg"
                >
                  <h3 className="mb-3 text-xl font-bold text-blue-800">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">{service.description}</p>
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

        {/* Call to Action */}
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
              <Link href="/auth/login?redirect=/bookings">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

// Sample data
const services = [
  {
    title: "Event Hostesses",
    description:
      "Professional hostesses to welcome and guide your guests, creating a memorable first impression.",
  },
  {
    title: "Protocol Officers",
    description:
      "Expert protocol officers to ensure proper etiquette and procedures are followed at formal events.",
  },
  {
    title: "Service Traiteur",
    description:
      "We offer customized menus tailored to dietary needs, impeccable presentation, and attentive service. Our commitment to quality, safety, and customer satisfaction sets us apart as a trusted partner for memorable events",
  },
  {
    title: "General logistics",
    description:
      " to the planning, coordination, and execution of all the resources, services, and processes required to ensure the event runs smoothly and successfully",
  },
  {
    title: "General Cleaning",
    description:
      "We provide thorough residential and commercial cleaning, tailored to meet individual client needs. ranging from offices to cites, for both temporal and permanent cleaning ",
  },
  {
    title: "Chair and Equipment Rentals",
    description:
      "We offer reliable rentals of chairs and other event essentials, customized to suit your specific needs. Ideal for both small gatherings and large events, available for short-term or long-term use.",
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
    name: "Che Clarisse",
    position: "Wedding Planner",
    quote:
      "I've been recommending their services to all my clients. The hostesses are not only professional but also add that special touch to make events memorable.",
    avatar: "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.39.jpeg",
  },
];
