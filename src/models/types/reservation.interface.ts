export interface StudentReservation extends Document {
  course_id: string;
  teacher_id: string;
  student_id: string;
  reserve_time: Date;
  teacher_status: 'reserved' | 'completed' | 'cancelled';
  student_status: 'reserved' | 'completed' | 'cancelled';
}
