import { urlFor } from '@lib/sanity';

export default function HeroBanner({ data }) {
	return (
		<div className='mx-0 sm:mx-8 text-white relative'>
			<div className='h-[32rem] overflow-hidden relative'>
				<img
					src={urlFor(data.heroImage)}
					className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 min-h-full object-cover'
				/>
			</div>

			<div className='absolute inset-0 inline h-1/4 px-8 my-auto space-y-4 text-center sm:text-left'>
				<div className='p-4 sm:p-0 bg-black/50 sm:bg-black/0'>
					<p className='text-3xl'>{data.title}</p>
					<p className='whitespace-pre-line leading-8'>{data.message}</p>
				</div>
				<button className='text-black font-medium bg-white px-6 py-3 rounded-sm hover:bg-gray-200'>
					{data.cta}
				</button>
			</div>
		</div>
	);
}
