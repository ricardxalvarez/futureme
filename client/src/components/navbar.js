import React, { useEffect, useState } from 'react'
import styled, { keyframes } from 'styled-components'
import { Link, useNavigate } from 'react-router-dom'
import useGlobalContext from '../context'
import mobile from '../responsive'
import Sidebar from './sidebar'
const Nav = styled.nav`
position: absolute;
width: 100%;
`
const Left = styled.div`
color: white;
`
const Right = styled.div`
color: white;
display: flex;
align-items: center;
a {
  ${mobile({
    display: 'none'
  })}
}
p {
  display: none;
  cursor: pointer;
  ${mobile({
    display: 'initial'
  })}
}
`
const Div = styled.div`
height: 3rem;
align-items: center;
padding: 0 15px;
text-align: center;
justify-content: space-between;
display: flex;
background: ${props => props.type === '/' ? 
  'linear-gradient(rgba(0,0,0,0.7), 60%, transparent)'
  : 'transparent'
}
`
const Title = styled.h3`
font-weight: 300;
white-space: nowrap;
cursor: pointer;
`
const animation = keyframes`
  0% {
    opacity: 1;
    transform: scale(1);
  }
  100% {
    opacity: 0;
    transform: scale(1.3);
  }
`
const Ham = styled.div`
  z-index: 100000;
  height: 37px;
  width: 37px;
  border: 3px solid white;
  border-radius: 50%;
  position: relative;
  float: right;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  transform: scale(0.7);
  display: none;
  &::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 100%;
  border-radius: 50%;
  border: 3px solid white;
  animation: ${animation} 1s ease infinite;
  }
  ${mobile({
    display: 'flex'
  })}
  `
const Bar = styled.div`
  width: 60%;
  height: 2px;
  background-color: white;
  position: relative;
${props => props.type === 'opened' && {
  transform: 'rotate(45deg)',
  top: '0',
  left: '0'
}}
  &::after{
  content: "";
  position: absolute;
  height: 100%;
  width: 80%;
  left: 50%;
  background-color: white;
  transition: 0.3s ease;
  z-index: 1000000;
  transform: translate(-50%);
  top: -8px;
  ${props => props.type === 'opened' && {
    opacity: '0'
  }}
  }
  &::before{
      content: "";
  position: absolute;
  height: 100%;
  width: 80%;
  left: 50%;
  background-color: white;
  transition: 0.3s ease;
  z-index: 1000000;
  transform: translate(-50%);
  top: 8px;
  ${props => props.type === 'opened' && {
    transform: 'rotate(-90deg)',
    top: '0px',
    left: '0px',
    width: '100%'
  }}
  }
  `
const Navbar = () => {
  const {userLogged, setUserLogged, userData, isSidebarOpen, setIsSidebarOpen} = useGlobalContext()
    const [location, setLocation] = useState('')
    useEffect(()=>{
        setLocation(window.location.pathname)
    },[])
    const nav = useNavigate()
  return (
    <>
    <Nav>
    <Div type={location}>
        <Left><Title onClick={()=> nav('/')}>FUTURE ME</Title></Left>
        <Right>
            <Link className={location === '/' ? 'link active': 'link'} to={'/'}>Home</Link>
            <Link className={location === (userLogged ? '/dashboard': '/login') ? 'link active': 'link'} to={userLogged ? '/dashboard' : '/login'}>{userLogged ? `Hello ${(userData.fullname).split(' ')[0]}!`: 'Login'}</Link>
            <Link className={location === '/signup' ? 'link active': 'link'} to={userLogged ? '/' : '/signup'} onClick={()=> {
              if (userLogged){
                setUserLogged(false)
                localStorage.removeItem('user')
              }
            }}>{userLogged ? 'Logout' : 'Signup'}</Link>
            <Link className={location === `/services` ? 'link active': 'link'} to={'/services'}>Services</Link>
            <p className={location === '/dashboard' ? 'link active': 'link'} onClick={()=> nav(userLogged ? '/dashboard' : '/login')}>{userLogged ? `Hello ${(userData.fullname).split(' ')[0]}!`: 'Login'}</p>
            <Ham onClick={()=> setIsSidebarOpen(!isSidebarOpen)}><Bar type={isSidebarOpen? 'opened': 'closed'}></Bar></Ham>
        </Right>
        </Div>
    </Nav>
    <Sidebar/>
    </>
  )
}

export default Navbar