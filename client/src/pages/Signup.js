import React from 'react'
import { useNavigate } from 'react-router-dom'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import styled, {keyframes} from 'styled-components'
import { IoCloseCircleOutline } from 'react-icons/io5'
import useGlobalContext from '../context'
import mobile from '../responsive'
import axios from 'axios'
const Main = styled.div`
background: linear-gradient(#a1a5c3, 80%, #1e2964);
height: 100vh;
width: 100%;
display: flex;
align-items: center;
`
const Card = styled.div`
height: 60vh;
width: 80vw;
background-color: white;
margin: auto;
padding: 10px 20px;
position: relative;
box-shadow: -7px 7px 0 rgba(0,0,0,0.3);
${mobile({
    width: '70vw'
})}
`
const Title = styled.h2`
text-transform: uppercase;
font-weight: 300;
position: absolute;
top: 20px;
left: 20px;
margin: 0;
`
const Description = styled.form`
display: flex;
width: 100%;
height: 100%;
flex-direction: column;
align-items:center ;
justify-content: center;
`
const Input = styled.input`
width: 400px;
padding: 5px 10px;
font-size: 15px;
outline: none;
margin: 10px 0;
${mobile({
    width: '80%'
})}
`
const A = styled.a`
position: absolute;
bottom: 20px;
left: 20px;
cursor: pointer;
&:hover{
    color: #444;
}
${mobile({
  fontSize: '14px'
})}
`
const closed = keyframes`
from {
  right: -20vw;
}
to {
  right: 5vw;
}
`
const WrongCard = styled.div`
position: absolute;
right: -20vw;
top: 5vw;
padding: 10px 20px;
background-color: lightcoral;
animation-name: ${closed};
animation-duration: 0.3s;
animation-fill-mode: forwards;
${mobile({
  width: '170px'
})}
z-index: 100000000;
`
const WrongTitle = styled.p`
width: 70%;
margin: 0;
${mobile({
  width: '80%'
})}
`
const SpinnerContainer = styled.div`
background: rgba(0,0,0,0.5);
width: 100%;
height: 100%;
display: flex;
justify-content: center;
align-items: center;
position: absolute;
top: 0;
left: 0;
z-index: 100000;
`
const Signup = () => {
    const nav = useNavigate()
    const [wrong, setWrong] = React.useState(false)
    const [userExists, setUserExists] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const {email, setEmail, password, setPassword, confirm, setConfirm, setStep} = useGlobalContext()
    const Continuar = async (e)=> {
      e.preventDefault()
      if ( email && email.length > 5 && email.includes('@') && email.includes('.') && password && password.length > 5 && password === confirm){
        setLoading(true)
        axios.get(`https://futuremebackend.herokuapp.com/api/v1/users/check?email=${email}`)
        .then(res => {
          if (res.data.status === 'user exists'){
            setUserExists(true)
            setTimeout(()=>{
              setUserExists(false)
            }, 5000)
            setLoading(false)
          }
          if (res.data.status === 'ok') {
            nav('/create')
            setStep(false)
          }
        })
        .catch(err => {
          setLoading(false)
          console.log(err)
        })
      } else {
        setWrong(true)
        setTimeout(() => setWrong(false), 5000)
        setLoading(false)
      }
    }
  return (
    <>
    <Navbar/>
    <Main>
    <Card>
        <Title>sign up</Title>
            <Description>
                <Input type={'text'} autoComplete={'email'} placeholder={'Email'} value={email} onChange={(e)=> setEmail((e.target.value).replace(' ', ''))}/>
                <Input type={'password'} autoComplete={'new-password'} placeholder={'Password'} value={password} onChange={(e)=> setPassword((e.target.value).replace(' ', ''))}/>
                <Input type={'password'} autoComplete={'password'} placeholder={'Confirm password'} value={confirm} onChange={(e)=> setConfirm((e.target.value).replace(' ', ''))}/>
                <button className="cta" onClick={Continuar}>
                  <span>Continue</span>
                  <svg viewBox="0 0 13 10" height="10px" width="15px">
                    <path d="M1,5 L11,5"></path>
                    <polyline points="8 1 12 5 8 9"></polyline>
                  </svg>
                </button>
            </Description>
                <A onClick={()=> nav('/login')}>Already have an account?</A>
        </Card>
        { wrong &&
        <WrongCard>
          <IoCloseCircleOutline className='errorclose' onClick={()=> setWrong(false)}/>
          <WrongTitle>Please, check the data you've given</WrongTitle>
        </WrongCard>
        }
        { userExists &&
        <WrongCard>
          <IoCloseCircleOutline className='errorclose' onClick={()=> setUserExists(false)}/>
          <WrongTitle>The email you've entered is already signed up</WrongTitle>
        </WrongCard>
        }
        {
        loading &&
        <SpinnerContainer>
        <div className="spinner2">
        </div>
        </SpinnerContainer>
        }
    </Main>
    <Footer/>
    </>
  )
}

export default Signup
