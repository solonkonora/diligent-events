import Image from "next/image"
import ContactButtons from "@/components/contact-buttons"

export default function AboutPage() {
    return (
        <div className="flex flex-col min-h-screen">
            <main className="flex-1">
                <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
                    <div className="container px-4 py-20 mx-auto text-center">
                        <h1 className="text-4xl md:text-5xl font-bold mb-6">About Us</h1>
                        <p className="text-xl text-blue-100 max-w-3xl mx-auto">
                            Learn about our journey, our mission, and the team behind our exceptional hostess and protocol services.
                        </p>
                    </div>

                    <ContactButtons />
                </section>

                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="flex flex-col md:flex-row items-center gap-12">
                            <div className="md:w-1/2">
                                <Image
                                    src="/placeholder.svg?height=600&width=600"
                                    alt="Our story"
                                    width={600}
                                    height={600}
                                    className="rounded-lg shadow-lg"
                                />
                            </div>
                            <div className="md:w-1/2 space-y-6">
                                <h2 className="text-3xl font-bold text-blue-800">Our Story</h2>
                                <p className="text-lg text-gray-600">
                                    Founded in 2010, our agency began with a simple mission: to provide exceptional hostess and protocol
                                    services that elevate events to new heights. What started as a small team of dedicated professionals
                                    has grown into a leading agency trusted by corporations, event planners, and individuals alike.
                                </p>
                                <p className="text-lg text-gray-600">
                                    Over the years, we've had the privilege of serving at prestigious events across the country, from
                                    high-profile corporate gatherings to exclusive private functions. Our commitment to excellence and
                                    attention to detail has earned us a reputation as the go-to agency for those who demand the very best.
                                </p>
                                <p className="text-lg text-gray-600">
                                    Today, we continue to uphold the values that have guided us from the beginning: professionalism,
                                    integrity, and a dedication to exceeding client expectations.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-gray-50">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Our Mission & Values</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">The principles that guide everything we do.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {values.map((value, index) => (
                                <div key={index} className="bg-white p-8 rounded-lg shadow-md hover:shadow-lg transition-shadow">
                                    <div className="w-16 h-16 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center mb-6">
                                        <Image src="/placeholder.svg?height=40&width=40" alt={value.title} width={40} height={40} />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-800 mb-3">{value.title}</h3>
                                    <p className="text-gray-600">{value.description}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <section className="py-20 bg-white">
                    <div className="container px-4 mx-auto">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl md:text-4xl font-bold text-blue-800 mb-4">Meet Our Team</h2>
                            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                                The dedicated professionals behind our exceptional service.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                            {team.map((member, index) => (
                                <div key={index} className="text-center">
                                    <div className="mb-4 relative mx-auto w-48 h-48 overflow-hidden rounded-full">
                                        <Image src={member.photo || "/placeholder.svg"} alt={member.name} fill className="object-cover" />
                                    </div>
                                    <h3 className="text-xl font-bold text-blue-800">{member.name}</h3>
                                    <p className="text-orange-500 mb-2">{member.position}</p>
                                    <p className="text-gray-600">{member.bio}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>
            </main>
        </div>
    )
}

const values = [
    {
        title: "Excellence",
        description:
            "We strive for excellence in every aspect of our service, from the selection and training of our staff to the execution of each event.",
    },
    {
        title: "Professionalism",
        description:
            "Our team maintains the highest standards of professionalism, ensuring that we represent our clients with dignity and grace.",
    },
    {
        title: "Attention to Detail",
        description:
            "We believe that the smallest details can make the biggest difference, which is why we pay meticulous attention to every aspect of our service.",
    },
    {
        title: "Client Satisfaction",
        description:
            "Our ultimate goal is to exceed our clients' expectations and ensure their complete satisfaction with our services.",
    },
    {
        title: "Adaptability",
        description:
            "We understand that each event is unique, which is why we tailor our services to meet the specific needs and requirements of each client.",
    },
    {
        title: "Integrity",
        description:
            "We conduct our business with honesty, transparency, and ethical practices, building trust with our clients and partners.",
    },
]

const team = [
    {
        name: "Alexandra Reynolds",
        position: "Founder & CEO",
        bio: "With over 15 years of experience in the events industry, Alexandra founded the agency with a vision to redefine hostess and protocol services.",
        photo: "/placeholder.svg?height=200&width=200",
    },
    {
        name: "David Chen",
        position: "Operations Director",
        bio: "David ensures that every event runs smoothly, overseeing logistics and coordinating our team of professionals.",
        photo: "/placeholder.svg?height=200&width=200",
    },
    {
        name: "Sophia Martinez",
        position: "Training Manager",
        bio: "Sophia is responsible for the rigorous training program that ensures all our hostesses and protocol officers meet our high standards.",
        photo: "/placeholder.svg?height=200&width=200",
    },
    {
        name: "James Wilson",
        position: "Client Relations",
        bio: "James works closely with our clients to understand their needs and ensure that our services exceed their expectations.",
        photo: "/placeholder.svg?height=200&width=200",
    },
]