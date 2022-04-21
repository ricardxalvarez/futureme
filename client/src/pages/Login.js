import React from 'react'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import styled, {keyframes, css} from 'styled-components'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import useGlobalContext from '../context'
import { IoCloseCircleOutline } from 'react-icons/io5'
import mobile from '../responsive'
const Main = styled.div`
background: linear-gradient(#ee9896, 80%, #1e2964);
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
const Help = styled.details`
position: absolute;
bottom: 20px;
left: 20px;
color: #888;
cursor: pointer;
`
const Summary = styled.summary`
&:hover{
    color: #444;
}
`
const A = styled.a`
cursor: pointer;
&:hover{
    color: #222;
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
    right: 10vw;
}
`
const closedResponsive = keyframes`
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
animation-name: ${props => props.className === 'responsive' ? css`${closedResponsive}`: css`${closed}`};
animation-duration: 0.3s;
animation-fill-mode: forwards;
z-index: 1000000;
`
const WrongTitle = styled.p`
width: 70%;
margin: 0;
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
const Login = () => {
    let width = window.innerWidth
    window.addEventListener('resize', ()=>{
        width = window.innerWidth
    })
    const {setUserLogged, setUserData} = useGlobalContext()
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [wrongEmail, setWrongEmail] = React.useState(false)
    const [wrongPassword, setWrongPassword] = React.useState(false)
    const [loading, setLoading] = React.useState(false)
    const nav = useNavigate()
    const onSubmit =  async (e) => {
        e.preventDefault()
        setLoading(true)
        await axios.get(`https://futuremebackend.herokuapp.com/api/v1/users/login?email=${email}&password=${password}`)
        .then(res => {
            if (res.data.error === 'invaild Password'){
                setWrongPassword(true)
                setLoading(false)
                setTimeout(()=>{
                    setWrongPassword(false)
                },5000)
            } 
            if (res.data.error === 'user does not exist'){
                setWrongEmail(true)
                setLoading(false)
                setTimeout(()=>{
                    setWrongEmail(false)
                },5000)
            }
            if (!res.data.error) {
                localStorage.setItem('user', JSON.stringify({ email, password }))
                setUserData(res.data)
                setLoading(false)
                setUserLogged(true)
                nav('/')
            }
        })
        .catch(err => {
            console.error(err)
            setLoading(false)
        })
    }
  return (
    <>
    <Navbar/>
    <Main>
        <Card>
            <Title>sign in</Title>
            <Description>
                <Input type={'text'} placeholder={'Email'} autoComplete={'email'} value={email.replace(' ', '')} onChange={(e) => setEmail(e.target.value)}/>
                <Input type={'password'} placeholder={'Password'} value={password} autoComplete={'password'} onChange={(e) => setPassword((e.target.value).replace(' ', ''))}/>
                <div class="main_div" onClick={onSubmit}>
                    <button>Sign in</button>
                </div>
            </Description>
            <Help>
                <Summary>Help</Summary>
                <A>Forgot password</A><br></br>
                <A>Forgot Email</A><br></br>
                <A onClick={()=> nav('/signup')}>Don't have an account?</A>
            </Help>
        </Card>
        { wrongEmail &&
        <WrongCard className={width < 830 && 'responsive'}>
          <IoCloseCircleOutline className='errorclose' onClick={()=> setWrongEmail(false)}/>
          <WrongTitle>Not such an email exists</WrongTitle>
        </WrongCard>
        }
        { wrongPassword &&
        <WrongCard className={width < 830 && 'responsive'}>
          <IoCloseCircleOutline className='errorclose' onClick={()=> setWrongPassword(false)}/>
          <WrongTitle>Password is incorrect</WrongTitle>
        </WrongCard>
        }
        { loading &&
            <SpinnerContainer>
                <div className="spinner3">
                </div>
        </SpinnerContainer>
        }
        
    </Main>
    <Footer/>
    </>
  )
}

export default Login
