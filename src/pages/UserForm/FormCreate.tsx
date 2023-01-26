import { useState, useEffect } from 'react'

export function FormCreate(){
  const API_URL = "http:localhost:3000";
  const [data, setData] = useState([]);
  const [dataEdit, setDataEdit] = useState({});
  const [login, setLogin] = useState<String>(dataEdit.login || "")
  const [validateLogin, setValidateLogin] = useState({
    isEmail: false
  });
  const [password, setPassword] = useState<String>(dataEdit.password || "")
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
    const regexCaracterSpecial = new RegExp(/^(?=.*[^0-9A-Za-z]).+$/)
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
        
        //const [data, setData] = useState([]);
        //const [dataEdit, setDataEdit] = useState({});

        setLogin(e.target.login.value);
        setPassword(e.target.password.value);


        console.log(login);
        console.log(password);
        
        // VERIFICA SE EMAIL JÁ ESTA CADASTRADO
        const emailAlreadyExists = () => {
            if (dataEdit.login !== e.target.login.value && data?.length) {
              return data.find((item) => e.target.login.value === login);
            }
        
            return false;
          };

        // INSERINDO NO BANCO DE DADOS
        // (para fins didáticos esta sendo salvo no local storage)  
        if (emailAlreadyExists()) {
            return alert("E-mail já cadastrado!");
        }

        if (Object.keys(dataEdit).length) {
            data[dataEdit.index] = { login, password };
        }
      
        const newDataArray = !Object.keys(dataEdit).length
        ? [...(data ? data : []), { login, password }]
        : [...(data ? data : [])];
    
        localStorage.setItem("users", JSON.stringify(newDataArray));
    
        setData(newDataArray);

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

        <label htmlFor="confirm_password">Confirme a Senha:</label>
        <input type="password" className="form-input" name="confirm_password" placeholder="Informe sua senha" onChange={handleChange} required />
        { errors.confirmPassword &&<span className='error-field error-password'>{ errors.confirmPassword }</span> }

        <input type="submit" value="Cadastrar" />
      </form>

      <div className="password-validation">
        <h4>Sua senha deve conter:</h4>
        <p className={validatePassword.length ? 'validated' : 'not-validated' }>Mínimo de 8 caracteres</p>
        <p className={validatePassword.number ? 'validated' : 'not-validated' }>Numero</p>
        <p className={validatePassword.case ? 'validated' : 'not-validated' }>Letra Maiúscula</p>
        <p className={validatePassword.caracterSpecial ? 'validated' : 'not-validated' }>Caracter espercial</p>
      </div>
    </div>
  )
}