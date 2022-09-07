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
				Router.push('/todolist/new');
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
						style={{ paddingLeft: 40 }}
					>{row.text}</List.Item>
				)
			})}
			<Input
				placeholder='할 일을 추가하세요.'
				value={todo}
				onChange={onChange}
			/>
			<Button size='small' onClick={onAdd} icon={PlusOutlined} />
		</ContentWrap>
	);
};

export default React.memo(NewPage);

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