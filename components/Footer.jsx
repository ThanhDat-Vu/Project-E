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
		<div className='px-4 sm:px-8'>
			<div className='pt-8 border-t border-gray-800 flex flex-col-reverse md:flex-row'>
				{/* Copyright Information */}
				<div>
					<p>©headphones.com</p>
					<p>Powered by Next.js</p>
				</div>

				{/* Social Channels */}
				<div className='mb-8 md:ml-auto'>
					<p>Follow Us</p>
					<div className='flex items-center mt-4'>
						<SocialIcon
							to='https://www.facebook.com/headphonesdotcom'
							hoverEffect={'hover:bg-blue-900'}
							icon={<BsFacebook />}
						/>
						<SocialIcon
							to='https://twitter.com/HeadphoneDotCom'
							hoverEffect={'hover:bg-sky-500'}
							icon={<BsTwitter />}
						/>
						<SocialIcon
							to='https://www.instagram.com/headphones_dot_com/'
							hoverEffect={'hover:bg-rose-500'}
							icon={<BsInstagram />}
						/>
						<SocialIcon
							to='https://www.pinterest.ca/headphonesdotcom/'
							hoverEffect={'hover:bg-red-700'}
							icon={<BsInstagram />}
						/>
						<SocialIcon
							to='https://www.youtube.com/channel/UCt44wdefZzrhNDYYAyEy3Xg'
							hoverEffect={'hover:bg-red-600'}
							icon={<BsYoutube />}
						/>
						<SocialIcon
							to='https://www.linkedin.com/company/headphones.com'
							hoverEffect={'hover:bg-cyan-700'}
							icon={<BsLinkedin />}
						/>
					</div>
				</div>

				{/* End */}
			</div>
		</div>
	);
}
