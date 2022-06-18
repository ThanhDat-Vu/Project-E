import { getClient } from '@lib/client';
import { Layout, HeroBanner } from 'components';

export default function Home({ heroBanner }) {
	return (
		<Layout>
			<HeroBanner heroBanner={heroBanner} />
		</Layout>
	);
}

// Reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
	const heroBannerQuery =
		'*[_type == "heroBanner"]{ heroImage, title, message, cta, product->{id, slug} }[0]';
	const heroBanner = await getClient(true).fetch(heroBannerQuery);
	return {
		props: {
			heroBanner,
		},
	};
}
