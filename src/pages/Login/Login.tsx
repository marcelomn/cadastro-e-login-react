import { useState, useEffect } from 'react'

export function Login(){
  const API_URL = "http:localhost:3000";
  const [login, setLogin] = useState<String>("")
  const [validateLogin, setValidateLogin] = useState({
    isEmail: false
  });
  const [password, setPassword] = useState<String>("")
  const [validatePassword, setValidatePassword] = useState({
    case: false,
    number: false,
    caracterSpecial: false,
    length: false
  });
  const [errors, setErrors] = useState({});
  
  // VALIDA LOGIN/EMAIL
  const validateEmail = (login:string) => {
    const regexEmail = new RegExp(/^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+[A-Za-z]+$/);
   
    setValidateLogin({
      isEmail: regexEmail.test(login)
    });
  }

  // VALIDAÇÃO DOS CAMPOS
  const validate = (data:any) => {
    const errors = {};

    if(!validateLogin.isEmail){
      errors.login = 'E-mail inválido';
    }

    if(data.login.value == ''){
      errors.login = 'Login é obrigatório!'
    }

    if(data.password.value == ''){
      errors.password = 'Senha é obrigatória!'
    }

    if(
      !validatePassword.case && 
      !validatePassword.number && 
      !validatePassword.caracterSpecial && 
      !validatePassword.length
      ){
        errors.password = 'Senha inválida. Verifique!'
    }
      
    if(data.password.value !== data.confirm_password.value){
      errors.confirmPassword = 'Confirmação de senha não confere. Verifique!'
    }

    return errors;
  }

  // VALIDAÇÃO DE REQUISITOS DA SENHA
  const securePassword = (password: string) => {
    const regexUppercase = new RegExp(/^(?=.*[A-Z]).+$/)
    const regexLowercase = new RegExp(/^(?=.*[a-z]).+$/)
    const regexNumber = new RegExp(/^(?=.*[0-9]).+$/)
    const regexCaracterSpecial = new RegExp(/^(?=.*[0-9]).+$/)
    const length = password.length >= 8

    setValidatePassword({
        case: regexUppercase.test(password) && regexLowercase.test(password),
        number: regexNumber.test(password),
        caracterSpecial: regexCaracterSpecial.test(password),
        length
    });      
  }
  
  // ENVIA FORM
  const handleSubmit = (e) => {
    e.preventDefault();

    const validateFields = validate(e.target);
    
    setErrors(validateFields);

    if(Object.keys(validateFields).length == 0){
      // INSERINDO NO BANCO DE DADOS
    }

  }

  const handleChange = (e:React.ChangeEvent<HTMLFormElement | HTMLInputElement>) => {
    if(e.target.name=='login') validateEmail(e.target.value);
    if(e.target.name=='password') securePassword(e.target.value);
  }

  return (
    <div className="App">
      <form className="form-login" onSubmit={handleSubmit} autoComplete="off">
        <label htmlFor="login">Login:</label>
        <input type="text" className="form-input" name="login" placeholder="Informe seu login" onChange={handleChange} required />
        { errors.login && <span className='error-field error-email'>{ errors.login }</span> }

        <label htmlFor="password">Senha:</label>
        <input type="password" className="form-input" name="password" placeholder="Informe sua senha" onChange={handleChange} required />
        <span className='error-field error-password'></span>
        { errors.password &&<span className='error-field error-password'>{ errors.password }</span> }

        <input type="submit" value="Acessar" />
      </form>
      
      <a href='/cadastro' className='btn-link'>Quero me cadastrar</a>
    </div>
  )
}