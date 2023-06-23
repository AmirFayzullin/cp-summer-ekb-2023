import React, {useState} from 'react';
import TextField from "@mui/material/TextField/TextField";
import {AuthForm, AuthFormFooter, Fieldset, FormTitle} from "../commonStyled/AuthForm";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {RegisterWrapper} from "./styled";
import {register} from "../../api/auth";

export const Register = ({handleLogin}) => {
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

        register(formData)
            .then((res) => {
                handleLogin(res);
            })
            .catch(err => {
                console.log(err);
            })
    };

    return (
        <RegisterWrapper>
            <AuthForm onSubmit={handleSignUp}>
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
        </RegisterWrapper>
    )
}