// firebase/config.ts

import { initializeApp } from 'firebase/app';
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, query, where, onSnapshot, orderBy, Timestamp, updateDoc, doc, deleteDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { doctorCredentials } from '../data/doctorCredentials';

const firebaseConfig = {
  apiKey: "AIzaSyBQsl0LdMX_47xKnVF9FnVBhQDwM8R_mLQ",
  authDomain: "sda-hospital-c8d48.firebaseapp.com",
  projectId: "sda-hospital-c8d48",
  storageBucket: "sda-hospital-c8d48.firebasestorage.app",
  messagingSenderId: "182362921005",
  appId: "1:182362921005:web:1b363c46cd8f00ee1d00a4",
  measurementId: "G-ERRWLZXLV3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Auth functions
export const setupRecaptcha = (containerId: string) => {
  return new RecaptchaVerifier(auth, containerId, {
    size: 'invisible',
    callback: () => {
      console.log('reCAPTCHA solved');
    }
  });
};

export const sendContactMessage = async (
  name: string,
  email: string,
  message: string
) => {
  try {
    await addDoc(collection(db, "contactMessages"), {
      name,
      email,
      message,
      createdAt: serverTimestamp(),
      userId: auth.currentUser ? auth.currentUser.uid : null,
      status: "new"
    });
    return true;
  } catch (error) {
    console.error("Error sending contact message:", error);
    throw error;
  }
};

export const getContactMessages = async () => {
  try {
    const q = query(
      collection(db, "contactMessages"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);

    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

  } catch (error) {
    console.error("Error fetching contact messages:", error);
    return [];
  }
};

export const sendOTP = async (phoneNumber: string, recaptchaVerifier: RecaptchaVerifier) => {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, recaptchaVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error sending OTP:', error);
    throw error;
  }
  
};

export const verifyOTP = async (confirmationResult: any, otp: string) => {
  try {
    const result = await confirmationResult.confirm(otp);
    return result.user;
  } catch (error) {
    console.error('Error verifying OTP:', error);
    throw error;
  }
};

export const signOutUser = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    console.error('Error signing out:', error);
    throw error;
  }
};

export const saveAppointment = async (appointmentData: any) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), {
      ...appointmentData,
      userId: auth.currentUser?.uid,
      userPhone: auth.currentUser?.phoneNumber,
      createdAt: Timestamp.now(),
      status: 'pending'
    });
    console.log('Appointment saved to Firebase:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving appointment to Firebase:', error);

    console.log('Saving appointment to localStorage fallback...');
    try {
      const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
      const newAppointment = {
        id: Date.now().toString(),
        ...appointmentData,
        status: 'pending',
        createdAt: new Date().toISOString()
      };
      appointments.push(newAppointment);
      localStorage.setItem('appointments', JSON.stringify(appointments));
      console.log('Appointment saved to localStorage:', newAppointment);

      return { success: true, id: newAppointment.id };
    } catch (localError) {
      console.error('Error saving to localStorage:', localError);
      return { success: false, error: 'Failed to save appointment' };
    }
  }
};

export const getAppointments = async () => {
  try {
    if (!auth.currentUser) return [];

    const q = query(
      collection(db, 'appointments'),
      where('userId', '==', auth.currentUser.uid)
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error('Error getting appointments:', error);
    return [];
  }
};

export interface BookingData {
  fullName: string;
  idNo: string;
  email: string;
  reason: string;
  bookingFor: string;
  date: string;
  time: string;    
  customStart?: string;   
  customEnd?: string;   
  pax: string;
  equipment: string;
  servingFood: string;
  description: string;
  housekeeping: string;
}


export const saveBooking = async (bookingData: BookingData) => {
  try {
    const docRef = await addDoc(collection(db, "bookings"), {
      ...bookingData,

      // System fields
      createdAt: Timestamp.now(),
      status: "pending", 
    });

    console.log("Booking saved successfully:", docRef.id);

    return {
      success: true,
      id: docRef.id,
    };

  } catch (error) {
    console.error("Error saving booking:", error);

    return {
      success: false,
      error,
    };
  }
};


export const subscribeToAllAppointments = (callback: (appointments: any[]) => void) => {
  try {
    const q = query(
      collection(db, 'appointments'),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));

      console.log('Real-time update: Received', appointments.length, 'appointments');
      callback(appointments);
    }, (error) => {
      console.error('Error in real-time listener:', error);
      console.log('Using localStorage fallback for appointments...');
      callback(getLocalStorageAppointments());
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up real-time listener:', error);
    console.log('Firebase failed, using localStorage with polling...');
    callback(getLocalStorageAppointments());

    const pollInterval = setInterval(() => {
      callback(getLocalStorageAppointments());
    }, 2000);

    return () => clearInterval(pollInterval);
  }
};

