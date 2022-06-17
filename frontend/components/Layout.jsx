import Header from './Header';
import Footer from './Footer';

export default function Layout({ children }) {
	return (
		<div className='min-h-screen bg-gray-100'>
			<Header />
			{children}
			<Footer />
		</div>
	);
}
