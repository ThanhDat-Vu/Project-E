import SocialIcon from './SocialIcon';
import {
	BsFacebook,
	BsTwitter,
	BsInstagram,
	BsPinterest,
	BsYoutube,
	BsLinkedin,
} from 'react-icons/bs';

export default function Footer() {
	return (
		<div className='p-8 mt-8'>
			<div className='pt-8 border-t border-gray-800 flex flex-col-reverse md:flex-row'>
				{/* Copyright Information */}
				<div>
					<p>©headphones.com</p>
					<p>Powered by Next.js</p>
				</div>

				{/* Social Channels */}
				<div className='mb-8 md:ml-auto'>
					<p>Follow Us</p>
					<div className='flex items-center space-x-2 mt-4'>
						<SocialIcon to='#' hoverEffect={'hover:bg-blue-900'}>
							<BsFacebook />
						</SocialIcon>
						<SocialIcon to='#' hoverEffect={'hover:bg-sky-500'}>
							<BsTwitter />
						</SocialIcon>
						<SocialIcon to='#' hoverEffect={'hover:bg-rose-500'}>
							<BsInstagram />
						</SocialIcon>
						<SocialIcon to='#' hoverEffect={'hover:bg-red-700'}>
							<BsPinterest />
						</SocialIcon>
						<SocialIcon to='#' hoverEffect={'hover:bg-red-600'}>
							<BsYoutube />
						</SocialIcon>
						<SocialIcon to='#' hoverColor={'hover:bg-cyan-700'}>
							<BsLinkedin />
						</SocialIcon>
					</div>
				</div>

				{/* End */}
			</div>
		</div>
	);
}
