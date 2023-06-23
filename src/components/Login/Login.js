import React from 'react';
import TextField from "@mui/material/TextField";
import {LoginWrapper} from "./styled";
import Button from "@mui/material/Button";
import {AuthForm, AuthFormFooter, Fieldset, FormTitle} from "../commonStyled/AuthForm";
import {Link} from "react-router-dom";

export const Login = () => {
    return (
        <LoginWrapper>
            <AuthForm>
                <FormTitle>
                    Sign in
                </FormTitle>
                <Fieldset>
                    <TextField label='Email'
                               variant='outlined'
                               type='email'
                    />
                    <TextField label='Password'
                               variant='outlined'
                               type='password'
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
        </LoginWrapper>
    )
};