import styled from 'styled-components';

export const FilesSendSectionWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 10px; 
    justify-content: center;   
`;

export const ButtonsSection = styled.div`
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: minmax(100px, 300px) minmax(100px, 300px);
    justify-content: center;
    grid-gap: 10px;
    width: 50%;
    justify-self: center;
    margin-top: 20px;
`;

export const FormPartSection = styled.div`
    margin-top: 20px;
`;

export const FormFieldsWrapper = styled.div`
    width: 100%;
    display: grid;
    grid-template: auto / 75% 35%;
    grid-gap: 20px; 
    justify-content: center;   
`;