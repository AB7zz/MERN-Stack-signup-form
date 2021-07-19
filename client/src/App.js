import axios from 'axios'
import { useState } from 'react'
const url = 'http://localhost:9000'
const initialValues = {
  email: '',
  password: ''
}
const App = () => {
  const [signup, setSignup] = useState(initialValues)
  const authenticateSignup = async (user) => {
    try{
      return await axios.post(`${url}/signup`, user)
    } catch(error){
      console.log('error while calling signup api')
    }
  }
  const signupForm = (e) =>{
    setSignup({...signup, [e.target.name]: e.target.value})
    console.log(signup)
  }
  const signupUser = async () => {
    let response = await authenticateSignup(signup)
    if(!response){
      console.log('signupUser function didnt work')
    };
  }
  return (
    <div className="App">
      <input onChange = {(e) => signupForm(e)} type="text" name="email" />
      <input onChange = {(e) => signupForm(e)} type="password" name="password" />
      <button onClick = {()=>signupUser()}>Sign up</button> 
    </div>
  );
}

export default App;
