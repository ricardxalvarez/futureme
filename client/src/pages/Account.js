import React, { useState, useRef } from 'react'
import styled, {keyframes, css} from 'styled-components'
import { Country, State, City }  from 'country-state-city';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'
import mobile from '../responsive'
import { IoCloseCircleOutline } from 'react-icons/io5'
import axios from 'axios'
import useGlobalContext from '../context'
import { useNavigate } from 'react-router-dom';
const Main = styled.div`
height: 100vh;
width: 100%;
background: linear-gradient(#0bec8b, #31168a);
display: flex;
justify-content: center;
align-items: center;
overflow: hidden;
flex-direction: column;
overflow-x: hidden;
`
const Card = styled.div`
width: 70vw;
height: 90%;
background-color: #ffffff;
position: absolute;
top: 50%;
left: 50%;
display: flex;
flex-direction: column;
align-items: center;
justify-content: space-around;
border-radius: 10px;
transform: translate(-50%, -50%);
${props => props.className === 'element1' && {
    left: '125vw',
}}
${props => props.className === 'element2' && {
    left: '200vw',
}}
${props => props.className === 'element3' && {
    left: '275vw',
}}
${props => props.className === 'element4' && {
    left: '350vw',
}}
${props => props.className === 'element5' && {
    left: '425vw',
}}
${props => props.className === 'element6' && {
    left: '500vw',
}}
${props => props.className === 'element7' && {
    left: '575vw',
}}
${mobile({
  width: '80vw'
})}
${mobile(
  props => props.className === 'element1' && {
    left: '135vw'
  }
)}
${mobile(
  props => props.className === 'element2' && {
    left: '220vw'
  }
)}
${mobile(
  props => props.className === 'element3' && {
    left: '305vw'
  }
)}
${mobile(
  props => props.className === 'element4' && {
    left: '390vw'
  }
)}
${mobile(
  props => props.className === 'element5' && {
    left: '475vw'
  }
)}
${mobile(
  props => props.className === 'element6' && {
    left: '560vw'
  }
)}
${mobile(
  props => props.className === 'element7' && {
    left: '645vw'
  }
)}
`
const Wrapper = styled.div`
width: 100%;
height: 100%;
display: flex;
padding-bottom: 20px;
justify-content:center;
align-items: center;
position: relative;
transform: ${props => `translateX(-${props.index * 75}vw)`};
transition: all 0.3s ;
margin: 0;
${mobile({
  transform: props => `translateX(-${props.index * 85}vw)`
})}
`
const Title = styled.h2`
margin-top: 50px;
text-transform: uppercase;
font-weight: 400;
color: white;
text-align: center;
`
const Input = styled.input`
padding: 5px 10px;
width: 130px;
&:focus{
  outline: none;
}
margin: 10px 5px;
${mobile({
  margin: '0',
  marginTop: '10px'
})}
`
const InputCont = styled.div`
display: flex;
justify-content: center;
align-items: center;
margin-bottom: 10px;
${mobile({
  flexDirection: 'column'
})}
`
const Select = styled.select`
padding: 5px 10px;
background-color: transparent;
width: 150px;
&:focus{
  outline: none;
}
margin-bottom: 10px;
`
const Option = styled.option`
background-color: transparent;
`
const Desc = styled.div`
display: flex;
flex-direction: column;
width: 100%;
justify-content: center;
align-items: center;
`
const SelectCont = styled.div`
display: flex;
flex-direction: column;
`
const FirstTitle = styled.h2`
font-weight: 400;
text-align: center;
margin: auto;
width: 70%;
${mobile({
  fontSize: '17px'
})}
`
const TextArea = styled.textarea`
padding: 10px 15px;
outline: none;
min-width: 80%;
max-width: 80%;
min-height: 55%;
max-height: 55%;
font-size: 15px;
border-radius: 10px;
border: 2px solid lightgray;
${mobile({
  minWidth: '70%',
  maxWidth: '70%',
})}
`
const DropFIleInput = styled.div`
position: relative;
border: 2px dashed slateblue;
border-radius: 10px;
display: flex;
width: 100%;
align-items: center;
justify-content: center;
background-color: white;
margin: 5px;
transition: all 0.3s ease;
&:hover{
  opacity: 0.7;
  transform: scale(1.05);
}
`
const InputLabel = styled.div`
text-align: center;
height: 100px;
display: flex;
align-items: center;
justify-content: center;
width: 100%;
img {
  height: 100%;
}
p {
  margin-right: 5px;
${mobile({
  fontSize: '14px',
  lineHeight: '15px'
})}
}
`
const FileInput = styled.input`
opacity: 0;
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
cursor: pointer;
`
const FileInputForm = styled.form`
display: flex;
flex-direction: column;
justify-content: space-between;
width: 80%;
align-items:center ;
`
const TitleCont = styled.div`
width: 100%;
position: relative;
padding: 10px 0;
`
const ButtonCont = styled.div`
width: 80%;
position: relative;
${mobile({
  width: '100%'
})}
`
const GradientCont = styled.div`
display: flex;
flex-wrap: wrap;
width: 80%;
justify-content: center;
align-items: center;
${mobile({
  width: '100%'
})}
`
const Gradient = styled.div`
height: 90px;
width: 80px;
margin: 7px;
border-radius: 10px;
border: none;
${props => props.className === 'selected' && {
  outline: '2px solid black'
}}
${mobile({
  width: '60px',
  height: '70px',
  margin: '5px'
})}
input {
  opacity: 0;
  cursor: pointer;
  height: 100%;
  width: 100%;
}
`
const ContainerModal = styled.div`
position: absolute;
top: 0;
left: 0;
width: 100%;
height: 100%;
background: rgba(0,0,0,0.5);
overflow-y: hidden;
z-index: 100;
`
const animation = keyframes`
from {
  top: 200vh;
}
to {
  top: 50%;
}
`
const Modal = styled.div`
position: absolute;
top: 200vh;
left: 50%;
width: 50vw;
height: 50vh;
background-color: #ffffff;
border-radius: 15px;
transform: translate(-50%, -50%);
animation-name: ${animation};
animation-duration: 0.3s;
animation-fill-mode: forwards;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
img {
  height: 50px;
  width: 50px;
}
${mobile({
  width: '60vw'
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
div p {
  position: absolute;
  left: 50%;
  top: 50%;
  margin: auto;
  transform: translate(-50%, -50%);
  z-index: 10000;
  font-size: 14px;
  color: black;
}
`
const Step = styled.div`
position: absolute;
top: 0;
left: 0;
background-color: rgba(0,0,0,0.7);
width: 100%;
height: 100vh;
display: flex;
align-items: center;
justify-content: center;
`
const StepCard = styled.div`
height: 70vh;
width: 70vw;
background-color: #ffffff;
display: flex;
align-items: center;
justify-content: center;
border-radius: 10px;
text-align: center;
flex-direction: column;
`
const StepTitle = styled.h3`
margin: 10px 25px;
`
const gradiente = keyframes`
 0% {
  background-position: 0% 50%;
 }

 50% {
  background-position: 100% 50%;
 }

 100% {
  background-position: 0% 50%;
 }
`
const StepButton = styled.button`
 background: linear-gradient(-45deg, #3f00b5, #9f69fe, #27c8b7, #3f00b5);
 background-size: 800% 400%;
 padding: 0.8em 1.6em;
 display: inline-block;
 border: none;
 border-radius: 10px;
 font-size: 17px;
 font-weight: 700;
 color: white;
 transition: all .5s ease-in-out;
 animation: gradient 10s infinite cubic-bezier(.62, .28, .23, .99) both;
 cursor: pointer;
 &:hover{
  animation: ${gradiente} 3s infinite;
 transform: scale(1.05);
 }
 &:active{
    animation: ${gradiente} 3s infinite;
 transform: scale(0.8);
 }
`
const closed = keyframes`
from {
  right: -20vw;
}
to {
  right: 10vw;
}
`
const closedResponse = keyframes`
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
animation-name: ${props => props.className === 'responsive' ? css`${closedResponse}`: css`${closed}`};
animation-duration: 0.3s;
animation-fill-mode: forwards;
${mobile({
  width: '170px'
})}
`
const WrongTitle = styled.p`
width: 70%;
margin: 0;
${mobile({
  width: '90%'
})}
`
const Account = () => {
  window.addEventListener('beforeunload', (event) => {
  event.returnValue = `Are you sure you want to leave?`;
  });
  let width = window.innerWidth
  window.addEventListener('resize', ()=>{
    width = window.innerWidth
  }) 
  const {email, password, step} = useGlobalContext()
    const [index, setIndex] = useState(0)
    const [state, setState] = useState([])
    const [city, setCity] = useState([])
    const [country, setCountry] = useState('')
    const [value, setValue] = useState('')
    const [gradient, setGradient] = useState('')
    const [file, setFile] = useState('')
    const [file1, setFile1] = useState('')
    const [file2, setFile2] = useState('')
    const [wrong, setWrong] = useState(false)
    const [previewSource, setPreviewSource] = useState('')
    const [previewSource1, setPreviewSource1] = useState('')
    const [previewSource2, setPreviewSource2] = useState('')
    const [modal, setModal] = useState(false)
    const [name, setName] = useState('')
    const [lastname, setLastname] = useState('')
    const [loading, setLoading] = useState(false)
    const [countryName, setCountryName] = useState('')
    const [stateName, setStateName] = useState('')
    const [cityName, setCityName] = useState('')
    const [firstQuestion, setFirstQuestion] = useState('')
    const [secondQuestion, setSecondQuestion] = useState('')
    const [thirdQuestion, setThirdQuestion] = useState('')
    const [fourthQuestion, setFourthQuestion] = useState('')
    const [fifthQuestion, setFifthQuestion] = useState('')
    const [percentage, setPercentage] = useState(0)
    const nav = useNavigate()
    const handleGradient = (e)=>{
      setGradient(e.target.value)
    }
    const wrapperRef = useRef(null)
    const wrapperRef1 = useRef(null)
    const wrapperRef2 = useRef(null)
    const onDragEnter = () => wrapperRef.current.classList.add('dragover')
    const onDragEnter1 = () => wrapperRef1.current.classList.add('dragover')
    const onDragEnter2 = () => wrapperRef2.current.classList.add('dragover')
    const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
    const onDragLeave1 = () => wrapperRef1.current.classList.remove('dragover')
    const onDragLeave2 = () => wrapperRef2.current.classList.remove('dragover')
    const onDrop = () => wrapperRef.current.classList.remove('dragover')
    const onDrop1 = () => wrapperRef1.current.classList.remove('dragover')
    const onDrop2 = () => wrapperRef2.current.classList.remove('dragover')
     const onFileDrop = (e) => {
        const newFile = e.target.files[0];
        setFile(newFile)
        previewFile(e.target.files[0])
    }
     const onFileDrop1 = (e) => {
        const newFile = e.target.files[0];
        setFile1(newFile)
        previewFile1(e.target.files[0])
    }
     const onFileDrop2 = (e) => {
        const newFile = e.target.files[0];
        setFile2(newFile)
        previewFile2(e.target.files[0])
    }
     const previewFile = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        };
    };
     const previewFile1 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource1(reader.result);
        };
    };
     const previewFile2 = (file) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource2(reader.result);
        };
    };
  const uploadImage = async (first, second, third) => {
        try {
          const options = {
            onUploadProgress: (progressEvent) => {
              setPercentage(Math.floor( (progressEvent.loaded * 100) / progressEvent.total ))
            }
          }
            await axios.post('https://futuremebackend.herokuapp.com/api/v1/users/signup', {
          	"email": email,
          	"password": password,
          	"fullname": `${name} ${lastname}`,
          	"address": {
          		"country": countryName,
          		"state": stateName,
          		"city": cityName,
              "phone": value
          	},
          	"questions": [
          		{"question": "If you could go back 5 years, what would you tell your past self?", "response": firstQuestion},
          		{"question": "How do you see yourself in 5 years?", "response": secondQuestion},
          		{"question": "What are your worries right now?", "response": thirdQuestion},
          		{"question": "Who is/are your example/s to follow and why?", "response": fourthQuestion},
          		{"question": "Tell us about people who you love", "response": fifthQuestion},
          	],
          	"image1": {question: 'A pic of you 5 years ago' , image: first},
          	"image2": {question: 'A pic of something you love', image: second},
          	"image3": {question: "Take a selfie right now", image: third},
          	"gradient": gradient
          }, options)
          .then(res => {
            setLoading(false)
            localStorage.setItem('user', JSON.stringify({ email, password }))
            nav('/')
          })
          .catch(err => console.log(err))
        } catch (err) {
            console.error(err);
            setLoading(false)
        }
    };
    const onSubmit = async e =>{
    e.preventDefault()
    setLoading(true)
    let first
    let second 
    let third
    const reader1 = new FileReader()
    reader1.readAsDataURL(file)
    const reader2 = new FileReader()
    reader2.readAsDataURL(file1)
    const reader3 = new FileReader()
    reader3.readAsDataURL(file2)
    reader1.onloadend = () => {
      first = reader1.result
      reader2.onloadend = () => {
        second = reader2.result
        reader3.onloadend = () => {
          third = reader3.result
            uploadImage(first, second, third)
        }
      }
    }
  }
  return (
    <Main>
        <Title>
            Create your account
        </Title>
        <Wrapper index={index}>
        <Card className={'element0'}>
        <TitleCont>
        <FirstTitle>Personal Info</FirstTitle>
        </TitleCont>
          <Desc>
          <InputCont>
          <Input placeholder='Name' autoComplete='name' value={name.charAt(0).toUpperCase() + name.slice(1)} onChange={(e)=> setName((e.target.value).replace(' ', ''))}/>
          <Input placeholder='Last name' value={lastname.charAt(0).toUpperCase() + lastname.slice(1)} autoComplete='lastname' onChange={(e)=> setLastname((e.target.value).replace(' ', ''))}/>
          </InputCont>
          <SelectCont>
          <Select onChange={(e)=> {
            setState(State.getStatesOfCountry((e.target.value).split(' ')[1]))
            setCountry((e.target.value).split(' ')[1])
            setCountryName((e.target.value).split(' ')[0])
            }}>
            <Option selected disabled>- Select a country -</Option>
            {
              Country.getAllCountries().map((item, index) => {
                return <Option key={index} value={`${item.name} ${item.isoCode}` }>{item.name}</Option>
              })
            }
          </Select>
          {
            state.length > 0 &&
            <Select onChange={(e)=> {
              setCity(City.getCitiesOfState( country, (e.target.value).split(' ')[1]))
              setStateName((e.target.value).split(' ')[0])
            }}
              
              >
            <Option selected disabled>- Select a state -</Option>
            { state !==  [] &&
              state.map((item, index) => {
                return <Option key={index} value={`${item.name} ${item.isoCode}` }>{item.name}</Option>
              })
            }
          </Select>
          }
          {
            city.length > 0 &&
            <Select onChange={(e)=> setCityName((e.target.value).split(' ')[0])}>
            <Option selected disabled>- Select a city -</Option>
            {
              city.map((item, index) => {
                return <Option key={index} value={`${item.name} ${item.isoCode}` }>{item.name} </Option>
              })
            }
          </Select>
          }
          </SelectCont>
          <PhoneInput className='phone' value={value} onChange={setValue}></PhoneInput>
          </Desc>
          <ButtonCont>
          <button className='for' onClick={()=> setIndex(index + 1)}>
          <span>Forward</span>
          <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
          </button>
          </ButtonCont>
        </Card>
        <Card className={'element1'}>
          <TitleCont>
          <FirstTitle>If you could go back 5 years, what would you tell your past self?</FirstTitle>
          </TitleCont >
          <TextArea value={firstQuestion.charAt(0).toUpperCase() + firstQuestion.slice(1)} onChange={(e)=> setFirstQuestion(e.target.value)}/>
          <ButtonCont>
            <button className='back' onClick={()=> {
              setIndex(index - 1)
              if (index === 0){
                setIndex(0)
              }
            }}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
          </ButtonCont>
        </Card>
        <Card className={'element2'}>
          <TitleCont>
          <FirstTitle>How do you see yourself in 5 years?</FirstTitle>
          </TitleCont>
          <TextArea value={secondQuestion.charAt(0).toUpperCase() + secondQuestion.slice(1)} onChange={(e)=> setSecondQuestion(e.target.value)}/>
          <ButtonCont>
            <button className='back' onClick={()=> {
              setIndex(index - 1)
              if (index === 0){
                setIndex(0)
              }
            }}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
            </ButtonCont>
        </Card>
        <Card className={'element3'}>
          <TitleCont>
          <FirstTitle>What are your worries right now?</FirstTitle>
          </TitleCont>
          <TextArea value={thirdQuestion.charAt(0).toUpperCase() + thirdQuestion.slice(1)} onChange={(e)=> setThirdQuestion(e.target.value)}/>
          <ButtonCont>
            <button className='back' onClick={()=> {
              setIndex(index - 1)
              if (index === 0){
                setIndex(0)
              }
            }}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
              </ButtonCont>
        </Card>
        <Card className={'element4'}>
          <TitleCont>
          <FirstTitle >Who is/are your example/s to follow and why?</FirstTitle>
          </TitleCont>
          <TextArea value={fourthQuestion.charAt(0).toUpperCase() + fourthQuestion.slice(1)} onChange={(e)=> setFourthQuestion(e.target.value)}/>
          <ButtonCont>
            <button className='back' onClick={()=> setIndex(index - 1)}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
          </ButtonCont>
        </Card>
        <Card className={'element5'}>
          <TitleCont>
          <FirstTitle>Tell us about people who you love</FirstTitle>
          </TitleCont>
          <TextArea value={fifthQuestion.charAt(0).toUpperCase() + fifthQuestion.slice(1)} onChange={(e)=> setFifthQuestion(e.target.value)}/>
          <ButtonCont>
            <button className='back' onClick={()=> setIndex(index - 1)}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
          </ButtonCont>
        </Card>
        <Card className={'element6'}>
          <TitleCont>
          <FirstTitle>Share some images</FirstTitle>
          </TitleCont>
          <FileInputForm encType="multipart/form-data">
          <DropFIleInput 
          ref={wrapperRef}
          onDragEnter={onDragEnter}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          >
            <InputLabel
            className={previewSource && 'previewSource' }
            >
            <img src={previewSource ? previewSource :"https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg"}/>
            <p>A pic of you 5 years ago</p>
            </InputLabel>
            <FileInput type='file' accept='.png, .jpg, .jpeg' filename={file} onChange={onFileDrop}/>
          </DropFIleInput>
          <DropFIleInput 
          ref={wrapperRef1}
          onDragEnter={onDragEnter1}
          onDragLeave={onDragLeave1}
          onDrop={onDrop1}
          >
            <InputLabel
            className={previewSource1 && 'previewSource' }
            >
            <img src={previewSource1? previewSource1 : "https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg"}/>
            <p>A pic of something you love</p>
            </InputLabel>
            <FileInput type='file' accept='.png, .jpg, .jpeg' filename={file1} onChange={onFileDrop1}/>
          </DropFIleInput>
          <DropFIleInput 
          ref={wrapperRef2}
          onDragEnter={onDragEnter2}
          onDragLeave={onDragLeave2}
          onDrop={onDrop2}
          >
            <InputLabel
              className={previewSource2 && 'previewSource' }
            >
            <img src={previewSource2? previewSource2 : "https://static.vecteezy.com/system/resources/previews/002/634/880/original/drag-and-drop-tool-outline-icon-vector.jpg"}/>
            <p>Take a selfie right now, don't worry, nobody will see this</p>
            </InputLabel>
            <FileInput type='file' accept='.png, .jpg, .jpeg' filename={file2} onChange={onFileDrop2}/>
          </DropFIleInput>
          </FileInputForm>
          <ButtonCont>
            <button className='back' onClick={()=> setIndex(index - 1)}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> setIndex(index + 1)}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
          </ButtonCont>
        </Card>
        <Card className={'element7'}>
          <TitleCont>
          <FirstTitle>Select a gradient</FirstTitle>
          </TitleCont>
          <GradientCont>
            <Gradient style={{background: 'linear-gradient(#8e88ae, #852572)'}} className={gradient === 'linear-gradient(#8e88ae, #852572)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#8e88ae, #852572)'/>
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#5dbe56, #185e6a)'}} className={gradient === 'linear-gradient(#5dbe56, #185e6a)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#5dbe56, #185e6a)'/>
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#cba3df, #1c5d7d)'}} className={gradient === 'linear-gradient(#cba3df, #1c5d7d)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#cba3df, #1c5d7d)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#fdab93, #fcc741)'}} className={gradient === 'linear-gradient(#fdab93, #fcc741)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#fdab93, #fcc741)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#bbeda2, #d20823)'}} className={gradient === 'linear-gradient(#bbeda2, #d20823)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#bbeda2, #d20823)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#f8ad85, #422081)'}} className={gradient === 'linear-gradient(#f8ad85, #422081)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#f8ad85, #422081)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#d1e7e3, #31bfd7)'}} className={gradient === 'linear-gradient(#d1e7e3, #31bfd7)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#d1e7e3, #31bfd7)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#f0c271, #14157b)'}} className={gradient === 'linear-gradient(#f0c271, #14157b)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#f0c271, #14157b)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#ffc9db, #03b1b1)'}} className={gradient === 'linear-gradient(#ffc9db, #03b1b1)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#ffc9db, #03b1b1)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#fcd86c, #27d4d1)'}} className={gradient === 'linear-gradient(#fcd86c, #27d4d1)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#fcd86c, #27d4d1)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#e27d56, #3a1792)'}} className={gradient === 'linear-gradient(#e27d56, #3a1792)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#e27d56, #3a1792)' />
            </Gradient>
            <Gradient style={{background: 'linear-gradient(#265f61, #5ff2a9)'}} className={gradient === 'linear-gradient(#265f61, #5ff2a9)' ? 'selected': ''}>
            <input onClick={handleGradient} value='linear-gradient(#265f61, #5ff2a9)' />
            </Gradient>
          </GradientCont>
          <ButtonCont>
            <button className='back' onClick={()=> setIndex(index - 1)}>
              <svg height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
              <span>Back</span>
            </button>
            <button className='for' onClick={()=> {
              if (name.length > 2 && lastname.length && country !== '' && value.includes('+') && firstQuestion !== '' && secondQuestion !== '' && thirdQuestion !== '' && fourthQuestion !== '' && fifthQuestion !== '' && file !== '' && file1 !== '' && file2 !== '' && gradient !== '' && (file.type === 'image/png' || 'image/jpg' || 'image/jpeg') && (file1.type === 'image/png' || 'image/jpg' || 'image/jpeg') && (file2.type === 'image/png' || 'image/jpg' || 'image/jpeg')){
                setModal(true)
              } else {
                setWrong(true)
                setTimeout(()=>{
                  setWrong(false)
                }, 5000)
              }
              }}>
              <span>Forward</span>
              <svg style={{transform: 'rotate(180deg)'}} height="16" width="16" xmlns="http://www.w3.org/2000/svg" version="1.1" viewBox="0 0 1024 1024"><path d="M874.690416 495.52477c0 11.2973-9.168824 20.466124-20.466124 20.466124l-604.773963 0 188.083679 188.083679c7.992021 7.992021 7.992021 20.947078 0 28.939099-4.001127 3.990894-9.240455 5.996574-14.46955 5.996574-5.239328 0-10.478655-1.995447-14.479783-5.996574l-223.00912-223.00912c-3.837398-3.837398-5.996574-9.046027-5.996574-14.46955 0-5.433756 2.159176-10.632151 5.996574-14.46955l223.019353-223.029586c7.992021-7.992021 20.957311-7.992021 28.949332 0 7.992021 8.002254 7.992021 20.957311 0 28.949332l-188.073446 188.073446 604.753497 0C865.521592 475.058646 874.690416 484.217237 874.690416 495.52477z"></path></svg>
            </button>
          </ButtonCont>
        </Card>
        </Wrapper>
        { modal &&
          <ContainerModal>
          <Modal>
          <img src='https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Sign-check-icon.png/600px-Sign-check-icon.png?20200929115132' />
          <FirstTitle style={{margin: '0', marginTop: '10px'}}>You are all set to go!</FirstTitle>
          <div className="main_dif" onClick={onSubmit}>
            <button>Sign up</button>
          </div>
          <IoCloseCircleOutline onClick={()=> setModal(false)} style={{position: 'absolute', right: '20px', top: '20px', fontSize: '20px', cursor: 'pointer'}}/>
          </Modal>
        </ContainerModal>
        }
        {
          loading &&
        <SpinnerContainer>
        <div className="spinner">
          <p>{percentage}%</p>
        </div>
        </SpinnerContainer>
        }
        {
          step && 
          <Step>
            <StepCard>
              <StepTitle>Oops! Looks like you've skipped a step</StepTitle>
              <StepButton onClick={()=> nav('/signup')}>Go ahead</StepButton>
            </StepCard>
          </Step>
        }
        { wrong &&
        <WrongCard className={width < 830 && 'responsive'}>
          <IoCloseCircleOutline className='errorclose' onClick={()=> setWrong(false)}/>
          <WrongTitle>There are some fields you haven't filled</WrongTitle>
        </WrongCard>
        }
    </Main>
  )
}

export default Account
