export interface Employee {
  id: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hireDate: string;
  baseSalary: number;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface EmployeeFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  department: string;
  position: string;
  hireDate: Date;
  baseSalary: number;
}

export interface EmployeeFilter {
  search?: string;
  department?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}