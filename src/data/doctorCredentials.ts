// Doctor credentials for authentication system
// All 37 doctors from SDA Medical Centre with their login credentials

export interface DoctorCredential {
  id: number;
  email: string;
  defaultPassword: string;
  name: string;
  specialty: string;
  department: string;
}

export const doctorCredentials: DoctorCredential[] = [
  { id: 1, email: 'rajkumar.chavakula@sdamc.com', defaultPassword: 'Rajkumar3439', name: 'Dr. Rajkumar Chavakula', specialty: 'Medical Director', department: 'Administration Department' },
  { id: 2, email: 'saji.varghese@sdamc.com', defaultPassword: 'Saji3439', name: 'Mr. Saji Varghese', specialty: 'Administrator', department: 'Administration Department' },
  { id: 3, email: 'mary.grace@sdamc.com', defaultPassword: 'Mary3439', name: 'Mrs. T. Mary Grace', specialty: 'Nursing Superintendent', department: 'Nursing Department' },
  { id: 4, email: 'sunil.ninan@sdamc.com', defaultPassword: 'Sunil3439', name: 'Dr. Sunil Abraham Ninan', specialty: 'Pediatrician', department: 'Pediatrics Department' },
  { id: 5, email: 'lavona.pilli@sdamc.com', defaultPassword: 'Lavona3439', name: 'Dr. Lavona Ruth Pilli', specialty: 'Obstetrician & Gynaecologist', department: 'Obstetrics & Gynaecology Department' },
  { id: 6, email: 'femi.francis@sdamc.com', defaultPassword: 'Femi3439', name: 'Dr. Femi Francis', specialty: 'Obstetrician & Gynaecologist', department: 'Obstetrics & Gynaecology Department' },
  { id: 7, email: 'ashok.rijhwani@sdamc.com', defaultPassword: 'Ashok3439', name: 'Dr. Ashok Rijhwani', specialty: 'Paediatric Surgeon', department: 'Paediatric Surgery Department' },
  { id: 8, email: 'daniel.evans@sdamc.com', defaultPassword: 'Daniel3439', name: 'Mr. Daniel Evans', specialty: 'Pharmacy Services', department: 'Pharmacy Department' },
  { id: 9, email: 'shantharaj.s@sdamc.com', defaultPassword: 'Shantharaj3439', name: 'Mr. Shantharaj S', specialty: 'Laboratory Services', department: 'Laboratory Department' },
  { id: 10, email: 'ns.prakash@sdamc.com', defaultPassword: 'Prakash3439', name: 'Dr. N S Prakash', specialty: 'General Medicine', department: 'General Medicine Department' },
  { id: 11, email: 'vandeman.wilson@sdamc.com', defaultPassword: 'Vandeman3439', name: 'Dr. Vandeman Wilson', specialty: 'General Medicine', department: 'General Medicine Department' },
  { id: 12, email: 'zain.hussain@sdamc.com', defaultPassword: 'Zain3439', name: 'Dr. Zain Hussain', specialty: 'General Medicine', department: 'General Medicine Department' },
  { id: 13, email: 'ashok.kumar@sdamc.com', defaultPassword: 'Ashok3439', name: 'Dr. P. G. Ashok Kumar', specialty: 'Cardiologist', department: 'Cardiology Department' },
  { id: 14, email: 'sivasankari.r@sdamc.com', defaultPassword: 'Sivasankari3439', name: 'Dr. Sivasankari R', specialty: 'Pulmonologist', department: 'Pulmonology Department' },
  { id: 15, email: 'aruna.prabhakar@sdamc.com', defaultPassword: 'Aruna3439', name: 'Dr. Aruna Prabhakar', specialty: 'Obstetrician & Gynaecologist', department: 'Obstetrics & Gynaecology Department' },
  { id: 16, email: 'kalai.hema@sdamc.com', defaultPassword: 'Kalai3439', name: 'Dr. Kalai Hema K M', specialty: 'Obstetrician & Gynaecologist', department: 'Obstetrics & Gynaecology Department' },
  { id: 17, email: 'pearlin.raj@sdamc.com', defaultPassword: 'Pearlin3439', name: 'Dr. Pearlin Raj', specialty: 'Obstetrician & Gynaecologist', department: 'Obstetrics & Gynaecology Department' },
  { id: 18, email: 'mahendra.mehta@sdamc.com', defaultPassword: 'Mahendra3439', name: 'Dr. Mahendra Mehta', specialty: 'Pediatrician', department: 'Pediatrics Department' },
  { id: 19, email: 'sayeed.ahmed@sdamc.com', defaultPassword: 'Sayeed3439', name: 'Dr. Sayeed Ahmed', specialty: 'Pediatrician', department: 'Pediatrics Department' },
  { id: 20, email: 'farhan.moosa@sdamc.com', defaultPassword: 'Farhan3439', name: 'Dr. Farhan Moosa', specialty: 'Pediatrician', department: 'Pediatrics Department' },
  { id: 21, email: 'mohammad.gauhar@sdamc.com', defaultPassword: 'Mohammad3439', name: 'Dr. Mohammad Gauhar', specialty: 'Pediatrician', department: 'Pediatrics Department' },
  { id: 22, email: 'neehar.patil@sdamc.com', defaultPassword: 'Neehar3439', name: 'Dr. Neehar Patil', specialty: 'Paediatric Surgeon', department: 'Paediatric Surgery Department' },
  { id: 23, email: 'jasavaroyan@sdamc.com', defaultPassword: 'Jasavaroyan3439', name: 'Dr. Jasavaroyan', specialty: 'Anaesthesiologist', department: 'Anaesthesia Department' },
  { id: 24, email: 'kg.mathew@sdamc.com', defaultPassword: 'Mathew3439', name: 'Dr. K.G. Mathew', specialty: 'General & Laparoscopic Surgeon', department: 'General Surgery Department' },
  { id: 25, email: 'vijay.wadhwa@sdamc.com', defaultPassword: 'Vijay3439', name: 'Dr. Vijay Wadhwa', specialty: 'General & Laparoscopic Surgeon', department: 'General Surgery Department' },
  { id: 26, email: 'akshath@sdamc.com', defaultPassword: 'Akshath3439', name: 'Dr. Akshath', specialty: 'General & Laparoscopic Surgeon', department: 'General Surgery Department' },
  { id: 27, email: 'pradeep.kumar@sdamc.com', defaultPassword: 'Pradeep3439', name: 'Dr. Pradeep Kumar', specialty: 'Orthopaedic Surgeon', department: 'Orthopaedics Department' },
  { id: 28, email: 'vedaprakash@sdamc.com', defaultPassword: 'Vedaprakash3439', name: 'Dr. Vedaprakash', specialty: 'Orthopaedic Surgeon', department: 'Orthopaedics Department' },
  { id: 29, email: 'ninan.thomas@sdamc.com', defaultPassword: 'Ninan3439', name: 'Dr. Ninan Thomas', specialty: 'Radiation Oncologist', department: 'Radiation Oncology Department' },
  { id: 30, email: 'claudius.saldanha@sdamc.com', defaultPassword: 'Claudius3439', name: 'Dr. Claudius Saldanha', specialty: 'Radiologist', department: 'Radiology Department' },
  { id: 31, email: 'david.rameswarapu@sdamc.com', defaultPassword: 'David3439', name: 'Dr. David Narayan Rameswarapu', specialty: 'Radiologist', department: 'Radiology Department' },
  { id: 32, email: 'alice.joseph@sdamc.com', defaultPassword: 'Alice3439', name: 'Dr. Alice Joseph', specialty: 'Ophthalmologist', department: 'Ophthalmology Department' },
  { id: 33, email: 'saba.samreen@sdamc.com', defaultPassword: 'Saba3439', name: 'Dr. Saba Samreen', specialty: 'Microbiologist', department: 'Microbiology Department' },
  { id: 34, email: 'julie.joseph@sdamc.com', defaultPassword: 'Julie3439', name: 'Dr. Julie Joseph', specialty: 'Pathologist', department: 'Pathology Department' },
  { id: 35, email: 'christine.deepika@sdamc.com', defaultPassword: 'Christine3439', name: 'Dr. Christine. R Deepika', specialty: 'Intensive Care Specialist', department: 'Intensive Care Department' },
  { id: 36, email: 'margaret.thomas@sdamc.com', defaultPassword: 'Margaret3439', name: 'Dr. Margaret Thomas', specialty: 'Anaesthesiologist', department: 'Anaesthesia Department' },
  { id: 37, email: 'akhila@sdamc.com', defaultPassword: 'Akhila3439', name: 'Dr. Akhila', specialty: 'Anaesthesiologist', department: 'Anaesthesia Department' }
];

// Helper function to find doctor by email
export const findDoctorByEmail = (email: string): DoctorCredential | undefined => {
  return doctorCredentials.find(doctor => doctor.email === email);
};

// Helper function to find doctor by ID
export const findDoctorById = (id: number): DoctorCredential | undefined => {
  return doctorCredentials.find(doctor => doctor.id === id);
};

// Helper function to get all departments
export const getAllDepartments = (): string[] => {
  const departments = doctorCredentials.map(doctor => doctor.department);
  return [...new Set(departments)].sort();
};

// Helper function to get doctors by department
export const getDoctorsByDepartment = (department: string): DoctorCredential[] => {
  return doctorCredentials.filter(doctor => doctor.department === department);
};
