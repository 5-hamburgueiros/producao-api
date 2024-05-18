"use strict";
exports.__esModule = true;
exports.ApiOkResponsePaginated = void 0;
var common_1 = require("@nestjs/common");
var swagger_1 = require("@nestjs/swagger");
var nestjs_typeorm_paginate_1 = require("nestjs-typeorm-paginate");
exports.ApiOkResponsePaginated = function (dataDto) {
    return common_1.applyDecorators(swagger_1.ApiExtraModels(nestjs_typeorm_paginate_1.Pagination, dataDto), swagger_1.ApiOkResponse({
        schema: {
            allOf: [
                { $ref: swagger_1.getSchemaPath(nestjs_typeorm_paginate_1.Pagination) },
                {
                    properties: {
                        items: {
                            type: 'array',
                            items: { $ref: swagger_1.getSchemaPath(dataDto) }
                        },
                        meta: {
                            type: 'object',
                            properties: {
                                itemCount: {
                                    type: 'number'
                                },
                                totalItems: {
                                    type: 'number'
                                },
                                itemsPerPage: {
                                    type: 'number'
                                },
                                totalPages: {
                                    type: 'number'
                                },
                                currentPage: {
                                    type: 'number'
                                }
                            },
                            required: [
                                'itemCount',
                                'totalItems',
                                'itemsPerPage',
                                'totalPages',
                                'currentPage',
                            ]
                        },
                        links: {
                            type: 'object',
                            properties: {
                                first: {
                                    type: 'string'
                                },
                                previous: {
                                    type: 'string'
                                },
                                next: {
                                    type: 'string'
                                },
                                last: {
                                    type: 'string'
                                }
                            }
                        }
                    },
                    required: ['items', 'meta']
                },
            ]
        }
    }));
};
