import React, { useState, useEffect } from 'react';
import API from '../../modules/api';

import { Button, Input, List } from 'antd';
import ContentWrap from '../../component/ContentWrap';
import { PlusOutlined } from '@ant-design/icons';

function NewPage({ list }) {

	const [todolist, setTodolist] = useState(list);
	const [todo, setTodo] = useState('');

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

	const onChange = ({ target: { value } }) => {
		setTodo(value);
	}

	const onAdd = async () => {
		try {
			const res = await API.post('/todo', {
				text: todo,
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
			{todolist.map((row) => {
				return (
					<List.Item
						key={row.rowKey}
						style={{ padding: '12px 20px' }}
					>{row.text}</List.Item>
				)
			})}
			<div style={{ display:'flex' }}>
				<Input
					autoFocus
					placeholder='할 일을 추가하세요.'
					value={todo}
					onChange={onChange}
				/>
				<Button size='small' onClick={onAdd} icon={<PlusOutlined />} />
			</div>
		</ContentWrap>
	);
};

export default React.memo(NewPage);

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