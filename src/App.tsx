import "./App.css";

import { ThemeProvider } from "./components/theme-provider";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import Form from "./pages/form";
import Table from "./pages/table";
import Kanban from "./pages/kanban";
import Invoice from "./pages/invoice";
import UISlice from "./pages/ui-slice";
import FormBuilder from "./pages/form-builder";
import GenerateInvoice from "./pages/generate-invoice";
import Home from "./pages/home";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/table" element={<Table />} />
            <Route path="/form-builder" element={<FormBuilder />} />
            <Route path="/generate-invoice" element={<GenerateInvoice />} />
            <Route path="/slice" element={<UISlice />} />
            <Route path="/form" element={<Form />} />
            <Route path="/kanban" element={<Kanban />} />
            <Route path="/invoice" element={<Invoice />} />
          </Routes>
        </BrowserRouter>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
