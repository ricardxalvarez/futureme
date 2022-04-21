import { css } from "styled-components";

const mobile = (props)=>{
    return css`
    @media only screen and (max-width: 830px){
        ${props}
    }
    `
}

export default mobile