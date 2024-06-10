import { RouterProvider } from 'react-router-dom';
import Router from '../src/router';
import './styles/global.css';
import { SupplierProvider } from './componets/SupplierContext';
import { AuthProvider } from './componets/AuthContext';

function App() {
  const router = Router();

  return (
    <AuthProvider>
      <SupplierProvider>
        <RouterProvider router={router} />
      </SupplierProvider>
    </AuthProvider>
  );
}

export default App;
