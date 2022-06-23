import ProductCard from './ProductCard';

export default function ProductCardSlider({ products, title }) {
	return (
		<div className='py-8'>
			<h3 className='text-2xl font-semibold mb-4'>{title}</h3>
			<div className='border flex flex-nowrap overflow-x-scroll'>
				{products.map((product) => (
					<ProductCard
						product={product}
						className='shrink-0 w-3/5 sm:w-2/5 md:w-1/4 lg:w-1/6'
						key={product._id}
					/>
				))}
			</div>
		</div>
	);
}
