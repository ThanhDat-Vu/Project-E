import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ collections, children }) {
	return (
		<div className='max-w-screen min-h-screen bg-gray-100 overflow-x-hidden'>
			<Header collections={collections} />
			<NavBar collections={collections} />
			<div className='p-8 pt-0 sm:pt-8'>{children}</div>
			<Footer />
		</div>
	);
}
