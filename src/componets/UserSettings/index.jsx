import { useContext } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { SupplierContext } from '../SupplierContext';

const UserSettings = () => {
  const { changePassword } = useContext(SupplierContext);

  const handlePasswordChange = async (values) => {
    const { currentPassword, newPassword } = values;
    const username = "admin"; 

    const success = await changePassword(username, currentPassword, newPassword);
    
    if (success) {
      notification.success({
        message: 'Sucesso',
        description: 'Senha alterada com sucesso.',
      });
    } else {
      notification.error({
        message: 'Erro',
        description: 'Senha atual incorreta ou usuário não encontrado.',
      });
    }
  };

  return (
    <div style={{ maxWidth: '500px', margin: 'auto', padding: '20px', background: 'white', borderRadius: '8px' }}>
      <h2 style={{textAlign:"center"}}>Alteração de senha</h2>
      <Form onFinish={handlePasswordChange}>
        <Form.Item
          label="Senha Atual"
          name="currentPassword"
          rules={[{ required: true, message: 'Por favor, insira sua senha atual!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Nova Senha"
          name="newPassword"
          rules={[{ required: true, message: 'Por favor, insira a nova senha!' }]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item
          label="Confirmar Nova Senha"
          name="confirmPassword"
          dependencies={['newPassword']}
          hasFeedback
          rules={[
            { required: true, message: 'Por favor, confirme sua nova senha!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('newPassword') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('As senhas não coincidem!'));
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>
        <Form.Item style={{display: 'flex', justifyContent: 'center' }}>
          <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
            Alterar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UserSettings;
