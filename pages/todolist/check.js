import { Checkbox, List } from 'antd';
import API from '../../modules/api';
import React, { useState, useEffect } from 'react';

import ContentWrap from '../../component/ContentWrap';

function CheckPage({ list }) {

	const [todolist, setTodolist] = useState(list);

	const getData = async () => {
		try {
			const res = await API.get('/todo');

			if (res.status === 200) {
				setTodolist(res.data.data);
				return todolist;
			}
			return todolist;
		}
		catch (e) {
			console.log(e);
		}
	}

	useEffect(() => {
		getData();
	}, []);

	const isCheck = async ({ target: { id, checked } }) => {
		try {
			const res = await API.patch('/todo/' + id, {
				isCheck: checked ? 'Y' : 'N',
			});
			if (res.status === 200) {
				getData();
			}
		}
		catch (e) {
			console.log(e);
		}
	}

	return (
		<ContentWrap>
			<div className='list-wrap'>
				{todolist.map((row) => {
					return (
						<List.Item key={row.rowKey} style={{ paddingLeft: 20 }}>
							<Checkbox
								id={row.rowKey}
								checked={row.isCheck === 'Y' ? true : false}
								onClick={isCheck}
								style={{
									textDecoration: row.isCheck === 'Y'
										? 'line-through'
										: 'none',
									color: row.isCheck === 'Y'
										? 'gray'
										: 'black'
								}}
							>{row.text}</Checkbox>
						</List.Item>
					);
				})}
			</div>
		</ContentWrap>
	);
};

export default React.memo(CheckPage);

export async function getServerSideProps() {
	try {
		const res = await fetch('https://api.kkot.farm/todo');

		if (res.status === 200) {
			const data = await res.json();
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