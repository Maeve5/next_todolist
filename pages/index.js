import React from 'react';

import { Button } from 'antd';
import { UnorderedListOutlined } from '@ant-design/icons';

function Home() {

	return (
		<>
			<div className='home'>
				<Button
					size='large'
					type='link'
					icon={<UnorderedListOutlined />}
					href='/todolist'
					block
				>Todolist</Button>
			</div>

			<style jsx>{`
            .home {min-height:100vh; display:grid; place-items:center}
            `}</style>
		</>
	);
}

export default React.memo(Home);