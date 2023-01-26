import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Login } from './pages/Login/Login';
import { FormCreate } from './pages/UserForm/FormCreate';

export const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/cadastro" element={<FormCreate />} />
            </Routes>
        </BrowserRouter>
    )
}