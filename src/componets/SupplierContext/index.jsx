import { createContext, useState, useEffect } from 'react';

const SupplierContext = createContext();

const API = process.env.REACT_APP_API_URL || "http://localhost:5000";

const SupplierProvider = ({ children }) => {
  const [suppliers, setSuppliers] = useState([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetch(API + "/suppliers").then((res) => res.json());
        console.log("Dados carregados:", data);
        setSuppliers(data);
      } catch (error) {
        console.error("Erro ao carregar os dados:", error);
      }
    };

    loadData();
  }, []);

  const changePassword = async (name, oldPassword, newPassword) => {
    try {
      const users = await fetch(API + "/users").then((res) => res.json());
      const user = users.find(user => user.userName === name && user.password === oldPassword);
      
      if (user) {
        user.password = newPassword;

        await fetch(`${API}/users/${user.id}`, {
          method: 'PUT',
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });

        return true; // Senha alterada com sucesso
      } else {
        return false; // Usuário não encontrado ou senha antiga não confere
      }
    } catch (error) {
      console.error("Erro ao alterar a senha:", error);
      return false;
    }
  };

  const addSupplier = async (supplier) => {
    try {
      await fetch(API + "/suppliers", {
        method: 'POST',
        body: JSON.stringify(supplier),
        headers: {
          "Content-Type": "application/json",
        },
      });
      setSuppliers((prev) => [...prev, supplier]);
    } catch (error) {
      console.error("Erro ao adicionar o fornecedor:", error);
    }
  };

  const deleteSupplier = async (id) => {
    try {
      await fetch(API + "/suppliers/" + id, {
        method: "DELETE",
      });
      setSuppliers((prev) => prev.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Erro ao deletar o fornecedor:", error);
    }
  };
  
  const putSupplier = async (id, updatedSupplier) => {
    try {
      const response = await fetch(API + "/suppliers/" + id, {
        method: "PUT",
        body: JSON.stringify(updatedSupplier),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      setSuppliers((prev) =>
        prev.map((supplier) => (supplier.id === id ? data : supplier))
      );
    } catch (error) {
      console.error("Erro ao alterar o fornecedor:", error);
    }
  };

  return (
    <SupplierContext.Provider value={{ suppliers, addSupplier, deleteSupplier,putSupplier,changePassword }}>
      {children}
    </SupplierContext.Provider>
  );
};

export  { SupplierProvider, SupplierContext };
