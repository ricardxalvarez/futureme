import React from 'react'
import styled from 'styled-components'
import Footer from '../components/footer'
import Navbar from '../components/navbar'
import useGlobalContext from '../context'
import { IoCloseCircleOutline } from 'react-icons/io5'
const Main = styled.div`
width: 100%;
background: ${props => props.gradient};
display: flex;
justify-content: center;
align-items: center;
padding: 15vh 0;
`
const Card = styled.div`
position: relative;
padding: 15px 20px;
width: 80%;
max-width: 700px;
border-radius: 10px;
display: flex;
justify-content: space-around;
align-items: center;
flex-direction: column;
background-color: white;
 border: 1px solid rgba(0, 0, 255, .2);
 transition: all .2s;
 box-shadow: 12px 12px 2px 1px rgba(0, 0, 255, .2);
 &:hover{
  box-shadow: -12px 12px 2px -1px rgba(0, 0, 255, .2);

 }
 `
const Title = styled.h2`
font-weight: 500;
`
const QuestionsContainer = styled.div``
const QuestionContainer = styled.div``
const Question = styled.h4``
const Answer = styled.p`
`
const PostDate = styled.p``
const PostContainer = styled.div`
position: absolute;
top: -5px;
right: 15px;
`
const ImgsContainer = styled.div`
display: flex;
flex-direction: column;
`
const InfoContainer = styled.div`
height: 150px;
width: 100%;
margin-bottom: 50px;
${props => props.className === 'last' && {
  marginBottom: '70px'
}}
`
const Before = styled.div`
position: absolute;
width: 100%;
height: 100%;
background-color: rgba(0,0,0,0.2);
top: 0;
left: 0;
backdrop-filter: blur(3px);
opacity: 0;
transition: all 0.3s ease;
display: flex;
justify-content: center;
align-items: center;
`
const ImgContainer = styled.div`
width: 100%;
height: 100%;
overflow: hidden;
border: 1px solid rgba(0, 0, 255, .2);
border-radius: 5px;
cursor: pointer;
position: relative;
&:hover ${Before}{
  opacity: 1;
}
`
const LabelImage = styled.h4`
margin-bottom: 10px;
`
const Img = styled.img`
width: 100%;
height: 100%;
object-fit: cover;
transition: all 0.3s ease;
&:hover{
  transform: scale(1.1);
}
`
const ModalImage = styled.div`
background-color: rgba(0,0,0,0.5);
position: fixed;
top: 0;
left: 0;
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`
const Image = styled.img`
width: 100%;
max-width: 500px;
`
const Dashboard = () => {
  const {userData} = useGlobalContext()
  const [modal, setModal] = React.useState(false)
  const [modalLink, setModalLink] = React.useState('')

  return (
    <>
    <Navbar/>
    <Main gradient={userData.gradient}>
      <Card>
        <Title>{userData.fullname}</Title>
        <QuestionsContainer>
          { userData.questions &&
            userData.questions.map((item, index)=>{
              return <QuestionContainer key={index}>
                <Question>{item.question}</Question>
                <Answer>{item.response}</Answer>
              </QuestionContainer>
            })
          }
        </QuestionsContainer>
        {userData.postDate && 
        <PostContainer>
        <PostDate>{userData.postDate.month}-{userData.postDate.date}-{userData.postDate.year}</PostDate>
        </PostContainer>
        }
        <ImgsContainer>
        {
          userData.images && 
          userData.images.map((item, index)=>{
            return <InfoContainer key={index} className={index === (userData.images.length - 1) ? 'last': ''}>
              <LabelImage>{item.question}</LabelImage>
              <ImgContainer onClick={()=> setModalLink(item.image)}>
                <Before onClick={()=> setModal(true)}/>
              <Img src={item.image}/>
              </ImgContainer>
            </InfoContainer>
          })
        }
        </ImgsContainer>
      </Card>
      {
        modal && 
        <ModalImage>
          <IoCloseCircleOutline style={{fontSize: '30px', position: 'absolute', top: '10vw', right: '10vw', color: 'white', cursor: 'pointer'}} onClick={()=> setModal(false)}/>
        <Image src={modalLink}/>
        </ModalImage>
      }
    </Main>
    <Footer style={userData.gradient}/>
    </>
  )
}

export default Dashboard