import { useRef, useEffect } from 'react';

// ref: https://stackoverflow.com/questions/32553158/detect-click-outside-react-component
// use: ddetect if a user clicks outside of the component
export default function OutsiderAlerter({ setShowPopover, children }) {
	const wrapperRef = useRef(null);

	useEffect(() => {
		function handleClickOutside(event) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setShowPopover(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef, setShowPopover]);

	return <div ref={wrapperRef}>{children}</div>;
}
