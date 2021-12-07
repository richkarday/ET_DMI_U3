import React, { useState } from 'react';
import styled from "styled-components/native";
import FormInput from '../components/formInput';
import FormButton from '../components/formButton';
import { TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Trans,useTranslation } from 'react-i18next';


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


const Login = ({ navigation }) => {
    const { t } = useTranslation();

    const [correo, setCorreo] = useState("");
    const [password, setPassword] = useState("");
    const login = () => {
        try {
            axios.post("https://back-biblioteca.herokuapp.com/login", {
                correo: correo,
                password: password
            }).then(() => {
                navigation.navigate('Tabs')

                alert('Usuario ingreso correctamente')
            })
        } catch (err) {
            console.log(err)
        }
    }
    const redirectSignup = () => {
        navigation.navigate('Singup')
    }
    const placeholder = () => {
        console.log(<StyledText>         
            <Trans i18nKey="Login"></Trans>
        </StyledText>);
        return (

            null
        )
    }
    return (
        <Container>

            <StyledText>         
                <Trans i18nKey="login"></Trans>
            </StyledText>
            <FormInput
                placeholderText={t('email')}
                onChangeText={(correo) => setCorreo(correo)}
                iconType="user"
                autoCapitalize="none"
                autoCorrect="false"
            />



            <FormInput
                placeholderText={t('password')}
                onChangeText={(userPassword) => setPassword(userPassword)}
                iconType="lock"
                secureTextEntry={true}
            />
            <FormButton
                buttonTitle={t('login')}
                onPress={() => login()}
            />
            <TextPrivate>
                <ColorTextPrivate> {t('have_account')} </ColorTextPrivate>
                <TouchableOpacity onPress={() => redirectSignup()
                }>
                    <ColorTextPrivate style={{ color: '#e88832' }}> {t('register_here')} </ColorTextPrivate>
                </TouchableOpacity>
               
            </TextPrivate>

        </Container>
    )
}

export default Login;