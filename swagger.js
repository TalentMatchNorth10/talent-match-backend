const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./src/app.ts']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

// 這裡是引入所有的 schema
const { CommonSchema } = require('./swagger/schema/common.schema');
const { AuthSchema } = require('./swagger/schema/auth.schema');
const { UserSchema } = require('./swagger/schema/user.schema');
const { ShopSchema } = require('./swagger/schema/shop.schema');

const { TeacherInfoSchema } = require('./swagger/schema/teacherInfo.schema');

const { StudentInfoSchema } = require('./swagger/schema//studentInfo.schema');
const { FavoritesSchema } = require('./swagger/schema/favorites.schema');
const { UploadSchema } = require('./swagger/schema/upload.schema');
const { TeacherReserveSchema } = require('./swagger/schema/teacherReserve.schema');


// 這裡是引入所有的 parameter

const doc = {
  info: {
    title: 'Talent Match Backend API'
  },
  servers: [
    {
      url: 'http://localhost:8080', // Local development URL
      description: 'Local development server'
    },
    {
      url: 'https://talent-match-backend.onrender.com', // Production URL
      description: 'Production server'
    }
  ],
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    },
    '@schemas': {
      ...CommonSchema,
      ...AuthSchema,
      ...UserSchema,
      ...ShopSchema,
      ...TeacherInfoSchema,
      ...FavoritesSchema,
      ...StudentInfoSchema,
      ...FavoritesSchema,
      ...TeacherReserveSchema,
      ...UploadSchema

    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
