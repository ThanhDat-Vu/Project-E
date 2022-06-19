import { useState } from 'react';
import {
	BsList,
	BsX,
	BsChevronRight,
	BsChevronLeft,
	BsEnvelope,
} from 'react-icons/bs';
import Link from 'next/link';

export default function MobileDrawer({ collections }) {
	const [showDrawer, setShowDrawer] = useState(false);
	const [showSubDrawer, setSubDrawer] = useState(false);

	return (
		<div className='lg:hidden ml-1 mr-2 relative'>
			{/* Hamburger Menu Button */}
			{!showDrawer ? (
				<button onClick={() => setShowDrawer(true)}>
					<BsList size='28px' />
				</button>
			) : (
				<>
					<button
						onClick={() => {
							setSubDrawer(false);
							setShowDrawer(false);
						}}
					>
						<BsX size='28px' />
					</button>
					{/* Collections Menu */}
					<div className='absolute top-14 -left-5 sm:-left-7 w-screen z-10 p-8 bg-white space-y-6'>
						{collections.map((collection) => (
							<button
								className='w-full flex items-center'
								onClick={() =>
									setSubDrawer(
										collection.subCollections
											? {
													label: collection.label,
													subCollections: collection.subCollections,
											  }
											: false
									)
								}
							>
								{collection.label}
								{collection.subCollections && (
									<BsChevronRight className='text-xs ml-auto' />
								)}
							</button>
						))}
						<hr className='-mx-8' />
						<p className='font-semibold'>NEED HELP?</p>
						<div className='flex items-center'>
							<BsEnvelope size='24px' />
							<p className='ml-4'>info@headphones.com</p>
						</div>
						{/* Sub Collections Menu */}
						{showSubDrawer && (
							<div className='absolute -top-6 left-0 w-screen min-h-full z-10 p-8 bg-white space-y-6'>
								<button
									className='flex items-center'
									onClick={() => setSubDrawer(false)}
								>
									<BsChevronLeft className='text-xs mr-2' />
									Back
								</button>
								<hr className='-mx-8' />
								<p className='font-semibold'>{showSubDrawer.label}</p>
								{showSubDrawer.subCollections.map((subCollection) => (
									<Link href='#'>
										<a className='flex items-center'>{subCollection.label}</a>
									</Link>
								))}
								<Link href='#'>
									<a className='flex items-center'>Shop All</a>
								</Link>
							</div>
						)}
					</div>
				</>
			)}
		</div>
	);
}
