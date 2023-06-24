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