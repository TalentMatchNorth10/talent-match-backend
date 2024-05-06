const swaggerAutogen = require('swagger-autogen')({ openapi: '3.0.0' });

const outputFile = './swagger_output.json'; // 輸出的文件名稱
const endpointsFiles = ['./src/app.ts']; // 要指向的 API，通常使用 Express 直接指向到 app.js 就可以

const doc = {
  host: 'localhost:8080',
  components: {
    securitySchemes: {
      bearerAuth: {
        type: 'http',
        scheme: 'bearer'
      }
    }
  }
};

swaggerAutogen(outputFile, endpointsFiles, doc);
