import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container px-4 py-20 md:py-32 mx-auto flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 space-y-6 z-10">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Professional Hostess & Protocol Services
              </h1>
              <p className="text-lg md:text-xl text-blue-100">
                Elevate your events with our professional hostesses and protocol officers. We ensure your guests receive
                the highest level of service and attention.
              </p>
              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="bg-orange-500 hover:bg-orange-600 text-white">
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
                src="/placeholder.svg?height=600&width=600"
                alt="Professional hostesses"
                width={600}
                height={600}
                className="rounded-lg shadow-xl"
                priority
              />
            </div>
          </div>
        </section>

      </main>
    </div>
  )
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

const testimonials = [
  {
    name: "Sarah Johnson",
    position: "Event Manager, Global Corp",
    quote:
      "The hostesses provided for our annual conference were exceptional. Their professionalism and attention to detail made our event run smoothly.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Michael Chen",
    position: "CEO, Tech Innovations",
    quote:
      "Working with this agency has been a game-changer for our corporate events. Their protocol officers understand exactly what our high-profile guests expect.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
  {
    name: "Emma Rodriguez",
    position: "Wedding Planner",
    quote:
      "I've been recommending their services to all my clients. The hostesses are not only professional but also add that special touch to make events memorable.",
    avatar: "/placeholder.svg?height=60&width=60",
  },
]

