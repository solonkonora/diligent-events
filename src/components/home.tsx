import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import ContactButtons from "./contact-buttons";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-6 py-20 md:py-32 mx-auto flex flex-col md:flex-row items-center gap-12">
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

          <ContactButtons />

        </section>
           {/* Services Overview */}
           <section className="py-20 bg-white">
          <div className="container px-4 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Our Premium Services</h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We offer a comprehensive range of hostess and protocol services tailored to meet the unique needs of
                your events.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-8 shadow-md hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold text-blue-800 mb-3">{service.title}</h3>
                  <p className="text-gray-600">{service.description}</p>
                </div>
              ))}
            </div>

            <div className="text-center mt-12">
              <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                <Link href="/services">View All Services</Link>
              </Button>
            </div>
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
      description: "Professional hostesses to welcome and guide your guests, creating a memorable first impression.",
      icon: <Image src="/placeholder.svg?height=40&width=40" alt="Event Hostesses" width={40} height={40} />,
    },
    {
      title: "Protocol Officers",
      description: "Expert protocol officers to ensure proper etiquette and procedures are followed at formal events.",
      icon: <Image src="/placeholder.svg?height=40&width=40" alt="Protocol Officers" width={40} height={40} />,
    },
    {
      title: "Corporate Events",
      description: "Comprehensive staffing solutions for corporate events, conferences, and business meetings.",
      icon: <Image src="/placeholder.svg?height=40&width=40" alt="Corporate Events" width={40} height={40} />,
    },
  ]
