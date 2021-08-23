import { useState } from 'react';
import './App.css';
import { getAccountByEmail } from './api';
import Account from './components/Account';
import { Button, Container, Input } from '@material-ui/core';


function App() {
  const [formValues, setFormValues] = useState({});
  const [isLogged, setIsLogged] = useState(false);
  const [account, setAccount] = useState({});
  
  const loggout = () => {
    setIsLogged(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({...formValues, [name]: value});
  };

  async function handleSubmit(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    setAccount(account, await getAccountByEmail(data.email));
    setIsLogged(true);
  };

  return (
    <Container>
      { isLogged ? (
        <div>
          <div>
            <h1>{formValues.email}</h1>
            <Button variant="contained" size="small" onClick={loggout}>Sair</Button>
          </div>
          <Account />
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <Input type="text" name="email" placeholder="Email" onChange={handleInputChange} value={formValues.email || ''} />
          </div>
          <div style={{ paddingTop:"10px" }}>
            <Button variant="contained" size="small" type="submit">Entrar</Button>
          </div>
        </form>
      )}
    </Container>
  );
}

export default App;
