import { Button } from "@/components/ui/button";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import ContactButtons from "@/components/contact-buttons";
import Header from "./header";
import Footer from "./footer";
import Link from "next/link";

export default function ContactPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="mb-6 text-4xl font-bold md:text-5xl">Contact Us</h1>
            <p className="mx-auto max-w-3xl text-xl text-blue-100">
              Get in touch with our team to discuss your event needs and how we
              can help make your event exceptional.
            </p>
          </div>

          <ContactButtons />
        </section>

        <section className="bg-white py-5">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
              <div className="rounded-lg bg-gray-50 p-8 shadow-md">
                <div className="flex justify-center">
                  <Button
                    type="submit"
                    className="w-64 bg-orange-500 text-2xl text-white hover:bg-orange-600"
                  >
                    <Link href="/auth/login?redirect=/client">Book Us Now</Link>
                  </Button>
                </div>

                <h2 className="m-3 text-center text-sm font-bold text-blue-800">
                  click the button to book for our services
                </h2>
              </div>

              <div className="space-y-8">
                <div>
                  <h2 className="mb-6 text-2xl font-bold text-blue-800">
                    Contact Information
                  </h2>
                  <p className="mb-8 text-gray-600">
                    We'd love to hear from you. Contact us using the form or the
                    information below and our team will get back to you as soon
                    as possible.
                  </p>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                        <Phone className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Phone</h3>
                        <p className="text-gray-600">+237-676-717-626</p>
                        <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                        <Mail className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">Email</h3>
                        <p className="text-gray-600">
                          info@diligentservers.com
                        </p>
                        <p className="text-gray-600">
                          We respond within 24 hours
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                        <MapPin className="h-6 w-6" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">
                          Office: Buea
                        </h3>
                        <p className="text-gray-600">Ndongo Carrefour</p>
                        <p className="text-gray-600">Molyko, Buea</p>
                      </div>

                      <div className="flex items-start">
                        <div className="mr-4 rounded-full bg-blue-100 p-3 text-blue-600">
                          <Clock className="h-6 w-6" />
                        </div>
                        <div>
                          <h3 className="font-medium text-gray-900">
                            Business Hours
                          </h3>
                          <p className="text-gray-600">
                            Monday-Friday: 9am-6pm
                          </p>
                          <p className="text-gray-600">
                            Saturday: 10am-2pm (by appointment)
                          </p>
                          <p className="text-gray-600">Sunday: Closed</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h2 className="mb-6 text-2xl font-bold text-blue-800">
                      Frequently Asked Questions
                    </h2>
                    <div className="space-y-6">
                      {faqs.map((faq, index) => (
                        <div key={index}>
                          <h3 className="mb-2 font-medium text-gray-900">
                            {faq.question}
                          </h3>
                          <p className="text-gray-600">{faq.answer}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-12 text-center">
              <h2 className="mb-4 text-3xl font-bold text-blue-800">
                Visit Our Office
              </h2>
              <p className="mx-auto max-w-3xl text-lg text-gray-600">
                We're conveniently located in the heart of the city. Feel free
                to visit us during business hours.
              </p>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

const faqs = [
  {
    question: "How far in advance should I book your services?",
    answer:
      "We recommend booking at least 4-6 weeks in advance for standard events, and 2-3 months for large-scale or complex events to ensure availability and proper planning.",
  },
  {
    question: "Do your hostesses speak multiple languages?",
    answer:
      "Yes, many of our hostesses are multilingual. We can provide staff fluent in various languages including English, Spanish, French, Mandarin, Arabic, and more upon request.",
  },
  {
    question: "What is your cancellation policy?",
    answer:
      "Our standard cancellation policy requires notice 14 days prior to the event for a full refund. Cancellations within 7-14 days receive a 50% refund, and less than 7 days may not be eligible for a refund. Custom terms may apply for larger events.",
  },
  {
    question: "Can your hostesses wear branded or custom uniforms?",
    answer:
      "We can accommodate branded attire or custom uniforms to match your event theme or corporate identity. This can be arranged with advance notice and may incur additional costs.",
  },
];
