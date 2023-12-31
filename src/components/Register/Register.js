import React, {useContext, useState} from 'react';
import TextField from "@mui/material/TextField/TextField";
import {AuthForm, AuthFormFooter, Fieldset, FormTitle} from "../commonStyled/AuthForm";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {RegisterWrapper} from "./styled";
import {register} from "../../api/auth";
import {Loader} from "../common/Loader";
import {InfoTooltipServiceContext} from "../../contexts/InfoTooltipServiceContext";
import {Logo} from "../common/Logo";

export const Register = ({handleLogin}) => {
    const [isLoading, setIsLoading] = useState(false);

    const {setState: setInfoTooltipState} = useContext(InfoTooltipServiceContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: ''
    });


    const handleChange = (evt) => {
        const {name, value} = evt.target;
        setFormData({
            ...formData,
            [name]: value
        })
    };

    const handleSignUp = (evt) => {
        evt.preventDefault();

        setIsLoading(true);

        register(formData)
            .then((res) => {
                setInfoTooltipState({
                    isOpen: true,
                    isSuccess: true,
                    message: `Successful registration, ${formData.name}!`
                });
                handleLogin(res);
            })
            .catch(err => {
                console.log(err);

                setInfoTooltipState({
                    isOpen: true,
                    isSuccess: false,
                    message: 'Something went wrong'
                });
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <RegisterWrapper>
            <AuthForm onSubmit={handleSignUp}>
                <Logo fontSize={35}/>
                <FormTitle>
                    Sign up
                </FormTitle>
                <Fieldset>
                    <TextField label='Name'
                               variant='outlined'
                               type='text'
                               name='name'
                               value={formData.name}
                               onChange={handleChange}
                    />
                    <TextField label='Email'
                               variant='outlined'
                               type='email'
                               name='email'
                               email={formData.email}
                               onChange={handleChange}
                    />
                    <TextField label='Password'
                               variant='outlined'
                               type='password'
                               name='password'
                               email={formData.password}
                               onChange={handleChange}
                    />
                </Fieldset>
                <Button variant='contained'
                        type="submit"
                >
                    Sign up
                </Button>
                <AuthFormFooter>
                    <p>{`Don't have account? `}</p>
                    <Link to='/sign-in'>
                        Sign in
                    </Link>
                </AuthFormFooter>
            </AuthForm>
            <Loader isActive={isLoading} onClose={() => setIsLoading(false)} />
        </RegisterWrapper>
    )
}