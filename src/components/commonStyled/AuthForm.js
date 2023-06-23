import styled from "styled-components";

export const FormTitle = styled.p`
    font-size: 25px;
    text-align: center;
`;

export const AuthForm = styled.form`
    display: grid;
    grid-template-rows: repeat(3, auto);
    grid-gap: 30px;
    min-width: 30vw;
`;

export const Fieldset = styled.div`
    display: grid;
    grid-direction: row;
    grid-gap: 10px;
`;

export const AuthFormFooter = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`;