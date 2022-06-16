import { getClient } from '@lib/client';
import HeroBanner from 'components/HeroBanner';

export default function Home({ heroBannerData }) {
	return (
		<div>
			<HeroBanner data={heroBannerData[0]} />
		</div>
	);
}

// Reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
	const heroBannerQuery = '*[_type == "heroBanner"]';
	const heroBannerData = await getClient(true).fetch(heroBannerQuery);

	return {
		props: {
			heroBannerData,
		},
	};
}
