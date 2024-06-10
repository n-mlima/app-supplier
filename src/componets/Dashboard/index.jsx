import { useState, useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import {
  UserAddOutlined,
  OrderedListOutlined,
  EditOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';
import { AuthContext } from '../AuthContext';


const { Header, Content, Footer, Sider } = Layout;

function getItem(label, key, icon, children) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem(<Link to="/list-supplier">Lista de Fornecedores</Link>, '1', <OrderedListOutlined />),
  getItem(<Link to="/add-supplier">Cadastrar Fornecedor</Link>, '2', <UserAddOutlined />),
  getItem(<Link to="/user-settings">Configurações de Usuário</Link>, '3', <SettingOutlined />, [
    getItem(<Link to="/user-settings">Alterar Senha</Link>, '4',<EditOutlined/>),
    
  ]),
  getItem('Logout', '5', <LogoutOutlined />),  
];

const Dashboard = () => {
  const [collapsed, setCollapsed] = useState(false);

  const { user } = useContext(AuthContext);
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  const { logout } = useContext(AuthContext);

  const handleLogout = () => {
    logout();
  };

  const handleMenuClick = ({ key }) => {
    if (key === '5') {  // Verificando se o item de logout foi clicado
      handleLogout();
    }
  };

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sider width={250} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", padding: '10px 0' }}>
          <img src="/logo01.png" style={{ width: collapsed ? "40px" : "120px", filter: 'brightness(0) invert(1)' }} alt="Logo" />
        </div>
        <Menu  theme="dark" defaultSelectedKeys={['1']} mode="inline" items={items} onClick={handleMenuClick} />
      </Sider>
      <Layout>
        <Header style={{ padding: 0, background: '#fff', marginBottom: "1em" }}>
          <div style={{ fontSize: "15px", padding: "0.5em", float: 'left', marginRight: '16px' }}>
            {user ? `Bem-vindo, ${user.username}` : ''}
          </div>
        </Header>
        <Content style={{ margin: '0 16px', overflow: 'hidden' }}>
          <div
            style={{
              padding: 24,
              minHeight: 'calc(100vh - 200px)', 
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'auto',
            }}
          >
            <Outlet />
          </div>
        </Content>
        <Footer style={{ textAlign: 'center' }}>
          ©{new Date().getFullYear()}
        </Footer>
      </Layout>
    </Layout>
  );
};

export default Dashboard;

