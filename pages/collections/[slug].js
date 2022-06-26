import { getClient } from '@lib/client';
import Error from 'next/error';
import { Layout, ProductCard } from 'components';

export default function Collection({ collections, currCollection, products }) {
	if (!currCollection) {
		<Error statusCode={404} />;
	}

	return (
		<Layout collections={collections} title={currCollection?.title}>
			<p className='text-sm'>Home &gt; {currCollection?.title}</p>
			<div className='-mx-4 sm:mx-0 my-8 bg-white border'>
				<div className='p-8 space-y-4'>
					<h1 className='text-2xl font-bold'>{currCollection?.title}</h1>
					<p className=''>
						<span className='font-bold'>{products?.length}</span> product
						{products?.length > 1 ? 's' : ''}
					</p>
				</div>
				<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px'>
					{products?.map((product, i) => (
						<ProductCard
							product={products[i]}
							withButtons={true}
							key={product._id}
						/>
					))}
				</div>
			</div>
		</Layout>
	);
}

// ref: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// use: define a list of paths to be statically generated
export async function getStaticPaths() {
	const collectionSlugsQuery =
		'*[_type == "collection" && slug.current != null].slug.current';
	const collectionSlugs = await getClient(true).fetch(collectionSlugsQuery);

	return {
		paths: collectionSlugs.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const collectionsQuery =
		'*[_type == "collection" && title == "All"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	const currCollectionQuery = `*[_type == "collection" && slug.current == "${slug}"]{ title }[0]`;
	const currCollection = await getClient(true).fetch(currCollectionQuery);

	// use: get products by collection's slug
	const productsQuery = `*[_type == "product" ${
		slug == 'all'
			? ''
			: `&& *[_type == "collection" && slug.current == "${slug}"][0]._id in collections[]._ref`
	}]`;
	const products = await getClient(true).fetch(productsQuery);

	return {
		props: {
			collections,
			currCollection,
			products,
		},
	};
}
