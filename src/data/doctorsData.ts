// Doctor data extracted from DoctorPage.tsx for authentication system
import { getDoctorImage } from '../utils/doctorImageMapping';

export interface Doctor {
  id: number;
  name: string;
  specialty: string;
  experience: string;
  rating: number;
  reviews: number;
  image: string;
  education: string;
  location: string;
  phone: string;
  email: string;
  availability: string;
  languages: string[];
  specializations: string[];
  about: string;
}

export const doctorsData: Doctor[] = [
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
    id: 4,
    name: 'Dr. Sunil Abraham Ninan',
    specialty: 'Pediatrician',
    experience: '15+ Years',
    rating: 4.9,
    reviews: 420,
    image: getDoctorImage('Dr. Sunil Abraham Ninan'),
    education: 'MD Pediatrics',
    location: 'Pediatrics Department',
    phone: '+91 9901103439',
    email: 'sunil.ninan@sdamc.com',
    availability: 'Mon - Fri, 8:00 AM - 6:00 PM',
    languages: ['English', 'Hindi', 'Malayalam'],
    specializations: ['Child Development', 'Immunizations', 'Neonatal Care'],
    about: 'A pediatrician is a medical doctor who specializes in the care of infants, children, and adolescents.'
  },
  {
    id: 5,
    name: 'Dr. Lavona Ruth Pilli',
    specialty: 'Obstetrician & Gynaecologist',
    experience: '12+ Years',
    rating: 4.8,
    reviews: 340,
    image: getDoctorImage('Dr. Lavona Ruth Pilli'),
    education: 'MD OBG',
    location: 'Obstetrics & Gynaecology Department',
    phone: '+91 9901103439',
    email: 'lavona.pilli@sdamc.com',
    availability: 'Mon - Sat, 9:00 AM - 5:00 PM',
    languages: ['English', 'Hindi', 'Telugu'],
    specializations: ['Pregnancy Care', 'Gynecological Surgery', 'Women\'s Health'],
    about: 'An Obstetrician and Gynaecologist (OB/GYN) is a medical doctor who specializes in the care of women during pregnancy, childbirth, and the postpartum period, as well as the treatment of reproductive disorders and other gynecological issues.'
  },
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
    id: 8,
    name: 'Mr. Daniel Evans',
    specialty: 'Pharmacy Services',
    experience: '16+ Years',
    rating: 4.6,
    reviews: 250,
    image: getDoctorImage('Mr. Daniel Evans'),
    education: 'PharmD',
    location: 'Pharmacy Department',
    phone: '+91 9901103439',
    email: 'daniel.evans@sdamc.com',
    availability: 'Mon - Sat, 8:00 AM - 8:00 PM',
    languages: ['English', 'Hindi'],
    specializations: ['Clinical Pharmacy', 'Medication Therapy', 'Drug Information'],
    about: 'Pharmacy services in a hospital play a critical role in patient care by providing medication therapy and support to healthcare providers.'
  },
  {
    id: 9,
    name: 'Mr. Shantharaj S',
    specialty: 'Laboratory Services',
    experience: '18+ Years',
    rating: 4.7,
    reviews: 300,
    image: getDoctorImage('Mr. Shantharaj S'),
    education: 'MSc Medical Laboratory Technology',
    location: 'Laboratory Department',
    phone: '+91 9901103439',
    email: 'shantharaj.s@sdamc.com',
    availability: 'Mon - Sat, 7:00 AM - 7:00 PM',
    languages: ['English', 'Hindi', 'Kannada'],
    specializations: ['Clinical Laboratory', 'Diagnostic Testing', 'Quality Control'],
    about: 'Laboratory services in a hospital are a vital component of patient care, providing essential diagnostic information to healthcare providers to support accurate and effective treatment.'
  },
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
    id: 11,
    name: 'Dr. Vandeman Wilson',
    specialty: 'General Medicine',
    experience: '18+ Years',
    rating: 4.7,
    reviews: 310,
    image: getDoctorImage('Dr. Vandeman Wilson'),
    education: 'MD General Medicine',
    location: 'General Medicine Department',
    phone: '+91 9901103439',
    email: 'vandeman.wilson@sdamc.com',
    availability: 'Mon - Fri, 8:00 AM - 5:00 PM',
    languages: ['English', 'Hindi'],
    specializations: ['Internal Medicine', 'Diabetes Care', 'Preventive Medicine'],
    about: 'As a General Medicine doctor, you are trained in the prevention, diagnosis, and treatment of a wide range of illnesses and medical conditions.'
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
    id: 14,
    name: 'Dr. Sivasankari R',
    specialty: 'Pulmonologist',
    experience: '14+ Years',
    rating: 4.8,
    reviews: 310,
    image: getDoctorImage('Dr. Sivasankari R'),
    education: 'MD Pulmonology',
    location: 'Pulmonology Department',
    phone: '+91 9901103439',
    email: 'sivasankari.r@sdamc.com',
    availability: 'Tue - Sat, 9:00 AM - 4:00 PM',
    languages: ['English', 'Hindi', 'Tamil'],
    specializations: ['Respiratory Diseases', 'Asthma Care', 'Sleep Disorders'],
    about: 'A pulmonologist is a medical doctor who specializes in the diagnosis and treatment of diseases and conditions related to the lungs and respiratory system.'
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
  }
];

// Generate default passwords for doctors (in production, these should be securely generated and sent to doctors)
export const generateDoctorCredentials = () => {
  return doctorsData.map(doctor => ({
    id: doctor.id,
    email: doctor.email,
    // Default password format: FirstName + Last4DigitsOfPhone
    // In production, use secure random passwords
    defaultPassword: `${doctor.name.split(' ')[1] || doctor.name.split(' ')[0]}${doctor.phone.slice(-4)}`,
    name: doctor.name,
    specialty: doctor.specialty,
    department: doctor.location
  }));
};
