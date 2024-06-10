import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../AuthContext';
import { Form, Input, Button, notification } from 'antd';
import { BiHide, BiShow } from 'react-icons/bi';

import styles from '../Login/styles.module.css';

const API = "http://localhost:3001";

const Login = () => {
  const [loading, setLoading] = useState(false);
  const [showHidePassword, setShowHidePassword] = useState(false);
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [users, setUsers] = useState([]);
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetch(API + "/users").then((res) => res.json());
        setLoading(false);
        setUsers(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const showPassword = () => {
    setShowHidePassword(!showHidePassword);
  };

  const handleLogin = () => {
    const userOn = users.find(user => user.userName === usuario && user.password === password);
    if (userOn) {
      login(userOn.person);
      navigate("/");
    } else {
      notification.error({
        message: 'Erro de Autenticação',
        description: 'Usuário e/ou senha inválidos. Por favor, tente novamente.',
        placement: 'topRight',
      });
    }
  };

  return (
    <div className={styles.login_container}>
      <div className={styles.div_logo}>
        <img className={styles.img_logo} src='../public/logo01.png'/>
      </div>
      
      <Form>
        <Form.Item label="Login">
          <Input placeholder='Usuário' onChange={(e) => setUsuario(e.target.value)} />
        </Form.Item>
        <Form.Item label="Senha">
          <Input.Password
            placeholder='Senha'
            onChange={(e) => setPassword(e.target.value)}
            type={showHidePassword ? 'text' : 'password'}
            iconRender={visible => (visible ? <BiShow onClick={showPassword} /> : <BiHide onClick={showPassword} />)}
          />
        </Form.Item>
        <Form.Item className={styles.form_item_button}>
          <Button type="primary" onClick={handleLogin} loading={loading}>Entrar</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;

