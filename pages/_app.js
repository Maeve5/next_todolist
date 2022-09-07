import '../styles/globals.css'
import 'antd/dist/antd.css';
import Head from 'next/head';
import { RecoilRoot } from 'recoil';
import { ConfigProvider } from 'antd';
import koKR from 'antd/lib/locale/ko_KR';
import 'moment/locale/ko';

function MyApp({ Component, pageProps }) {
	return (
		<>
			<Head>
				<title>Next.js를 이용한 Todolist</title>

				<meta charSet='utf-8' />
				<meta httpEquiv="X-UA-Compatible" content="IE=edge" />
				<meta name="viewport" content="width=device-width, initial-scale=1.0" />
			</Head>

			<RecoilRoot>
				<ConfigProvider locale={koKR}>
					<Component {...pageProps} />
				</ConfigProvider>
			</RecoilRoot>
		</>
	)
}

export default MyApp