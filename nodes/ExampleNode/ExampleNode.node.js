"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExampleNode = void 0;
const n8n_workflow_1 = require("n8n-workflow");
class ExampleNode {
    constructor() {
        this.description = {
            displayName: 'Example Node',
            name: 'exampleNode',
            group: ['transform'],
            version: 1,
            description: 'Basic Example Node',
            defaults: {
                name: 'Example Node',
            },
            inputs: ["main" /* NodeConnectionType.Main */],
            outputs: ["main" /* NodeConnectionType.Main */],
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
    }
    async execute() {
        const items = this.getInputData();
        const returnItems = [];
        for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
            try {
                // Safely get the myString parameter with a default empty string
                const myString = this.getNodeParameter('myString', itemIndex, '');
                // Clone the current item to avoid mutating the original
                const item = { ...items[itemIndex] };
                // Add myString to the item's JSON
                item.json.myString = myString;
                returnItems.push(item);
            }
            catch (error) {
                // Determine the most appropriate error message
                const errorMessage = error instanceof Error
                    ? error.message
                    : error && typeof error === 'object' && 'message' in error
                        ? String(error.message)
                        : 'An unexpected error occurred';
                // Create a NodeOperationError
                const nodeError = new n8n_workflow_1.NodeOperationError({}, new Error(errorMessage), {
                    itemIndex,
                    description: errorMessage
                });
                // Handle error based on continueOnFail
                if (this.continueOnFail()) {
                    returnItems.push({
                        json: {},
                        error: nodeError,
                        pairedItem: itemIndex
                    });
                }
                else {
                    throw nodeError;
                }
            }
        }
        return [returnItems];
    }
}
exports.ExampleNode = ExampleNode;
