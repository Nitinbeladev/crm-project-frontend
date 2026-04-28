
import './index.css'
import Dashboard from './components/Dashboard/Dashboard'
import { ThemeProvider } from './components/Themeprovider';
import { Route, Routes } from "react-router-dom";
import {Login} from "./components/Auth/Login"
import { Toaster } from './components/ui/sonner';
import Admin from './components/Admin/Admin';
import ProtectedRoutes from './components/Context/ProtectedRoutes';
import Unauthorized from './components/Admin/Unauthorized';
import NotFound from './components/Context/NotFound';


function App() {

  return (
    <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
      <Routes>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/login" element={<Login />} />
        
        <Route
          path="/admin"
          element={
            <ProtectedRoutes roles={["Admin", "Councellor"]}>
              <Admin />
            </ProtectedRoutes>
          }
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster position="top-right" />
    </ThemeProvider>
  );
}

export default App


