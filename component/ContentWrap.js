import React from 'react';
import Router from 'next/router';
import Link from 'next/link';

import { Button, Layout, Menu, List } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { HomeOutlined, PlusOutlined, SettingOutlined, CheckSquareOutlined } from '@ant-design/icons';

function ContentWrap({ children }) {

	return (
		<>
			<Layout>
				<Sider
					width={160}
					style={{ paddingTop: 16 }}
				>
					<div className='side-wrap'>
						<Button
							size='large'
							type='link'
							href='/'
							icon={<HomeOutlined />}
							style={{marginBottom: 10}}
							block
						>Home</Button>
						<Menu
							theme="dark"
							defaultSelectedKeys={['3']}
							mode="inline"
							onClick={(e) => {
								Router.push(`/todolist/${e.key}`)
							} }
							items={[
								{
									key: 'check',
									icon: <CheckSquareOutlined />,
									label: 'Check'
								},
								{
									key: 'new',
									icon: <PlusOutlined />,
									label: 'New'
								},
								{
									key: 'setting',
									icon: <SettingOutlined />,
									label: 'Setting'
								},
							]}
						/>
					</div>
				</Sider>

				<Layout>
					<Header style={{ textAlign: 'center' }}>
						<Link href='/todolist'>
							<a style={{ textDecoration: 'none', color: 'white', fontSize: 20 }}>To do List</a>
						</Link>
					</Header>
					<Content style={{width:720, backgroundColor:'white', margin:'auto', marginTop:64 }}>
						<List>{children}</List>
					</Content>
					<Footer style={{ textAlign: 'center', fontSize: 10 }}>
						© Maeve
					</Footer>
				</Layout>

			</Layout>

			<style jsx>{`
				.side-wrap {width: fit-content}
			`}</style>
		</>
	)
}

export default ContentWrap;
