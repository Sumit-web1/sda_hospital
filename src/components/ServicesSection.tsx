import React, { useEffect, useRef, useState } from "react";
import { Heart, Brain, Baby, Eye, Bone, Stethoscope, MapPin, Activity, Shield, ChevronDown, Clock, Monitor, Scissors, ToolCase, Thermometer, Airplay, Droplet, Repeat, HeartPlus } from "lucide-react";
import "./ServicesSection.css";

const ServicesSection = () => {
  const sectionRef = useRef(null);
  const cardsRef = useRef(null);
  const [visibleCount, setVisibleCount] = useState(6);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-in-view");
            if (cardsRef.current) {
              const cards = cardsRef.current.querySelectorAll(".service-card");
              cards.forEach((card, index) => {
                setTimeout(() => {
                  card.classList.add("animate-card");
                }, index * 100);
              });
            }
          }
        });
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // The full list of 17 services
  const allServices = [
    {
      icon: Heart,
      title: "Cardiology",
      description: "Comprehensive heart care with advanced cardiac procedures and treatments.",
      features: ["ECG & Echo", "Cardiac Surgery", "Heart Monitoring"],
    },
    {
      icon: Brain,
      title: "Neurology",
      description: "Expert neurological care for brain and nervous system disorders.",
      features: ["Brain Imaging", "Stroke Care", "Neurological Surgery"],
    },
    {
      icon: Baby,
      title: "Pediatrics",
      description: "Specialized healthcare for infants, children, and adolescents.",
      features: ["Child Wellness", "Vaccinations", "Growth Monitoring"],
    },
    {
      icon: Eye,
      title: "Ophthalmology",
      description: "Complete eye care services from routine exams to complex surgeries.",
      features: ["Eye Exams", "Cataract Surgery", "Retinal Care"],
    },
    {
      icon: Bone,
      title: "Orthopedics",
      description: "Treatment for bone, joint, and musculoskeletal conditions.",
      features: ["Joint Replacement", "Sports Medicine", "Fracture Care"],
    },
    {
      icon: Stethoscope,
      title: "General Medicine",
      description: "Primary healthcare services for overall health and wellness.",
      features: ["Health Checkups", "Chronic Care", "Preventive Medicine"],
    },
    {
      icon: Heart,
      title: 'Obstetrics & Gynaecology',
      description: 'Our flagship speciality, providing expert care to women for over 30 years.',
      features: ['Pregnancy Care', 'Gynecological Surgery', "Women's Health"],
    },
    {
      icon: Clock, // Reusing icon
      title: '24-Hour Laboratory',
      description: 'Medical testing and analysis performed on patient specimens to diagnose and monitor diseases.',
      features: ['Blood Tests', 'Urine Analysis', '24/7 Service'],
    },
    {
      icon: Monitor, // Reusing icon
      title: 'Radiology',
      description: 'Uses imaging techniques like X-rays, CT scans, and MRI to diagnose and treat diseases.',
      features: ['X-rays', 'CT Scans', 'MRI & Ultrasound'],
    },
    {
      icon: Scissors, // Reusing icon
      title: 'General & Laparoscopic Surgery',
      description: 'Committed to providing compassionate and quality care for patients needing surgical intervention.',
      features: ['Minimally Invasive Surgery', 'Emergency Surgery', 'Post-op Care'],
    },
    {
      icon: ToolCase, // Reusing icon
      title: 'Gastroenterology',
      description: 'Specializes in diagnosis and treatment of problems relating to the esophagus, stomach and intestines.',
      features: ['Endoscopy', 'Digestive Disorders', 'Liver Care'],
    },
    {
      icon: Shield,
      title: 'Dermatology',
      description: 'Deals with the diagnosis and treatment of skin, hair, and nail disorders.',
      features: ['Skin Treatment', 'Hair Care', 'Cosmetic Procedures'],
    },
    {
      icon: Thermometer, // Reusing icon
      title: 'Anaesthesiology',
      description: 'Involves the administration of anesthesia to patients undergoing surgical procedures.',
      features: ['Surgical Anesthesia', 'Pain Management', 'Critical Care'],
    },
    {
      icon: Airplay, // Reusing icon
      title: 'Pulmonology',
      description: 'Focuses on the diagnosis and treatment of lung and respiratory system diseases.',
      features: ['Lung Function Tests', 'Respiratory Care', 'Asthma Treatment'],
    },
    {
      icon: Droplet, // Reusing icon
      title: 'Nephrology',
      description: 'Focuses on the diagnosis, treatment, and management of diseases that affect the kidneys.',
      features: ['Kidney Care', 'Dialysis', 'Transplant Support'],
    },
    {
      icon: Repeat, // Reusing icon
      title: 'Lifestyle Medicine',
      description: 'Focuses on addressing underlying causes of chronic diseases through lifestyle interventions.',
      features: ['Nutrition Counseling', 'Physical Activity Plans', 'Stress Management'],
    },
    {
      icon: HeartPlus, // Reusing icon
      title: 'Physiotherapy',
      description: 'Helps patients recover from injuries, illnesses, and surgeries using various techniques.',
      features: ['Injury Recovery', 'Post-Surgery Rehab', 'Pain Management'],
    },
  ];

  const handleLoadMore = () => {
    setVisibleCount(allServices.length); // Show all services
  };

  return (
    <section id="services" className="services-section" ref={sectionRef}>
      <div className="services-container">
        <div className="services-header">
          <div className="services-badge">
            <span className="services-badge-text">Our Services</span>
          </div>
          <h2 className="services-title">
            Comprehensive{" "}
            <span className="services-title-highlight">healthcare</span>{" "}
            services with state-of-the-art technology
          </h2>
          <p className="services-description">
            We provide a full range of medical services with compassionate care,
            ensuring the best possible outcomes for our patients through expert
            treatment and advanced medical technology.
          </p>
        </div>

        <div className="services-grid" ref={cardsRef}>
          {allServices.slice(0, visibleCount).map((service, index) => {
            const IconComponent = service.icon;
            return (
              <div key={index} className="service-card">
                <div className="service-icon">
                  <IconComponent size={32} />
                </div>
                <h3 className="service-title">{service.title}</h3>
                <p className="service-description">{service.description}</p>
                <ul className="service-features">
                  {service.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="service-feature">
                      <div className="service-feature-dot"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
                <div className="service-learn-more">
                  <a href="/services" className="service-learn-btn">
                    Learn More
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* View More Button */}
        {visibleCount < allServices.length && (
          <div className="services-view-more-container">
            <button onClick={handleLoadMore} className="services-view-more-btn">
              <ChevronDown size={20} />
              <span>View More Services</span>
            </button>
          </div>
        )}

        {/* CTA Section */}
        <section className="services-cta">
          <div className="services-cta-container">
            <h2 className="services-cta-title">Need Immediate Medical Attention?</h2>
            <p className="services-cta-description">
              Our emergency department is open 24/7 with expert medical
              staff ready to help.
            </p>
            <div className="services-cta-buttons">
              <a href="tel:+9108025360190" className="services-cta-emergency">
                <Activity size={20} />
                Emergency: +91 080 2536 0190
              </a>
              <a href="https://maps.app.goo.gl/MAearEM5MN3xryRr5" className="services-cta-inquiry">
                <MapPin size={20} />
                Find Location
              </a>
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default ServicesSection;