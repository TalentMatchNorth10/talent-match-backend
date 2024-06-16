import mongoose, { Schema, Types } from 'mongoose';
import { IPriceQuantity, ICourse } from './types/course.interface';
import Review from './reviewModel';

const priceQuantitySchema = new Schema<IPriceQuantity>({
  _id: String,
  price: {
    type: Number,
    required: function (this: any) {
      return (this.parent() as ICourse).status === 2;
    }
  },
  quantity: {
    type: Number,
    required: function (this: any) {
      return (this.parent() as ICourse).status === 2;
    }
  }
});

const courseSchema = new Schema<ICourse>(
  {
    name: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    main_image: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    content: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    price_quantity: {
      type: [priceQuantitySchema],
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    main_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    sub_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    city_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    dist_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    survey_url: {
      type: String
    },
    status: {
      type: Number,
      required: true,
      enum: [0, 1, 2]
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    purchase_message: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    video_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    file_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 1;
      }
    },
    file_url_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 1;
      }
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
    if (Array.isArray(field) && field.length === 0) {
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

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
