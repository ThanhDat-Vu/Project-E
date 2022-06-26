import { useEffect } from 'react';
import OutsiderAlerter from './OutsiderAlerter';
import { BsCart2, BsCaretUpFill, BsDash, BsPlus } from 'react-icons/bs';
import Link from 'next/link';
import { urlFor } from '@lib/sanity';
import { useCartContext } from 'context/CartContext';
import getStripe from '@lib/stripe';

export default function Cart() {
	const {
		showCart,
		setShowCart,
		totalQty,
		setTotalQty,
		items,
		setItems,
		total,
		setTotal,
		adjustQuantity,
	} = useCartContext();

	useEffect(() => {
		const cart = JSON.parse(localStorage.getItem('cart'));
		if (cart) {
			setTotalQty(cart.totalQty);
			setItems(cart.items);
			setTotal(cart.total);
		}
	}, []);

	const handleCheckout = async () => {
		// create a Checkout Session.
		const res = await fetch('/api/checkout_sessions', {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify(items),
		});
		if (res.status === 500) return;
		const checkoutSession = await res.json();

		// redirect to Checkout
		const stripe = await getStripe();
		stripe.redirectToCheckout({
			sessionId: checkoutSession.id,
		});
	};

	return (
		<OutsiderAlerter setShowPopover={setShowCart}>
			{/* Cart Icon */}
			<div className='relative'>
				<div
					className='ml-4 lg:ml-8 cursor-pointer flex items-center'
					onClick={() => setShowCart(!showCart)}
				>
					<div className='mr-4 relative'>
						<BsCart2 size='28px' />
						<div className='absolute -top-1 -right-2 w-5 h-5 text-xs text-white font-bold text-center leading-none bg-sky-400 p-1 rounded-full hover:scale-125'>
							{totalQty}
						</div>
					</div>
					<p className='hidden lg:block font-semibold'>Cart</p>
				</div>

				{/* Cart Popover */}
				{showCart && (
					<div className='absolute top-12 -right-4 sm:right-0 z-10 drop-shadow-xl z-20'>
						<BsCaretUpFill
							size='24px'
							className='absolute -top-4 right-4 lg:right-12 text-white'
						/>
						<div className='flex flex-col w-screen sm:w-[28rem] bg-white p-6'>
							<p className='bg-gray-200 text-center font-semibold py-2'>
								{total < 100
									? `Spend $${new Intl.NumberFormat().format(
											100 - total
									  )} more and get free shipping!`
									: 'You are eligible for free shipping!'}
							</p>
							{items.length ? (
								<>
									<div className='my-auto space-y-4 divide-y'>
										{/* Items Cards */}
										{items.map((item, i) => (
											<div key={i} className='flex text-sm py-4 space-x-2'>
												<img src={urlFor(item.thumbnail)} className='h-24' />

												<div className='grow sm:flex space-y-4'>
													{/* Item's Information */}
													<div className='grow space-y-2'>
														<p className='font-light hover:text-blue-500 cursor-pointer'>
															{item.vendor}
														</p>
														<Link href={`/products/${item.slug.current}`}>
															<p className='font-semibold hover:text-blue-500 cursor-pointer'>
																{item.title}
															</p>
														</Link>
														<p className='text-blue-500'>${item.price}</p>
													</div>

													{/* Input Steppers */}
													<div className='flex sm:block'>
														<div className='flex border border-gray-200 rounded-sm my-auto'>
															<button
																className='p-2 text-gray-400 hover:text-gray-900'
																onClick={() => adjustQuantity(item, -1)}
															>
																<BsDash size='20px' />
															</button>
															<input
																type='text'
																value={item.quantity}
																readOnly
																className='w-4 text-center text-md mx-2 focus:outline-none'
															/>
															<button
																className='p-2 text-gray-400 hover:text-gray-900'
																onClick={() => adjustQuantity(item, 1)}
															>
																<BsPlus size='20px' />
															</button>
														</div>

														<button
															className='block ml-4 sm:mx-auto sm:mt-2 hover:text-sky-500'
															onClick={() =>
																adjustQuantity(item, -item.quantity)
															}
														>
															Remove
														</button>
													</div>
												</div>
											</div>
										))}
									</div>
									<hr className='-mx-6' />
									<div className='flex justify-between py-2 font-semibold'>
										<p>Total</p>
										<p>${new Intl.NumberFormat().format(total)}</p>
									</div>
									<div className='flex space-x-4'>
										<button
											className='grow bg-stone-700 text-white font-bold py-3 rounded-sm hover:bg-stone-600'
											onClick={() => {
												alert('This feature is under development!');
											}}
										>
											View Cart
										</button>
										<button
											className='grow bg-sky-500 text-white font-bold py-3 rounded-sm hover:bg-sky-400'
											onClick={handleCheckout}
										>
											Checkout
										</button>
									</div>
								</>
							) : (
								<div>
									<div className='h-64 flex flex-col justify-center my-auto space-y-4'>
										<BsCart2 size='64px' className='mx-auto' />
										<p className='text-center font-semibold text-lg'>
											Your cart is empty
										</p>
									</div>
									<Link href='/collections/all'>
										<button
											className='w-full bg-sky-500 text-white font-bold py-3 rounded-sm hover:bg-sky-400'
											onClick={() => setShowCart(false)}
										>
											Shop our products
										</button>
									</Link>
								</div>
							)}
						</div>
					</div>
				)}
			</div>
		</OutsiderAlerter>
	);
}
