import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import { HomePage, FusionPage, ErrorPage, CreatePage, MintPage, AdminPage } from "./pages"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/mint/:id" element={<MintPage />} />
        <Route path="/fusion" element={<FusionPage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/admin" element={<AdminPage />} />
      </Route>
      <Route path="*" element={<ErrorPage />} />
    </Routes>
  );
};

export default App;
