import { Route, Routes } from 'react-router-dom';
import LoginPage from './pages/login/LoginPage';
import HomePage from './pages/home/HomePage';
import { RegisterPage } from './pages/register/RegisterPage';
import { QueryClient, QueryClientProvider} from '@tanstack/react-query';
const App = () => {
  const queryClient = new QueryClient()
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LoginPage />} index />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/home/:chatId?" element={<HomePage />} />
        </Routes>
      </QueryClientProvider>
    </>
  )
}

export default App