export const subscribeToTodayAppointments = (callback: (appointments: any[]) => void) => {
  try {
    const today = new Date();
    const todayString = today.toISOString().split('T')[0];

    const q = query(
      collection(db, 'appointments'),
      where('date', '==', todayString),
      orderBy('createdAt', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const appointments = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
        createdAt: doc.data().createdAt?.toDate() || new Date()
      }));

      console.log('Today\'s appointments update:', appointments.length, 'appointments');
      callback(appointments);
    }, (error) => {
      console.error('Error in today\'s appointments listener:', error);
      const todayString = new Date().toISOString().split('T')[0];
      const allAppointments = getLocalStorageAppointments();
      const todayAppointments = allAppointments.filter((apt: any) => apt.date === todayString);
      callback(todayAppointments);
    });

    return unsubscribe;
  } catch (error) {
    console.error('Error setting up today\'s appointments listener:', error);
    const todayString = new Date().toISOString().split('T')[0];
    const allAppointments = getLocalStorageAppointments();
    const todayAppointments = allAppointments.filter((apt: any) => apt.date === todayString);
    callback(todayAppointments);
    return () => {};
  }
};

const getLocalStorageAppointments = () => {
  try {
    const appointments = JSON.parse(localStorage.getItem('appointments') || '[]');
    console.log('📱 Retrieved', appointments.length, 'appointments from localStorage');
    return appointments;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
};

/*
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const getMockAppointments = () => [
  {
    id: 'mock-1',
    patientName: 'Rajesh Kumar',
    age: 45,
    gender: 'Male',
    department: 'Cardiology',
    doctor: 'Dr. Smith Johnson',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '10:00 AM',
    symptoms: 'Chest pain and shortness of breath',
    phone: '+917276242709',
    status: 'pending',
    createdAt: new Date()
  },
  {
    id: 'mock-2',
    patientName: 'Priya Sharma',
    age: 32,
    gender: 'Female',
    department: 'Gynecology',
    doctor: 'Dr. Jennifer Martinez',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '02:30 PM',
    symptoms: 'Regular checkup',
    phone: '+919876543210',
    status: 'confirmed',
    createdAt: new Date()
  },
  {
    id: 'mock-3',
    patientName: 'Amit Patel',
    age: 28,
    gender: 'Male',
    department: 'Orthopedics',
    doctor: 'Dr. David Miller',
    date: new Date().toISOString().split('T')[0],
    timeSlot: '11:30 AM',
    symptoms: 'Knee pain after sports injury',
    phone: '+918765432109',
    status: 'completed',
    createdAt: new Date()
  }
];
*/

export const updateAppointmentStatus = async (appointmentId: string, newStatus: string) => {
  try {
    console.log(`Updating appointment ${appointmentId} to status: ${newStatus}`);

    await updateDoc(doc(db, 'appointments', appointmentId), {
      status: newStatus,
      updatedAt: Timestamp.now()
    });

    console.log(`Successfully updated appointment ${appointmentId} to ${newStatus}`);
    return { success: true };
  } catch (error) {
    console.error('Error updating appointment status:', error);
    return { success: true };
  }
};

export const deleteOldAppointments = async () => {
  try {
    const today = new Date();
    const fourteenDaysAgo = new Date(today);
    fourteenDaysAgo.setDate(fourteenDaysAgo.getDate() - 14);
    const cutoffDateString = fourteenDaysAgo.toISOString().split('T')[0];

    console.log(`🗑️ Deleting appointments older than 14 days: ${cutoffDateString}`);

    const q = query(
      collection(db, 'appointments'),
      where('date', '<', cutoffDateString)
    );

    const querySnapshot = await getDocs(q);
    const deletePromises = querySnapshot.docs.map(docSnapshot =>
      deleteDoc(doc(db, 'appointments', docSnapshot.id))
    );

    await Promise.all(deletePromises);

    console.log(`Deleted ${querySnapshot.docs.length} appointments older than 14 days`);
    return { success: true, deletedCount: querySnapshot.docs.length };
  } catch (error) {
    console.error('Error deleting old appointments:', error);
    return { success: false, error };
  }
};

export const scheduleAutoCleanup = () => {
  const now = new Date();
  const midnight = new Date();
  midnight.setHours(24, 0, 0, 0);

  const msUntilMidnight = midnight.getTime() - now.getTime();

  console.log(`⏰ Scheduling auto-cleanup in ${Math.round(msUntilMidnight / 1000 / 60)} minutes`);

  setTimeout(() => {
    deleteOldAppointments();

    setInterval(() => {
      deleteOldAppointments();
    }, 24 * 60 * 60 * 1000);

  }, msUntilMidnight);
};

export const initializeDoctorCredentials = async () => {
  try {
    console.log('🔐 Initializing doctor credentials...');

    const credentialsQuery = query(collection(db, 'doctorCredentials'));
    const existingCredentials = await getDocs(credentialsQuery);

    if (existingCredentials.empty) {
      console.log('📝 Creating doctor credentials in Firestore...');

      for (const doctor of doctorCredentials) {
        await setDoc(doc(db, 'doctorCredentials', doctor.id.toString()), {
          id: doctor.id,
          email: doctor.email,
          password: doctor.defaultPassword,
          name: doctor.name,
          specialty: doctor.specialty,
          department: doctor.department,
          createdAt: Timestamp.now(),
          isActive: true
        });
      }

      console.log(`Successfully created ${doctorCredentials.length} doctor credentials`);
    } else {
      console.log('Doctor credentials already exist in Firestore');
    }
  } catch (error) {
    console.error('Error initializing doctor credentials:', error);
  }
};

export const verifyDoctorCredentials = async (email: string, password: string) => {
  try {
    const credentialsQuery = query(
      collection(db, 'doctorCredentials'),
      where('email', '==', email),
      where('isActive', '==', true)
    );

    const querySnapshot = await getDocs(credentialsQuery);

    if (querySnapshot.empty) {
      return { success: false, error: 'Doctor not found' };
    }

    const doctorDoc = querySnapshot.docs[0];
    const doctorData = doctorDoc.data();

    if (doctorData.password === password) {
      return {
        success: true,
        doctor: {
          id: doctorData.id,
          email: doctorData.email,
          name: doctorData.name,
          specialty: doctorData.specialty,
          department: doctorData.department
        }
      };
    } else {
      return { success: false, error: 'Invalid password' };
    }
  } catch (error) {
    console.error('Error verifying doctor credentials:', error);
    return { success: false, error: 'Authentication error' };
  }
};

export const getDoctorById = async (doctorId: number) => {
  try {
    const doctorDoc = await getDocs(
      query(
        collection(db, 'doctorCredentials'),
        where('id', '==', doctorId),
        where('isActive', '==', true)
      )
    );

    if (!doctorDoc.empty) {
      return doctorDoc.docs[0].data();
    }
    return null;
  } catch (error) {
    console.error('Error getting doctor by ID:', error);
    return null;
  }
};

// Types
export interface AppointmentData {
  patientName: string;
  age: number;
  gender: string;
  department: string;
  doctor: string;
  date: string;
  timeSlot: string;
  symptoms?: string;
  phone: string;
}

// Live Updates Types 
export interface LiveUpdatesData {
  deliveriesLastDecade: number;
  normalDeliveryRate: number;
  medicalDepartments: number;
  doctorsAndConsultants: number;
  emergencyAndPharmacyHours: number; 
}

// Blog Types
export interface BlogData {
  id?: string;
  title: string;
  metaDescription: string;
  category: string;
  featuredImage?: string;
  content: string;
  author: string;
  authorId: string;
  status: 'draft' | 'published';
  publishDate: Date;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  viewCount?: number;
  tags?: string[];
}

export interface BlogCategory {
  id: string;
  name: string;
  description: string;
  color: string;
  slug: string;
  createdAt: Date;
  isActive: boolean;
}


const liveUpdatesDocRef = doc(db, 'websiteContent', 'liveUpdates');

/**
 * @param data The LiveUpdatesData object to save.
 * @returns An object indicating success or failure.
 */
export const saveLiveUpdates = async (data: LiveUpdatesData) => {
  try {
    console.log('📝 Saving live updates data...');
    
    await setDoc(liveUpdatesDocRef, data, { merge: true });
    
    console.log('Live updates saved successfully!');
    return { success: true };
  } catch (error) {
    console.error('Error saving live updates:', error);
    return { success: false, error: (error as Error).message };
  }
};

/**
 * Subscribes to real-time updates for the live updates data.
 * @param callback A function to be called with the new data.
 * @returns The unsubscribe function to detach the listener.
 */
export const subscribeToLiveUpdates = (callback: (data: LiveUpdatesData | null) => void) => {
  console.log('🔄 Setting up live updates subscription...');
  const unsubscribe = onSnapshot(liveUpdatesDocRef, (docSnap) => {
    if (docSnap.exists()) {
      console.log('🔄 Live updates data received:', docSnap.data());
      callback(docSnap.data() as LiveUpdatesData);
    } else {
      console.log('ℹ️ No live updates data found. Using default values.');
      callback(null);
    }
  }, (error) => {
    console.error('Error in live updates listener:', error);
    callback(null); 
  });
  return unsubscribe;
};

// --- Blog Functions ---

export const saveBlog = async (blogData: Omit<BlogData, 'id' | 'createdAt' | 'updatedAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'blogs'), {
      ...blogData,
      createdAt: Timestamp.now(),
      updatedAt: Timestamp.now(),
      viewCount: 0
    });
    console.log('Blog saved to Firebase:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving blog to Firebase:', error);
    return { success: false, error: 'Failed to save blog' };
  }
};

