import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactButtons() {
  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col gap-4">
      <Link
        href="tel:+15551234567"
        className="bg-blue-700 hover:bg-blue-500 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </Link>

      <Link
        href="https://wa.me/15551234567"
        className="bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center transition-transform hover:scale-110"
        aria-label="Contact us on WhatsApp"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
