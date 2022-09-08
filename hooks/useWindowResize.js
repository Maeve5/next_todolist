import { useState, useEffect } from 'react';

function useWindowResize() {
	const [width, setWidth] = useState(0)

	useEffect (() => {

		const windowResize = () => {
			setWidth(window.innerWidth)
		};

		// 계속해서 바인딩 발생?
		window.addEventListener('resize', windowResize);
		windowResize();

		return () => {
			// 새로운 바인딩 발생 전 기존 리스너 제거
			window.removeEventListener('resize', windowResize);
		}
	}, []);

	return width;
}

export default useWindowResize;