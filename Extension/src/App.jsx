import Signin from "./pages/login"
import { Routes, Route} from 'react-router-dom';
import Signup from "./pages/signup";
import { Provider } from "react-redux";
import store from "./store";
import Dashboard from "./pages/dashboard";
function App() {

  return (
    <>
    <Provider store={store}>
    <Routes>
      <Route path="/login" element={<Signin />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route index path="/" element={<Signup />} />
    </Routes>
    </Provider>
    </>
  )
}

export default App
