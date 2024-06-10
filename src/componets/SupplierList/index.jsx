import { useContext, useState } from 'react';
import { Table, Tooltip, Button, Modal, Form, Input, notification } from 'antd';
import { EyeOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { SupplierContext } from '../SupplierContext';
import { MaskedInput } from 'antd-mask-input';



const SupplierList = () => {
  const { suppliers, deleteSupplier, putSupplier } = useContext(SupplierContext);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [detailsModalIsOpen, setDetailsModalIsOpen] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [form] = Form.useForm();

  const handleDelete = (id, ev) => {
    ev.stopPropagation();
    deleteSupplier(id);
    notification.success({
      message: 'Fornecedor Excluído',
    });
  };

  const handleEdit = (record, ev) => {
    ev.stopPropagation();
    setEditingSupplier(record);
    form.setFieldsValue(record);
    setModalIsOpen(true);
  };

  const handleViewDetails = (record, ev) => {
    ev.stopPropagation();
    setSelectedSupplier(record);
    setDetailsModalIsOpen(true);
  };

  const handleUpdate = async () => {
    const values = await form.validateFields();
    putSupplier(editingSupplier.id, values);
    setModalIsOpen(false);
    notification.success({
      message: 'Fornecedor Alterado',
    });
    form.resetFields();
  };

  const closeModal = () => {
    form.resetFields();
    setModalIsOpen(false);
  };

  const closeDetailsModal = () => {
    setDetailsModalIsOpen(false);
  };

  const columns = [
    {
      title: 'Código',
      dataIndex: 'id',
      key: 'id',
    },
    {
      title: 'Nome',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'CNPJ',
      dataIndex: 'cnpj',
      key: 'cnpj',
    },
    {
      title: 'Ações',
      key: 'actions',
      render: (text, record) => (
        <>
          <Tooltip title="Exibir">
            <Button
              shape="circle"
              icon={<EyeOutlined />}
              onClick={(ev) => handleViewDetails(record,ev)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Alterar">
            <Button
              shape="circle"
              icon={<EditOutlined />}
              onClick={(ev) => handleEdit(record, ev)}
              style={{ marginRight: 8 }}
            />
          </Tooltip>
          <Tooltip title="Excluir">
            <Button
              shape="circle"
              icon={<DeleteOutlined />}
              onClick={(ev) => handleDelete(record.id, ev)}
              danger
            />
          </Tooltip>
        </>
      ),
    },
  ];

  return (
    <>
      <Modal
        open={modalIsOpen}
        onCancel={closeModal}
        onOk={handleUpdate}
        title="Alterar Fornecedor"
      >
        <Form form={form} layout="vertical">
          <Form.Item
            name="name"
            label="Nome do Fornecedor"
            
            rules={[{ required: true, message: 'Por favor insira o nome do fornecedor' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="cnpj"
            label="CNPJ"
            valuePropName='defaultValue'
            
            rules={[{ required: true, message: 'Por favor insira o CNPJ' },
              { pattern: /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$/, message: 'CNPJ inválido' }
            ]}
          >
            < MaskedInput mask="00.000.000/0000-00" />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        open={detailsModalIsOpen}
        onCancel={closeDetailsModal}
        footer={null}
        title="Detalhes do Fornecedor"
      >
        {selectedSupplier && (
          <div>
            <p><strong>Código:</strong> {selectedSupplier.id}</p>
            <p><strong>Nome:</strong> {selectedSupplier.name}</p>
            <p><strong>CNPJ:</strong> {selectedSupplier.cnpj}</p>
          </div>
        )}
      </Modal>
      <div className="supplier-list">
        <h1>Lista de Fornecedores</h1>
        <div style={{ overflowY: 'auto', height: 'calc(100vh - 200px)' }}>
          <Table
            columns={columns}
            dataSource={suppliers}
            rowKey="id"
            pagination={false}
          />
        </div>
      </div>
    </>
  );
};

export default SupplierList;



