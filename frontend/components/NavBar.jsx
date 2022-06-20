import Link from 'next/link';
import { BsChevronDown, BsChevronUp } from 'react-icons/bs';

export default function NavBar({ collections }) {
	return (
		<div className='hidden lg:flex bg-white p-6 mb-8 drop-shadow-sm justify-center space-x-8 relative z-10'>
			{collections.map((collection) => (
				// Collections
				// ref: https://tailwindcss.com/docs/hover-focus-and-other-states#styling-based-on-parent-state
				// fix: https://stackoverflow.com/questions/71706064/react-18-hydration-failed-because-the-initial-ui-does-not-match-what-was-render
				<div className='group'>
					<Link href={`/collections/${collection.slug.current}`}>
						<a className='flex items-center hover:text-sky-400'>
							{collection.label}
							{collection.subCollections && (
								<BsChevronDown className='text-xs ml-1' />
							)}
						</a>
					</Link>

					{collection.subCollections && (
						// Sub Collections
						// ref: https://stackoverflow.com/questions/53047362/make-absolute-positioned-div-fit-content-width-and-overflow-parent-with-horizont
						<div className='hidden group-hover:block absolute top-12 min-w-max'>
							<BsChevronUp
								size='24px'
								className='absolute top-2 left-8 text-gray-200 bg-white'
							/>
							<div className='bg-white p-8 mt-6 border border-gray-200 space-y-4'>
								{collection.subCollections.map((subCollection) => (
									<Link href={`/collections/${subCollection.slug.current}`}>
										<a className='flex items-center hover:text-sky-400'>{subCollection.label}</a>
									</Link>
								))}
								<Link href={`/collections/${collection.slug.current}`}>
									<a className='flex items-center hover:text-sky-400'>Shop All</a>
								</Link>
							</div>
						</div>
					)}
				</div>
			))}
		</div>
	);
}
