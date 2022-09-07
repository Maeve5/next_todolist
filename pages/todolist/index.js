import React from 'react';

import { List } from 'antd';
import ContentWrap from '../../component/ContentWrap';

function TodolistPage({ data, list }) {

	return (
		<ContentWrap>
			{list.map((row) => {
				return (
					<List.Item
						key={row.rowKey}
						style={{
							paddingLeft: 40,
							textDecoration: row.isCheck === 'Y'
								? 'line-through'
								: 'none',
							color: row.isCheck === 'Y'
								? 'gray'
								: 'black'
						}}
					>{row.text}</List.Item>
				)
			})}
		</ContentWrap>
	)
}

export default React.memo(TodolistPage);

export async function getServerSideProps() {
	try {
		const res = await fetch('https://api.kkot.farm/todo');

		if (res.status === 200) {
			const data = await res.json();
			const message = data.message;
			const list = data.data;
			// console.log('data >> ',data);
			return { props: { data, list } }
		}

		if (!data) {
			return {
				notFound: true
			}
		}

		return { props: { data, list } };
	}
	catch (error) {
		console.log('err >> ', error);
		return { props: {} }
	}
}