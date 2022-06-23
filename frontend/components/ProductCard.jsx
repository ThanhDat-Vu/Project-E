import { urlFor } from '@lib/sanity';
import Link from 'next/link';
import { useCartContext } from 'context/CartContext';

export default function ProductCard({ product, className, withButtons }) {
	const { addItem } = useCartContext();

	return (
		<div
			className={`p-4 bg-white flex flex-col space-y-2 outline outline-1 outline-gray-200 ${className}`}
		>
			<Link href={`/products/${product.slug.current}`}>
				<img src={urlFor(product.thumbnail)} className='cursor-pointer' />
			</Link>
			<p className='text-xl text-sky-500'>${product.price}</p>
			<Link href={`/products/${product.slug.current}`}>
				<a className='font-semibold'>{product.title}</a>
			</Link>
			<Link href={`#`}>
				<a className='text-sm'>{product.vendor.toUpperCase()}</a>
			</Link>
			{withButtons && (
				<>
					<div className='h-4 grow' />
					<button
						className='bg-sky-500 text-white font-bold py-2 rounded-sm hover:bg-sky-400'
						onClick={() => addItem(product)}
					>
						Add to cart
					</button>
					<button className='text-sky-500 font-bold py-2 border rounded-sm hover:text-gray-800 hover:bg-gray-200'>
						Quick view
					</button>
				</>
			)}
		</div>
	);
}
