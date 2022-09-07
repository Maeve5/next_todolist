import React, { useState } from 'react';

import { List, Input } from 'antd';
import ContentWrap from '../../component/ContentWrap';

function TodolistPage({ data, list }) {

	const [todolist, setTodolist] = useState(list);

	return (
		<ContentWrap>
			{list.map((row) => {
				return (
					<List.Item key={row.rowKey} style={ {paddingLeft: 40 }}>
						<Input
							key={row.rowKey}
							style={{ padding: 0, border: 'none' }}
							value={row.text}
							// onChange={onEdit}
						/>
					</List.Item>
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