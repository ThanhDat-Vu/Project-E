import { getClient } from '@lib/client';
import { useEffect } from 'react';
import { useCartContext } from 'context/CartContext';
import { Layout } from 'components';
import Link from 'next/link';
import { BsBagCheckFill } from 'react-icons/bs';
import { runFireworks } from '@lib/fireworks';

export default function Success({ collections }) {

	const {
		setTotalQty,
		setItems,
		setTotal,
	} = useCartContext();

	useEffect(() => {
		localStorage.clear();
		setTotalQty(0);
		setItems([]);
		setTotal(0);
		runFireworks();
	}, []);


	return (
		<Layout collections={collections}>
			<div className='w-fit bg-white px-12 py-16 mx-auto text-center'>
				<BsBagCheckFill size='40px' className='text-green-600 mx-auto mb-2' />
				<p className='text-3xl font-semibold mb-8'>Thank you for your purchase!</p>
				<p className='mb-2'>Check your email inbox for the receipt.</p>
				<p className='mb-12'>If you have any question, please email to info@headphones.com</p>
				<Link href='/'>
					<a className='bg-sky-500 text-white font-bold px-12 py-3 rounded-sm mb-4 hover:bg-sky-400'>
						CONTINUE SHOPPING
					</a>
				</Link>
			</div>
		</Layout>
	);
}

export async function getStaticProps() {
	const collectionsQuery =
		'*[_type == "collection" && title == "All"]{ subCollections[]->{ ..., subCollections[]->{ ... } } }[0].subCollections';
	const collections = await getClient(true).fetch(collectionsQuery);

	return {
		props: {
			collections,
		},
	};
}

