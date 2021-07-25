import axios from 'axios'
import { useState, useEffect } from 'react'
const url = 'http://localhost:9000'
const App = () => {
  


  // Sign Up Code Start
  const [signup, setSignup] = useState({email: '', password: ''})
  const signupForm = (e) =>{
    setSignup({...signup, [e.target.name]: e.target.value})
  }
  const signupUser = async () => {
    let response = await authenticateSignup(signup)
    window.location.reload()
    if(!response){
      console.log('signupUser function didnt work')
    };
  }
  const authenticateSignup = async (user) => {
    try{
      return await axios.post(`${url}/signup`, user).then(response => alert(response.data.message))
    } catch(error){
      console.log('error while calling signup api')
    }
  }
  // Sign Up Code End





  // Login Form Code Start
  const [login, setLogin] = useState({email: '', password: ''})
  const [acc, setAccount] = useState()
  const [signOut, setSignOut] = useState(true)
  const loginForm = (e) => {
    setLogin({...login, [e.target.name]: e.target.value})
  }
  const loginUser = async () => {
    let response = await authenticateLogin(login)
    console.log('Logged in successfully')
    if(!response){
      console.log('Log in unsuccessful')
      return
    }
  }
  const setData = (data) => {
    localStorage.setItem('loginEmail', data)
    let accDetail = localStorage.getItem('loginEmail')
    setAccount(accDetail)
    setSignOut(false)
  }
  useEffect(()=>{
    let accDetail = localStorage.getItem('loginEmail')
    if(accDetail){
      setAccount(accDetail)
      setSignOut(false)
    }else{
      setSignOut(true)
    }
  }, [])
  const signOutUser = () => {
    localStorage.removeItem('loginEmail')
    setAccount()
    setSignOut(true)
  }
  const authenticateLogin = async (user) => {
    try{
      return await axios.post(`${url}/login`, user).then(response => {
        alert(response.data.message)
        if(response.data.isLogin){
          setData(response.data.useremail)
        }
      })
    } catch(error){
      console.log('error while calling login api')
    }
  }
  // Login Form Code End





  // Display Details Code Start
  const [form, setForm] = useState()
  const [displayFormData, setDisplayForm] = useState(false)
  const displayForm = async () => {
    let response = await authenticateForm()
    if(displayFormData){
      setDisplayForm(false)
    }else{
      setDisplayForm(true)
    }
    if(!response){
      console.log('Form display unsuccessful')
      return
    }else{
      console.log('Form displayed successfully')
    }
  }
  const authenticateForm = async () => {
    try{
      return await axios.post(`${url}/display`).then(response => setForm(response.data.message))
    } catch(error){
      console.log('error while calling form api')
    }
  }
  // Display Details Code End





  // Delete Account Code Start
  const [deleteId, setDelete] = useState({_id: null})
  useEffect(() => {
    setDelete(deleteId)
  }, [deleteId])
  const deleteAcc = async (e) => {
    setDelete({ ...deleteId, [e.target.name]: e.target.value })
    if(!deleteId._id){
      console.log(deleteId)
    }else{
      let response = await authenticateDelete(deleteId)
      window.location.reload()
      if(!response){
        console.log('Delete unsuccessful')
        return
      }
    }
  }
  const authenticateDelete = async (id) => {
    try{
      return await axios.post(`${url}/delete`, id).then(response => {alert(response.data.message); localStorage.removeItem('loginEmail')
      setAccount()
      setSignOut(true)})
    }catch(error){
      console.log('error while calling delete api')
    }
  }
  // Delete Account Code End




  // Edit Email Code Start
  const [openEdit, setOpenEdit] = useState(false)
  const[newEmail, setNewEmail] = useState({newemail: '', id: ''})
  const newEmailChange = (e) => {
    setNewEmail({...newEmail, [e.target.name]: e.target.value, id: e.target.id})
  }
  const openEmailEditor = () => {
    if(openEdit){
      setOpenEdit(false)
    }else{
      setOpenEdit(true)
    }
  }
  const setTheEmail = async () => {
    let response = await authenticateNewEmail(newEmail)
    window.location.reload()
    if(!response){
      console.log('Email updating unsuccessful')
    }
  }
  const authenticateNewEmail = async (data) => {
    try{
      return await axios.post(`${url}/editemail`, data).then(response => alert(response.data.message))
    }catch(error){
      console.log('error while calling Email update api')
    }
  }
  // Edit Email Code End




  // Edit Password Code Start
  const [newPass, setNewPass] = useState({newpass: '', id: ''})
  const [openPass, setOpenPass] = useState(false)
  const authenticateNewPass = async (data) => {
    try{
      return await axios.post(`${url}/editpass`, data).then(response => alert(response.data.message))
    }catch(error){
      console.log('error while calling Email update api')
    }
  }
  const openPassEditor = () => {
    if(openPass){
      setOpenPass(false)
    }else{
      setOpenPass(true)
    }
  }
  const newPassChange = (e) => {
    setNewPass({...newPass, [e.target.name]: e.target.value, id: e.target.id})
  }
  const setThePass = async () => {
    let response = await authenticateNewPass(newPass)
    window.location.reload()
    if(!response){
      console.log('Password updating unsuccessful')
    }
  }
  // Edit Password Code End





  return (
    <div className="App">
      <h3 style={{textAlign: 'center'}}>MERN Form</h3>
      {(acc && (signOut === false)) && 
        <>
          <p style={{textAlign: 'center'}}>{acc} has logged in!</p>
          <button onClick={()=> signOutUser()} style={{display: 'flex', margin: 'auto', marginBottom: '50px'}}>Sign Out</button>
          <br></br>
        </>
      }
      <input onChange = {(e) => signupForm(e)} type="text" name="email" />
      <input onChange = {(e) => signupForm(e)} type="password" name="password" />
      <button onClick = {()=>signupUser()}>Sign up</button>
      <br></br>
      <br></br>
      <br></br>
      <input onChange = {(e) => loginForm(e)} type="text" name="email" />
      <input onChange = {(e) => loginForm(e)} type="password" name="password" />
      <button onClick = {()=>loginUser()}>Log in</button>
      <br></br>
      <br></br>
      <br></br>
      <button onClick = {() => displayForm()}>{(displayFormData===false) ? "Display All Data" : "Hide Data"}</button>
      {
        displayFormData && 
            JSON.parse(form).map(data=>{
            return(
              <>
                <p key={data._id}><b>Username: </b>{data.email}</p>
                <p key={data._id}><b>Password: </b>{data.password}</p>
                <div>
                  <button key={data._id} value={data._id} name="_id" onClick={(e)=>deleteAcc(e)} >Delete this account</button>
                  <button key={data._id} value={data._id} name="_id" onClick={() => openEmailEditor()}>Edit email</button>
                  {openEdit && 
                    <>
                      <input id={data._id} placeholder={data.email} onChange={(e)=>newEmailChange(e)} type="text" name="newemail" />
                      <button onClick={()=>setTheEmail()}>Confirm</button>
                    </>
                  }
                  <button key={data._id} value={data._id} name="_id" onClick={() => openPassEditor()} >Edit password</button>
                  {openPass && 
                    <>
                      <input id={data._id} onChange={(e)=>newPassChange(e)} type="password" name="newpass" placeholder="Enter new password" />
                      <button onClick={()=>setThePass()}>Confirm</button>
                    </>
                  }
                </div>
                <br></br>
                <br></br>
                <br></br>
              </>
            )
          })
      }
      <br></br>
      <br></br>
      <br></br>
    </div>
  );
}

export default App;

