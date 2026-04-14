const express = require("express");
const cors = require("cors");
const nodemailer = require("nodemailer");

const app = express();
app.use(cors()); // Allow all origins for simplicity in development
app.use(express.json());

// Configuration for Nodemailer
const transporter = nodemailer.createTransport({
  host: "mail.sdahospital.com",
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "noreply@sdahospital.com",
    pass: "noreply25#",
  },
  tls: {
    rejectUnauthorized: false
  }
});

// Verify connection configuration
transporter.verify(function (error, success) {
  if (error) {
    console.log("Transporter Error:", error);
  } else {
    console.log("Server is ready to take our messages");
  }
});

// API Routes
const router = express.Router();

// 1. Send Booking Confirmation/Approval Email (To User)
router.post("/send-email", async (req, res) => {
  const data = req.body;
  console.log("Sending approval email to:", data.email);

  try {
    await transporter.sendMail({
      from: `"SDA Hospital" <noreply@sdahospital.com>`,
      to: data.email,
      subject: "Booking Approved - SDA Hospital",
      html: `
        <h2>Hello ${data.fullName}</h2>
        <p>Your booking has been <b>APPROVED</b>.</p>
        <p><b>Date:</b> ${data.date}</p>
        <p><b>Time:</b> ${data.time}</p>
        <p><b>Venue:</b> ${data.bookingFor}</p>
        <br/>
        <p>Regards,<br/>SDA Hospital Support Team</p>
      `,
    });
    console.log("Approval email sent successfully");
    res.json({ success: true, message: "Approval email sent" });
  } catch (err) {
    console.error("Approve Email Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 2. Send New Booking Notification (To HR)
router.post("/new-booking-email", async (req, res) => {
  const d = req.body;
  console.log("Sending new booking notification to HR");

  try {
    await transporter.sendMail({
      from: `"SDA Hospital Booking System" <noreply@sdahospital.com>`,
      to: ["hr@sdahospital.com", "hrofficesdamcbang@gmail.com"],
      subject: "New Booking Request Received",
      html: `
        <h2>New Booking Request Received</h2>
        <p>A new booking form has been submitted for review.</p>

        <h3>Requester Details:</h3>
        <p><b>Full Name:</b> ${d.fullName}</p>
        <p><b>ID No:</b> ${d.idNo}</p>
        <p><b>Email:</b> ${d.email}</p>

        <h3>Booking Details:</h3>
        <p><b>Reason:</b> ${d.reason}</p>
        <p><b>Venue:</b> ${d.bookingFor}</p>
        <p><b>Date:</b> ${d.date}</p>
        <p><b>Time:</b> ${d.time}</p>
        <p><b>Pax:</b> ${d.pax}</p>
        <p><b>Participants:</b> ${d.participants?.join(", ") || "-"}</p>
        <p><b>Equipment:</b> ${d.equipment}</p>
        <p><b>Food Service:</b> ${d.servingFood === "yes" ? "Yes" : "No"}</p>

        <h3>Additional Notes:</h3>
        <p><b>Description:</b> ${d.description}</p>
        <p><b>Housekeeping:</b> ${d.housekeeping || "-"}</p>

        <hr />
        <p><a href="http://localhost:5173/hr-dashboard" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Go to HR Dashboard</a></p>
      `,
    });
    console.log("New booking notification sent successfully");
    res.json({ success: true, message: "Notification email sent" });
  } catch (err) {
    console.error("New Booking Email Error:", err);
    res.status(500).json({ success: false, error: err.message });
  }
});

// 3. Contact Us Email
router.post("/contact-email", async (req, res) => {
  const { name, email, message } = req.body;
  console.log("Sending contact email from:", email);

  try {
    await transporter.sendMail({
      from: `"SDA Hospital Website" <noreply@sdahospital.com>`,
      to: "info@sdahospital.com",
      replyTo: email, 
      subject: "New Contact Us Message",
      html: `
        <h2>New Contact Message</h2>
        <p><b>Name:</b> ${name}</p>
        <p><b>Email:</b> ${email}</p>
        <p><b>Message:</b><br/>${message}</p>
        <hr />
        <p>Submitted via SDA Hospital Website</p>
      `,
    });
    res.json({ success: true });
  } catch (error) {
    console.error("Contact Email Error:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

app.use("/api", router);

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`SMTP Server running on port ${PORT}`);
});
