import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import useWindowResize from '../hooks/useWindowResize';

import { Button, Layout, Menu, List } from 'antd';
const { Header, Content, Footer, Sider } = Layout;
import { HomeOutlined, PlusOutlined, SettingOutlined, CheckSquareOutlined } from '@ant-design/icons';

function ContentWrap({ children }) {

	const WindowRewidth = useWindowResize();

	return (
		<>
			<Layout style={{
				minWidth: WindowRewidth}}>
				<Sider
					className='side-wrap'
					style={{paddingTop: 16}}
					width={WindowRewidth > 360 ? 160 : 60}
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
							<a style={{
								textDecoration: 'none',
								color: 'white',
								fontSize: 20
							}}>To do List</a>
						</Link>
					</Header>

					<Content style={{
						width:'80%',
						backgroundColor:'white',
						margin:'auto',
						marginTop:'10vh'
					}}>
						<List>
							<div className='list-wrap'>
								{children}
							</div>
						</List>
					</Content>

					<Footer style={{ textAlign: 'center', fontSize: 10 }}>
						© Maeve
					</Footer>
				</Layout>

			</Layout>

			<style jsx>{`
			.list-wrap { width: ${WindowRewidth >= 1024 ? 720 : '80%'}; }
			`}</style>
		</>
	)
}

export default ContentWrap;
