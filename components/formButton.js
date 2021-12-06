import React from 'react'
import styled from "styled-components/native";

const ButtonContainer = styled.TouchableOpacity `
    margin-top: 10px;
    width: 100%;
    background-color: #2e64e5;
    padding: 10px;
    align-items: center;
    justify-content: center;
    border-radius: 3px;
`
const ButtonText = styled.Text `
    font-size: 18;
    font-weight: bold;
    color: #ffffff;
`


const FormButton = ({buttonTitle, ...rest}) => {
    return (
        <ButtonContainer {...rest}>
            <ButtonText>{buttonTitle}</ButtonText>
        </ButtonContainer>
    )
}

export default FormButton;