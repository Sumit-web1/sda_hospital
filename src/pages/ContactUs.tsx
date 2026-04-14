import React, { useState } from "react";
import "./ContactUs.css";
import { Mail, Phone, MapPin, Send, Clock } from "lucide-react";
import { db, auth } from "../firebase/config";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const ContactUs: React.FC = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  if (loading) return;

  setError("");
  setSuccess("");

  if (!name.trim() || !email.trim() || !message.trim()) {
    setError("Please fill in all fields.");
    return;
  }

  setLoading(true);

  try {
    // Use PHP endpoint
    await fetch("/api/contact_email.php", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        message: message.trim(),
      }),
    });

    setSuccess("Your message has been sent successfully.");
    setName("");
    setEmail("");
    setMessage("");

  } catch (err) {
    console.error("Contact form error:", err);
    setError("Failed to send message. Please try again later.");
  }

  setLoading(false);
};


  return (
    <div className="contact-page">

      {/* HERO */}
      <section className="contact-hero">
        <div className="page-header-background"></div>

        <div className="contact-hero-content">
          <h1>Contact Us</h1>
          <p>SDAMC Hospital — Compassionate care you can trust.</p>
        </div>
      </section>

      {/* MAIN */}
      <section className="contact-container">

        {/* LEFT */}
        <div className="contact-info">
          <h2>SDAMC Hospital</h2>
          <p>
            SDA Medical Centre is a Seventh Day Adventist healthcare institution
            providing ethical, compassionate and high-quality medical services.
          </p>

          <div className="info-item">
            <MapPin size={20} />
            <span>
              8, Spencer Rd, Cleveland Town,<br />
              Frazer Town, Bengaluru, Karnataka – 560005
            </span>
          </div>

          <div className="info-item">
            <Phone size={20} />
            <span><strong>Emergency:</strong> +91 80-2536-0190</span>
          </div>

          <div className="info-item">
            <Mail size={20} />
            <span>info@sdahospital.com</span>
          </div>

          <div className="contact-hours">
            <h4><Clock size={18}/> Hospital Timings</h4>
            <p><strong>Emergency:</strong> 24/7</p>
            <p><strong>OPD:</strong> Mon – Sat, 8:00 AM – 8:00 PM</p>
            <p><strong>Sunday:</strong> 9:00 AM – 2:00 PM</p>
          </div>
        </div>

        {/* RIGHT FORM */}
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>Send us a Message</h3>

          {success && <div className="success-msg">{success}</div>}
          {error && <div className="error-msg">{error}</div>}

          <div className="form-group">
            <label>Name</label>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Your full name"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="your@email.com"
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Message</label>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={5}
              placeholder="Write your message..."
              disabled={loading}
            />
          </div>

          <button type="submit" disabled={loading}>
            <Send size={18} />
            {loading ? "Sending..." : "Send Message"}
          </button>
        </form>

      </section>
    </div>
  );
};

export default ContactUs;
