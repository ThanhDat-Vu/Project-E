export default function SocialIcon({ to, hoverEffect, children }) {
	return (
		<div
			className={`h-8 w-8 bg-gray-500 rounded-full hover:cursor-pointer ${hoverEffect} flex items-center text-white`}
		>
			<a href={to} className='mx-auto'>
				{children}
			</a>
		</div>
	);
}
