export const bookingConfirmationTemplate = (
  clientName: string,
  eventType: string,
  eventDate: string,
  services: string[],
  aiReply?: string
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6;">Booking Confirmation</h1>
      </div>
      <p>Dear ${clientName},</p>
      ${aiReply ? `<p>${aiReply}</p>` : `<p>Thank you for choosing Diligent Events for your upcoming event. We have received your booking request and are excited to be part of your special occasion.</p>`}
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #3b82f6; margin-top: 0;">Booking Details:</h3>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
        <p><strong>Services Requested:</strong> ${services.join(", ")}</p>
      </div>
      <p>Our team will review your request and get back to you within 24 hours to discuss the details further and confirm your booking.</p>
    </div>
  `;
};

export const adminNotificationTemplate = (
  clientName: string,
  eventType: string,
  eventDate: string,
  services: string[],
  phone: string,
  details: string = ""
) => {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e0e0e0; border-radius: 5px;">
      <div style="text-align: center; margin-bottom: 20px;">
        <h1 style="color: #3b82f6;">New Booking Request</h1>
      </div>
      <p>A new booking request has been submitted.</p>
      <div style="background-color: #f8fafc; padding: 15px; border-radius: 5px; margin: 20px 0;">
        <h3 style="color: #3b82f6; margin-top: 0;">Booking Details:</h3>
        <p><strong>Client Name:</strong> ${clientName}</p>
        <p><strong>Phone Number:</strong> ${phone}</p>
        <p><strong>Event Type:</strong> ${eventType}</p>
        <p><strong>Event Date:</strong> ${new Date(eventDate).toLocaleDateString()}</p>
        <p><strong>Services Requested:</strong> ${services.join(", ")}</p>
        ${details ? `<p><strong>Additional Details:</strong> ${details}</p>` : ""}
      </div>
    </div>
  `;
};
