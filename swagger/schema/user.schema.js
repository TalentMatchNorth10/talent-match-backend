"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserSchema = void 0;
const UserSchema = {
    UserInfoResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['id', 'nick_name', 'avator_image', 'is_teacher'],
                properties: {
                    id: {
                        type: 'string',
                        description: '使用者ID'
                    },
                    nick_name: {
                        type: 'string',
                        description: '使用者暱稱'
                    },
                    avator_image: {
                        type: 'string',
                        description: '使用者頭像'
                    },
                    is_teacher: {
                        type: 'string',
                        description: '使用者是否為老師'
                    }
                }
            }
        },
        example: {
            status: true,
            data: {
                id: 'string',
                nick_name: 'string',
                avator_image: 'string',
                is_teacher: true
            }
        }
    }
};
exports.UserSchema = UserSchema;
