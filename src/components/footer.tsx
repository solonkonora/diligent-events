import Link from "next/link"
import { SiFacebook, SiInstagram, SiGitter, SiLinkedin, SiGmail, SiPhonepe } from "react-icons/si"

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container px-4 py-12 mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">
              Hostess<span className="text-orange-500">Agency</span>
            </h3>
            <p className="text-blue-200 mb-4">
              Elevating events with professional hostess and protocol services since 2010.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiGitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiGmail className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a href="#" className="text-blue-200 hover:text-orange-500 transition-colors">
                <SiPhonepe className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-blue-200 hover:text-orange-500 transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-bold mb-4">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Event Hostesses/Protocol
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  General Cleaning (Office, Houses, Cite etc)
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Rentals (Chairs, Tables etc)
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Event Planning
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Service Traiteur
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  General Logistics
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Decoration
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-blue-200 hover:text-orange-500 transition-colors">
                  Lots More...
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <SiPhonepe className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200">+237-652-123-567</span>
              </li>
              <li className="flex items-start">
                <SiGmail className="h-5 w-5 mr-2 text-orange-500 flex-shrink-0 mt-0.5" />
                <span className="text-blue-200">info@diligentservers.com</span>
              </li>
              <li className="text-blue-200">
                Ndongo Carrefour
                <br />
                Ndongo
                <br />
                Molyko, Buea
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-blue-800 mt-12 pt-8 text-center text-blue-300 text-sm">
          <p>&copy; {new Date().getFullYear()} EventsManaAgency. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="hover:text-orange-500 transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="hover:text-orange-500 transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}

