export default {
	title: 'Collection',
	name: 'collection',
	type: 'document',
	fields: [
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			title: 'Slug',
			name: 'slug',
			type: 'slug',
			options: {
				source: 'title',
			},
		},
		{
			title: 'Label',
			name: 'label',
			type: 'string',
		},
		{
			title: 'Sub Collections',
			name: 'subCollections',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: {
						type: 'collection',
					},
				},
			],
		},
	],
};
