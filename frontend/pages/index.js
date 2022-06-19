import { getClient } from '@lib/client';
import { Layout, HeroBanner } from 'components';

export default function Home({ heroBanner, collections }) {
	return (
		<Layout collections={collections}>
			<HeroBanner heroBanner={heroBanner} />
		</Layout>
	);
}

// Reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
	const heroBannerQuery =
		'*[_type == "heroBanner"]{ ... , product->{slug} }[0]';
	const heroBanner = await getClient(true).fetch(heroBannerQuery);

	const collectionsQuery =
		'*[_type == "collection" && isRoot]{ ..., subCollections[]->{ ... } }';
	const collections = await getClient(true).fetch(collectionsQuery);
	
	return {
		props: {
			heroBanner,
			collections,
		},
	};
}
