"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnnouncementSchema = void 0;
const AnnouncementSchema = {
    AnnouncementInitResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'object',
                required: ['courseOptions', 'targetOptions'],
                properties: {
                    courseOptions: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['label', 'value'],
                            properties: {
                                label: {
                                    type: 'string',
                                    description: '課程標題'
                                },
                                value: {
                                    type: 'string',
                                    description: '課程ID'
                                }
                            }
                        }
                    },
                    targetOptions: {
                        type: 'array',
                        items: {
                            type: 'object',
                            required: ['id', 'name'],
                            properties: {
                                label: {
                                    type: 'string',
                                    description: '對象名稱'
                                },
                                value: {
                                    type: 'string',
                                    description: '對象ID'
                                }
                            }
                        }
                    }
                }
            }
        }
    },
    AnnouncementListResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'title', 'text', 'target', 'createdAt', 'readBy'],
                    properties: {
                        id: {
                            type: 'string',
                            description: '公告ID'
                        },
                        title: {
                            type: 'string',
                            description: '公告標題'
                        },
                        text: {
                            type: 'string',
                            description: '公告內容'
                        },
                        target: {
                            type: 'string',
                            description: '公告對象',
                            enum: ['subscribers', 'purchasers', 'all']
                        },
                        createdAt: {
                            type: 'string',
                            description: '公告發送時間'
                        },
                        readBy: {
                            type: 'array',
                            items: {
                                type: 'string'
                            },
                            description: '已讀用戶ID'
                        }
                    }
                }
            }
        }
    },
    AnnouncementUserListResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'user', 'title', 'text', 'createdAt', 'readBy'],
                    properties: {
                        id: {
                            type: 'string',
                            description: '公告ID'
                        },
                        user: {
                            type: 'object',
                            required: ['id', 'name', 'avatar'],
                            properties: {
                                id: {
                                    type: 'string',
                                    description: '老師ID'
                                },
                                name: {
                                    type: 'string',
                                    description: '老師名稱'
                                },
                                avatar: {
                                    type: 'string',
                                    description: '老師頭像'
                                }
                            }
                        },
                        title: {
                            type: 'string',
                            description: '公告標題'
                        },
                        text: {
                            type: 'string',
                            description: '公告內容'
                        },
                        createdAt: {
                            type: 'string',
                            description: '公告發送時間'
                        }
                    }
                }
            }
        }
    },
    AnnouncementSystemListResponseModel: {
        type: 'object',
        required: ['status', 'data'],
        properties: {
            status: { type: 'boolean' },
            data: {
                type: 'array',
                items: {
                    type: 'object',
                    required: ['id', 'title', 'text', 'createdAt'],
                    properties: {
                        id: {
                            type: 'string',
                            description: '系統公告ID'
                        },
                        title: {
                            type: 'string',
                            description: '系統公告標題'
                        },
                        text: {
                            type: 'string',
                            description: '系統公告內容'
                        },
                        createdAt: {
                            type: 'string',
                            description: '系統公告發送時間'
                        }
                    }
                }
            }
        }
    },
    SendAnnouncementRequestModel: {
        type: 'object',
        required: ['title', 'text', 'courseIds', 'target'],
        properties: {
            title: {
                type: 'string',
                description: '公告標題'
            },
            text: {
                type: 'string',
                description: '公告內容'
            },
            courseIds: {
                type: 'array',
                items: {
                    type: 'string'
                },
                description: '課程ID'
            },
            target: {
                type: 'string',
                description: '公告對象',
                enum: ['subscribers', 'purchasers', 'all']
            }
        }
    },
    SendSystemAnnouncementRequestModel: {
        type: 'object',
        required: ['title', 'text', 'target'],
        properties: {
            title: {
                type: 'string',
                description: '公告標題'
            },
            text: {
                type: 'string',
                description: '公告內容'
            }
        }
    }
};
exports.AnnouncementSchema = AnnouncementSchema;
