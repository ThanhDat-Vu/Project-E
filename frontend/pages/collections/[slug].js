import { getClient } from '@lib/client';
import { Layout, ProductCard } from 'components';

export default function ProductDetails({ collections, currCollection, products }) {
	return (
		<Layout collections={collections}>
			<div className='px-8'>
				<p className='text-sm'>Home &gt; {currCollection.title}</p>
				<div className='bg-white my-8'>
					<div className='p-8'>
						<h1 className='text-2xl font-bold'>{currCollection.title}</h1>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px'>
						{products.map((product) => (
							<ProductCard product={products[0]} key={product._id} />
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

// ref: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// use: define a list of paths to be statically generated
export async function getStaticPaths() {
	const productSlugsQuery = '*[_type == "collection" && slug.current != null].slug.current';
	const productSlugs = await getClient(true).fetch(productSlugsQuery);

	return {
		paths: productSlugs.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const collectionsQuery =
		'*[_type == "collection" && title == "Navigation Bar"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	const currCollectionQuery = `*[_type == "collection" && slug.current == "${slug}"]{ title }[0]`;
	const currCollection = await getClient(true).fetch(currCollectionQuery);

	// use: get products by collection's slug
	const productsQuery = `*[_type == "product" && collections[]._ref match *[_type == "collection" && slug.current == "${slug}"][0]._id]`;
	const products = await getClient(true).fetch(productsQuery);

	return {
		props: {
			collections,
			currCollection,
			products,
		},
	};
}
