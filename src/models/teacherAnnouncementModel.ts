import mongoose, { Schema } from 'mongoose';

const teacherAnnouncementSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  chat_id: { type: Schema.Types.ObjectId, ref: 'Chat' },
  sender: { type: Schema.Types.ObjectId, ref: 'User' },
  courseIds: [{ type: Schema.Types.ObjectId, ref: 'Course' }],
  read: { type: Boolean, default: false },
  create_datetime: { type: Date, default: Date.now },
  title: { type: String },
  message: { type: String }
});

const TeacherAnnouncement = mongoose.model(
  'TeacherAnnouncement',
  teacherAnnouncementSchema
);

export default TeacherAnnouncement;
