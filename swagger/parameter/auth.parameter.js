"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthParameter = void 0;
exports.AuthParameter = {
    Code: {
        in: 'query',
        name: 'code',
        required: true,
        schema: {
            type: 'string'
        },
        allowReserved: true,
        explode: false
    },
    Scope: {
        in: 'query',
        name: 'scope',
        required: true,
        schema: {
            type: 'string'
        },
        allowReserved: true,
        explode: false
    },
    AuthUser: {
        in: 'query',
        name: 'authuser',
        required: true,
        schema: {
            type: 'integer'
        },
        allowReserved: true,
        explode: false
    },
    Prompt: {
        in: 'query',
        name: 'prompt',
        required: true,
        schema: {
            type: 'string'
        },
        allowReserved: true,
        explode: false
    }
};
