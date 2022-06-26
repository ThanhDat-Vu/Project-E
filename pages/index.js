import { getClient } from '@lib/client';
import { Layout, HeroBanner, ProductCardSlider } from 'components';

export default function Home({ collections, heroBanner, bestSellers }) {
	return (
		<Layout collections={collections} title='Shop for the Best Audiophile Headphones'>
			<HeroBanner heroBanner={heroBanner} />
			<ProductCardSlider products={bestSellers} title='Our Best Sellers' />
		</Layout>
	);
}

// Reference: https://nextjs.org/docs/basic-features/data-fetching/get-static-props
export async function getStaticProps() {
	const collectionsQuery =
		'*[_type == "collection" && title == "All"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	const heroBannerQuery =
		'*[_type == "heroBanner"]{ ... , product->{slug} }[0]';
	const heroBanner = await getClient(true).fetch(heroBannerQuery);

	const bestSellersQuery =
		'*[_type == "product" && collections[]._ref match "b0583b05-81c5-4bff-bf4e-315b9b75545a"][0...12]';
	const bestSellers = await getClient(true).fetch(bestSellersQuery);

	return {
		props: {
			collections,
			heroBanner,
			bestSellers,
		},
	};
}
