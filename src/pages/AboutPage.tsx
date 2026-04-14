import React, { useEffect, useRef } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { Heart, Users, Shield, Star, ArrowRight, Calendar } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import './AboutPage.css';

gsap.registerPlugin(ScrollTrigger);

const AboutPage: React.FC = () => {
  const timelineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Award-winning GSAP ScrollTrigger animations
    const ctx = gsap.context(() => {
      // Timeline header animation
      gsap.fromTo('.timeline-header h2',
        {
          opacity: 0,
          y: 100,
          scale: 0.8
        },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.5,
          ease: "power3.out",
          scrollTrigger: {
            trigger: '.timeline-header',
            start: 'top 90%',
            end: 'bottom 10%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Timeline line reveal
      gsap.fromTo('.timeline-line',
        { opacity: 0 },
        {
          opacity: 1,
          duration: 1,
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 85%',
            end: 'bottom 15%',
            toggleActions: 'play none none reverse'
          }
        }
      );

      // Timeline progress bar
      gsap.fromTo('.timeline-progress',
        { height: '0%' },
        {
          height: '100%',
          duration: 2,
          ease: "power2.out",
          scrollTrigger: {
            trigger: '.timeline-container',
            start: 'top 80%',
            end: 'bottom 10%',
            scrub: 1
          }
        }
      );

      // Individual timeline items animation (scroll-based)
      gsap.utils.toArray('.timeline-item').forEach((item: any) => {
        gsap.fromTo(item,
          {
            opacity: 0,
            y: 100,
            scale: 0.8,
            rotationY: 45
          },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            rotationY: 0,
            duration: 1.2,
            ease: "power3.out",
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'top 30%',
              toggleActions: 'play none none reverse'
            }
          }
        );

        // Individual year number animation
        const yearElement = item.querySelector('.timeline-year');
        if (yearElement) {
          gsap.fromTo(yearElement,
            {
              opacity: 0,
              scale: 0,
              rotation: -180
            },
            {
              opacity: 1,
              scale: 1,
              rotation: 0,
              duration: 1,
              ease: "back.out(1.7)",
              scrollTrigger: {
                trigger: item,
                start: 'top 85%',
                end: 'top 40%',
                toggleActions: 'play none none reverse'
              }
            }
          );
        }

        // Individual dot pulsing when in view
        const dotElement = item.querySelector('.timeline-dot');
        if (dotElement) {
          gsap.to(dotElement, {
            scale: 1.2,
            duration: 1.5,
            ease: "power2.inOut",
            repeat: -1,
            yoyo: true,
            scrollTrigger: {
              trigger: item,
              start: 'top 90%',
              end: 'bottom 10%',
              toggleActions: 'play none pause reverse'
            }
          });
        }
      });

      // Floating elements animation
      gsap.to('.timeline-floating-element', {
        y: -30,
        rotation: 360,
        duration: 8,
        ease: "power1.inOut",
        repeat: -1,
        yoyo: true,
        stagger: 1
      });

    }, timelineRef);

    return () => ctx.revert();
  }, []);

  const timeline = [
    {
      year: '1978',
      title: 'The Beginning',
      description: 'The journey began with the humble beginning of Bangalore Adventist Hospital.',
      icon: '🏥'
    },
    {
      year: '1981',
      title: 'First Medical Director',
      description: 'Dr. William Borge (FRCS) was assigned as the first Medical Director.',
      icon: '👨‍⚕️'
    },
    {
      year: '1993',
      title: 'Hospital Inauguration',
      description: 'The new hospital was inaugurated and renamed as Seventh-day Adventist Medical Centre.',
      icon: '🎉'
    },
    {
      year: 'Since 1993',
      title: 'Continuous Expansion',
      description: 'Many new departments were added and several expansions were made.',
      icon: '🏗️'
    },
    {
      year: '2019',
      title: 'ICU Opening',
      description: 'A new Intensive Care Unit (ICU) was opened.',
      icon: '🏥'
    },
    {
      year: '2020',
      title: 'Emergency Unit',
      description: 'A new emergency unit was opened to enhance critical care services.',
      icon: '🚨'
    },
    {
      year: '2021',
      title: 'Oxygen Generation Plant',
      description: 'An Oxygen Generation Plant was set up to ensure a self-sufficient oxygen supply.',
      icon: '💨'
    },
    {
      year: '2022',
      title: 'Dialysis Center',
      description: 'A 6-bedded Dialysis center was established.',
      icon: '🩺'
    },
    {
      year: '2023',
      title: 'Vibrant Life Relocation',
      description: 'The Vibrant Life (Lifestyle wing of SDA Medical Center) was relocated.',
      icon: '🌱'
    },
    {
      year: 'Current',
      title: '50-Bedded Multi-Speciality Hospital',
      description: 'The Seventh-Day Adventist Medical Centre is now a 50-bedded Multi-Speciality Hospital.',
      icon: '🏆'
    },
    {
      year: 'Future',
      title: 'Planned Expansion',
      description: 'There is a planned expansion to a 100-bedded Multi-Speciality Hospital.',
      icon: '🚀'
    }
  ];

  const values = [
    {
      icon: Heart,
      title: 'Compassionate Care',
      description: 'Begin your journey to better health with SDA Medical Centre. Book your appointment easily through our friendly reception team or convenient online system with flexible timing options.',
      sideText: 'SCHEDULE AN APPOINTMENT',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Shield,
      title: 'Consultation',
      description: 'Our experienced medical professionals provide comprehensive consultations to understand your health concerns and develop personalized treatment plans. We take time to listen to your needs and explain all available options clearly.',
      sideText: 'PERSONALIZED TREATMENT',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Users,
      title: 'Treatment',
      description: 'Receive world-class medical treatment using state-of-the-art equipment and proven methodologies. Our multidisciplinary team ensures you get the best possible care throughout your treatment journey.',
      sideText: 'ONGOING CARE',
      image: 'https://images.unsplash.com/photo-1551190822-a9333d879b1f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    },
    {
      icon: Star,
      title: 'Follow-up Care',
      description: 'Our commitment to your health extends beyond treatment. We provide comprehensive follow-up care to ensure your recovery is progressing well and address any concerns you may have.',
      sideText: 'COMPLETE RECOVERY',
      image: 'https://images.unsplash.com/photo-1582750433449-648ed127bb54?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80'
    }
  ];

  return (
    <div className="about-page">
      <Header />
      
      {/* Page Header */}
      <section className="page-header">
        <div
          className="page-header-background"
          // style={{ backgroundImage: `url(${pageHeaderBg})` }}
        >
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">About Us</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">About Us</span>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Care Section */}
      <section className="experience-care-section">
        <div className="experience-care-container">
          <div className="experience-care-content">
            <div className="experience-care-left">
              <div className="experience-care-image-wrapper">
                <div className="experience-care-dots"></div>
                <div className="experience-care-main-image">
                  <img src="https://sdamedicalcentreblr.com/wp-content/uploads/2023/02/Nurse.jpg" alt="Doctor with patient" />
                </div>
                <div className="experience-care-small-image">
                  <img src="https://sdamedicalcentreblr.com/wp-content/uploads/2023/01/Dr.Hanna_.jpg" alt="Patient care" />
                </div>
                <div className="experience-badge">
                  <div className="experience-badge-number">44+</div>
                  <div className="experience-badge-text">Years Of Service</div>
                </div>
              </div>
            </div>
            <div className="experience-care-right">
              <div className="experience-care-header">
                {/* <span className="experience-care-label">Medical</span> */}
                <span className="experience-care-about">About Us</span>
                {/* <div className="experience-care-arrow">&rarr;</div> */}
              </div>
              <h2 className="experience-care-title">
                We Treat,<br />
                God Heals!
              </h2>
              <p className="experience-care-description">
                Seventh-Day Adventist Medical Centre is a 100 bedded multi speciality hospital,<br />
                in the heart of Bengaluru, that symbolizes compassion and competence.
              </p>
              <div className="experience-care-stats">
                <div className="stat-item">
                  <div className="stat-label">Years of Service</div>
                  <div className="stat-bar">
                    <div className="stat-progress" style={{width: '100%'}}></div>
                  </div>
                  <div className="stat-percentage">44+</div>
                </div>
                <div className="stat-item">
                  <div className="stat-label">NABH Certified Excellence</div>
                  <div className="stat-bar">
                    <div className="stat-progress" style={{width: '100%'}}></div>
                  </div>
                  <div className="stat-percentage">100%</div>
                </div>
              </div>
              <button className="schedule-appointment-btn">
                <span>Book Appointment</span>
                <div className="btn-icon">📅</div>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <div className="mission-card">
              <div className="mission-icon">
                <Heart size={48} />
              </div>
              <h3>Our Mission</h3>
              <p>
                To continue the healing ministry of Jesus by caring for the body, mind and spirit 
                of everyone we encounter, providing compassionate healthcare with excellence.
              </p>
            </div>
            <div className="vision-card">
              <div className="vision-icon">
                <Star size={48} />
              </div>
              <h3>Our Vision</h3>
              <p>
                Deliver high quality compassionate healthcare of exceptional value to all, 
                including the poor and disadvantaged, through subsidized care and community outreach.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Hospital Details Section */}
      <section className="hospital-details-section">
        <div className="container">
          <div className="hospital-details-content">
            <div className="hospital-details-left">
              <div className="hospital-image">
                <img src="https://sdamedicalcentreblr.com/wp-content/uploads/2023/01/Dr.Hanna_.jpg" alt="SDA Medical Centre Doctor" />
              </div>
            </div>
            <div className="hospital-details-right">
              <div className="hospital-details-header">
                {/* <span className="hospital-details-label">Medical</span> */}
                <span className="hospital-details-about">About Us</span>
                {/* <div className="hospital-details-arrow">&rarr;</div> */}
              </div>
              <h2 className="hospital-details-title">
                Your health and<br />
                happiness are our<br />
                top priorities.
              </h2>
              <p className="hospital-details-description">
                At SDA Medical Centre, we go beyond just treating symptoms – we focus
                on addressing the underlying causes of illness and promoting
                holistic well-being. Whether you're seeking preventive care,
                managing a chronic condition, or in need of specialized
                treatment, you can trust that you're in good hands with our
                team.
              </p>
              <div className="hospital-stats-grid">
                <div className="stat-box">
                  <div className="stat-number">140+</div>
                  <div className="stat-label">Dedicated staff members</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">100%</div>
                  <div className="stat-label">NABH certified excellence</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">44+</div>
                  <div className="stat-label">Years serving community</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">24/7</div>
                  <div className="stat-label">Emergency care available</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      {/* Timeline Section */}
      <section className="timeline-section" ref={timelineRef}>
        <div className="timeline-floating-element"></div>
        <div className="timeline-floating-element"></div>
        <div className="timeline-floating-element"></div>

        <div className="container">
          <div className="timeline-header">
            <h2>History of Seventh-Day Adventist Medical Centre</h2>
            <p>Here is a timeline of the key milestones in the history of the hospital.</p>
          </div>

          <div className="timeline-container">
            <div className="timeline-line"></div>
            <div className="timeline-progress"></div>

            {timeline.map((item, index) => (
              <div key={index} className="timeline-item">
                <div className="timeline-card">
                  <div className="timeline-year">{item.year}</div>
                  <div className="timeline-content">
                    <h3>{item.title}</h3>
                    <p>{item.description}</p>
                  </div>
                </div>
                <div className="timeline-dot"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="values-section">
        <div className="container">
          <div className="values-header">
            <h2>Our Core Values</h2>
            <p>The principles that guide everything we do</p>
          </div>
          <div className="values-container">
            {values.map((value, index) => (
              <div key={index} className="value-card">
                <div className="value-number">{index + 1}</div>
                <div className="value-side-text">{value.sideText}</div>
                <div className="value-content">
                  <h3 className="value-title">{value.title}</h3>
                  <p className="value-description">{value.description}</p>
                  <img src={value.image} alt={value.title} className="value-image" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Section */}
      {/* <section className="leadership-section">
        <div className="container">
          <div className="leadership-header">
            <h2>Our Leadership</h2>
            <p>Guided by experienced professionals committed to excellence</p>
          </div>
          <div className="leadership-content">
            <div className="leadership-text">
              <h3>NABH Certified Excellence</h3>
              <p>
                Our hospital is <strong>NABH entry level certified</strong> and managed by the
                Medical Trust of Seventh day Adventists, governed by the Southern Asia Division
                of Seventh-Day Adventists, Hosur.
              </p>
              <div className="leadership-stats">
                <div className="leadership-stat">
                  <div className="stat-icon">👨‍⚕️</div>
                  <div>
                    <strong>32 Expert Doctors</strong>
                    <p>Specialized in various medical fields</p>
                  </div>
                </div>
                <div className="leadership-stat">
                  <div className="stat-icon">👥</div>
                  <div>
                    <strong>140 Dedicated Staff</strong>
                    <p>Committed to patient care 24/7</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="leadership-image">
              <div className="leadership-card">
                <div className="leadership-quote">
                  <blockquote>
                    "With a team of 32 doctors and dedicated workforce of 140 staff,
                    the Seventh-Day Adventist Medical Centre is committed to a 'patient first'
                    approach, as it strives to combine empathy with evidence based healthcare."
                  </blockquote>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="about-cta">
        <div className="container">
          <div className="about-cta-content">
            <h2>Experience Compassionate Healthcare</h2>
            <p>
              Join thousands of patients who have experienced our patient-centered approach
              to healthcare. Book your appointment today.
            </p>
            <button
              className="cta-button"
              onClick={() => window.location.href = '/'}
            >
              <Calendar size={20} />
              Book Appointment
              <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AboutPage;
