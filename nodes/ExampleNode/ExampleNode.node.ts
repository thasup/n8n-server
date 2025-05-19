import {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
	NodeOperationError,
	NodeConnectionType,
} from 'n8n-workflow';

export class ExampleNode implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Example Node',
		name: 'exampleNode',
		group: ['transform'],
		version: 1,
		description: 'Basic Example Node',
		defaults: {
			name: 'Example Node',
		},
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		properties: [
			{
				displayName: 'My String',
				name: 'myString',
				type: 'string',
				default: '',
				placeholder: 'Placeholder value',
				description: 'The description text',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnItems: INodeExecutionData[] = [];

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			try {
				// Safely get the myString parameter with a default empty string
				const myString = this.getNodeParameter('myString', itemIndex, '') as string;

				// Clone the current item to avoid mutating the original
				const item: INodeExecutionData = { ...items[itemIndex] };

				// Add myString to the item's JSON
				item.json.myString = myString;

				returnItems.push(item);
			} catch (error: unknown) {
				// Determine the most appropriate error message
				const errorMessage = error instanceof Error
					? error.message
					: error && typeof error === 'object' && 'message' in error
					? String((error as any).message)
					: 'An unexpected error occurred';

				// Create a NodeOperationError
				const nodeError = new NodeOperationError(
					{} as any,
					new Error(errorMessage),
					{
						itemIndex,
						description: errorMessage
					}
				);

				// Handle error based on continueOnFail
				if (this.continueOnFail()) {
					returnItems.push({
						json: {},
						error: nodeError,
						pairedItem: itemIndex
					});
				} else {
					throw nodeError;
				}
			}
		}

		return [returnItems];
	}
}
