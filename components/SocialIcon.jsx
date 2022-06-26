export default function SocialIcon({ to, hoverEffect, icon, children }) {
	return (
		<a href={to} className='flex items-center' target="_blank">
			<span
				className={`h-8 w-8 bg-gray-500 rounded-full mr-2 hover:cursor-pointer ${hoverEffect} flex items-center text-white`}
			>
				<span className="mx-auto">{icon}</span>
			</span>
			{children}
		</a>
	);
}
