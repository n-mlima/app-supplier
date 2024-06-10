import { useContext } from 'react';
import { SupplierContext } from '../SupplierContext';
import { Form, Input, Button, notification } from 'antd';
import { MaskedInput } from 'antd-mask-input';



function Supplier() {
  const { suppliers, addSupplier } = useContext(SupplierContext);
  const [form] = Form.useForm();

  const handleSubmit = async (values) => {
    const existingSupplier = suppliers.find(
      (supplier) => supplier.name === values.name || supplier.cnpj === values.cnpj
    );

    if (existingSupplier) {
      notification.error({
        message: 'Erro ao cadastrar',
        description: 'Fornecedor com o mesmo nome ou CNPJ já está cadastrado.',
      });
      return;
    }
    const id = suppliers.length > 0 ? Math.max(...suppliers.map(s => parseInt(s.id))) + 1 : 1;
    let listSupplier = {
      id,
      name: values.name,
      cnpj: values.cnpj,
    };

    await addSupplier(listSupplier);
    form.resetFields();
    notification.success({
      message: `Fornecedor ${values.name} salvo com sucesso!`,
    });
  };

  return (
    <>
      <div style={{maxWidth:"500px", margin:"0 auto"}}>
        <h1 style={{textAlign:"center"}}>Adicionar Fornecedor</h1>
        <Form form={form} layout="vertical" onFinish={handleSubmit}>
          <Form.Item
            label="Nome do Fornecedor"
            name="name"
            rules={[{ required: true, message: 'Por favor insira o nome do fornecedor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="CNPJ"
            name="cnpj"
            rules={[{ required: true, message: 'Por favor insira o CNPJ' },
              { pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, message: 'CNPJ inválido' }
            ]}
          >
          < MaskedInput mask="00.000.000/0000-00" />
          </Form.Item>
          <Form.Item style={{display: 'flex', justifyContent: 'center' }}>
            <Button type="primary" htmlType="submit">
              Salvar
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
}

export default Supplier;
