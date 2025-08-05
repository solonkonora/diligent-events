import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import Header from "./header";
import Footer from "./footer";
import HeroSection from "./hero-section";
import ContactButtons from "./contact-buttons";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
        <Header />
        <HeroSection />

        <div className="relative z-10 px-4 pb-8 md:px-6 md:pb-12">
          <ContactButtons />
        </div>

        {/* Services Overview */}
        <section className="dark:bg-background bg-white py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Our Premium Services
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                Comprehensive event solutions tailored to your needs
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service, index) => (
                <div
                  key={index}
                  className="dark:bg-card dark:border-border flex flex-col overflow-hidden rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg dark:border dark:shadow-none"
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
                    <h3 className="dark:text-primary mb-3 text-xl font-bold text-blue-800">
                      {service.title}
                    </h3>
                    <p className="dark:text-muted-foreground text-gray-600">
                      {service.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                className="dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 bg-orange-500 text-white hover:bg-orange-600"
              >
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="dark:bg-card bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                What Our Clients Say
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                We take pride in delivering exceptional service that exceeds
                expectations.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {testimonials.map((testimonial, index) => (
                <div
                  key={index}
                  className="dark:bg-background dark:border-border rounded-lg bg-white p-8 shadow-md dark:border"
                >
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
                      <h4 className="dark:text-primary font-bold text-blue-800">
                        {testimonial.name}
                      </h4>
                      <p className="dark:text-muted-foreground text-sm text-gray-500">
                        {testimonial.position}
                      </p>
                    </div>
                  </div>
                  <p className="dark:text-muted-foreground text-gray-600 italic">
                    {testimonial.quote}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark:bg-primary dark:text-primary-foreground bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="dark:text-primary-foreground mb-6 text-3xl font-bold md:text-4xl">
              Ready to Elevate Your Next Event?
            </h2>
            <p className="dark:text-foreground mx-auto mb-8 max-w-3xl text-xl text-blue-100">
              Contact us today to discuss how our professional hostesses and
              protocol officers can make your event truly exceptional.
            </p>
            <Button
              asChild
              size="lg"
              className="dark:bg-background dark:text-primary dark:hover:bg-background/80 bg-orange-500 text-white hover:bg-orange-600"
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
    avatar: "../../../assets/images/prof.png",
  },
  {
    name: "Kencho Desmond",
    position: "Executive Director, Revobit Cameroon",
    quote:
      "Working with this agency has been a game-changer for our corporate events. Their protocol officers understand exactly what our high-profile guests expect.",
    avatar: "../../../assets/images/pro.png",
  },
  {
    name: "Che Claris",
    position: "Wedding Planner",
    quote:
      "I have been recommending their services to all my clients. The hostesses are not only professional but also add that special touch to make events memorable.",
    avatar: "../../../assets/images/prof.png",
  },
];
