// Admin credentials for hospital management system
export interface AdminCredential {
  id: number;
  email: string;
  defaultPassword: string;
  name: string;
  role: string;
  department: string;
  permissions: string[];
  level: 'super_admin' | 'admin' | 'manager';
}

export const adminCredentials: AdminCredential[] = [
  {
    id: 1,
    email: 'admin@sdamc.com',
    defaultPassword: 'Admin3439',
    name: 'System Administrator',
    role: 'Super Administrator',
    department: 'IT Administration',
    level: 'super_admin',
    permissions: [
      'manage_users',
      'manage_doctors',
      'manage_receptionists',
      'manage_appointments',
      'manage_content',
      'manage_departments',
      'manage_services',
      'view_analytics',
      'export_data',
      'system_settings',
      'audit_logs',
      'backup_restore',
      'security_settings',
      'firebase_config'
    ]
  },
  {
    id: 2,
    email: 'admin.medical@sdamc.com',
    defaultPassword: 'Medical3439',
    name: 'Dr. Medical Administrator',
    role: 'Medical Administrator',
    department: 'Medical Administration',
    level: 'admin',
    permissions: [
      'manage_doctors',
      'manage_appointments',
      'manage_departments',
      'manage_services',
      'view_analytics',
      'export_data',
      'medical_reports'
    ]
  },
  {
    id: 3,
    email: 'admin.operations@sdamc.com',
    defaultPassword: 'Operations3439',
    name: 'Operations Manager',
    role: 'Operations Administrator',
    department: 'Operations',
    level: 'admin',
    permissions: [
      'manage_receptionists',
      'manage_appointments',
      'manage_content',
      'view_analytics',
      'export_data',
      'operational_reports'
    ]
  },
  {
    id: 4,
    email: 'manager.it@sdamc.com',
    defaultPassword: 'ITManager3439',
    name: 'IT Manager',
    role: 'IT Manager',
    department: 'Information Technology',
    level: 'manager',
    permissions: [
      'manage_users',
      'system_settings',
      'audit_logs',
      'backup_restore',
      'security_settings',
      'firebase_config'
    ]
  },
  {
    id: 5,
    email: 'manager.content@sdamc.com',
    defaultPassword: 'Content3439',
    name: 'Content Manager',
    role: 'Content Manager',
    department: 'Marketing',
    level: 'manager',
    permissions: [
      'manage_content',
      'manage_services',
      'view_analytics',
      'export_data'
    ]
  }
];

// Helper function to find admin by email
export const findAdminByEmail = (email: string): AdminCredential | undefined => {
  return adminCredentials.find(admin => admin.email === email);
};

// Helper function to find admin by ID
export const findAdminById = (id: number): AdminCredential | undefined => {
  return adminCredentials.find(admin => admin.id === id);
};

// Helper function to check if admin has permission
export const hasAdminPermission = (admin: AdminCredential | null, permission: string): boolean => {
  if (!admin) return false;
  return admin.permissions.includes(permission);
};

// Helper function to get all admin roles
export const getAllAdminRoles = (): string[] => {
  const roles = adminCredentials.map(admin => admin.role);
  return [...new Set(roles)].sort();
};

// Helper function to get admins by level
export const getAdminsByLevel = (level: 'super_admin' | 'admin' | 'manager'): AdminCredential[] => {
  return adminCredentials.filter(admin => admin.level === level);
};

// Permission descriptions for UI
export const adminPermissionDescriptions: Record<string, string> = {
  'manage_users': 'Create, edit, and delete user accounts',
  'manage_doctors': 'Manage doctor profiles and credentials',
  'manage_receptionists': 'Manage receptionist accounts and permissions',
  'manage_appointments': 'Full appointment management across all departments',
  'manage_content': 'Edit website content and information',
  'manage_departments': 'Manage hospital departments and services',
  'manage_services': 'Manage hospital services and offerings',
  'view_analytics': 'Access dashboard analytics and reports',
  'export_data': 'Export data to CSV, Excel, and PDF formats',
  'system_settings': 'Configure system-wide settings',
  'audit_logs': 'View system audit logs and user activities',
  'backup_restore': 'Perform system backup and restore operations',
  'security_settings': 'Manage security configurations',
  'firebase_config': 'Configure Firebase and database settings',
  'medical_reports': 'Generate medical and clinical reports',
  'operational_reports': 'Generate operational and administrative reports'
};

// Admin level descriptions
export const adminLevelDescriptions: Record<string, string> = {
  'super_admin': 'Full system access with all permissions',
  'admin': 'Administrative access with department-specific permissions',
  'manager': 'Management access with limited administrative permissions'
};
