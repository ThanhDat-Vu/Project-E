export default {
	title: 'Product',
	name: 'product',
	type: 'document',
	fields: [
		{
			title: 'Thumbnail',
			name: 'thumbnail',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			title: 'Images',
			name: 'images',
			type: 'array',
			of: [
				{
					type: 'image',
					options: {
						hotspot: true,
					},
				},
			],
		},
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
			title: 'Price',
			name: 'price',
			type: 'number',
		},
		{
			title: 'Percent Off',
			name: 'percentOff',
			type: 'number',
		},
		{
			title: 'Collections',
			name: 'collections',
			type: 'array',
			of: [
				{
					type: 'reference',
					to: {
						type: 'collection',
					}
				}
			]
		}
	],
};
