import React from 'react'
import styled from 'styled-components'
import mobile from '../responsive'
import {AiOutlineInstagram, AiOutlineTwitter, AiOutlineCopyright} from 'react-icons/ai'
const Main = styled.div`
background: ${props => props.gradient};
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px 20px;
${mobile({
  flexDirection: 'column'
})}
`
const Left = styled.div`
flex: 1;
color: white;
${mobile({
  margin: '20px'
})}
`
const Center = styled.div`
color: white;
text-align: center;
flex: 1;
`
const Right = styled.div`
color: white;
flex: 1;
float: right;
${mobile({
  margin: '20px',
  flexDirection: 'center',
  alignItems: 'center',
  textAlign: 'center'
})}
`
const A = styled.a`
margin: 10px;
`
const P = styled.p`
margin: 5px 10px;
cursor: pointer;
`
const Desc = styled.div`
display: flex;
${mobile({
  alignItems: 'center'
})}
`
const Footer = ({style}) => {
  return (
    <Main gradient={style ? `linear-gradient(${style.split(',')[1].replace(')', '')}, #1e2964)` : '#1e2964'}>
        <Left>
            <P>San Diego, Venezuela.</P>
            <P>All Rights Reserved <AiOutlineCopyright/></P>
        </Left>
        <Center><A><AiOutlineInstagram style={{fontSize: '35px'}}/></A><A><AiOutlineTwitter style={{fontSize: '35px'}}/></A></Center>
        <Right>
            <P style={{fontSize: '20px'}}>About</P>
            <Desc>
            <P>Team work</P>
            <P>Services</P>
            <P>Mission</P>
            <P>Careers</P>
            </Desc>
        </Right>
    </Main>
  )
}

export default Footer