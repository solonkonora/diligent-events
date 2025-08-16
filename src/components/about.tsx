import Image from "next/image";
import ContactButtons from "@/components/contact-buttons";
import Header from "./header";
import Footer from "./footer";

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">
        <section className="dark:bg-primary dark:text-primary-foreground relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 py-20 text-center">
            <h1 className="dark:text-primary-foreground mb-6 text-4xl font-bold md:text-5xl">
              About Us
            </h1>
            <p className="dark:text-foreground mx-auto max-w-3xl text-xl text-blue-100">
              Learn about our journey, our mission, and the team behind our
              exceptional hostess and protocol services.
            </p>
          </div>

          <ContactButtons />
        </section>

        <section className="dark:bg-background bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center gap-12 md:flex-row">
              <div className="md:w-1/2">
                <Image
                  src="../../../assets/images/WhatsApp Image 2025-05-01 at 08.35.39 (1).jpeg"
                  alt="Our story"
                  width={600}
                  height={600}
                  className="rounded-lg shadow-lg"
                />
              </div>
              <div className="space-y-6 md:w-1/2">
                <h2 className="dark:text-primary text-3xl font-bold text-blue-800">
                  Our Story
                </h2>
                <p className="dark:text-muted-foreground text-lg text-gray-600">
                  Founded in 2010, our agency began with a simple mission: to
                  provide exceptional hostess and protocol services that elevate
                  events to new heights. What started as a small team of
                  dedicated professionals has grown into a leading agency
                  trusted by corporations, event planners, and individuals
                </p>
                <p className="dark:text-muted-foreground text-lg text-gray-600">
                  Over the years, we've had the privilege of serving at
                  prestigious events across the country, from high-profile
                  corporate gatherings to exclusive private functions. Our
                  commitment to excellence and attention to detail has earned us
                  a reputation as the go-to agency for those who demand the very
                </p>
                <p className="dark:text-muted-foreground text-lg text-gray-600">
                  Today, we continue to uphold the values that have guided us
                  from the beginning: professionalism, integrity, and a
                  dedication to exceeding client expectations.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="dark:bg-card bg-gray-50 py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Our Mission & Values
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                The principles that guide everything we do.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="dark:bg-background dark:border-border rounded-lg bg-white p-8 shadow-md transition-shadow hover:shadow-lg dark:border"
                >
                  <h3 className="dark:text-primary mb-3 text-xl font-bold text-blue-800">
                    {value.title}
                  </h3>
                  <p className="dark:text-muted-foreground text-gray-600">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="dark:bg-background bg-white py-20">
          <div className="container mx-auto px-4">
            <div className="mb-16 text-center">
              <h2 className="dark:text-primary mb-4 text-3xl font-bold text-blue-800 md:text-4xl">
                Meet Our Team
              </h2>
              <p className="dark:text-muted-foreground mx-auto max-w-3xl text-lg text-gray-600">
                The dedicated professionals behind our exceptional service.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {team.map((member, index) => (
                <div key={index} className="text-center">
                  <div className="relative mx-auto mb-4 h-48 w-48 overflow-hidden rounded-full">
                    <Image
                      src={member.photo || "/placeholder.svg"}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="dark:text-primary text-xl font-bold text-blue-800">
                    {member.name}
                  </h3>
                  <p className="mb-2 text-orange-500">{member.position}</p>
                  <p className="dark:text-muted-foreground text-gray-600">
                    {member.bio}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
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
];

const team = [
  {
    name: "Rene Buinda",
    position: "Founder & CEO",
    bio: "With over 15 years of experience in the events industry, Alexandra founded the agency with a vision to redefine hostess and protocol services.",
    photo:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.39 (2).jpeg",
  },
  {
    name: "Ngemi Botam",
    position: "Operations Director",
    bio: "David ensures that every event runs smoothly, overseeing logistics and coordinating our team of professionals.",
    photo: "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.41.jpeg",
  },
  {
    name: "Makane Mary",
    position: "Training Manager",
    bio: "Mary is responsible for the rigorous training program that ensures all our hostesses and protocol officers meet our high standards.",
    photo:
      "../../../assets/images/WhatsApp Image 2025-05-01 at 08.43.41 (1).jpeg",
  },
  {
    name: "Nformi Gracious",
    position: "Client Relations",
    bio: "Gracious works closely with our clients to understand their needs and ensure that our services exceed their expectations.",
    photo: "../../../assets/images/gra.jpeg",
  },
];
