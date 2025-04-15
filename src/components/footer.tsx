import Link from "next/link";
import {
  SiFacebook,
  SiInstagram,
  SiGitter,
  SiLinkedin,
  SiGmail,
  SiPhonepe,
} from "react-icons/si";

export default function Footer() {
  return (
    <footer className="bg-blue-900 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <h3 className="mb-4 text-xl font-bold">
              Hostess<span className="text-orange-500">Agency</span>
            </h3>
            <p className="mb-4 text-blue-200">
              Elevating events with professional hostess and protocol services
              since 2010.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiFacebook className="h-5 w-5" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiInstagram className="h-5 w-5" />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiGitter className="h-5 w-5" />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiLinkedin className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiGmail className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                href="#"
                className="text-blue-200 transition-colors hover:text-orange-500"
              >
                <SiPhonepe className="h-5 w-5" />
                <span className="sr-only">LinkedIn</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Our Services</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Event Hostesses/Protocol
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  General Cleaning (Office, Houses, Cite etc)
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Rentals (Chairs, Tables etc)
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Event Planning
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Service Traiteur
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  General Logistics
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Decoration
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-blue-200 transition-colors hover:text-orange-500"
                >
                  Lots More...
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-bold">Contact Us</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <SiPhonepe className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-orange-500" />
                <span className="text-blue-200">+237-652-123-567</span>
              </li>
              <li className="flex items-start">
                <SiGmail className="mt-0.5 mr-2 h-5 w-5 flex-shrink-0 text-orange-500" />
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

        <div className="mt-12 border-t border-blue-800 pt-8 text-center text-sm text-blue-300">
          <p>
            &copy; {new Date().getFullYear()} EventsManaAgency. All rights
            reserved.
          </p>
          <div className="mt-2 space-x-4">
            <Link href="#" className="transition-colors hover:text-orange-500">
              Privacy Policy
            </Link>
            <Link href="#" className="transition-colors hover:text-orange-500">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
