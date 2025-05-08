import Link from "next/link";
import { Phone, MessageCircle } from "lucide-react";

export default function ContactButtons() {
  return (
    <div className="fixed right-8 bottom-8 z-50 flex flex-col gap-4">
      <Link
        href="tel:+237-675-591-505"
        title="Call us now"
        className="flex items-center justify-center rounded-full bg-blue-700 p-3 text-white shadow-lg transition-transform hover:scale-110 hover:bg-blue-500"
        aria-label="Call us"
      >
        <Phone className="h-6 w-6" />
      </Link>

      <Link
        href="/auth/login?redirect=/booking"
        className="flex items-center justify-center rounded-full bg-green-500 p-3 text-white shadow-lg transition-transform hover:scale-110 hover:bg-green-600"
        aria-label="Book now"
      >
        <MessageCircle className="h-6 w-6" />
      </Link>
    </div>
  );
}
