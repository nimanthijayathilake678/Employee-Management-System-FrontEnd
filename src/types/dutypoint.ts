export interface DutyPoint{
  dutyPoint_id:number;
  dutyPoint_name: string;
  phone: string;
  dutyPoint_location: string;
  dutyPointCharges: string;

}

export interface DutyPointFormData {
  dutyPoint_name: string;
  phone: string;
  dutyPoint_location: string;
  dutyPointCharges: string;
}

export interface DutyPointFilter {
  search?: string;
  active?: boolean;
  page?: number;
  size?: number;
  sortBy?: string;
  direction?: 'asc' | 'desc';

}