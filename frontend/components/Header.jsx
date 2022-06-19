import Link from 'next/link';
import Logo from '../assets/Headphones.com_Logo_March_6th_2020_235x@2x.webp';
// ref: https://react-icons.github.io/react-icons/
import { BsChevronDown, BsSearch, BsPerson } from 'react-icons/bs';
import MobileDrawer from './MobileDrawer';
import Cart from './Cart';

export default function Header({ collections }) {
	return (
		<div className='p-4 sm:p-6 flex items-center'>
			{/* Mobile Drawer */}
			<MobileDrawer collections={collections} />

			{/* Logo */}
			<Link href='/'>
				<img src={Logo.src} className='h-12 md:h-16 cursor-pointer' />
			</Link>

			{/* Search and Filters */}
			<div className='grow sm:ml-8 rounded-sm overflow-hidden flex'>
				<input
					type='text'
					placeholder='Search...'
					className='grow px-4 hidden sm:block'
				/>
				<div className='hidden items-center bg-white px-6 border-l border-sky-200 lg:flex'>
					<p>All categories</p>
					<BsChevronDown className='text-xs ml-1' />
				</div>
				<div className='p-3 sm:text-white sm:bg-sky-400 ml-auto'>
					<BsSearch size='24px' />
				</div>
			</div>

			{/* Authentication */}
			<div>
				<div className='hidden lg:block px-8 border-r border-gray-200'>
					<p className='text-sky-400'>Login/Signup</p>
					<div className='flex items-center'>
						<p className='font-semibold'>My account</p>
						<BsChevronDown className='text-xs ml-1' />
					</div>
				</div>

				<div className='lg:hidden ml-2 sm:ml-8'>
					<BsPerson size='28px' />
				</div>
			</div>

			{/* Cart */}
			<Cart />

			{/* End */}
		</div>
	);
}
