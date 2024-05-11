const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./src/app.ts']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

// 這裡是引入所有的 schema
const { CommonSchema } = require('./swagger/schema/common.schema');
const { AuthSchema } = require('./swagger/schema/auth.schema');
const { UserSchema } = require('./swagger/schema/user.schema');

const doc = {
  info: {
    title: 'Talent Match Backend API'
  },
  host: 'localhost:8080',
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
      ...UserSchema
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
