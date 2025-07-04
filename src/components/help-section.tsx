"use client";

import { useState } from "react";
import toast from "react-hot-toast";

export default function HelpSupportSection() {
  const [messageForm, setMessageForm] = useState({
    subject: "",
    message: "",
  });
  const [isSending, setIsSending] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setMessageForm((prev) => ({ ...prev, [name]: value }));
  };

  const sendMessage = () => {
    // Validate inputs
    if (!messageForm.subject.trim() || !messageForm.message.trim()) {
      toast.error("Please fill in all fields");
      return;
    }

    setIsSending(true);

    // Simulate API call
    setTimeout(() => {
      toast.success("Message sent! We'll respond shortly.");
      setMessageForm({ subject: "", message: "" });
      setIsSending(false);
    }, 1000);

    // Real implementation would include an API call to your backend
    // await saveMessage(messageForm);
  };

  return (
    <section>
      <h2 className="mb-6 text-xl font-semibold text-gray-700">
        Help & Support
      </h2>
      <div className="rounded-lg bg-white p-6 shadow-md">
        <div className="mb-8">
          <h3 className="mb-4 text-lg font-medium text-gray-700">Contact Us</h3>
          <div className="mb-4 flex items-center gap-3">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
            <span>support@diligent-events.com</span>
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-blue-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              <span>+237-676 717 626</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="invisible h-6 w-6"></div>
              <span>+237-675 591 505</span>
            </div>
            <div className="flex items-center gap-3">
              <div className="invisible h-6 w-6"></div>
              <span>+237-676 326 908</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="mb-4 text-lg font-medium text-gray-700">
            Send a Message
          </h3>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              name="subject"
              value={messageForm.subject}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="How can we help?"
            />
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              name="message"
              value={messageForm.message}
              onChange={handleInputChange}
              className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
              placeholder="Type your message here..."
            ></textarea>
          </div>
          <button
            onClick={sendMessage}
            disabled={isSending}
            className="rounded-md bg-blue-500 px-4 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
          >
            {isSending ? "Sending..." : "Send Message"}
          </button>
        </div>
      </div>
    </section>
  );
}
