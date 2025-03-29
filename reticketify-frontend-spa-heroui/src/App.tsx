import { Navigate, Route, Routes } from "react-router";

//import IndexPage from "@/pages/index";
import DocsPage from "@/pages/docs";
import PricingPage from "@/pages/pricing";
import BlogPage from "@/pages/blog";
import AboutPage from "@/pages/about";

import HomePage from "@/pages/home";
import SingInPage from "@/pages/singin";
import PerfilPage from "@/pages/perfil";
import LoginPage from "./pages/login";

function App() {
  return (
    <Routes>
      <Route element={<HomePage />} path="/" />
      <Route element={<SingInPage />} path="/singin" />
      <Route element={<LoginPage />} path="/login" />
      <Route element={<PerfilPage />} path="/perfil" />

      <Route path="/404" element={<div>404</div>} />,
      <Route path="*" element={<Navigate to="/404" replace />} />

      {/*<Route element={<IndexPage />} path="/" />*/}
      <Route element={<DocsPage />} path="/docs" />
      <Route element={<PricingPage />} path="/pricing" />
      <Route element={<BlogPage />} path="/blog" />
      <Route element={<AboutPage />} path="/about" />
    </Routes>
  );
}

export default App;
