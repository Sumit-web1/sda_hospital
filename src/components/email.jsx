import emailjs from '@emailjs/browser';

export const sendBookingEmail = async (data) => {
  const templateParams = {
    to_name: "Admin",
    from_name: data.fullName,
    from_email: data.email,
    idNo: data.idNo,
    reason: data.reason,
    bookingFor: data.bookingFor,
    date: data.date,
    time: data.time,
    pax: data.pax,

    participants: data.participants && data.participants.length > 0
      ? data.participants.join(', ')
      : 'N/A',

    equipment: data.equipment,
    servingFood: data.servingFood === "yes" ? "Yes" : "No",
    description: data.description || "-",
    housekeeping: data.housekeeping || "-"
  };

  try {
    await emailjs.send(
      "service_ka8cfrf",
      "template_tra85wo",
      templateParams,
      "_QcaxRZG8APrmuUiu"
    );

    await emailjs.send(
      "service_ka8cfrf",
      "template_az4pd86",
      templateParams,
      "_QcaxRZG8APrmuUiu"
    );

    return { success: true };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error };
  }
};