export const updateBlog = async (blogId: string, blogData: Partial<BlogData>) => {
  try {
    await updateDoc(doc(db, 'blogs', blogId), {
      ...blogData,
      updatedAt: Timestamp.now()
    });
    console.log('Blog updated in Firebase:', blogId);
    return { success: true };
  } catch (error) {
    console.error('Error updating blog in Firebase:', error);
    return { success: false, error: 'Failed to update blog' };
  }
};

export const deleteBlog = async (blogId: string) => {
  try {
    await deleteDoc(doc(db, 'blogs', blogId));
    console.log('Blog deleted from Firebase:', blogId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog from Firebase:', error);
    return { success: false, error: 'Failed to delete blog' };
  }
};

export const getBlogById = async (blogId: string) => {
  try {
    const blogDoc = await getDocs(
      query(collection(db, 'blogs'), where('__name__', '==', blogId))
    );

    if (!blogDoc.empty) {
      const blogData = blogDoc.docs[0].data();
      return {
        id: blogDoc.docs[0].id,
        ...blogData,
        createdAt: blogData.createdAt?.toDate() || new Date(),
        updatedAt: blogData.updatedAt?.toDate() || new Date(),
        publishDate: blogData.publishDate?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('Error getting blog by ID:', error);
    return null;
  }
};

export const getBlogBySlug = async (slug: string) => {
  try {
    const blogQuery = query(
      collection(db, 'blogs'),
      where('slug', '==', slug),
      where('status', '==', 'published')
    );

    const blogDoc = await getDocs(blogQuery);

    if (!blogDoc.empty) {
      const blogData = blogDoc.docs[0].data();
      return {
        id: blogDoc.docs[0].id,
        ...blogData,
        createdAt: blogData.createdAt?.toDate() || new Date(),
        updatedAt: blogData.updatedAt?.toDate() || new Date(),
        publishDate: blogData.publishDate?.toDate() || new Date()
      };
    }
    return null;
  } catch (error) {
    console.error('❌ Error getting blog by slug:', error);
    return null;
  }
};

export const subscribeToBlogs = (callback: (blogs: BlogData[]) => void, status?: 'draft' | 'published') => {
  console.log('🔄 Setting up blogs subscription...', status ? `for status: ${status}` : 'for all blogs');

  let q: any;
  if (status) {
    q = query(
      collection(db, 'blogs'),
      where('status', '==', status)
    );
  } else {
    q = query(collection(db, 'blogs'));
  }

  const unsubscribe = onSnapshot(q, (querySnapshot: any) => {
    const blogs = querySnapshot.docs.map((doc: any) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date(),
      updatedAt: doc.data().updatedAt?.toDate() || new Date(),
      publishDate: doc.data().publishDate?.toDate() || new Date()
    })) as BlogData[];

    blogs.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    console.log('Real-time update: Received', blogs.length, 'blogs', status ? `with status ${status}` : '');
    callback(blogs);
  }, (error: any) => {
    console.error('Error in blogs listener:', error);
    console.error('Error details:', error.message);
    callback([]);
  });

  return unsubscribe;
};

export const incrementBlogViewCount = async (blogId: string) => {
  try {
    const blogRef = doc(db, 'blogs', blogId);
    const blogDoc = await getDocs(query(collection(db, 'blogs'), where('__name__', '==', blogId)));

    if (!blogDoc.empty) {
      const currentViewCount = blogDoc.docs[0].data().viewCount || 0;
      await updateDoc(blogRef, {
        viewCount: currentViewCount + 1
      });
    }
  } catch (error) {
    console.error('Error incrementing blog view count:', error);
  }
};

export const saveBlogCategory = async (categoryData: Omit<BlogCategory, 'id' | 'createdAt'>) => {
  try {
    const docRef = await addDoc(collection(db, 'blogCategories'), {
      ...categoryData,
      createdAt: Timestamp.now()
    });
    console.log('Blog category saved to Firebase:', docRef.id);
    return { success: true, id: docRef.id };
  } catch (error) {
    console.error('Error saving blog category to Firebase:', error);
    return { success: false, error: 'Failed to save blog category' };
  }
};

export const updateBlogCategory = async (categoryId: string, categoryData: Partial<BlogCategory>) => {
  try {
    await updateDoc(doc(db, 'blogCategories', categoryId), categoryData);
    console.log('Blog category updated in Firebase:', categoryId);
    return { success: true };
  } catch (error) {
    console.error('Error updating blog category in Firebase:', error);
    return { success: false, error: 'Failed to update blog category' };
  }
};

export const deleteBlogCategory = async (categoryId: string) => {
  try {
    await deleteDoc(doc(db, 'blogCategories', categoryId));
    console.log('Blog category deleted from Firebase:', categoryId);
    return { success: true };
  } catch (error) {
    console.error('Error deleting blog category from Firebase:', error);
    return { success: false, error: 'Failed to delete blog category' };
  }
};

export const subscribeToBlogCategories = (callback: (categories: BlogCategory[]) => void) => {
  console.log('Setting up blog categories subscription...');

  const q = query(
    collection(db, 'blogCategories'),
    where('isActive', '==', true)
  );

  const unsubscribe = onSnapshot(q, (querySnapshot) => {
    const categories = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate() || new Date()
    })) as BlogCategory[];

    categories.sort((a, b) => a.name.localeCompare(b.name));

    console.log('Real-time update: Received', categories.length, 'blog categories');
    callback(categories);
  }, (error) => {
    console.error('Error in blog categories listener:', error);
    const fallbackCategories: BlogCategory[] = [
      {
        id: 'health-tips',
        name: 'Health Tips',
        description: 'Practical health advice and tips for daily wellness',
        color: '#10B981',
        slug: 'health-tips',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 'wellness',
        name: 'Wellness',
        description: 'Comprehensive wellness guides and lifestyle advice',
        color: '#3B82F6',
        slug: 'wellness',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 'lifestyle',
        name: 'Lifestyle',
        description: 'Healthy lifestyle choices and balanced living',
        color: '#8B5CF6',
        slug: 'lifestyle',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 'faith-health',
        name: 'Faith & Health',
        description: 'Faith-based approaches to health and wellness',
        color: '#0891B2',
        slug: 'faith-health',
        isActive: true,
        createdAt: new Date()
      },
      {
        id: 'medical-news',
        name: 'Medical News',
        description: 'Latest medical news and healthcare updates',
        color: '#EF4444',
        slug: 'medical-news',
        isActive: true,
        createdAt: new Date()
      }
    ];
    callback(fallbackCategories);
  });

  return unsubscribe;
};

