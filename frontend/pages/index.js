import { getClient } from '@lib/client';

export default function Home() {
	return <div>Hello World</div>;
}

// Reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
	const heroBannerQuery = '*[_type == "heroBanner"]';
	const heroBannerData = await getClient(true).fetch(heroBannerQuery);
	console.log(heroBannerData)
	return {
		props: {
			heroBannerData,
		},
	};
}
