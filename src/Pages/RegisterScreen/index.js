import React, { useState } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import RegisterInput from '../../Components/RegisterInput';
import GenericRegisterScreen from '../../Components/GenericRegisterScreen';
import { validateSignUp } from '../../Utils/validations';
import { PassMatches } from '../../Components/ErrorMessage';

const RegisterScreen = () => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputRole, setInputRole] = useState('');
  const [inputSector, setInputSector] = useState('');
  const [inputPassword, setInputPassword] = useState('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState('');
  const [valid, setValid] = useState('');

  async function postUser() {
    try {
      await axios.post('http://localhost:3001/signUp', {
        name: inputName,
        email: inputEmail,
        role: inputRole,
        sector: inputSector,
        pass: inputPassword,
      })
        .then((response) => {
          setValid(response);
          console.log(response, valid);
        });
    } catch (error) {
      console.error(error);
    }
  }

  const submit = () => {
    if (validateSignUp(inputEmail, inputName, inputPassword, inputConfirmPassword)) {
      postUser();
    } else {
      alert("Nome deve ser completo, sem números\nEmail deve conter o formato 'nome@email.com'\nSenha deve conter no minimo 6 caracteres\nAs senhas devem ser iguais!");
    }
  };

  const cancel = () => {
    setInputName('');
    setInputEmail('');
    setInputRole('');
    setInputSector('');
    setInputPassword('');
    setInputConfirmPassword('');
  };

  return (
    <GenericRegisterScreen
      sidebarList={[inputName, inputEmail, inputRole, inputSector]}
      cancel={cancel}
      submit={submit}
      buttonTitle="Cadastrar"
    >
      <RegisterInput long type="text" title="Nome" setText={setInputName} value={inputName} />
      <RegisterInput long type="text" title="Email" setText={setInputEmail} value={inputEmail} />
      <Form.Group style={{ width: '45%' }}>
        <Form.Label>Cargo:</Form.Label>
        <Form.Control as="select" value={inputRole} style={{ boxSizing: 'border-box', borderRadius: '1.5vw', border: '2px solid #000000' }}>
          <option>Admin</option>
          <option>Professional</option>
          <option>Receptionist</option>
        </Form.Control>
      </Form.Group>
      <Form.Group style={{ width: '45%' }}>
        <Form.Label>Setor:</Form.Label>
        <Form.Control as="select" value={inputSector} style={{ boxSizing: 'border-box', borderRadius: '1.5vw', border: '2px solid #000000' }}>
          <option>Assistente Social</option>
          <option>Policial</option>
          <option>Familiar</option>
        </Form.Control>
      </Form.Group>
      <RegisterInput long type="password" title="Senha" setText={setInputPassword} value={inputPassword} />
      <RegisterInput long type="password" title="Confirmar senha" setText={setInputConfirmPassword} value={inputConfirmPassword} />
      <PassMatches pass={inputPassword} confPass={inputConfirmPassword} />
    </GenericRegisterScreen>
  );
};

export default RegisterScreen;
