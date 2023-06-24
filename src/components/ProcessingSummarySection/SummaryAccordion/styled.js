import styled from 'styled-components';

export const ItemTitle = styled.div`
    width: 100%;
    display: grid;
    grid-auto-flow: column;
    grid-template-columns: 50px max-content auto;
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
    grid-template-columns: 1fr 3fr 50px;
    min-height: 40px;
    padding: 0 10px;
`;

export const ErrorsListTitle = styled(ErrorItem)`
    font-size: 1.3rem;
    color: grey; 
    border-bottom: solid 2px #00000057;
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