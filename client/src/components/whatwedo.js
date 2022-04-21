import React, { useEffect } from 'react'
import styled, {keyframes} from 'styled-components'
import guy from '../images/Saly-19.png'
import Aos from 'aos'
import "aos/dist/aos.css"
import mobile from '../responsive'
import { useNavigate } from 'react-router-dom'
let array  = []
for (let i = 0; i < 15; i++) {
    array = [...array, i]
}
const Main = styled.div`
background: linear-gradient(black, 90%, #1e2964);
height: 100vh;
display: flex;
align-items: center;
overflow: hidden;
${mobile({
    flexDirection: 'column',
    height: 'auto',
    padding: '15vh 0'
})}
`
const Left = styled.div`
flex: 1;
display: flex;
align-items: center;
`
const Right = styled.div`
flex: 1;
display: flex;
flex-direction: column;
align-items: center;
position: relative;
`
const ImgContainer = styled.div`
height: 60vh;
width: 30vw;
z-index: 10;
${mobile({
    width: 'auto',
    height: '50vh'
})}
`
const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
`
const animation  = keyframes`
0% {
    width: 7vw;
}
50% {
    width: 15vw;
}
100% {
    width: 7vw;
}
`
const Bar = styled.div`
height: 2px;
background-color: white;
animation-name: ${animation};
animation-duration: 2s;
animation-timing-function: ease;
animation-iteration-count: infinite;
`
const Glowing = styled.div`
position: absolute;
height: 300px;
width: 300px;
top: 50%;
z-index: 1;
transform:translateY(-50%) ;
${mobile({
    height: '230px',
    width: '230px'
})}
`
const Particle = styled.span`
position: absolute;
top: ${props => `${props.number * 5}px`};
left: ${props => `${props.number * 5}px`};
bottom: ${props => `${props.number * 15}px`};
right: ${props => `${props.number * 5}px`};
&::before{
    content: '';
    position: absolute;
    top: 50%;
    left: -4px;
    width: 3px;
    height: 3px;
    background-color:white ;
    border-radius: 50%;
    box-shadow: 0 0 10px white;
}
`
const Card = styled.div`
width: 100%;
background-color: white;
height: auto;
border-radius: 0 0 10px 0;
margin-left: 20px;
padding: 5px 10px;
${mobile({
    margin: 'auto 20px'
})}
`
const Title = styled.h2`
display: block;
width: fit-content;
position: relative;
margin-top: 10px;
span {
  position: absolute;
  width: 100%;
  height: 3px;
  background-color: #1e2964;
  bottom: 0;
  left: 0;

}
`
const P = styled.p``
const Whatwedo = () => {
    useEffect(()=>{
        Aos.init({duration: 1500})
    },[])
    const nav = useNavigate()
  return (
    <Main>
      <Left>
        <Card data-aos="fade-up">
        <Title>What we do?<span></span></Title>
        <P>Easy question! Do you want to know how you were 5 years ago?, sometimes we forget how we thought, and how we even looked like, but that doesn't have to still being a problem.</P>
        <P>All you got to do is create an account, and in 5 years we will reach you an show you your own profile! don't worry, your friends won't view your profile, unless you want it :)</P>
        <button onClick={()=> nav('/signup')} className="cssbuttons-io-button"> Get started
            <div className="icon">
                <svg height="24" width="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M0 0h24v24H0z" fill="none"></path><path d="M16.172 11l-5.364-5.364 1.414-1.414L20 12l-7.778 7.778-1.414-1.414L16.172 13H4v-2z" fill="currentColor"></path></svg>
            </div>
        </button>
        </Card>
      </Left>
      <Right>
          <ImgContainer>
          <Img src={guy}/>
          </ImgContainer>
          <Bar></Bar>
          <Glowing>
              {
                  array.map((item)=>{
                     return <Particle className='particle' key={item} number={item} ></Particle>
                  })
              }
          </Glowing>
      </Right>
    </Main>
  )
}

export default Whatwedo
