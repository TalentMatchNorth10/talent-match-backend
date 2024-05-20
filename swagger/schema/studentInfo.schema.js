"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StudentInfoSchema = void 0;
const StudentInfoSchema = {
    StudentInfoResponseModel: {
        type: 'object',
        properties: {
            name: { type: 'string' },
            nick_name: { type: 'string' },
            birthday: { type: 'string' },
            contact_phone: { type: 'string' },
            email: { type: 'string' },
            avator_image: { type: 'string' }
        },
        example: {
            name: 'string',
            nick_name: 'string',
            birthday: 'string',
            contact_phone: 'string',
            email: 'string',
            avator_image: 'string'
        }
    },
    UpdateStudentInfoRequestModel: {
        type: 'object',
        required: [
            'name',
            'nick_name',
            'birthday',
            'contact_phone',
            'email',
            'avator_image'
        ],
        properties: {
            name: { type: 'string' },
            nick_name: { type: 'string' },
            birthday: { type: 'string' },
            contact_phone: { type: 'string' },
            email: { type: 'string' },
            avator_image: { type: 'string' }
        },
        example: {
            name: 'string',
            nick_name: 'string',
            birthday: 'string',
            contact_phone: 'string',
            email: 'string',
            avator_image: 'string'
        }
    },
    UpdateStudentInfoResponseModel: {
        type: 'object',
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                properties: {
                    message: { type: 'string' }
                }
            }
        },
        example: {
            status: true,
            data: {
                message: '更新學生基本資訊成功'
            }
        }
    }
};
exports.StudentInfoSchema = StudentInfoSchema;
