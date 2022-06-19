import { getClient } from '@lib/client';
import { useState } from 'react';
import { Layout } from '../../components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { urlFor } from '@lib/sanity';
import { useCartContext } from 'context/CartContext';

export default function ProductDetails({ collections, product }) {
	const [index, setIndex] = useState(0);

	const { addItem } = useCartContext();

	return (
		<Layout collections={collections}>
			{/* Queue Jumping Layout */}
			{/* ref: https://stackoverflow.com/questions/44603729/how-to-use-flexbox-to-layout-multiple-columns */}
			<div className='px-8 relative'>
				<div className='flex flex-col space-y-4'>
					{/* Product Images */}
					<div className='bg-white px-8 py-12 lg:mr-[29rem] flex flex-col-reverse lg:flex-row'>
						{/* Image Selection */}
						<div className='shrink-0 max-h-96 overflow-hidden'>
							<div className='w-full h-full pr-8 box-content overflow-y-scroll flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2'>
								{product.images.map((image, i) => (
									<img
										src={urlFor(image)}
										alt={image.name}
										key={image._key}
										className={`w-20 ${
											i === index && 'border-2 border-sky-500 rounded-sm'
										}`}
										onClick={() => setIndex(i)}
									/>
								))}
							</div>
						</div>
						{/* Selected Image */}
						<div className='mb-8 lg:mb-0'>
							<img src={urlFor(product.images[index])} alt={product.name} />
						</div>
					</div>

					{/* Product Details */}
					{/* Queue Jumper */}
					<div className='lg:absolute lg:-top-4 lg:right-8 lg:w-[28rem] lg:h-full'>
						<div className='sticky top-0 bg-white p-8'>
							{/* Details */}
							<h1 className='text-2xl font-medium mb-4'>{product.title}</h1>
							<div className='text-amber-500 mb-4 flex items-center space-x-1'>
								<BsStarFill />
								<BsStarFill />
								<BsStarFill />
								<BsStarHalf />
								<BsStar />
								<p className='text-sm text-gray-800 underline underline-offset-4'>
									Read X Reviews
								</p>
							</div>
							<p className='text-3xl font-medium mb-4'>${product.price}</p>
							<div className='text-sm leading-6 mb-4'>
								<p className='text-green-700 font-semibold'>In stock</p>
								<p>Ships same business day (Monday - Friday)</p>
								<p>Order by XXhrs XXmins For Free X Overnight</p>
							</div>

							{/* Buttons */}
							<button
								className='w-full bg-sky-500 text-white font-bold py-3 rounded-sm mb-4 hover:bg-sky-400'
								onClick={() => addItem(product)}
							>
								Add to cart
							</button>
							<div className='h-4 border-b border-gray-200 text-center mb-8'>
								<span className='bg-white px-4'>or quick checkout with</span>
							</div>
							<button className='w-full bg-stone-700 text-white font-bold py-3 rounded-sm hover:bg-stone-600'>
								Buy it now
							</button>

							{/* End */}
						</div>
					</div>

					{/* Product Description */}
					<div className='bg-white p-8 lg:mr-[29rem] space-y-4'>
						<h3 className='text-2xl font-semibold'>Description</h3>
						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
							eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
							enim ad minim veniam, quis nostrud exercitation ullamco laboris
							nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in
							reprehenderit in voluptate velit esse cillum dolore eu fugiat
							nulla pariatur. Excepteur sint occaecat cupidatat non proident,
							sunt in culpa qui officia deserunt mollit anim id est laborum.
						</p>
					</div>

					{/* End */}
				</div>
			</div>
		</Layout>
	);
}

// ref: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// use: define a list of paths to be statically generated
export async function getStaticPaths() {
	const productSlugsQuery = '*[_type == "product"].slug.current';
	const productSlugs = await getClient(true).fetch(productSlugsQuery);

	return {
		paths: productSlugs.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const collectionsQuery =
	'*[_type == "collection" && isRoot]{ ..., subCollections[]->{ ... } }';
	const collections = await getClient(true).fetch(collectionsQuery);

	const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
	const product = await getClient(true).fetch(productQuery);

	return {
		props: {
			collections,
			product
		},
	};
}
