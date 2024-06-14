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
        return this.status === 2;
      }
    },
    main_image: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    content: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    price_quantity: {
      type: [priceQuantitySchema],
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    main_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    sub_category: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    city_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    dist_id: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    survey_url: {
      type: String
    },
    status: {
      type: Number,
      required: true,
      enum: [1, 2, 3]
    },
    teacher_id: {
      type: Schema.Types.ObjectId,
      ref: 'Teacher',
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    purchase_message: {
      type: String,
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    video_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    file_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 2;
      }
    },
    file_url_ids: {
      type: [String],
      required: function (this: ICourse) {
        return this.status === 2;
      }
    }
  },
  {
    timestamps: true
  }
);

const Course = mongoose.model<ICourse>('Course', courseSchema);

export default Course;
