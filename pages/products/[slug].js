import { getClient } from '@lib/client';
import getStripe from '@lib/stripe';
import { useState } from 'react';
import Error from 'next/error';
import { Layout, ProductCardSlider } from '../../components';
import { BsStarFill, BsStarHalf, BsStar } from 'react-icons/bs';
import { urlFor } from '@lib/sanity';
import { useCartContext } from 'context/CartContext';

export default function ProductDetails({ collections, product, youMayLike }) {
	const [index, setIndex] = useState(0);

	const { addItem } = useCartContext();

	const handleBuyNow = async () => {
		console.log([{ ...product, quantity: 1 }]);
		// create a Checkout Session.
		const res = await fetch('/api/checkout_sessions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify([{ ...product, quantity: 1 }]),
		});
		if (res.status === 500) return;
		const checkoutSession = await res.json();

		// redirect to Checkout
		const stripe = await getStripe();
		stripe.redirectToCheckout({
			sessionId: checkoutSession.id,
		});
	};

	if (!product) {
		return <Error statusCode={404} />;
	}

	return (
		<Layout
			collections={collections}
			title={`${product?.title} - Headphones.com`}
		>
			{/* Queue Jumping Layout */}
			{/* ref: https://stackoverflow.com/questions/44603729/how-to-use-flexbox-to-layout-multiple-columns */}
			<div className='sm:pr-8 relative'>
				<div className='flex flex-col space-y-4'>
					{/* Product Images */}
					<div className='bg-white px-8 py-12 lg:mr-[29rem] border flex flex-col-reverse lg:flex-row'>
						{/* Image Selection */}
						<div className='shrink-0 max-h-96 overflow-hidden'>
							<div className='w-full h-full pr-8 box-content overflow-y-scroll flex flex-row lg:flex-col space-x-2 lg:space-x-0 lg:space-y-2'>
								{product?.images.map((image, i) => (
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
							<img src={urlFor(product?.images[index])} alt={product?.name} />
						</div>
					</div>

					{/* Product Details */}
					{/* Queue Jumper */}
					<div className='lg:absolute lg:-top-4 lg:right-8 lg:w-[28rem] lg:h-full'>
						<div className='sticky top-0 bg-white px-6 py-8 border'>
							{/* Details */}
							<h1 className='text-2xl font-medium mb-4'>{product?.title}</h1>
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
							<p className='text-3xl font-medium mb-4'>${product?.price}</p>

							{product?.inStock ? (
								<>
									<div className='text-sm leading-6 mb-4'>
										<p className='text-green-700 font-semibold'>In stock</p>
										<p>Ships same business day (Monday - Friday)</p>
									</div>
									<button
										className='w-full bg-sky-500 text-white font-bold py-3 rounded-sm mb-4 hover:bg-sky-400'
										onClick={() => addItem(product)}
									>
										Add to cart
									</button>
									<div className='h-4 border-b border-gray-200 text-center mb-8'>
										<span className='bg-white px-4'>
											or quick checkout with
										</span>
									</div>
									<button
										className='w-full bg-stone-700 text-white font-bold py-3 rounded-sm hover:bg-stone-600'
										onClick={() => handleBuyNow()}
									>
										Buy it now
									</button>
								</>
							) : (
								<>
									<div className='text-sm leading-6 mb-4'>
										<p className='text-red-600 font-semibold'>Out of stock</p>
										<p>
											Currently on Backorder. Join our E-mail list to be
											notified as soon as it is back in stock.
										</p>
									</div>
									<button className='w-full bg-gray-400 text-white font-bold py-3 rounded-sm mb-4 cursor-not-allowed'>
										Sold out
									</button>
								</>
							)}
						</div>
					</div>

					{/* Product Description */}
					<div className='bg-white p-8 lg:mr-[29rem] space-y-4 border'>
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

					{/* "You may also like" Products */}
					<ProductCardSlider products={youMayLike} title='You may also like' />

					{/* End */}
				</div>
			</div>
		</Layout>
	);
}

// ref: https://nextjs.org/docs/basic-features/data-fetching/get-static-paths
// use: define a list of paths to be statically generated
export async function getStaticPaths() {
	const productSlugsQuery =
		'*[_type == "product" && slug.current != null].slug.current';
	const productSlugs = await getClient(true).fetch(productSlugsQuery);

	return {
		paths: productSlugs.map((slug) => ({ params: { slug } })),
		fallback: true,
	};
}

export async function getStaticProps({ params: { slug } }) {
	const collectionsQuery =
		'*[_type == "collection" && title == "All"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	const productQuery = `*[_type == "product" && slug.current == "${slug}"][0]`;
	const product = await getClient(true).fetch(productQuery);

	const youMayLikeQuery = '*[_type == "product"][0...12]';
	const youMayLike = await getClient(true).fetch(youMayLikeQuery);

	return {
		props: {
			collections,
			product,
			youMayLike,
		},
		revalidate: 10,
	};
}
