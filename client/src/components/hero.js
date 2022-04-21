import React from 'react'
import styled, {keyframes} from 'styled-components'
import background from '../images/3985.jpg'
import mobile from '../responsive'
const Container = styled.div`
height: 100vh;
width: 100%;
background: crimson;
position: relative;
z-index: -1;
&::after{
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(transparent, 85%, rgba(0,0,0,1));
}
`
const Img = styled.img`
height: 100%;
width: 100%;
object-fit: cover;
`
const animation = keyframes`
to {
  transform: translateX(0)
}
`
const TitleCont = styled.div`
position: absolute;
top: 45%;
left: 3rem;
transform: translateY(-50%);
transform: translateX(-40vw);
animation-name: ${animation};
animation-duration: 1s;
animation-fill-mode: forwards;
${mobile({
  left: '1.7rem',
  top: '30%'
})}
`
const Title = styled.h1`
z-index: 1000;
font-size: 45px;
color: white;
text-transform: uppercase;
margin: 0;
text-shadow: 0px 0px 10px black;
${mobile({
  fontSize: '40px'
})}
`
const Hero = () => {
  return (
    <Container className='hero'>
        <Img src={background} alt="" />
        <TitleCont>
        <Title>Introduce yourself</Title>
        <Title>to you in 5 years</Title>
        </TitleCont>
    </Container>
  )
}

export default Hero