export const initializeBlogCategories = async () => {
  try {
    const existingCategories = await getDocs(collection(db, 'blogCategories'));

    if (existingCategories.empty) {
      console.log('📝 Creating default blog categories in Firestore...');

      const defaultCategories = [
        {
          name: 'Health Tips',
          description: 'Practical health advice and tips for daily wellness',
          color: '#10B981',
          slug: 'health-tips',
          isActive: true
        },
        {
          name: 'Wellness',
          description: 'Comprehensive wellness guides and lifestyle advice',
          color: '#3B82F6',
          slug: 'wellness',
          isActive: true
        },
        {
          name: 'Lifestyle',
          description: 'Healthy lifestyle choices and balanced living',
          color: '#8B5CF6',
          slug: 'lifestyle',
          isActive: true
        },
        {
          name: 'Faith & Health',
          description: 'Faith-based approaches to health and wellness',
          color: '#0891B2',
          slug: 'faith-health',
          isActive: true
        },
        {
          name: 'Medical News',
          description: 'Latest medical news and healthcare updates',
          color: '#EF4444',
          slug: 'medical-news',
          isActive: true
        }
      ];

      for (const category of defaultCategories) {
        await saveBlogCategory(category);
      }

      console.log(`✅ Successfully created ${defaultCategories.length} default blog categories`);
    } else {
      console.log('✅ Blog categories already exist in Firestore');
    }
  } catch (error) {
    console.error('❌ Error initializing blog categories:', error);
  }
};

export const generateSlug = (title: string): string => {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9 -]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
};