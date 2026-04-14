import React, { useEffect, useRef } from 'react';
import { Calendar, ArrowRight, Star, Award, Clock, MapPin, Phone } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { getDoctorImage } from '../utils/doctorImageMapping';
import './DoctorPage.css';

gsap.registerPlugin(ScrollTrigger);

const DoctorPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  // Doctors organized by departments
  const doctorsByDepartment = {
    'Administration': [
      {
        id: 1,
        name: 'Dr. Rajkumar Chavakula',
        specialty: 'Medical Director',
        experience: '20+ Years',
        rating: 4.9,
        reviews: 450,
        image: getDoctorImage('Dr. Rajkumar Chavakula'),
        education: 'MD, Medical Administration',
        location: 'Administration Department',
        phone: '+91 9901103439',
        email: 'rajkumar.chavakula@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Telugu'],
        specializations: ['Medical Administration', 'Healthcare Management', 'Clinical Operations'],
        about: 'As a Medical Director at Seventh Day Adventist Medical Centre hospital I am responsible for overseeing the medical and clinical operations of the hospital.'
      },
      {
        id: 2,
        name: 'Mr. Saji Varghese',
        specialty: 'Administrator',
        experience: '18+ Years',
        rating: 4.7,
        reviews: 320,
        image: getDoctorImage('Mr. Saji Varghese'),
        education: 'MBA Healthcare Management',
        location: 'Administration Department',
        phone: '+91 9901103439',
        email: 'saji.varghese@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Healthcare Administration', 'Operations Management', 'Resource Coordination'],
        about: 'I am responsible for overseeing and coordinating the day-to-day operations of a business or organization and ensuring the efficient use of resources to meet the company\'s objectives.'
      },
    ],
    'Internal Medicine': [
      {
        id: 10,
        name: 'Dr. N S Prakash',
        specialty: 'General Medicine',
        experience: '16+ Years',
        rating: 4.7,
        reviews: 290,
        image: getDoctorImage('Dr. N S Prakash'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'ns.prakash@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Internal Medicine', 'Diabetes Care', 'Hypertension Management'],
        about: 'As a General Medicine doctor, we are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
      },
      {
        id: 12,
        name: 'Dr. Zain Hussain',
        specialty: 'General Medicine',
        experience: '12+ Years',
        rating: 4.6,
        reviews: 250,
        image: getDoctorImage('Dr. Zain Hussain'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'zain.hussain@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Urdu'],
        specializations: ['Internal Medicine', 'Emergency Medicine', 'Critical Care'],
        about: 'As a General Medicine doctor, you are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
      },
      {
        id: 45,
        name: 'Dr. Bharath',
        specialty: 'General Medicine',
        experience: '10+ Years',
        rating: 4.7,
        reviews: 220,
        image: getDoctorImage('Dr. Bharath'),
        education: 'MD General Medicine',
        location: 'General Medicine Department',
        phone: '+91 9901103439',
        email: 'bharath@sdamc.com',
        availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: [
          'Internal Medicine',
          'Diabetes Management',
          'Hypertension Care',
          'Infectious Diseases'
        ],
        about: 'Dr. Bharath is a dedicated General Medicine specialist providing comprehensive medical care with a focus on chronic disease management and preventive healthcare.'
      },
    ],
    'Cardiology': [
      {
        id: 13,
        name: 'Dr. P. G. Ashok Kumar',
        specialty: 'Cardiologist',
        experience: '18+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Dr. P. G. Ashok Kumar'),
        education: 'MD, DM Cardiology',
        location: 'Cardiology Department',
        phone: '+91 9901103439',
        email: 'ashok.kumar@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Heart Disease', 'Cardiac Catheterization', 'Preventive Cardiology'],
        about: 'As a cardiac doctor, also known as a cardiologist, my primary area of expertise is the diagnosis and treatment of heart conditions and diseases.'
      },
      {
  id: 67,
  name: 'Dr. Basavaraj Utagi',
  specialty: 'Consultant Cardiologist',
  experience: '12+ Years',
  rating: 4.7,
  reviews: 240,
  image: getDoctorImage('Dr. Basavaraj Utagi'),
  education: 'MBBS, MD, DM Cardiology',
  location: 'Cardiology Department',
  phone: '+91 9901103439',
  email: 'basavaraj.utagi@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Kannada'],
  specializations: [
    'Coronary Artery Disease',
    'Angioplasty',
    'Heart Failure',
    'Hypertension',
    'Cardiac Imaging'
  ],
  about:
    'Dr. Basavaraj Utagi is an experienced cardiologist specializing in advanced heart care with a focus on accurate diagnosis and effective treatment.'
}
    ],
    'Obstetrics & Gynaecology': [
      {
        id: 6,
        name: 'Dr. Femi Francis',
        specialty: 'Obstetrician & Gynaecologist',
        experience: '14+ Years',
        rating: 4.7,
        reviews: 320,
        image: getDoctorImage('Dr. Femi Francis'),
        education: 'MD OBG',
        location: 'Obstetrics & Gynaecology Department',
        phone: '+91 9901103439',
        email: 'femi.francis@sdamc.com',
        availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Pregnancy Care', 'Gynecological Surgery', 'Women\'s Health'],
        about: 'An Obstetrician and Gynaecologist (OB/GYN) is a medical doctor who specializes in the care of women during pregnancy, childbirth, and the postpartum period, as well as the treatment of reproductive disorders and other gynecological issues.'
      },
      {
        id: 15,
        name: 'Dr. Aruna Prabhakar',
        specialty: 'Obstetrician & Gynaecologist',
        experience: '16+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Dr. Aruna Prabhakar'),
        education: 'MD OBG',
        location: 'Obstetrics & Gynaecology Department',
        phone: '+91 9901103439',
        email: 'aruna.prabhakar@sdamc.com',
        availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['High Risk Pregnancy', 'Infertility Treatment', 'Laparoscopic Surgery'],
        about: 'An Obstetrician and Gynaecologist (OB/GYN) is a medical doctor who specializes in the care of women during pregnancy, childbirth, and the postpartum period, as well as the treatment of reproductive disorders and other gynecological issues.'
      },
      {
        id: 17,
        name: 'Dr. Pearlin Raj',
        specialty: 'Obstetrician & Gynaecologist',
        experience: '13+ Years',
        rating: 4.8,
        reviews: 340,
        image: getDoctorImage('Dr. Pearlin Raj'),
        education: 'MD OBG',
        location: 'Obstetrics & Gynaecology Department',
        phone: '+91 9901103439',
        email: 'pearlin.raj@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Maternal Care', 'Gynecological Surgery', 'Family Planning'],
        about: 'An Obstetrician and Gynaecologist (OB/GYN) is a medical doctor who specializes in the care of women during pregnancy, childbirth, and the postpartum period, as well as the treatment of reproductive disorders and other gynecological issues.'
      },
      {
        id: 40,
        name: 'Dr. Pearlin Raj Chavakula',
        specialty: 'Obstetrics & Gynaecology',
        experience: '29 Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Dr. Pearlin Raj Chavakula'),
        education: 'MBBS, DIPGO, DGO',
        location: 'Obstetrics & Gynaecology Department',
        phone: '+91 0000000000',
        email: 'pearlin.raj@sdamc.com',
        availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Telugu'],
        specializations: [
          'Infertility Diagnosis',
          'Ovulation Stimulation',
          'Hysteroscopy and Laparoscopy',
          'Gynaecological Surgeries',
          'Obstetric Emergencies',
          'Critical Care'
        ],
        about: 'Experience God’s hand in touching lives and bringing smiles to mothers.'
      }

    ],
    'Pediatrics': [
      {
        id: 18,
        name: 'Dr. Mahendra Mehta',
        specialty: 'Paediatrician',
        experience: '28 Years',
        rating: 4.9,
        reviews: 450,
        image: getDoctorImage('Dr. Mahendra Mehta'),
        education: 'MBBS, DCH, MBA, PGPN, IPN',
        location: 'Pediatrics Department',
        phone: '+91 9901103439',
        email: 'mahendra.mehta@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi'],
        specializations: ['Pediatric Care'],
        about: 'Works by this slogan "Compassionate Care for Growing Minds".'
      },
      {
        id: 43,
        name: 'Dr. Edwin Raj Talari',
        specialty: 'HOD Neonatology',
        experience: '10 Years',
        rating: 4.8,
        reviews: 300,
        image: getDoctorImage('Dr. Edwin Raj Talari'),
        education: 'MBBS, DCH, Fellowship in Neonatology',
        location: 'Neonatology Department',
        phone: '+91 9901103439',
        email: 'edwin.talari@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Telugu'],
        specializations: [
          'High Risk Neonatal Emergencies',
          'Pediatric Emergency Care',
          'Advanced Pediatric Ventilation',
          'Post-Operative Cardiac Care'
        ],
        about: 'To provide comprehensive, compassionate, effective care grounded in up-to-date scientific evidence and sound clinical judgment.'
      },
      {
        id: 19,
        name: 'Dr. Sayeed Ahmed',
        specialty: 'Pediatrician',
        experience: '16+ Years',
        rating: 4.8,
        reviews: 370,
        image: getDoctorImage('Dr. Sayeed Ahmed'),
        education: 'MD Pediatrics',
        location: 'Pediatrics Department',
        phone: '+91 9901103439',
        email: 'sayeed.ahmed@sdamc.com',
        availability: 'Tue - Sat, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Urdu'],
        specializations: ['Childhood Illnesses', 'Developmental Issues', 'Immunizations'],
        about: 'We have expertise in diagnosing and treating a wide range of childhood illnesses and developmental issues.'
      },
      {
        id: 20,
        name: 'Dr. Farhan Moosa',
        specialty: 'Pediatrician',
        experience: '10+ Years',
        rating: 4.6,
        reviews: 240,
        image: getDoctorImage('Dr. Farhan Moosa'),
        education: 'MD Pediatrics',
        location: 'Pediatrics Department',
        phone: '+91 9901103439',
        email: 'farhan.moosa@sdamc.com',
        availability: 'Mon - Fri, 10:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Urdu'],
        specializations: ['Pediatric Care', 'Child Health', 'Growth Monitoring'],
        about: 'A pediatrician specializing in comprehensive healthcare for children from birth through adolescence.'
      },
      {
        id: 21,
        name: 'Dr. Mohammad Isa Gauhar',
        specialty: 'Pediatrician',
        experience: '35 Years',
        rating: 4.9,
        reviews: 500,
        image: getDoctorImage('Dr. Mohammad Isa Gauhar'),
        education: 'MBBS, MD (Pediatrics)',
        location: 'Pediatrics Department',
        phone: '+91 9901103439',
        email: 'mohammed.gauhar@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi'],
        specializations: ['Neonatology', 'Pediatrics', 'Child Care'],
        about: 'Treat other’s children considering as your own.'
      }
    ],
    'Pediatric Surgery': [
      {
        id: 7,
        name: 'Dr. Ashok Rijhwani',
        specialty: 'Paediatric Surgeon',
        experience: '20+ Years',
        rating: 4.8,
        reviews: 280,
        image: getDoctorImage('Dr. Ashok Rijhwani'),
        education: 'MS Pediatric Surgery',
        location: 'Paediatric Surgery Department',
        phone: '+91 9901103439',
        email: 'ashok.rijhwani@sdamc.com',
        availability: 'Tue - Sat, 8:00 AM - 4:00 PM',
        languages: ['English', 'Hindi', 'Gujarati'],
        specializations: ['Pediatric Surgery', 'Neonatal Surgery', 'Minimally Invasive Surgery'],
        about: 'A pediatric surgeon is a medical doctor who specializes in the surgical treatment of infants, children, and adolescents.'
      },
      {
        id: 22,
        name: 'Dr. Neehar Patil',
        specialty: 'Paediatric Surgeon',
        experience: '12+ Years',
        rating: 4.6,
        reviews: 260,
        image: getDoctorImage('Dr. Neehar Patil'),
        education: 'MS Pediatric Surgery',
        location: 'Paediatric Surgery Department',
        phone: '+91 9901103439',
        email: 'neehar.patil@sdamc.com',
        availability: 'Wed - Sun, 9:00 AM - 4:00 PM',
        languages: ['English', 'Hindi', 'Marathi'],
        specializations: ['Pediatric Surgery', 'Congenital Anomalies', 'Minimally Invasive Surgery'],
        about: 'A pediatric surgeon specializing in surgical treatment of infants, children, and adolescents.'
      }
    ],
    'General Surgery': [
      {
  id: 47,
  name: 'Dr. Fred Simon Oammen',
  specialty: 'Consultant General & Laparoscopic Surgeon',
  experience: '18+ Years',
  rating: 4.7,
  reviews: 310,
  image: getDoctorImage('Dr. Fred Simon Oommen'),
  education: 'MS (General Surgery), FMAS',
  location: 'General Surgery Department',
  phone: '+91 9901103439',
  email: 'fred.oommen@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Malayalam'],
  specializations: [
    'General Surgery',
    'Laparoscopic Surgery',
    'Hernia Repair',
    'Gall Bladder Surgery',
    'Appendectomy'
  ],
  about:
    'Dr. Fred Simon Oommen is an experienced General and Laparoscopic Surgeon known for delivering precise surgical care with a patient-first approach and modern minimally invasive techniques.'
},
      {
        id: 24,
        name: 'Dr. K.G. Mathew',
        specialty: 'Consultant General, Laparoscopic & Hernia Surgeon',
        experience: '40 Years',
        rating: 4.9,
        reviews: 520,
        image: getDoctorImage('Dr. K.G. Mathew'),
        education: 'MS (General Surgery), FRCS(I), FRCS(ED)',
        location: 'General Surgery Department',
        phone: '+91 9901103439',
        email: 'kg.mathew@sdamc.com',
        availability: 'Mon - Fri, 7:00 AM - 4:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: [
          'General Surgery',
          'Hernia Surgery',
          'Gall Bladder',
          'Appendix',
          'Thyroid',
          'Colon',
          'Piles'
        ],
        about: 'Promote for Laparoscopy Hernia Surgery. To have a dedicated Hernia Page / To establish Hernia Centre as a Centre of Excellence.'
      },
      {
        id: 25,
        name: 'Dr. Vijay Wadhwa',
        specialty: 'General & Laparoscopic Surgeon',
        experience: '22+ Years',
        rating: 4.8,
        reviews: 420,
        image: getDoctorImage('Dr. Vijay Wadhwa'),
        education: 'MS General Surgery',
        location: 'General Surgery Department',
        phone: '+91 9901103439',
        email: 'vijay.wadhwa@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Punjabi'],
        specializations: ['Laparoscopic Surgery', 'General Surgery', 'Minimally Invasive Procedures'],
        about: 'General laparoscopic surgery, also known as minimally invasive surgery or keyhole surgery, is a surgical technique that uses small incisions and specialized instruments to perform procedures within the abdominal or pelvic cavities.'
      },
      {
        id: 26,
        name: 'Dr. Akshath',
        specialty: 'General & Laparoscopic Surgeon',
        experience: '8+ Years',
        rating: 4.5,
        reviews: 180,
        image: getDoctorImage('Dr. Akshath'),
        education: 'MS General Surgery',
        location: 'General Surgery Department',
        phone: '+91 9901103439',
        email: 'akshath@sdamc.com',
        availability: 'Tue - Sat, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['General Surgery', 'Emergency Surgery', 'Trauma Surgery'],
        about: 'A general surgeon specializing in a wide range of surgical procedures and emergency interventions.'
      }
    ],
    'Orthopedics': [
      {
        id: 27,
        name: 'Dr. Pradeep Kumar',
        specialty: 'Orthopedic Surgeon',
        experience: '15+ Years',
        rating: 4.7,
        reviews: 340,
        image: getDoctorImage('Dr. Pradeep Kumar'),
        education: 'MS Orthopedics',
        location: 'Orthopedics Department',
        phone: '+91 9901103439',
        email: 'pradeep.kumar@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Joint Replacement', 'Trauma Surgery', 'Sports Medicine'],
        about: 'An orthopedic surgeon specializing in the diagnosis and treatment of musculoskeletal disorders.'
      },
      {
        id: 28,
        name: 'Dr. Vedaprakash',
        specialty: 'Orthopedic Surgeon',
        experience: '18+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Dr. Vedaprakash'),
        education: 'MS Orthopedics',
        location: 'Orthopedics Department',
        phone: '+91 9901103439',
        email: 'vedaprakash@sdamc.com',
        availability: 'Tue - Sat, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Spine Surgery', 'Joint Replacement', 'Arthroscopy'],
        about: 'An orthopedic surgeon with expertise in spine surgery and joint replacement procedures.'
      },
      {
  id: 48,
  name: 'Dr. Anil Kumar S V',
  specialty: 'Orthopedic Surgeon',
  experience: '15+ Years',
  rating: 4.7,
  reviews: 300,
  image: getDoctorImage('Dr. Anil Kumar S V'),
  education: 'MS Orthopedics',
  location: 'Orthopedics Department',
  phone: '+91 9901103439',
  email: 'anil.kumar@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Kannada'],
  specializations: [
    'Joint Replacement',
    'Trauma & Fracture Care',
    'Arthroscopy',
    'Sports Injury Treatment'
  ],
  about:
    'Dr. Anil Kumar S V is a skilled orthopedic surgeon with extensive experience in treating bone, joint, and sports-related injuries using both surgical and non-surgical approaches.'
},
    ],
    'Ophthalmology': [
      {
        id: 32,
        name: 'Dr. Alice Joseph',
        specialty: 'Ophthalmologist',
        experience: '13+ Years',
        rating: 4.7,
        reviews: 310,
        image: getDoctorImage('Dr. Alice Joseph'),
        education: 'MS Ophthalmology',
        location: 'Ophthalmology Department',
        phone: '+91 9901103439',
        email: 'alice.joseph@sdamc.com',
        availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Cataract Surgery', 'Retinal Disorders', 'Glaucoma Treatment'],
        about: 'An ophthalmologist specializing in comprehensive eye care and surgical procedures.'
      },
    ],
    'Anesthesiology': [
      {
        id: 34,
        name: 'Dr. Margaret Thomas',
        specialty: 'Anesthesiologist',
        experience: '15+ Years',
        rating: 4.7,
        reviews: 290,
        image: getDoctorImage('Dr. Margaret Thomas'),
        education: 'MD Anesthesiology',
        location: 'Anesthesiology Department',
        phone: '+91 9901103439',
        email: 'margaret.thomas@sdamc.com',
        availability: 'Mon - Fri, 7:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Cardiac Anesthesia', 'Pediatric Anesthesia', 'Critical Care'],
        about: 'An experienced anesthesiologist specializing in cardiac and pediatric anesthesia.'
      },
      {
        id: 43,
        name: 'Dr. Ashish Arnkond',
        specialty: 'Anesthesiologist / ICU Consultant',
        experience: '5 Years',
        rating: 4.7,
        reviews: 120,
        image: getDoctorImage('Dr. Ashish Arnkond'),
        education: 'MBBS, DA, NTICU (2 yrs)',
        location: 'Anesthesiology / ICU Department',
        phone: '+91 9901103439',
        email: 'ashish.arnkond@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi'],
        specializations: [
          'Regional Anesthesia',
          'Peripheral Nerve Blocks',
          'Pain Management'
        ],
        about: 'To keep all patients comfortable through surgeries and aim to keep them pain free.'
      },
      {
  id: 54,
  name: 'Dr. Akhila A V',
  specialty: 'Consultant Anesthesiologist',
  experience: '8+ Years',
  rating: 4.6,
  reviews: 190,
  image: getDoctorImage('Dr. Akhila A V'),
  education: 'MBBS, MD Anesthesiology',
  location: 'Anesthesiology Department',
  phone: '+91 9901103439',
  email: 'akhila.av@sdamc.com',
  availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
  languages: ['English', 'Hindi', 'Kannada'],
  specializations: [
    'General Anesthesia',
    'Regional Anesthesia',
    'Post Operative Pain Management',
    'Critical Care Support'
  ],
  about:
    'Dr. Akhila A V is a dedicated anesthesiologist focused on patient safety, comfort, and pain-free surgical care.'
},
{
  id: 56,
  name: 'Dr. M A S Faisal Khuraishi',
  specialty: 'Consultant Anesthesiologist',
  experience: '10+ Years',
  rating: 4.6,
  reviews: 210,
  image: getDoctorImage('Dr. M A S Faisal Khuraishi'),
  education: 'MBBS, MD Anesthesiology',
  location: 'Anesthesiology Department',
  phone: '+91 9901103439',
  email: 'faisal.khuraishi@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Urdu'],
  specializations: [
    'General Anesthesia',
    'ICU Care',
    'Pain Management',
    'Emergency Anesthesia'
  ],
  about:
    'Dr. Faisal Khuraishi specializes in providing safe and effective anesthesia for a wide range of surgical and critical care procedures.'
},
    ],
    'Pathology': [
      {
        id: 35,
        name: 'Dr. Ninan Thomas',
        specialty: 'Pathologist',
        experience: '20+ Years',
        rating: 4.8,
        reviews: 350,
        image: getDoctorImage('Dr. Ninan Thomas'),
        education: 'MD Pathology',
        location: 'Pathology Department',
        phone: '+91 9901103439',
        email: 'ninan.thomas@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Malayalam'],
        specializations: ['Clinical Pathology', 'Histopathology', 'Cytopathology'],
        about: 'A pathologist specializing in laboratory medicine and diagnostic pathology.'
      },
      {
  id: 53,
  name: 'Dr. Juliah Joseph',
  specialty: 'Pathologist',
  experience: '12+ Years',
  rating: 4.7,
  reviews: 260,
  image: getDoctorImage('Dr. Juliah Joseph'),
  education: 'MBBS, MD Pathology',
  location: 'Pathology Department',
  phone: '+91 9901103439',
  email: 'juliah.joseph@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Malayalam'],
  specializations: [
    'Clinical Pathology',
    'Histopathology',
    'Hematology',
    'Cytopathology',
    'Laboratory Diagnostics'
  ],
  about:
    'Dr. Juliah Joseph is an experienced pathologist specializing in accurate laboratory diagnostics and disease identification to support effective clinical decision-making.'
},
    ],
    'Microbiology': [
      {
        id: 36,
        name: 'Dr. Claudius Saldanha',
        specialty: 'Microbiologist',
        experience: '17+ Years',
        rating: 4.6,
        reviews: 280,
        image: getDoctorImage('Dr. Claudius Saldanha'),
        education: 'MD Microbiology',
        location: 'Microbiology Department',
        phone: '+91 9901103439',
        email: 'claudius.saldanha@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
        languages: ['English', 'Hindi', 'Konkani'],
        specializations: ['Clinical Microbiology', 'Infection Control', 'Laboratory Diagnostics'],
        about: 'A microbiologist specializing in infectious disease diagnosis and infection control.'
      },
      {
  id: 61,
  name: 'Dr. Saba Samreen',
  specialty: 'Microbiologist',
  experience: '8+ Years',
  rating: 4.6,
  reviews: 190,
  image: getDoctorImage('Dr. Saba Samreen'),
  education: 'MBBS, MD Microbiology',
  location: 'Microbiology Department',
  phone: '+91 9901103439',
  email: 'saba.samreen@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi', 'Urdu'],
  specializations: [
    'Clinical Microbiology',
    'Infection Control',
    'Antibiotic Stewardship',
    'Laboratory Diagnostics',
    'Hospital Infection Prevention'
  ],
  about:
    'Dr. Saba Samreen is a dedicated microbiologist specializing in infection diagnosis, prevention, and laboratory quality management.'
},
    ],
    'Nursing': [
      {
        id: 3,
        name: 'Mrs. T. Mary Grace',
        specialty: 'Nursing Superintendent',
        experience: '22+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Mrs. T. Mary Grace'),
        education: 'MSc Nursing',
        location: 'Nursing Department',
        phone: '+91 9901103439',
        email: 'mary.grace@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Nursing Administration', 'Patient Care Management', 'Staff Supervision'],
        about: 'A Nursing Superintendent, also known as a Director of Nursing, is a senior-level nursing professional who is responsible for the overall management and administration of the nursing department in a hospital'
      },
      {
        id: 37,
        name: 'Mrs. Susheela Grace ',
        specialty: 'Nursing Superintendent',
        experience: '22+ Years',
        rating: 4.8,
        reviews: 380,
        image: getDoctorImage('Mrs. Susheela Grace'),
        education: 'MSc Nursing',
        location: 'Nursing Department',
        phone: '+91 9901103439',
        email: 'mary.grace@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Nursing Administration', 'Patient Care Management', 'Staff Supervision'],
        about: 'A Nursing Superintendent, also known as a Director of Nursing, is a senior-level nursing professional who is responsible for the overall management and administration of the nursing department in a hospital'
      },
      {
        id: 38,
        name: 'Dr. Christine. R Deepika',
        specialty: 'Nursing Officer',
        experience: '8+ Years',
        rating: 4.4,
        reviews: 180,
        image: getDoctorImage('Dr. Christine. R Deepika'),
        education: 'BSc Nursing',
        location: 'Nursing Department',
        phone: '+91 9901103439',
        email: 'christine.deepika@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 8:00 PM',
        languages: ['English', 'Hindi', 'Tamil'],
        specializations: ['Patient Care', 'Medical Procedures', 'Health Education'],
        about: 'A dedicated nursing officer providing comprehensive patient care and support.'
      },
      {
        id: 39,
        name: 'Dr. Akhila',
        specialty: 'Nursing Officer',
        experience: '6+ Years',
        rating: 4.3,
        reviews: 150,
        image: getDoctorImage('Dr. Akhila'),
        education: 'BSc Nursing',
        location: 'Nursing Department',
        phone: '+91 9901103439',
        email: 'akhila@sdamc.com',
        availability: 'Mon - Fri, 8:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Patient Care', 'Wound Care', 'Medication Administration'],
        about: 'A nursing officer committed to providing quality patient care and medical support.'
      }
    ],
    'Support Services': [
      {
        id: 8,
        name: 'Mr. Daniel Evans',
        specialty: 'Pharmacy Manager',
        experience: '14+ Years',
        rating: 4.6,
        reviews: 280,
        image: getDoctorImage('Mr. Daniel Evans'),
        education: 'PharmD',
        location: 'Pharmacy Department',
        phone: '+91 9901103439',
        email: 'daniel.evans@sdamc.com',
        availability: 'Mon - Sat, 8:00 AM - 8:00 PM',
        languages: ['English', 'Hindi'],
        specializations: ['Clinical Pharmacy', 'Drug Information', 'Medication Management'],
        about: 'A pharmacy manager ensuring safe and effective medication management for all patients.'
      },
      {
        id: 9,
        name: 'Mr. Shantharaj S',
        specialty: 'Laboratory Manager',
        experience: '16+ Years',
        rating: 4.5,
        reviews: 240,
        image: getDoctorImage('Mr. Shantharaj S'),
        education: 'MSc Medical Laboratory Technology',
        location: 'Laboratory Department',
        phone: '+91 9901103439',
        email: 'shantharaj.s@sdamc.com',
        availability: 'Mon - Sat, 7:00 AM - 7:00 PM',
        languages: ['English', 'Hindi', 'Kannada'],
        specializations: ['Laboratory Management', 'Quality Control', 'Diagnostic Testing'],
        about: 'A laboratory manager overseeing all diagnostic testing and laboratory operations.'
      }
    ],
    'Dentistry': [
      {
        id: 42,
        name: 'Dr. Peter Rozario Dsouza',
        specialty: 'Dental Surgeon & Orthodontist',
        experience: '39 Years',
        rating: 4.9,
        reviews: 500,
        image: getDoctorImage('Dr. Peter Rozario Dsouza'),
        education: 'BDS, MDS',
        location: 'Dentistry Department',
        phone: '+91 9901103439',
        email: 'peter.dsouza@sdamc.com',
        availability: 'Mon - Sat, 9:00 AM - 6:00 PM',
        languages: ['English', 'Hindi', 'Konkani'],
        specializations: [
          'Orthodontics',
          'Correction of Irregular Teeth',
          'Facial Outlook Improvement',
          'Dental & Oral Treatments'
        ],
        about:
          'To treat oral sickness for those needy and suffering, and improve facial appearance for those who look forward to it.'
      },
      {
  id: 52,
  name: 'Dr. Jonathan Eric Rao',
  specialty: 'Dental Surgeon & Orthodontist',
  experience: '12+ Years',
  rating: 4.7,
  reviews: 280,
  image: getDoctorImage('Dr. Jonathan Eric Rao'),
  education: 'BDS, MDS (Orthodontics)',
  location: 'Dentistry Department',
  phone: '+91 9901103439',
  email: 'jonathan.rao@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 6:00 PM',
  languages: ['English', 'Hindi', 'Kannada'],
  specializations: [
    'Orthodontics',
    'Braces & Aligners',
    'Smile Correction',
    'Cosmetic Dentistry',
    'Dental & Oral Treatments'
  ],
  about:
    'Dr. Jonathan Eric Rao is a skilled dental surgeon and orthodontist specializing in smile correction, braces, and advanced dental care with a patient-focused approach.'
},
    ],
    'Neonatology': [
  {
    id: 46,
    name: 'Dr. Marie Shalini Chilco',
    specialty: 'Consultant Neonatologist',
    experience: '12+ Years',
    rating: 4.8,
    reviews: 260,
    image: getDoctorImage('Dr. Marie Shalini Chilco'),
    education: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
    location: 'Neonatology Department',
    phone: '+91 9901103439',
    email: 'marie.chilco@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi'],
    specializations: [
      'NICU Care',
      'Premature Baby Management',
      'Neonatal Ventilation',
      'High Risk Newborn Care'
    ],
    about:
      'Dr. Marie Shalini Chilco is a dedicated neonatologist specializing in the care of premature and critically ill newborns, ensuring the highest standards of neonatal intensive care.'
  },
  {
  id: 45,
  name: 'Dr. Silvia Princy',
  specialty: 'Consultant Neonatologist',
  experience: '10+ Years',
  rating: 4.7,
  reviews: 210,
  image: getDoctorImage('Dr. Silvia Princy'),
  education: 'MBBS, MD (Pediatrics), Fellowship in Neonatology',
  location: 'Neonatology Department',
  phone: '+91 9901103439',
  email: 'silvia.princy@sdamc.com',
  availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
  languages: ['English', 'Hindi'],
  specializations: [
    'NICU Care',
    'Neonatal Resuscitation',
    'Premature Infant Care',
    'Neonatal Nutrition'
  ],
  about:
    'Dr. Silvia Princy is a compassionate neonatologist focused on providing advanced and evidence-based care for newborns, especially premature and critically ill infants.'
}
],
'Radiology': [
  {
    id: 49,
    name: 'Dr. Claudius Saldanha',
    specialty: 'Consultant Radiologist',
    experience: '17+ Years',
    rating: 4.7,
    reviews: 280,
    image: getDoctorImage('Dr. Claudius Saldanha'),
    education: 'MBBS, MD Radiology',
    location: 'Radiology Department',
    phone: '+91 9901103439',
    email: 'claudius.saldanha@sdamc.com',
    availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Konkani'],
    specializations: [
      'X-Ray',
      'CT Scan',
      'MRI',
      'Ultrasound',
      'Diagnostic Imaging'
    ],
    about:
      'Dr. Claudius Saldanha is an experienced radiologist specializing in accurate and timely diagnostic imaging to support effective patient care.'
  },
  {
    id: 50,
    name: 'Dr. Shaik Zubin',
    specialty: 'Consultant Radiologist',
    experience: '10+ Years',
    rating: 4.6,
    reviews: 220,
    image: getDoctorImage('Dr. Shaik Zubin'),
    education: 'MBBS, MD Radiology',
    location: 'Radiology Department',
    phone: '+91 9901103439',
    email: 'shaik.zubin@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 6:00 PM',
    languages: ['English', 'Hindi', 'Urdu'],
    specializations: [
      'Ultrasound',
      'CT Scan',
      'MRI',
      'Doppler Studies',
      'Abdominal Imaging'
    ],
    about:
      'Dr. Shaik Zubin provides comprehensive radiology services with a focus on high-quality imaging and accurate reporting.'
  },
  {
    id: 51,
    name: 'Dr. Sirish Shivaramalah',
    specialty: 'Consultant Radiologist',
    experience: '12+ Years',
    rating: 4.7,
    reviews: 240,
    image: getDoctorImage('Dr. Sirish Shivaramalah'),
    education: 'MBBS, MD Radiology',
    location: 'Radiology Department',
    phone: '+91 9901103439',
    email: 'sirish.shivaramalah@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'MRI',
      'CT Scan',
      'Musculoskeletal Imaging',
      'Neuro Imaging',
      'Interventional Radiology'
    ],
    about:
      'Dr. Sirish Shivaramalah specializes in advanced imaging techniques to support accurate diagnosis and effective treatment planning.'
  }
],
'Pulmonology': [
  {
    id: 58,
    name: 'Dr. Abhishek Samdesi',
    specialty: 'Consultant Pulmonologist',
    experience: '10+ Years',
    rating: 4.7,
    reviews: 240,
    image: getDoctorImage('Dr. Abhishek Samdesi'),
    education: 'MBBS, MD (Pulmonary Medicine)',
    location: 'Pulmonology Department',
    phone: '+91 9901103439',
    email: 'abhishek.samdesi@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'Asthma & Allergy',
      'COPD Management',
      'Sleep Apnea',
      'Tuberculosis',
      'Pulmonary Function Testing',
      'Critical Care'
    ],
    about:
      'Dr. Abhishek Samdesi is an experienced pulmonologist dedicated to diagnosing and treating lung and respiratory disorders with a patient-focused and evidence-based approach.'
  }
],
'Urology': [
  {
    id: 59,
    name: 'Dr. Vinod Babu',
    specialty: 'Consultant Urologist',
    experience: '14+ Years',
    rating: 4.8,
    reviews: 260,
    image: getDoctorImage('Dr. Vinod Babu'),
    education: 'MBBS, MS, MCh (Urology)',
    location: 'Urology Department',
    phone: '+91 9901103439',
    email: 'vinod.babu@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'Kidney Stones',
      'Prostate Disorders',
      'Uro-Oncology',
      'Laparoscopic Urology',
      'Urinary Tract Infections',
      'Male Infertility'
    ],
    about:
      'Dr. Vinod Babu is a highly skilled urologist specializing in advanced diagnosis and treatment of urinary and male reproductive system disorders with a patient-centered approach.'
  }
],
'Nephrology': [
  {
    id: 60,
    name: 'Dr. Nishchay',
    specialty: 'Consultant Nephrologist',
    experience: '8+ Years',
    rating: 4.7,
    reviews: 210,
    image: getDoctorImage('Dr. Nishchay'),
    education: 'MBBS, MD (Nephrology)',
    location: 'Nephrology Department',
    phone: '+91 9901103439',
    email: 'nishchay@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'Kidney Disease Management',
      'Dialysis',
      'Hypertension',
      'Diabetic Nephropathy',
      'Kidney Failure Care',
      'Renal Transplant Follow-up'
    ],
    about:
      'Dr. Nishchay is a dedicated nephrologist specializing in the diagnosis and management of kidney-related diseases with a compassionate and evidence-based approach.'
  }
],
'Gastroenterology': [
  {
    id: 62,
    name: 'Dr. Nithin Kumar H H',
    specialty: 'Consultant Gastroenterologist',
    experience: '10+ Years',
    rating: 4.7,
    reviews: 230,
    image: getDoctorImage('Dr. Nithin Kumar H H'),
    education: 'MBBS, MD (Gastroenterology)',
    location: 'Gastroenterology Department',
    phone: '+91 9901103439',
    email: 'nithin.kumar@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'Liver Diseases',
      'Acid Reflux & Ulcers',
      'Endoscopy',
      'IBS & IBD',
      'Hepatitis',
      'Pancreatic Disorders'
    ],
    about:
      'Dr. Nithin Kumar H H is an experienced gastroenterologist providing comprehensive care for digestive system and liver disorders using modern diagnostic and treatment approaches.'
  }
],
'Psychiatry': [
  {
    id: 63,
    name: 'Dr. Salaja Patchineelam',
    specialty: 'Consultant Psychiatrist',
    experience: '10+ Years',
    rating: 4.7,
    reviews: 220,
    image: getDoctorImage('Dr. Salaja Patchineelam'),
    education: 'MBBS, MD (Psychiatry)',
    location: 'Psychiatry Department',
    phone: '+91 9901103439',
    email: 'salaja.patchineelam@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: [
      'Depression & Anxiety',
      'Stress Management',
      'Sleep Disorders',
      'Addiction Psychiatry',
      'Child & Adolescent Psychiatry',
      'Psychotherapy'
    ],
    about:
      'Dr. Salaja Patchineelam is a compassionate psychiatrist dedicated to improving mental health and emotional well-being through evidence-based treatment and counseling.'
  }
],
'Academic Training': [
  {
    id: 64,
    name: 'Dr. Fred Simon Oommen',
    specialty: 'Academic & Surgical Training Lead',
    experience: '18+ Years',
    rating: 4.8,
    reviews: 300,
    image: getDoctorImage('Dr. Fred Simon Oommen'),
    education: 'MS (General Surgery), FMAS',
    location: 'Academic Training Department',
    phone: '+91 9901103439',
    email: 'fred.oommen@sdamc.com',
    availability: 'Mon - Fri, 10:00 AM - 4:00 PM',
    languages: ['English', 'Hindi', 'Malayalam'],
    specializations: [
      'Surgical Education',
      'Laparoscopic Training',
      'Clinical Teaching',
      'Resident Mentorship',
      'Medical Skill Development'
    ],
    about:
      'Dr. Fred Simon Oommen leads the Academic Training department, focusing on developing the next generation of surgeons through structured clinical teaching and hands-on surgical training.'
  }
],
'Neurology': [
  {
    id: 65,
    name: 'Dr. Karthik Reddy',
    specialty: 'Consultant Neurologist',
    experience: '12+ Years',
    rating: 4.8,
    reviews: 260,
    image: getDoctorImage('Dr. Karthik Reddy'),
    education: 'MBBS, MD, DM Neurology',
    location: 'Neurology Department',
    phone: '+91 9901103439',
    email: 'karthik.reddy@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Telugu'],
    specializations: [
      'Stroke Management',
      'Epilepsy',
      'Headache Disorders',
      'Parkinson’s Disease',
      'Neuromuscular Disorders',
      'Neuro Critical Care'
    ],
    about:
      'Dr. Karthik Reddy is a skilled neurologist specializing in the diagnosis and treatment of complex brain and nervous system disorders.'
  },
  {
    id: 66,
    name: 'Dr. Raja',
    specialty: 'Consultant Neurologist',
    experience: '15+ Years',
    rating: 4.7,
    reviews: 280,
    image: getDoctorImage('Dr. Raja'),
    education: 'MBBS, MD, DM Neurology',
    location: 'Neurology Department',
    phone: '+91 9901103439',
    email: 'raja@sdamc.com',
    availability: 'Mon - Fri, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Tamil'],
    specializations: [
      'Neuroimaging',
      'Multiple Sclerosis',
      'Movement Disorders',
      'Memory Disorders',
      'Peripheral Neuropathy'
    ],
    about:
      'Dr. Raja is an experienced neurologist known for his patient-focused approach in treating neurological disorders and improving quality of life.'
  }
],
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(headerRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      gsap.fromTo(".doctor-card",
        { opacity: 0, y: 100, scale: 0.8 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: cardsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="doctor-page" ref={pageRef}>
      <Header />

      {/* Page Header */}
      <section className="page-header" ref={headerRef}>
        <div className="page-header-background">
          <div className="page-header-overlay"></div>
        </div>
        <div className="page-header-container">
          <div className="page-header-content">
            <h1 className="page-header-title">Our Doctors</h1>
            <div className="page-header-breadcrumb">
              <span className="breadcrumb-item">Home</span>
              <span className="breadcrumb-separator">&gt;</span>
              <span className="breadcrumb-item active">Doctors</span>
            </div>
          </div>
        </div>
      </section>

      {/* Doctors Section */}
      <section className="doctors-section">
        <div className="doctors-container">
          {/* Section Header */}
          <div className="doctors-header">
            <div className="doctors-badge">
              <span className="doctors-badge-text">Meet Our Team</span>
            </div>
            <h2 className="doctors-title">
              Expert Medical Professionals
            </h2>
            <p className="doctors-subtitle">
              Our team of highly qualified doctors and specialists are dedicated to providing
              exceptional healthcare with compassion and expertise.
            </p>
          </div>

          {/* Doctors by Department */}
          <div ref={cardsRef}>
            {Object.entries(doctorsByDepartment).map(([department, doctors]) => (
              <div key={department} className="department-section">
                <h3 className="department-title">{department}</h3>
                <div className="doctors-grid">
                  {doctors.map((doctor) => (
                    <div key={doctor.id} className="doctor-card">
                      <div className="doctor-card-inner">
                        {/* Front of card */}
                        <div className="doctor-card-front">
                          <div className="doctor-image-container">
                            <img src={doctor.image} alt={doctor.name} className="doctor-image" />
                            <div className="doctor-overlay">
                              <div className="doctor-rating">
                                <Star className="star-icon" />
                                <span>{doctor.rating}</span>
                              </div>
                            </div>
                          </div>
                          <div className="doctor-info">
                            <h3 className="doctor-name">{doctor.name}</h3>
                            <p className="doctor-specialty">{doctor.specialty}</p>
                            <div className="doctor-experience">
                              <Award className="experience-icon" />
                              <span>{doctor.experience} Experience</span>
                            </div>
                            <div className="doctor-reviews">
                              <span>{doctor.reviews} Reviews</span>
                            </div>
                          </div>
                        </div>

                        {/* Back of card */}
                        <div className="doctor-card-back">
                          <div className="doctor-details">
                            <h3 className="doctor-name">{doctor.name}</h3>
                            <p className="doctor-education">{doctor.education}</p>

                            <div className="doctor-contact">
                              <div className="contact-item">
                                <MapPin className="contact-icon" />
                                <span>{doctor.location}</span>
                              </div>
                              <div className="contact-item">
                                <Clock className="contact-icon" />
                                <span>{doctor.availability}</span>
                              </div>
                              <div className="contact-item">
                                <Phone className="contact-icon" />
                                <span>{doctor.phone}</span>
                              </div>
                            </div>

                            <div className="doctor-specializations">
                              <h4>Specializations:</h4>
                              <div className="specialization-tags">
                                {doctor.specializations.map((spec, index) => (
                                  <span key={index} className="specialization-tag">{spec}</span>
                                ))}
                              </div>
                            </div>

                            <button className="book-appointment-btn">
                              <Calendar className="btn-icon" />
                              Book Appointment
                              <ArrowRight className="btn-arrow" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                  +                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default DoctorPage;
