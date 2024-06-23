import mongoose, { Schema } from 'mongoose';

const reservationSchema = new Schema(
  {
    course_id: {
      type: Schema.Types.ObjectId,
      ref: 'Course',
      required: [true, '課程ID為必填項']
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: [true, '授課老師ID為必填項']
    },
    student_id: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, '學生ID為必填項']
    },
    reserve_time: { type: Date, required: [true, '預約時間為必填項'] },
    teacher_status: {
      type: String,
      required: [true, '教師狀態為必填項'],
      enum: ['reserved', 'completed', 'cancelled'],
      default: 'reserved'
    },
    student_status: {
      type: String,
      required: [true, '學生狀態為必填項'],
      enum: ['reserved', 'completed', 'cancelled'],
      default: 'reserved'
    },
    review: {
      type: Schema.Types.ObjectId,
      ref: 'Review',
      default: null
    }
  },
  {
    timestamps: true // 自動創建 createdAt 和 updatedAt 時間戳記
  }
);

const Reservation = mongoose.model('Reservation', reservationSchema);

export default Reservation;
