import { getClient } from '@lib/client';
import { Layout, ProductCard } from 'components';

export default function Search({ collections, products }) {
	return (
		<Layout collections={collections}>
			<div>
				<p className='text-sm'>Home &gt; Search</p>
				<div className='bg-white my-8'>
					<div className='p-8'>
						<h1 className='text-2xl font-bold'>Search</h1>
					</div>
					<div className='grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-px'>
						{products.map((product, i) => (
							<ProductCard
								product={products[i]}
								withButtons={true}
								key={product._id}
							/>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}

export async function getServerSideProps({ query }) {
	const collectionsQuery =
		'*[_type == "collection" && title == "All"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	// use: get products by collection's slug
	const productsQuery = `*[_type == "product" ${ !query.q ? '' : `&& title match "${query.q}"`}]`;
	const products = await getClient(true).fetch(productsQuery);

	return {
		props: {
			collections,
			products,
		},
	};
}
