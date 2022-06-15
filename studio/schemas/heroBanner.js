export default {
	name: 'heroBanner',
	type: 'document',
	title: 'Hero Banner',
	fields: [
		{
			name: 'heroImage',
			type: 'image',
			title: 'Hero Image',
		},
		{
			name: 'title',
			type: 'string',
			title: 'Title',
		},
		{
			name: 'slug',
			type: 'slug',
			tittle: 'Slug',
			options: {
				source: 'title',
			},
		},
		{
			name: 'message',
			type: 'text',
			title: 'Message',
		},
		{
			name: 'cta',
			type: 'string',
			title: 'Call to action',
		},
	],
};
