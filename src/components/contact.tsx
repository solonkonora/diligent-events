import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Phone, Mail, MapPin, Clock } from "lucide-react"
import ContactButtons from "@/components/contact-buttons"

export default function ContactPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                {/* Hero Section */}
                <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 py-20 mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact Us</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Get in touch with our team to discuss your event needs and how we can help make your event exceptional.
                        </p>
                    </div>

                    <ContactButtons />
                </section>

                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                            <div className="bg-gray-50 p-8 rounded-lg shadow-md">
                                <h2 className="text-2xl font-bold text-blue-800 mb-6">Send Us a Message</h2>
                                <form className="space-y-6">
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        <div className="space-y-2">
                                            <label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                                First Name
                                            </label>
                                            <Input id="firstName" placeholder="Your first name" />
                                        </div>
                                        <div className="space-y-2">
                                            <label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                                Last Name
                                            </label>
                                            <Input id="lastName" placeholder="Your last name" />
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                                            Email Address
                                        </label>
                                        <Input id="email" type="email" placeholder="Your email address" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                            Phone Number
                                        </label>
                                        <Input id="phone" placeholder="Your phone number" />
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="eventType" className="text-sm font-medium text-gray-700">
                                            Event Type
                                        </label>
                                        <Select>
                                            <SelectTrigger id="eventType">
                                                <SelectValue placeholder="Select event type" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="corporate">Corporate Event</SelectItem>
                                                <SelectItem value="private">Private Function</SelectItem>
                                                <SelectItem value="diplomatic">Diplomatic Event</SelectItem>
                                                <SelectItem value="exhibition">Traditional Event</SelectItem>
                                                <SelectItem value="other">Other</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>

                                    <div className="space-y-2">
                                        <label htmlFor="message" className="text-sm font-medium text-gray-700">
                                            Message
                                        </label>
                                        <Textarea id="message" placeholder="Tell us about your event and requirements" rows={5} />
                                    </div>

                                    <Button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                                        Send Message
                                    </Button>
                                </form>
                            </div>

                            <div className="space-y-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-blue-800 mb-6">Contact Information</h2>
                                    <p className="text-gray-600 mb-8">
                                        We'd love to hear from you. Contact us using the form or the information below and our team will get
                                        back to you as soon as possible.
                                    </p>

                                    <div className="space-y-6">
                                        <div className="flex items-start">
                                            <div className="mr-4 bg-blue-100 p-3 rounded-full text-blue-600">
                                                <Phone className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">Phone</h3>
                                                <p className="text-gray-600">+237 652-161-749</p>
                                                <p className="text-gray-600">Mon-Fri, 9am-6pm</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="mr-4 bg-blue-100 p-3 rounded-full text-blue-600">
                                                <Mail className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">Email</h3>
                                                <p className="text-gray-600">info@diligentservers.com</p>
                                                <p className="text-gray-600">We respond within 24 hours</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start">
                                            <div className="mr-4 bg-blue-100 p-3 rounded-full text-blue-600">
                                                <MapPin className="h-6 w-6" />
                                            </div>
                                            <div>
                                                <h3 className="font-medium text-gray-900">Office: Buea</h3>
                                                <p className="text-gray-600">Ndongo Carrefour</p>
                                                <p className="text-gray-600">Molyko, Buea</p>
                                            </div>

                                            <div className="flex items-start">
                                                <div className="mr-4 bg-blue-100 p-3 rounded-full text-blue-600">
                                                    <Clock className="h-6 w-6" />
                                                </div>
                                                <div>
                                                    <h3 className="font-medium text-gray-900">Business Hours</h3>
                                                    <p className="text-gray-600">Monday-Friday: 9am-6pm</p>
                                                    <p className="text-gray-600">Saturday: 10am-2pm (by appointment)</p>
                                                    <p className="text-gray-600">Sunday: Closed</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div>
                                        <h2 className="text-2xl font-bold text-blue-800 mb-6">Frequently Asked Questions</h2>
                                        <div className="space-y-6">
                                            {faqs.map((faq, index) => (
                                                <div key={index}>
                                                    <h3 className="font-medium text-gray-900 mb-2">{faq.question}</h3>
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
                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-12">
                            <h2 className="text-3xl font-bold text-blue-800 mb-4">Visit Our Office</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                We're conveniently located in the heart of the city. Feel free to visit us during business hours.
                            </p>
                        </div>

                        <div className="rounded-lg overflow-hidden shadow-lg h-[400px] bg-gray-200 flex items-center justify-center">
                            {/* This would be replaced with an actual map component */}
                            <p className="text-gray-600">Interactive Map Would Be Displayed Here</p>
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
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
]