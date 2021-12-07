import React, { useState } from 'react';
import styled from "styled-components/native";
import FormInput from '../components/formInput';
import FormButton from '../components/formButton';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Trans, useTranslation } from 'react-i18next';


const Container = styled.View`
    background-color: #f9fafd;
    flex: 1;
    justify-content: center;
    align-items: center;
    padding: 20px;
`
const StyledText = styled.Text`
    font-size: 28;
    margin-bottom: 10;
    color: #051d5f;
`
const NavButton = styled.View`
    margin-top: 15;
`
const NavButtonText = styled.View`
    font-size: 18;
    font-weight: 500;
    color: #2e64e5;
`
const Logo = styled.Image`
    height: 150;
    width: 150;
`

const TextPrivate = styled.View`
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-top: 15;
`

const ColorTextPrivate = styled.Text`
    font-size: 13;
    font-weight: 400;
    color: grey;
`


const SingupScreen = ({ navigation }) => {
    const { t } = useTranslation();
    const [nombre, setNombre] = useState("");
    const [apellido, setApellido] = useState("");
    const [telefono, setTelefono] = useState("");
    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");

    const SignUp = () => {
        try {
            axios.post("https://back-biblioteca.herokuapp.com/usuario", {
                nombre: nombre,
                apellido: apellido,
                telefono: telefono,
                correo: correo,
                password: password
            }).then(() => {
                navigation.navigate('Login')
            })
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <Container>
            <StyledText>{t('create_account')}</StyledText>
            <FormInput
                placeholderText={t('name')}
                onChangeText={(userName) => setNombre(userName)}
                iconType="user"
                autoCapitalize="none"
                autoCorrect="false"
            />
            <FormInput
                placeholderText={t('last_name')}
                onChangeText={(userLastName) => setApellido(userLastName)}
                autoCapitalize="none"
                autoCorrect="false"
            />
            <FormInput
                placeholderText={t('phone')}
                onChangeText={(userPhone) => setTelefono(userPhone)}

            />
            <FormInput
                placeholderText={t('email')}
                onChangeText={(userEmail) => setCorreo(userEmail)}

            />
            <FormInput
                placeholderText={t('password')}
                onChangeText={(userPassword) => setPassword(userPassword)}
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle={t('create_account')}
                onPress={() => SignUp()}
            />
            <TextPrivate>
                <ColorTextPrivate> {t('By_registering_you_confirm_that_you_accept_our')} </ColorTextPrivate>
                <TouchableOpacity onPress={() => alert('Terms Clicked')}>
                    <ColorTextPrivate style={{ color: '#e88832' }}> Terms of service </ColorTextPrivate>
                </TouchableOpacity>
                <ColorTextPrivate> and </ColorTextPrivate>
                <ColorTextPrivate style={{ color: '#e88832' }}> Privacy Policy </ColorTextPrivate>
            </TextPrivate>

        </Container>
    )
}

export default SingupScreen;