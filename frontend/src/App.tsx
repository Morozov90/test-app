import { CssBaseline } from '@mui/material';
import {
    QueryClient,
    QueryClientProvider,
} from 'react-query'
import { Routes, Route } from "react-router-dom";

import ProfilePage from "./pages/Profile";
import LoginPage from "./pages/Login";
import Signup from "./pages/Signup";
import { RequireAuth } from "./components";
import { ToastContainer } from "react-toastify";

const queryClient = new QueryClient()
function App() {
    return (
      <QueryClientProvider client={queryClient}>
        <CssBaseline />
          <Routes>
              <Route path="/" element={<RequireAuth><ProfilePage /></RequireAuth>} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<Signup />} />
          </Routes>
          <ToastContainer/>
      </QueryClientProvider>
    );
}

export default App;
