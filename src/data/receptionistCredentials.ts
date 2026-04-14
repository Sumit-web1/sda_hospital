// Receptionist credentials for front desk authentication system
export interface ReceptionistCredential {
  id: number;
  email: string;
  defaultPassword: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
}

export const receptionistCredentials: ReceptionistCredential[] = [
  {
    id: 1,
    email: 'reception@sdamc.com',
    defaultPassword: 'Reception2024',
    name: 'Front Desk Reception',
    role: 'Senior Receptionist',
    department: 'Front Desk',
    permissions: [
      'view_all_appointments',
      'create_appointments',
      'edit_appointments',
      'cancel_appointments',
      'manage_patient_records',
      'send_notifications',
      'generate_reports',
      'manage_schedules'
    ]
  },
  {
    id: 2,
    email: 'reception.morning@sdamc.com',
    defaultPassword: 'Morning2024',
    name: 'Morning Shift Reception',
    role: 'Receptionist',
    department: 'Front Desk',
    permissions: [
      'view_all_appointments',
      'create_appointments',
      'edit_appointments',
      'manage_patient_records',
      'send_notifications'
    ]
  },
  {
    id: 3,
    email: 'reception.evening@sdamc.com',
    defaultPassword: 'Evening2024',
    name: 'Evening Shift Reception',
    role: 'Receptionist',
    department: 'Front Desk',
    permissions: [
      'view_all_appointments',
      'create_appointments',
      'edit_appointments',
      'manage_patient_records',
      'send_notifications'
    ]
  },
  {
    id: 4,
    email: 'admin.reception@sdamc.com',
    defaultPassword: 'Admin2024',
    name: 'Reception Administrator',
    role: 'Reception Manager',
    department: 'Administration',
    permissions: [
      'view_all_appointments',
      'create_appointments',
      'edit_appointments',
      'cancel_appointments',
      'manage_patient_records',
      'send_notifications',
      'generate_reports',
      'manage_schedules',
      'manage_staff',
      'system_settings'
    ]
  }
];

// Helper function to find receptionist by email
export const findReceptionistByEmail = (email: string): ReceptionistCredential | undefined => {
  return receptionistCredentials.find(receptionist => receptionist.email === email);
};

// Helper function to find receptionist by ID
export const findReceptionistById = (id: number): ReceptionistCredential | undefined => {
  return receptionistCredentials.find(receptionist => receptionist.id === id);
};

// Helper function to check permissions
export const hasPermission = (receptionist: ReceptionistCredential, permission: string): boolean => {
  return receptionist.permissions.includes(permission);
};

// Helper function to get all permissions
export const getAllPermissions = (): string[] => {
  const allPermissions = new Set<string>();
  receptionistCredentials.forEach(receptionist => {
    receptionist.permissions.forEach(permission => allPermissions.add(permission));
  });
  return Array.from(allPermissions).sort();
};

// Permission descriptions for UI
export const permissionDescriptions: Record<string, string> = {
  'view_all_appointments': 'View all patient appointments across departments',
  'create_appointments': 'Create new appointments for patients',
  'edit_appointments': 'Modify existing appointment details',
  'cancel_appointments': 'Cancel patient appointments',
  'manage_patient_records': 'Access and manage patient information',
  'send_notifications': 'Send appointment reminders and notifications',
  'generate_reports': 'Generate and export appointment reports',
  'manage_schedules': 'Manage doctor schedules and availability',
  'manage_staff': 'Manage reception staff and permissions',
  'system_settings': 'Access system configuration settings'
};
