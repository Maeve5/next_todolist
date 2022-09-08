import React, { useState, useEffect } from 'react';
import API from '../../modules/api';

import { List, Input, Button } from 'antd';
import ContentWrap from '../../component/ContentWrap';
import { CloseCircleFilled } from '@ant-design/icons';

function TodolistPage({ list }) {

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

	const onEdit = async ({ target: { id, value } }) => {
		try {
			const res = await API.patch('/todo/' + id, {
				text: value ? value : '',
			});

			console.log(res)

			if (res.status === 200) {
				getData();
			}
		}
		catch (e) {
			console.log(e);
		}
	}

	const onDelete = async (e) => {
		console.log(e.target.id);
		try {
		    const response = await API.delete('/todo/' + id);

		    if (response.status === 200) {
		        alert('삭제되었습니다.');
		        getData();
		    }
		}

		catch (e) {
		    alert(e.message);
		    console.log(e);
		}
	};

	return (
		<ContentWrap>
			{todolist.map((row) => {
				return (
					<List.Item key={row.rowKey} style={{ padding: '12px 20px' }}>
						<Input
							id={row.rowKey}
							style={{ padding: 0, border: 'none' }}
							value={row.text}
							onChange={onEdit}
							onFocusOut
							placeholder='할 일을 추가하세요.'
						/>
						<Button
							size='small'
							onClick={onDelete}
							icon={<CloseCircleFilled style={{ color: 'red' }} />}
							style={{ border: 'none' }}
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
			const list = data.data;
			return { props: { list } }
		}

		if (!data) {
			return {
				notFound: true
			}
		}

		return { props: { list } };
	}
	catch (error) {
		console.log('err >> ', error);
		return { props: {} }
	}
}