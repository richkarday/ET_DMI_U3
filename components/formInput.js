import React from 'react'
import styled from "styled-components/native";
import AntDesign from 'react-native-vector-icons/AntDesign';

const InputContainer = styled.View `
    margin-top: 5;
    margin-bottom: 10;
    width: 100%;
    border-color: #ccc;
    border-radius: 3;
    border-width: 1;
    flex-direction: row;
    align-items: center;
    background-color: #fff;
`
const IconStyle = styled.View `
    padding: 10px;
    height: 100%;
    justify-content: center;
    align-items: center;
    border-right-color: #ccc;
    border-right-width: 1;
    width: 50;
`
const Input = styled.TextInput `
    padding: 10px;
    flex: 1;
    font-size: 16;
    color: #333;
    justify-content: center;
    align-items: center;
`
const FormInput = ({labelValue, placeholderText, iconType, ...rest}) => {
    return (
        <InputContainer>
            <IconStyle>
                <AntDesign name={iconType} size={25} color="#666"/>
            </IconStyle>
            <Input
            value={labelValue} 
            placeholder={placeholderText} 
            placeholderTextColor="#666" 
            {...rest}
            />
        </InputContainer>
      
    )
}

export default FormInput;