import React from 'react'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import styled from 'styled-components'
import lama from '../images/lama.png'
import submenu from '../images/submenu.png'
import amazon from '../images/amazon.png'
import cocktails from '../images/cocktails.png'
import palette from '../images/palette.png'
import restaurant from '../images/restaurants.png'
import mobile from '../responsive'
const Main = styled.div`
background: linear-gradient(#41a7c6, #1e2964);
width: 100%;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
justify-content: center;
align-items: center;
margin-bottom: 10vh;
`
const Title = styled.h1``
const P = styled.p`
${mobile({
    margin: 'auto 20px'
})}
`
const TitleCont = styled.div`
text-align: center;
margin-top: 10vh;
color: white;
`
const Services = () => {
  return (
    <>
    <Navbar/>
    <Main>
        <TitleCont>
        <Title>Futureme's Services</Title>
        <P>Futureme not only offers a cool tool to discover yourself :)</P>
        </TitleCont>
        <Wrapper>
            <div class="card" data-image="Ecommerces">
                <div><img src={lama}/></div>
            </div>
            <div class="card" data-image="Landing Pages">
                <div><img src={submenu}/></div>
            </div>
            <div class="card" data-image="Clones">
                <div><img src={amazon}/></div>
            </div>
            <div class="card" data-image="Tools">
                <div><img src={palette}/></div>
            </div>
            <div class="card" data-image="Websites menu">
                <div><img src={cocktails}/></div>
            </div>
            <div class="card" data-image="Social Medias">
                <div><img src={restaurant}/></div>
            </div>
        </Wrapper>
    </Main>
    <Footer/>
    </>
  )
}

export default Services
