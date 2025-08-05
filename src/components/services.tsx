import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import ContactButtons from "@/components/contact-buttons";
import Footer from "./footer";
import Header from "./header";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="dark:bg-primary dark:text-primary-foreground relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="dark:text-primary-foreground mb-6 text-4xl font-bold md:text-5xl">
              Our Services
            </h1>
            <p className="dark:text-muted-foreground mx-auto max-w-3xl text-xl text-blue-100">
              Comprehensive hostess and protocol services tailored to meet the
              unique needs of your events.
            </p>
          </div>

          <ContactButtons />
        </section>

        <section className="dark:bg-background bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Comprehensive Event Solutions
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                From corporate gatherings to private celebrations, we provide
                professional hostess and protocol services that elevate your
              </p>
            </div>

            <div className="space-y-20">
              {services.map((service, index) => (
                <div
                  key={index}
                  className={`dark:bg-card dark:border-border flex flex-col rounded-lg bg-gray-50 shadow-md transition-shadow hover:shadow-lg dark:border dark:shadow-none ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} items-center gap-12`}
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
                  <div className="space-y-4 md:w-1/2">
                    <h3 className="dark:text-primary text-2xl font-bold text-blue-800">
                      {service.title}
                    </h3>
                    <p className="dark:text-muted-foreground text-lg text-gray-600">
                      {service.description}
                    </p>
                    <ul className="space-y-2">
                      {service.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-orange-500">✓</span>
                          <span className="dark:text-muted-foreground text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark:bg-card bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Additional Services
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                Complementary services to enhance your event experience.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {additionalServices.map((service, index) => (
                <div
                  key={index}
                  className="dark:bg-background dark:border-border rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-lg dark:border"
                >
                  <h3 className="dark:text-primary mb-3 text-xl font-bold text-blue-800">
                    {service.title}
                  </h3>
                  <p className="dark:text-muted-foreground mb-4 text-gray-600">
                    {service.description}
                  </p>
                  <Button
                    asChild
                    variant="outline"
                    className="dark:border-primary dark:text-primary dark:hover:bg-primary/10 border-blue-600 text-blue-600 hover:bg-blue-50"
                  >
                    <Link href="/contact">Inquire</Link>
                  </Button>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark:bg-background bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Flexible Pricing Options
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                We offer transparent pricing with packages designed to suit
                events of all sizes and budgets.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <div
                  key={index}
                  className={`overflow-hidden rounded-lg shadow-lg ${plan.featured ? "relative border-2 border-orange-500 dark:border-orange-400" : "dark:border-border dark:border"}`}
                >
                  {plan.featured && (
                    <div className="dark:bg-primary dark:text-primary-foreground bg-orange-500 py-1 text-center font-medium text-white">
                      Most Popular
                    </div>
                  )}
                  <div
                    className={`p-8 ${plan.featured ? "dark:bg-card bg-blue-50" : "dark:bg-background bg-white"}`}
                  >
                    <h3 className="dark:text-primary mb-2 text-2xl font-bold text-blue-800">
                      {plan.title}
                    </h3>
                    <p className="dark:text-muted-foreground mb-6 text-gray-600">
                      {plan.description}
                    </p>
                    <div className="mb-6">
                      <span className="dark:text-primary text-4xl font-bold text-blue-800">
                        ${plan.price}
                      </span>
                      <span className="dark:text-muted-foreground text-gray-500">
                        <br />/ {plan.unit}
                      </span>
                    </div>
                    <ul className="mb-8 space-y-3">
                      {plan.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="mr-2 text-orange-500">✓</span>
                          <span className="dark:text-muted-foreground text-gray-600">
                            {feature}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      asChild
                      className={
                        plan.featured
                          ? "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 w-full bg-orange-500 hover:bg-orange-600"
                          : "dark:bg-primary dark:text-primary-foreground dark:hover:bg-primary/80 w-full bg-blue-600 hover:bg-blue-700"
                      }
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  </div>
                </div>
              ))}
            </div>

            <div className="dark:text-muted-foreground mt-12 text-center text-gray-600">
              <p>
                Need a custom solution?{" "}
                <Link
                  href="/contact"
                  className="dark:text-primary text-blue-600 hover:underline"
                >
                  Contact us
                </Link>{" "}
                for personalized pricing.
              </p>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="dark:bg-primary dark:text-primary-foreground bg-gradient-to-r from-blue-600 to-blue-800 py-20 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="dark:text-primary-foreground mb-6 text-3xl font-bold md:text-4xl">
              Ready to Elevate Your Next Event?
            </h2>
            <p className="dark:text-muted-foreground mx-auto mb-8 max-w-3xl text-xl text-blue-100">
              Contact us today to discuss how our professional hostesses and
              protocol officers can make your event truly exceptional.
            </p>
            <Button
              asChild
              size="lg"
              className="dark:bg-background dark:text-primary dark:hover:bg-background/80 bg-orange-500 text-white hover:bg-orange-600"
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

const services = [
  {
    title: "Event Hostesses",
    description:
      "Our professional hostesses are trained to provide exceptional service, ensuring your guests feel welcomed and attended to throughout your event.",
    image: "../../../assets/images/ds10.jpeg",
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
    image: "../../../assets/images/ds6.jpeg",
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
    image: "../../../assets/images/ds5.jpeg",
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
    image:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.35.42 (1).jpeg",
    features: [
      "Wedding reception assistance",
      "Gala dinner coordination",
      "Private party management",
      "Guest list handling",
      "Gift management",
      "Personal concierge services",
    ],
  },
];

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
    description:
      "Seamless coordination of transportation for your guests, ensuring timely arrivals and departures.",
  },
  {
    title: "Rentals of Chairs, Tables...",
    description:
      "Rental Services of clean chairs, tables, shaffling dishes, plates, spoons, glasses and more...",
  },
  {
    title: "Cleaning of Event Venue",
    description:
      "Ensures the cleanliness of your event venue before and after the event",
  },
];

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
];
