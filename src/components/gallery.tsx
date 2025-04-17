import Image from "next/image"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import ContactButtons from "@/components/contact-buttons"

export default function EventsPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 py-20 mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Our Events</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Explore our portfolio of prestigious events where we've provided exceptional hostess and protocol
                            services.
                        </p>
                    </div>

                    <ContactButtons />
                </section>

                {/* Featured Events */}
                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Featured Events</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Highlights from a few of our prestigious and successful events.
                            </p>
                        </div>

                        <div className="space-y-20">
                            {featuredEvents.map((event, index) => (
                                <div
                                    key={index}
                                    className={`flex flex-col ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
                                >
                                    <div className="md:w-1/2">
                                        <Image
                                            src={event.image || "/placeholder.svg"}
                                            alt={event.title}
                                            width={600}
                                            height={400}
                                            className="rounded-lg shadow-lg"
                                        />
                                    </div>
                                    <div className="md:w-1/2 space-y-4">
                                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-2">
                                            <span>{event.date}</span>
                                            <span>•</span>
                                            <span>{event.location}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-blue-800">{event.title}</h3>
                                        <p className="text-lg text-gray-600">{event.description}</p>
                                        <div className="flex flex-wrap gap-2">
                                            {event.tags.map((tag, idx) => (
                                                <span key={idx} className="bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full">
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Event Gallery */}
                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Event Gallery</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                A visual showcase of our presence at various prestigious events.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {galleryImages.map((image, index) => (
                                <div key={index} className="overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <Image
                                        src={image.src || "/placeholder.svg"}
                                        alt={image.alt}
                                        width={400}
                                        height={300}
                                        className="w-full h-64 object-cover hover:scale-105 transition-transform duration-300"
                                    />
                                </div>
                            ))}
                        </div>

                        <div className="text-center mt-12">
                            <Button asChild className="bg-orange-500 hover:bg-orange-600 text-white">
                                <Link href="/contact">Book Us For Your Event</Link>
                            </Button>
                        </div>
                    </div>
                </section>

                {/* Testimonials */}
                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Event Success Stories</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                Hear what event organizers have to say about our services.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                                    <p className="text-gray-600 italic mb-4">"{testimonial.quote}"</p>
                                    <p className="text-sm text-gray-500">{testimonial.event}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Call to Action */}
                <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 mx-auto text-center">
                        <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make Your Event Exceptional?</h2>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto mb-8">
                            Contact us today to discuss how our professional hostesses and protocol officers can elevate your next
                            event.
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

const featuredEvents = [
    {
        title: "PhilBery 2025",
        date: "January 09-11, 2025",
        location: "Chariot Hotel, Muea",
        description:
            "We provided a team of 10 professional hostesses and 5 protocol officers for this prestigious Wedding, ensuring seamless guest management for over 500 attendees",
        image: "/placeholder.svg?height=400&width=600",
        tags: ["wedding"],
    },
    {
        "title": "Funeral Celebration",
        "date": "October 15, 2023",
        "location": "St. Mary’s Church",
        "description":
            "We provided compassionate support and protocol services during this solemn funeral celebration, ensuring that the family received the utmost respect and care during their time of mourning. Our team managed the logistics and coordinated with clergy and attendees to create a dignified atmosphere.",
        "image": "/placeholder.svg?height=400&width=600",
        "tags": ["Funeral", "Celebration", "Protocol"]
    },
    {
        "title": "Global Church Revival Event (Rural Exodus)",
        "date": "November 5, 2023",
        "location": "Molyko Stadium",
        "description":
            "This impactful revival event drew thousands from various communities, focusing on spiritual renewal and unity. Our team ensured smooth event operations, including seating arrangements, sound systems, and hospitality services, to foster a welcoming and uplifting environment for all attendees.",
        "image": "/placeholder.svg?height=400&width=600",
        "tags": ["Revival", "Church", "Community"]
    },
    {
        "title": "Graduation Ceremony",
        "date": "December 12, 2023",
        "location": "City Convention Center",
        "description":
            "We served at a memorable graduation ceremony, celebrating the achievements of graduates with family and friends. Our protocol officers coordinated the event schedule, managed guest speakers, and ensured that every detail was perfect for this significant milestone in the graduates' lives.",
        "image": "/placeholder.svg?height=400&width=600",
        "tags": ["Graduation", "Ceremony", "Celebration"]
    }
]

const galleryImages = [
    { src: "/placeholder.svg?height=300&width=400", alt: "Corporate conference with hostesses" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Diplomatic reception" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Fashion show event" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Award ceremony" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Product launch event" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Gala dinner" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Trade show hostesses" },
    { src: "/placeholder.svg?height=300&width=400", alt: "VIP event management" },
    { src: "/placeholder.svg?height=300&width=400", alt: "Red carpet event" },
]

const testimonials = [
    {
        "name": "Emily Johnson",
        "position": "Wedding Planner",
        "quote":
            "The professionalism and attention to detail from the team made our wedding day truly unforgettable. They managed every aspect with grace, ensuring everything went smoothly and allowing us to enjoy our special moment.",
        "avatar": "/placeholder.svg?height=60&width=60",
        "event": "Emily & James' Wedding"
    },
    {
        "name": "Margaret Smith",
        "position": "Family Member",
        "quote":
            "During our time of loss, the support and sensitivity shown by the event team were invaluable. They handled the logistics with care, allowing our family to focus on honoring our loved one.",
        "avatar": "/placeholder.svg?height=60&width=60",
        "event": "Celebration of Life for John Smith"
    },
    {
        "name": "Pastor Michael Green",
        "position": "Church Leader",
        "quote":
            "The team’s dedication to creating a welcoming and uplifting atmosphere for our church revival event was outstanding. Their organization and attention to detail helped foster a spirit of community and renewal.",
        "avatar": "/placeholder.svg?height=60&width=60",
        "event": "Global Church Revival 2023"
    },
    {
        "name": "Sarah Eyong",
        "position": "Graduation Coordinator",
        "quote":
            "The event team did a phenomenal job organizing our graduation ceremony. From coordinating speakers to managing the guests, their expertise made the event memorable for every graduate and their families.",
        "avatar": "/placeholder.svg?height=60&width=60",
        "event": "City High School Graduation"
    }
]
