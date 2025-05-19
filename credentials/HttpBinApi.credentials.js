"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpBinApi = void 0;
class HttpBinApi {
    constructor() {
        this.name = 'httpbinApi';
        this.displayName = 'HttpBin API';
        this.documentationUrl = 'https://your-docs-url';
        this.properties = [
            {
                displayName: 'Token',
                name: 'token',
                type: 'string',
                default: process.env.HTTPBIN_API_TOKEN || '',
                typeOptions: {
                    password: true,
                },
                description: 'Set via HTTPBIN_API_TOKEN environment variable',
            },
            {
                displayName: 'Domain',
                name: 'domain',
                type: 'string',
                default: process.env.HTTPBIN_DOMAIN || 'https://httpbin.org',
                description: 'Override with HTTPBIN_DOMAIN environment variable',
            },
        ];
        this.authenticate = {
            type: 'generic',
            properties: {
                headers: {
                    Authorization: '={{"Bearer " + $credentials.token}}',
                },
            },
        };
        this.test = {
            request: {
                baseURL: '={{$credentials?.domain}}',
                url: '/bearer',
            },
        };
    }
}
exports.HttpBinApi = HttpBinApi;
