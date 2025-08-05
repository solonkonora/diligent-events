import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactButtons() {
  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-col gap-4">
      <Link
        href="tel:+237675591505"
        title="Call us now"
        className="flex items-center justify-center rounded-full bg-blue-700 p-3 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-500"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </Link>

      <Link
        href="https://wa.me/237675591505?text=Hello%2C%20I%20am%20contacting%20you%20from%20Diligent%20Services%20Website!"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center rounded-full bg-green-500 p-3 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
        aria-label="Chat on WhatsApp"
        title="Chat with us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
