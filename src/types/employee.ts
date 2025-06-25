export interface Employee {
  employeeId: number;
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  hireDate: string; 
  baseSalary: string;
  active: boolean;
}

export interface EmployeeFormData {
  employeeCode: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  position: string;
  hireDate: Date;
  baseSalary: string;
  active: boolean;
}

export interface EmployeeFilter {
  search?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';

}