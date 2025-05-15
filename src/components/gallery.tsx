import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ContactButtons from "@/components/contact-buttons";
import Header from "./header";
import Footer from "./footer";

export default function EventsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Our Events</h1>
            <p className="mx-auto max-w-3xl text-xl text-blue-100">
              Explore our portfolio of prestigious events where we've provided
              exceptional hostess and protocol services.
            </p>
          </div>

          <ContactButtons />
        </section>

        {/* Featured Events */}
        <section className="bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Featured Events
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
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
                  <div className="space-y-4 md:w-1/2">
                    <div className="mb-2 flex items-center gap-2 text-sm text-gray-500">
                      <span>{event.date}</span>
                      <span>•</span>
                      <span>{event.location}</span>
                    </div>
                    <h3 className="text-2xl font-bold text-blue-800">
                      {event.title}
                    </h3>
                    <p className="text-lg text-gray-600">{event.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {event.tags.map((tag, idx) => (
                        <span
                          key={idx}
                          className="rounded-full bg-blue-100 px-3 py-1 text-sm text-blue-800"
                        >
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
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Event Gallery
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                A visual showcase of our presence at various prestigious events.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {galleryImages.map((image, index) => (
                <div
                  key={index}
                  className="overflow-hidden rounded-lg shadow-md transition-shadow hover:shadow-lg"
                >
                  <Image
                    src={image.src || "/placeholder.svg"}
                    alt={image.alt}
                    width={400}
                    height={300}
                    className="h-64 w-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
              ))}
            </div>

            <div className="mt-12 text-center">
              <Button
                asChild
                className="bg-orange-500 text-white hover:bg-orange-600"
              >
                <Link href="/contact">Book Us For Your Event</Link>
              </Button>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Event Success Stories
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                Hear what event organizers have to say about our services.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
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
                  <p className="mb-4 text-gray-600 italic">
                    "{testimonial.quote}"
                  </p>
                  <p className="text-sm text-gray-500">{testimonial.event}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold md:text-4xl">
              Ready to Make Your Event Exceptional?
            </h2>
            <p className="mx-auto mb-8 max-w-3xl text-xl text-blue-100">
              Contact us today to discuss how our professional hostesses and
              protocol officers can elevate your next event.
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
      <Footer />
    </div>
  );
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
    title: "Funeral Celebration",
    date: "October 15, 2023",
    location: "Bokwai, Dr Tabah's Resident",
    description:
      "We provided compassionate support and protocol services during this solemn funeral celebration, ensuring that the family received the utmost respect and care during their time of mourning. Our team managed the logistics and coordinated with clergy and attendees to create a dignified atmosphere.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Funeral", "Celebration", "Protocol"],
  },
  {
    title: "Global Church Revival Event (Rural Exodus)",
    date: "November 5, 2023",
    location: "Molyko Stadium",
    description:
      "This impactful revival event drew thousands from various communities, focusing on spiritual renewal and unity. Our team ensured smooth event operations, including seating arrangements, sound systems, and hospitality services, to foster a welcoming and uplifting environment for all attendees.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Revival", "Church", "Community"],
  },
  {
    title: "Graduation Ceremony",
    date: "December 12, 2023",
    location: "City Convention Center",
    description:
      "We served at a memorable graduation ceremony, celebrating the achievements of graduates with family and friends. Our protocol officers coordinated the event schedule, managed guest speakers, and ensured that every detail was perfect for this significant milestone in the graduates' lives.",
    image: "/placeholder.svg?height=400&width=600",
    tags: ["Graduation", "Ceremony", "Celebration"],
  },
];

const galleryImages = [
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.39 (1).jpeg",
    alt: "Corporate conference with hostesses",
  },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.41 (2).jpeg",
    alt: "Diplomatic reception",
  },
  { src: "/assets/images/ds7.jpeg", alt: "Fashion show event" },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.39.jpeg",
    alt: "Award ceremony",
  },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.40 (1).jpeg",
    alt: "Product launch event",
  },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.43.42.jpeg",
    alt: "Gala dinner",
  },
  {
    src: "/assets/images/ds10.jpeg",
    alt: "Trade show hostesses",
  },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.39.jpeg",
    alt: "VIP event management",
  },
  { src: "/assets/images/ds11.jpeg", alt: "Red carpet event" },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.41.jpeg",
    alt: "Gala dinner",
  },
  {
    src: "/assets/images/five.jpeg",
    alt: "Trade show hostesses",
  },
  {
    src: "/assets/images/WhatsApp Image 2025-05-01 at 08.35.42.jpeg",
    alt: "Gala dinner",
  },
];

const testimonials = [
  {
    name: "Emily Johnson",
    position: "Wedding Planner",
    quote:
      "The professionalism and attention to detail from the team made our wedding day truly unforgettable. They managed every aspect with grace, ensuring everything went smoothly and allowing us to enjoy our special moment.",
    avatar: "/placeholder.svg?height=60&width=60",
    event: "Emily & James' Wedding",
  },
  {
    name: "Margaret Smith",
    position: "Family Member",
    quote:
      "During our time of loss, the support and sensitivity shown by the event team were invaluable. They handled the logistics with care, allowing our family to focus on honoring our loved one.",
    avatar: "/placeholder.svg?height=60&width=60",
    event: "Celebration of Life for John Smith",
  },
  {
    name: "Pastor Michael Green",
    position: "Church Leader",
    quote:
      "The team’s dedication to creating a welcoming and uplifting atmosphere for our church revival event was outstanding. Their organization and attention to detail helped foster a spirit of community and renewal.",
    avatar: "/placeholder.svg?height=60&width=60",
    event: "Global Church Revival 2023",
  },
  {
    name: "Sarah Eyong",
    position: "Graduation Coordinator",
    quote:
      "The event team did a phenomenal job organizing our graduation ceremony. From coordinating speakers to managing the guests, their expertise made the event memorable for every graduate and their families.",
    avatar: "/placeholder.svg?height=60&width=60",
    event: "City High School Graduation",
  },
];
