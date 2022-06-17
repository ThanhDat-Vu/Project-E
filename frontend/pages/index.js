import { getClient } from '@lib/client';
import { Layout, HeroBanner } from 'components';

export default function Home({ heroBannerData }) {
	return (
		<div>
			<Layout>
				<HeroBanner data={heroBannerData[0]} />
			</Layout>
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
