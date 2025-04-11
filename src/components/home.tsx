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
                    <div className="container px-6 py-20 md:py-12 mx-auto flex flex-col md:flex-row items-center gap-12">
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

                {/* Testimonials */}
                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">What Our Clients Say</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                We take pride in delivering exceptional service that exceeds expectations.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {testimonials.map((testimonial, index) => (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-md">
                                    <div className="flex items-center mb-4">
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
                                            <h4 className="font-bold text-blue-800">{testimonial.name}</h4>
                                            <p className="text-gray-500 text-sm">{testimonial.position}</p>
                                        </div>
                                    </div>
                                    <p className="text-gray-600 italic">"{testimonial.quote}"</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Elevate Your Next Event?</h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Contact us today to discuss how our professional hostesses and protocol officers can make your event truly
                            exceptional.
                        </p>
                        <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
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
        description: "Professional hostesses to welcome and guide your guests, creating a memorable first impression.",
        icon: <Image src="/placeholder.svg?height=40&width=40" alt="Event Hostesses" width={40} height={40} />,
    },
    {
        title: "Protocol Officers",
        description: "Expert protocol officers to ensure proper etiquette and procedures are followed at formal events.",
        icon: <Image src="/placeholder.svg?height=40&width=40" alt="Protocol Officers" width={40} height={40} />,
    },
    {
        title: "Service Traiteur",
        description: "We offer customized menus tailored to dietary needs, impeccable presentation, and attentive service. Our commitment to quality, safety, and customer satisfaction sets us apart as a trusted partner for memorable events",
        icon: <Image src="/placeholder.svg?height=40&width=40" alt="Corporate Events" width={40} height={40} />,
    },
    {
        title: "General logistics",
        description: " to the planning, coordination, and execution of all the resources, services, and processes required to ensure the event runs smoothly and successfully",
        icon: <Image src="/placeholder.svg?height=40&width=40" alt="Corporate Events" width={40} height={40} />,
    },
    {
        title: "General Cleaning",
        description: "We provide thorough residential and commercial cleaning, tailored to meet individual client needs. ranging from offices to cites, for both temporal and permanent cleaning ",
        icon: <Image src="/placeholder.svg?height=40&width=40" alt="Corporate Events" width={40} height={40} />,
    },

]

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
]
