import {
	IAuthenticateGeneric,
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

declare const process: {
	env: {
		HTTPBIN_API_TOKEN?: string;
		HTTPBIN_DOMAIN?: string;
	}
};

export class HttpBinApi implements ICredentialType {
	name = 'httpbinApi';
	displayName = 'HttpBin API';
	documentationUrl = 'https://your-docs-url';
	properties: INodeProperties[] = [
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

	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				Authorization: '={{"Bearer " + $credentials.token}}',
			},
		},
	};

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials?.domain}}',
			url: '/bearer',
		},
	};
}
