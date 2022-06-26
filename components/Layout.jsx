import Header from './Header';
import NavBar from './NavBar';
import Footer from './Footer';
import Head from 'next/head';

export default function Layout({ collections, title, children }) {
	return (
		<>
			<Head>
				<title>{title}</title>
				<meta
					name='description'
					content='Our best selling headphones, amps, DACs and more. They might represent incredible value, incredible sound or both in one package! Check them out!'
				/>
			</Head>
			<div className='max-w-screen min-h-screen bg-gray-100 overflow-x-hidden'>
				<Header collections={collections} />
				<NavBar collections={collections} />
				<div className='p-4 sm:p-8 pt-0 sm:pt-8'>{children}</div>
				<Footer />
			</div>
		</>
	);
}
