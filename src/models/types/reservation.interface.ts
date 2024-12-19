export enum ReservationStatus {
  Reserved = 'reserved',
  Completed = 'completed',
  Cancelled = 'cancelled'
}

export interface StudentReservation extends Document {
  course_id: string;
  teacher_id: string;
  student_id: string;
  reserve_time: Date;
  teacher_status: ReservationStatus;
  student_status: ReservationStatus;
}
