"use client";

import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { supabase } from "@/lib/supabaseClient";
import error from "next/error";

interface BookingFormProps {
  userId: string;
  onSuccess?: () => void;
}

type Services = {
  id: string;
  name: string;
};

export default function BookingForm({ userId, onSuccess }: BookingFormProps) {
  // form state with validation
  const [formData, setFormData] = useState({
    serviceType: "",
    eventType: "",
    date: "",
    guests: "",
    budget: "",
    details: "",
  });

  const [services, setServices] = useState<Services[]>([]);
  const [selectedServiceIds, setSelectedServiceIds] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // fetch available services
  useEffect(() => {
    supabase
      .from("services")
      .select("id, name")
      .then(({ data, error }) => {
        if (error) toast.error("Failed to load services");
        else setServices(data || []);
      });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is modified
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  // handle service selection
  const handleServiceChange = (serviceId: string, checked: boolean) => {
    setSelectedServiceIds((prev) =>
      checked ? [...prev, serviceId] : prev.filter((id) => id !== serviceId)
    );
    if (errors["services"]) setErrors((prev) => ({ ...prev, services: "" }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.eventType)
      newErrors.eventType = "Please select an event type";
    if (!formData.date) newErrors.date = "Please select a date";
    if (!formData.budget) newErrors.budget = "Please select a budget range";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // submit handler
  const createBooking = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fill in all required fields");
      return;
    }
    if (selectedServiceIds.length === 0) {
      setErrors((prev) => ({
        ...prev,
        services: "Please select at least one service",
      }));
      toast.error("Please select at least one service");
      return;
    }
    setIsSubmitting(true);

    try {
      // insert booking into Supabase
      const { data: bookingData, error: bookingError } = await supabase
        .from("bookings")
        .insert([
          {
            user_id: userId,
            service_type: formData.serviceType,
            event_type: formData.eventType,
            event_date: formData.date,
            guests: parseInt(formData.guests) || 0,
            budget_range: formData.budget,
            details: formData.details,
            status: "pending",
            created_at: new Date().toISOString(),
          },
        ])
        .select("id")
        .single();

      if (bookingError || !bookingData) {
        console.error("Booking error:", error);
        toast.error(
          "Failed to create booking: " + bookingError?.message ||
            "Unknown error"
        );
        return;
      }

      // insert data into bookings_services table
      const rows = selectedServiceIds.map((service_id) => ({
        booking_id: bookingData.id,
        service_id,
      }));
      const { error: bsError } = await supabase
        .from("bookings_services")
        .insert(rows);
      if (bsError) {
        toast.error("Failed to link services to booking");
        return;
      }

      toast.success("Booking request sent! We'll be in touch soon.");

      // Reset form
      setFormData({
        serviceType: "",
        eventType: "",
        date: "",
        guests: "",
        budget: "",
        details: "",
      });
      setSelectedServiceIds([]);
      // Call success callback if provided
      if (onSuccess) onSuccess();
    } catch (err) {
      console.error("Exception:", err);
      toast.error("Something went wrong. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-6 md:grid-cols-2"
      onSubmit={createBooking}
    >
      <div className="col-span-1 md:col-span-2">
        <label className="block text-sm font-medium text-gray-700">
          Select Services <span className="text-red-500">*</span>
        </label>
        <div className="mt-2 flex flex-wrap gap-4">
          {services.length === 0 && (
            <span className="text-gray-500">No services available.</span>
          )}
          {services.map((services) => (
            <label key={services.id} className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={selectedServiceIds.includes(services.id)}
                onChange={(e) =>
                  handleServiceChange(services.id, e.target.checked)
                }
                className="rounded border-gray-300"
              />
              {services.name}
            </label>
          ))}
        </div>
        {errors.services && (
          <p className="mt-1 text-sm text-red-500">{errors.services}</p>
        )}
      </div>

      <div className="col-span-1">
        <label
          htmlFor="eventType"
          className="block text-sm font-medium text-gray-700"
        >
          Event Type <span className="text-red-500">*</span>
        </label>
        <select
          id="eventType"
          name="eventType"
          value={formData.eventType}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.eventType ? "border-red-500" : "border-gray-300"} px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
        >
          <option value="">Select event type</option>
          <option value="corporate">Corporate Event</option>
          <option value="cultural">Cultural Event</option>
          <option value="wedding">Wedding</option>
          <option value="birthday">Birthday Party</option>
          <option value="conference">Conference</option>
          <option value="anniversary">Anniversary</option>
          <option value="graduation">Graduation Celebration</option>
          <option value="other">Other</option>
        </select>
        {errors.eventType && (
          <p className="mt-1 text-sm text-red-500">{errors.eventType}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="date"
          className="block text-sm font-medium text-gray-700"
        >
          Date <span className="text-red-500">*</span>
        </label>
        <input
          type="date"
          id="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.date ? "border-red-500" : "border-gray-300"} px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      <div>
        <label
          htmlFor="guests"
          className="block text-sm font-medium text-gray-700"
        >
          Approximate Number of Expected Guests
        </label>
        <input
          type="number"
          id="guests"
          name="guests"
          value={formData.guests}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder="0"
        />
      </div>

      <div>
        <label
          htmlFor="budget"
          className="block text-sm font-medium text-gray-700"
        >
          Budget Range <span className="text-red-500">*</span>
        </label>
        <select
          id="budget"
          name="budget"
          value={formData.budget}
          onChange={handleChange}
          className={`mt-1 block w-full rounded-md border ${errors.budget ? "border-red-500" : "border-gray-300"} px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none`}
        >
          <option value="">Select your amount range</option>
          <option value="under_100k">Under 100,000FCFA</option>
          <option value="100k_to_200k">100,000FCFA - 200,000FCFA</option>
          <option value="300k_to_500k">300,000FCFA - 500,000FCFA</option>
          <option value="over_800k">Over 800,000FCFA</option>
        </select>
        {errors.budget && (
          <p className="mt-1 text-sm text-red-500">{errors.budget}</p>
        )}
      </div>

      <div className="md:col-span-2">
        <label
          htmlFor="details"
          className="block text-sm font-medium text-gray-700"
        >
          Event Details
        </label>
        <textarea
          id="details"
          name="details"
          rows={4}
          value={formData.details}
          onChange={handleChange}
          className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 focus:outline-none"
          placeholder="Tell us about your event..."
        ></textarea>
      </div>

      <div className="flex justify-end md:col-span-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-md bg-blue-500 px-6 py-2 text-white hover:bg-blue-600 disabled:bg-blue-300"
        >
          {isSubmitting ? "Submitting..." : "Submit Request"}
        </button>
      </div>
    </form>
  );
}
