import React, {useState} from 'react';
import TextField from "@mui/material/TextField";
import {LoginWrapper} from "./styled";
import Button from "@mui/material/Button";
import {AuthForm, AuthFormFooter, Fieldset, FormTitle} from "../commonStyled/AuthForm";
import {Link} from "react-router-dom";
import {login} from "../../api/auth";
import {Loader} from "../common/Loader";

export const Login = ({handleLogin}) => {
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
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

    const handleSignIn = (evt) => {
        evt.preventDefault();

        setIsLoading(true);

        login(formData)
            .then((res) => {
                handleLogin(res);
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            })
    };

    return (
        <LoginWrapper>
            <AuthForm onSubmit={handleSignIn}>
                <FormTitle>
                    Sign in
                </FormTitle>
                <Fieldset>
                    <TextField label='Email'
                               variant='outlined'
                               type='email'
                               name='email'
                               value={formData.email}
                               onChange={handleChange}
                    />
                    <TextField label='Password'
                               variant='outlined'
                               type='password'
                               name='password'
                               value={formData.password}
                               onChange={handleChange}
                    />
                </Fieldset>
                <Button variant='contained'
                        type="submit"
                >
                    Sign in
                </Button>
                <AuthFormFooter>
                    <p>{`Already has an account? `}</p>
                    <Link to='/sign-up'>
                        Sign up
                    </Link>
                </AuthFormFooter>
            </AuthForm>
            <Loader isActive={isLoading} onClose={() => setIsLoading(false)} />
        </LoginWrapper>
    )
};