export default {
	name: 'heroBanner',
	type: 'document',
	title: 'Hero Banner',
	fields: [
		{
			title: 'Hero Image',
			name: 'heroImage',
			type: 'image',
			options: {
				hotspot: true,
			},
		},
		{
			title: 'Title',
			name: 'title',
			type: 'string',
		},
		{
			name: 'message',
			type: 'string',
			title: 'Message',
		},
		{
			name: 'cta',
			type: 'string',
			title: 'Call to action',
		},
		{
			title: 'Product',
			name: 'product',
			type: 'reference',
			to: {
				type: 'product',
			},
		},
	],
};
