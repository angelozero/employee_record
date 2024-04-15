import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import { Home } from './components/home/Home';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <div className="App">
      <h1 className='title'>Registro de Funcionários</h1>
      <Home />
      <ToastContainer />
    </div>
  );
}

export default App;
