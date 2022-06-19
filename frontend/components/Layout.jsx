import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ collections, children }) {
	return (
		<div className='max-w-screen min-h-screen bg-gray-100 overflow-x-hidden'>
			<Header collections={collections} />
			<NavBar collections={collections} />
			{children}
			<Footer />
		</div>
	);
}
