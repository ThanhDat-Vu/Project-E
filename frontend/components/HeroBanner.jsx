import { urlFor } from '@lib/sanity';
import Link from 'next/link';

export default function HeroBanner({ heroBanner }) {
	return (
		<div className='-mx-8 sm:mx-0 text-white relative'>
			<div className='h-[32rem] overflow-hidden relative'>
				<img
					src={urlFor(heroBanner?.heroImage)}
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full object-cover'
					alt='Hero Banner Image'
				/>
			</div>
			<div className='absolute inset-0 inline h-1/4 px-8 my-auto space-y-4 text-center sm:text-left'>
				<div className='p-4 sm:p-0 bg-black/50 sm:bg-black/0'>
					<p className='text-3xl'>{heroBanner?.title}</p>
					<p className='whitespace-pre-line leading-8'>{heroBanner?.message}</p>
				</div>
				<Link href={`/products/${heroBanner?.product?.slug.current}`}>
					<a className='inline-block text-black font-medium bg-white px-6 py-3 rounded-sm hover:bg-gray-200'>
						{heroBanner?.cta}
					</a>
				</Link>
			</div>
		</div>
	);
}
