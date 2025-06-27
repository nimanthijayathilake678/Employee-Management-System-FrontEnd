export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'LATE' | 'ON_LEAVE' | 'HALF_DAY';
export type ShiftType = 'DAY' | 'NIGHT';

export interface Attendance {
  attendance_id: number;
  employee: {
    employee_id: number;
    firstName: string;
    lastName:string;
  };
  date: string; 
  shift: ShiftType;
  checkInTime?: string; 
  checkOutTime?: string;
  breakDuration?: number; 
  overtimeHours?: number;
  status: AttendanceStatus;
  dutyPoint: {
    dutyPoint_id: number;
    dutyPoint_name: string;
  };
  remarks?: string;
  createdAt: string;
}

export interface AttendanceFormData {
  employee_id: number;
  date: string;
  shift: ShiftType;
  checkInTime?: string;
  checkOutTime?: string;
  breakDuration?: number;
  overtimeHours?: number;
  status: AttendanceStatus;
  dutyPoint_id: number;
  remarks?: string;
}

export interface AttendanceFilter{
  search?: string;
  status?: AttendanceStatus;
  shift?: ShiftType;
  dateFrom?: string;
  dateTo?: string;
  dutyPoint_id?: number;
  firstName?:string;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';
}