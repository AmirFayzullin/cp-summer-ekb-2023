import React from 'react';
import TextField from "@mui/material/TextField/TextField";
import {AuthForm, AuthFormFooter, Fieldset, FormTitle} from "../commonStyled/AuthForm";
import Button from "@mui/material/Button";
import {Link} from "react-router-dom";
import {RegisterWrapper} from "./styled";

export const Register = () => {
    return (
        <RegisterWrapper>
            <AuthForm>
                <FormTitle>
                    Sign up
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