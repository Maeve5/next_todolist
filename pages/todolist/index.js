import React, { useState } from 'react';

import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Menu, message, Space, List } from 'antd';
import ContentWrap from '../../component/ContentWrap';

function TodolistPage({ list }) {

	const [filter, setFilter] = useState('전체');

	const onClick = ({ target: { label, key }}) => {
		message.info(`Click on item ${key}`);
		setFilter(label);
	};

	const menu = (
		<Menu
			onClick={onClick}
			items={[
				{
					label: '전체',
					key: '1',
				},
				{
					label: '완료',
					key: '2',
				},
				{
					label: '미완료',
					key: '3',
				},
			]}
		/>
	);

	return (
		<ContentWrap>
			<Dropdown overlay={menu}>
				<a onClick={(e) => e.preventDefault()}>
					<Space>
						{filter}
						<DownOutlined />
					</Space>
				</a>
			</Dropdown>
			{list.map((row) => {
				return (
					<List.Item
						key={row.rowKey}
						checked={row.isCheck === 'Y' ? true : false}
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