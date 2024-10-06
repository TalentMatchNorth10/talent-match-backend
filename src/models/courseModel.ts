import mongoose, { Schema } from 'mongoose';
import {
  IPriceQuantity,
  ICourse,
  CourseStatus
} from './types/course.interface';
import { v4 as uuidv4 } from 'uuid';
const priceQuantitySchema = new Schema<IPriceQuantity>({
  _id: {
    type: String
  },
  price: {
    type: Number,
    required: function (this: any) {
      return (this.parent() as ICourse).status === CourseStatus.PUBLISHED;
    }
  },
  quantity: {
    type: Number,
    required: function (this: any) {
      return (this.parent() as ICourse).status === CourseStatus.PUBLISHED;
    }
  }
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    main_image: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    rate: {
      type: Number,
      default: 0
    },
    content: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    price_quantity: {
      type: [priceQuantitySchema],
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    main_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    sub_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    city_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    dist_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    survey_url: {
      type: String
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1, 2],
      default: CourseStatus.DRAFT
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    purchase_message: {
      type: String,
      required: function (this: ICourse) {
        return this.status === CourseStatus.PUBLISHED;
      }
    },
    video_ids: {
      type: [Schema.Types.ObjectId],
      ref: 'Video',
      default: []
    },
    file_ids: {
      type: [Schema.Types.ObjectId],
      ref: 'CourseFile',
      default: []
    },
    file_url_ids: {
      type: [Schema.Types.ObjectId],
      ref: 'CourseFile',
      default: []
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
);

// 新增虛擬欄位 is_valid
courseSchema.virtual('is_valid').get(function () {
  const requiredFields: (keyof ICourse)[] = [
    'name',
    'main_image',
    'content',
    'price_quantity',
    'main_category',
    'sub_category',
    'city_id',
    'dist_id',
    'teacher_id',
    'purchase_message',
    'video_ids',
    'file_ids',
    'file_url_ids'
  ];

  for (const fieldName of requiredFields) {
    const field = this[fieldName];
    if (!field) {
      return false;
    }
    if (
      Array.isArray(field) &&
      field.length === 0 &&
      fieldName !== 'file_ids' &&
      fieldName !== 'file_url_ids' &&
      fieldName !== 'video_ids'
    ) {
      return false;
    }
  }

  for (const pq of this.price_quantity) {
    if (pq.price === undefined || pq.quantity === undefined) {
      return false;
    }
  }

  return true;
});

courseSchema.set('toJSON', { virtuals: true });
courseSchema.set('toObject', { virtuals: true });

courseSchema.pre('save', function (next) {
  if (!Array.isArray(this.price_quantity)) {
    this.price_quantity = [];
  } else {
    this.price_quantity.forEach((item) => {
      if (!item._id || typeof item._id !== 'string') {
        item._id = uuidv4();
      }
    });
  }
  next();
});

// 新增、更新時檢查並設定 price_quantity 的 _id
courseSchema.pre('findOneAndUpdate', function (next) {
  const update = this.getUpdate() as mongoose.UpdateQuery<ICourse>;
  if (update && update.price_quantity) {
    update.price_quantity.forEach((item: IPriceQuantity) => {
      if (!item._id || typeof item._id !== 'string') {
        item._id = uuidv4();
      }
    });
  }
  next();
});

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
