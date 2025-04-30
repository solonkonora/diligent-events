import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContactButtons from "./contact-buttons";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <main className="flex-1">
    {/* Hero Section */}
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white min-h-screen flex items-center">
  <div className="flex w-full h-full flex-col md:flex-row items-center">
    {/* Text Content */}
    <div className="z-10 space-y-6 md:w-1/2 px-6 py-12">
      <h1 className="text-4xl leading-tight font-bold md:text-5xl lg:text-6xl">
        Professional Hostess & Protocol Services
      </h1>
      <p className="text-lg text-blue-100 md:text-xl max-w-lg">
        Elevate your events with our professional hostesses and protocol officers. We ensure your guests receive the highest level of service and attention.
      </p>
      <div className="flex flex-wrap gap-4">
        <Button
          asChild
          size="lg"
          className="bg-orange-500 text-white hover:bg-orange-600"
        >
          <Link href="/services">Our Services</Link>
        </Button>
        <Button
          asChild
          size="lg"
          variant="outline"
          className="border-white bg-white/10 text-white hover:bg-white/20"
        >
          <Link href="/contact">Contact Us</Link>
        </Button>
      </div>
    </div>
    {/* Image - No padding/margin */}
    <div className="relative md:w-1/2 w-full h-[60vh] md:h-screen m-0 p-0">
      <Image
        src="https://images.pexels.com/photos/5778258/pexels-photo-5778258.jpeg?auto=compress&cs=tinysrgb&w=1200&h=1800"
        alt="Professional hostesses"
        fill
        className="rounded-none shadow-none object-cover w-full h-full m-0 p-0"
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
                  <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                    {service.icon}
                  </div>
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
              <Link href="/contact">Get in Touch</Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
}

// Sample data
const services = [
  {
    title: "Event Hostesses",
    description:
      "Professional hostesses to welcome and guide your guests, creating a memorable first impression.",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Event Hostesses"
        width={40}
        height={40}
      />
    ),
  },
  {
    title: "Protocol Officers",
    description:
      "Expert protocol officers to ensure proper etiquette and procedures are followed at formal events.",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Protocol Officers"
        width={40}
        height={40}
      />
    ),
  },
  {
    title: "Service Traiteur",
    description:
      "We offer customized menus tailored to dietary needs, impeccable presentation, and attentive service. Our commitment to quality, safety, and customer satisfaction sets us apart as a trusted partner for memorable events",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Corporate Events"
        width={40}
        height={40}
      />
    ),
  },
  {
    title: "General logistics",
    description:
      " to the planning, coordination, and execution of all the resources, services, and processes required to ensure the event runs smoothly and successfully",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Corporate Events"
        width={40}
        height={40}
      />
    ),
  },
  {
    title: "General Cleaning",
    description:
      "We provide thorough residential and commercial cleaning, tailored to meet individual client needs. ranging from offices to cites, for both temporal and permanent cleaning ",
    icon: (
      <Image
        src="/placeholder.svg?height=40&width=40"
        alt="Corporate Events"
        width={40}
        height={40}
      />
    ),
  },
];

const testimonials = [
  {
    name: "Tayu Joynel",
    position: "CEO, Joyful Events",
    quote:
      "The hostesses provided to serve on buffet tables for our past events were exceptional. Their professionalism and attention to detail made our event run smoothly.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Kencho Desmond",
    position: "Executive Director, Revobit Cameroon",
    quote:
      "Working with this agency has been a game-changer for our corporate events. Their protocol officers understand exactly what our high-profile guests expect.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Che Clarisse",
    position: "Wedding Planner",
    quote:
      "I've been recommending their services to all my clients. The hostesses are not only professional but also add that special touch to make events memorable.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
];
