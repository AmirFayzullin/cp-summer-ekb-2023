import styled from 'styled-components';

export const ItemTitle = styled.div`
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 50px 50% auto auto;
    grid-gap: 20px;
    align-items: center;
    padding: 0 5px;
`;

export const Date = styled.div`
    justify-self: flex-end;
`;

export const ErrorsList = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
`;

export const ErrorItem = styled.div`
    display: grid;
    grid-gap: 5px;
    grid-template-columns: 1fr 3fr 50px;
    min-height: 40px;
    padding: 0 10px;
    border-top: solid 1px #3c3c3c;
`;

export const ErrorsListTitle = styled(ErrorItem)`
    font-size: 1.3rem;
    color: #3c3c3c; 
    border-bottom: solid 2px #3c3c3c;
    border-top: none;
`;

export const SuccessWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 20px;
    color: #009c8e;
    font-size: 1.3rem;
    box-sizing: border-box;
`;

export const NameField = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    height: min-content;
`;