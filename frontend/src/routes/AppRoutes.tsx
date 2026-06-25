import { Routes, Route } from "react-router-dom";

import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";

import Login from "../pages/admin/Login";
import Dashboard from "../pages/admin/Dashboard";
import CreateForm from "../pages/admin/CreateForm";
import Forms from "../pages/admin/Forms";
import Responses from "../pages/admin/Responses";

import Home from "../pages/user/Home";
import FillForm from "../pages/user/FillForm";
import Success from "../pages/user/Success";
import UserForms from "../pages/user/Forms";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Admin */}
      <Route element={<AdminLayout />}>
        <Route path="/admin/login" element={<Login />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/create-form" element={<CreateForm />} />
        <Route path="/admin/forms" element={<Forms />} />
        <Route path="/admin/responses" element={<Responses />} />
      </Route>

      {/* User */}
      <Route element={<UserLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/forms" element={<UserForms />} />
        <Route path="/form/:id" element={<FillForm />} />
        <Route path="/success" element={<Success />} />
      </Route>
    </Routes>
  );
}