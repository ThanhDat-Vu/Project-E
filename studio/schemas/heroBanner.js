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
			tittle: 'Slug',
			name: 'slug',
			type: 'slug',
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
