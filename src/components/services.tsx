import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactButtons from "@/components/contact-buttons"

export default function ServicesPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 py-20 mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Services</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Comprehensive hostess and protocol services tailored to meet the unique needs of your events.
                        </p>
                    </div>

                    <ContactButtons />
                </section>

                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Comprehensive Event Solutions</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                From corporate gatherings to private celebrations, we provide professional hostess and protocol services
                                that elevate your events.
                            </p>
                        </div>

                        <div className="space-y-20">
                            {services.map((service, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
                                >
                                    <div className="md:w-1/2">
                                        <Image
                                            src={service.image || "/placeholder.svg"}
                                            alt={service.title}
                                            width={600}
                                            height={400}
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                    <div className="md:w-1/2 space-y-4">
                                        <h3 className="text-2xl font-bold text-blue-800">{service.title}</h3>
                                        <p className="text-lg text-gray-600">{service.description}</p>
                                        <ul className="space-y-2">
                                            {service.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-orange-500 mr-2">✓</span>
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Additional Services</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Complementary services to enhance your event experience.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {additionalServices.map((service, index) => (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mb-6">
                                        <Image src="/placeholder.svg?height=40&width=40" alt={service.title} width={40} height={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-800 mb-3">{service.title}</h3>
                                    <p className="text-gray-600 mb-4">{service.description}</p>
                                    <Button asChild variant="outline" className="text-blue-600 border-blue-600 hover:bg-blue-50">
                                        <Link href="/contact">Inquire</Link>
                                    </Button>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Flexible Pricing Options</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                We offer transparent pricing with packages designed to suit events of all sizes and budgets.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {pricingPlans.map((plan, index) => (
                                <div
                                    key={index}
                                    className={`rounded-lg shadow-lg overflow-hidden ${plan.featured ? "border-2 border-orange-500 relative" : ""}`}
                                >
                                    {plan.featured && (
                                        <div className="bg-orange-500 text-white text-center py-1 font-medium">Most Popular</div>
                                    )}
                                    <div className={`p-8 ${plan.featured ? "bg-blue-50" : "bg-white"}`}>
                                        <h3 className="text-2xl font-bold text-blue-800 mb-2">{plan.title}</h3>
                                        <p className="text-gray-600 mb-6">{plan.description}</p>
                                        <div className="mb-6">
                                            <span className="text-4xl font-bold text-blue-800">${plan.price}</span>
                                            <span className="text-gray-500"> / {plan.unit}</span>
                                        </div>
                                        <ul className="space-y-3 mb-8">
                                            {plan.features.map((feature, idx) => (
                                                <li key={idx} className="flex items-start">
                                                    <span className="text-orange-500 mr-2">✓</span>
                                                    <span className="text-gray-600">{feature}</span>
                                                </li>
                                            ))}
                                        </ul>
                                        <Button
                                            asChild
                                            className={
                                                plan.featured
                                                    ? "bg-orange-500 hover:bg-orange-600 w-full"
                                                    : "bg-blue-600 hover:bg-blue-700 w-full"
                                            }
                                        >
                                            <Link href="/contact">Get Started</Link>
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12 text-gray-600">
                            <p>
                                Need a custom solution?{" "}
                                <Link href="/contact" className="text-blue-600 hover:underline">
                                    Contact us
                                </Link>{" "}
                                for personalized pricing.
                            </p>
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
    )
}

const services = [
    {
        title: "Event Hostesses",
        description:
            "Our professional hostesses are trained to provide exceptional service, ensuring your guests feel welcomed and attended to throughout your event.",
        image: "/placeholder.svg?height=400&width=600",
        features: [
            "Guest reception and registration",
            "Information and assistance",
            "VIP guest management",
            "Multilingual capabilities",
            "Brand representation",
            "Elegant and professional appearance",
        ],
    },
    {
        title: "Protocol Officers",
        description:
            "Our protocol officers ensure that proper etiquette and procedures are followed at formal events, creating a sophisticated and respectful atmosphere.",
        image: "/placeholder.svg?height=400&width=600",
        features: [
            "Diplomatic protocol expertise",
            "Seating arrangement management",
            "Flag and national anthem protocol",
            "Official ceremonies coordination",
            "VIP and dignitary handling",
            "Cultural sensitivity and awareness",
        ],
    },
    {
        title: "Corporate Events",
        description:
            "From conferences to product launches, our team provides comprehensive staffing solutions for corporate events of all sizes.",
        image: "/placeholder.svg?height=400&width=600",
        features: [
            "Conference and exhibition staffing",
            "Product demonstration assistants",
            "Brand ambassadors",
            "Registration and check-in management",
            "Corporate hospitality",
            "Technical support coordination",
        ],
    },
    {
        title: "Private Functions",
        description:
            "Elevate your private celebrations with our discreet and professional hostess services, ensuring your special occasions are memorable.",
        image: "/placeholder.svg?height=400&width=600",
        features: [
            "Wedding reception assistance",
            "Gala dinner coordination",
            "Private party management",
            "Guest list handling",
            "Gift management",
            "Personal concierge services",
        ],
    },
]

const additionalServices = [
    {
        title: "Event Planning",
        description:
            "Comprehensive event planning services to help you conceptualize, organize, and execute successful events.",
    },
    {
        title: "Staff Training",
        description:
            "Professional training for your existing staff in hospitality, protocol, and customer service excellence.",
    },
    {
        title: "Venue Selection",
        description:
            "Assistance in finding and securing the perfect venue for your event based on your specific requirements.",
    },
    {
        title: "Transportation Coordination",
        description: "Seamless coordination of transportation for your guests, ensuring timely arrivals and departures.",
    },
    {
        title: "Rentals of Chairs, Tables...",
        description:
            "Rental Services of clean chairs, tables, shaffling dishes, plates, spoons, glasses and more..."
    },
    {
        title: "Cleaning of Event Venue",
        description: "Ensures the cleanliness of your event venue before and after the event"
    }
]

const pricingPlans = [
    {
        title: "Basic",
        description: "Perfect for small events",
        price: 499,
        unit: "event",
        features: [
            "2 professional hostesses",
            "4-hour event coverage",
            "Basic guest management",
            "Standard attire",
            "Pre-event consultation",
        ],
        featured: false,
    },
    {
        title: "Premium",
        description: "Ideal for medium-sized events",
        price: 999,
        unit: "event",
        features: [
            "4 professional hostesses",
            "8-hour event coverage",
            "VIP guest handling",
            "Custom-branded attire",
            "Dedicated event coordinator",
        ],
        featured: true,
    },
    {
        title: "Elite",
        description: "For large-scale prestigious events",
        price: 1999,
        unit: "event",
        features: [
            "8+ professional hostesses",
            "Full-day event coverage",
            "Protocol officer included",
            "Premium guest experience",
            "Pre-event planning sessions",
            "Post-event report",
            "24/7 support",
        ],
        featured: false,
    },
]