import React from 'react'
import  useGlobalContext  from '../context'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
const Container = styled.div`
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.6);
backdrop-filter: blur(5px);
position: fixed;
top: 0;
z-index: 10000;
display: flex;
justify-content: center;
align-items: center;
left: 100%;
transition: all 0.3s linear;
overflow: hidden;
${props => props.type === 'open' && {
    display: 'flex',
    left: '0'
}}
${props => props.type === 'closed' && {
    left: '100%'
}}
`
const List = styled.div`
display: flex;
flex-direction: column;
text-align: center;
`
const Dir = styled.a`
color: #aaa;
text-decoration: none;
font-size: 50px;
font-weight: 400;
transition: all 0.3s ease;
position: relative;
${props => props.className === 'activelink' && {
  color: 'white'
}}
&:hover{
  color: white;
}
&::after{
  content: attr(data-after);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translateX(-50%, -50%);
  opacity: 0;
  font-size: 5rem;
  letter-spacing: 5px;
  z-index: -1;
  text-transform: uppercase;
  color: rgba(240, 248, 255, 0.2);
  letter-spacing: 1rem;
  white-space: nowrap;
  transition: all 0.5s ease;
  filter: blur(1);
}
&:hover::after{
  opacity: 1;
  transform: translate(-50%, -50%);
}
`

const Sidebar = () => {
    const {isSidebarOpen, setIsSidebarOpen, userLogged, setUserLogged} = useGlobalContext()
    let location = document.location.pathname
    const scroll = () => window.scrollTo({top: 0})
  return (
    <Container type={isSidebarOpen? 'open': 'closed'}>
    <List>
        <Link to='/' onClick={()=> setIsSidebarOpen(false)} style={{textDecoration: 'none', marginBottom: '30px'}}>
        <Dir className={location === '/' && 'activelink'} data-after="home" onClick={scroll}>Home</Dir>
        </Link>
        <Link to={userLogged ? '/': '/signup'} onClick={()=> {
            setIsSidebarOpen(false)
            if (userLogged){
                setUserLogged(false)
                localStorage.removeItem('user')
            }
        }} style={{textDecoration: 'none', marginBottom: '30px'}}>
        <Dir className={location === '/signup' && 'activelink'} data-after={userLogged ? 'logout': 'sign up'} onClick={scroll}>{userLogged? 'Logout': 'Sign up'}</Dir>
        </Link>
        <Link to='/services' onClick={()=> setIsSidebarOpen(false)} style={{textDecoration: 'none', marginBottom: '30px'}}>
        <Dir className={location === '/services' && 'activelink'} data-after="services" onClick={scroll}>{'Services'}</Dir>
        </Link>
        <Link to='/dashboard' onClick={()=> setIsSidebarOpen(false)} style={{textDecoration: 'none'}}>
        <Dir className={location === '/dashboard' && 'activelink'} data-after="dashboard" onClick={scroll}>{'Dashboard'}</Dir>
        </Link>
    </List>
    </Container>
  )
}

export default Sidebar
