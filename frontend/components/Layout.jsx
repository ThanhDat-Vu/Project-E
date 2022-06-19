import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';

export default function Layout({ collections, children }) {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Header />
			<NavBar collections={collections} />
			{children}
			<Footer />
		</div>
	);
}
