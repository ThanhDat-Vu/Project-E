import Link from 'next/link';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export default function NavBar({ collections }) {
	return (
		<div className='hidden lg:flex bg-white p-6 mb-8 drop-shadow-sm flex justify-center space-x-8 relative z-10'>
			{collections.map((collection) => (
				// Root Items
				<Link href='#'>
					{/* ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state */}
					<a className='flex items-center relative group'>
						{collection.label}
						{collection.subCollections && (
							<>
								<BsChevronDown className='text-xs ml-1 relative' />
								{/* ref: https://stackoverflow.com/questions/53047362/make-absolute-positioned-div-fit-content-width-and-overflow-parent-with-horizont */}
								<div className='hidden group-hover:block absolute top-6 min-w-max'>
									<BsChevronUp
										size='24px'
										className='absolute top-2 left-8 text-gray-200 bg-white'
									/>
									<div className='bg-white p-8 mt-6 border border-gray-200 space-y-4'>
										{collection.subCollections.map((subCollection) => (
											<Link href='#'>
												<a
													className={`flex items-center relative ${
														subCollection.subCollections ? 'peer' : ''
													}`}
												>
													{subCollection.label}
												</a>
											</Link>
										))}
									</div>
								</div>
							</>
						)}
					</a>
				</Link>
			))}
		</div>
	);
}
