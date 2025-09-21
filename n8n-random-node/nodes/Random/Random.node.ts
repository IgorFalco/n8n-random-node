import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionType } from 'n8n-workflow';

export class Random implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Random',
		name: 'randomNode',
		group: ['transform'],
		version: 1,
		description: 'Generate a true random number using random.org',
		defaults: {
			name: 'Random',
		},
		icon: 'file:random.svg',
		inputs: [NodeConnectionType.Main],
		outputs: [NodeConnectionType.Main],
		usableAsTool: true,
		properties: [
			{
				displayName: 'Operation',
				name: 'operation',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'True Random Number Generator',
						value: 'trueRandom',
						description: 'Generate a true random number using random.org',
					},
				],
				default: 'trueRandom',
			},
			{
				displayName: 'Min',
				name: 'min',
				type: 'number',
				default: 1,
				description: 'Minimum value',
			},
			{
				displayName: 'Max',
				name: 'max',
				type: 'number',
				default: 100,
				description: 'Maximum value',
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const operation = this.getNodeParameter('operation', 0) as string;
		const min = this.getNodeParameter('min', 0) as number;
		const max = this.getNodeParameter('max', 0) as number;

		switch (operation) {
			case 'trueRandom': {

				if (min === undefined || max === undefined) {
					throw new Error('Min and Max values must be provided');
				}

				if (min >= max) {
					throw new Error('Min value must be less than max value');
				}

				const response = await this.helpers.httpRequest({
					method: 'GET',
					url: 'https://www.random.org/integers/',
					qs: {
						num: 1,
						min,
						max,
						col: 1,
						base: 10,
						format: 'plain',
						rnd: 'new',
					},
				});

				const number = parseInt(response, 10);

				if (isNaN(number)) {
					throw new Error('Invalid response from random.org');
				}
				
				return [[{ json: { number } }]];
			}

			default:
				throw new Error(`The operation "${operation}" is not supported!`);
		}
	}
}
