import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%;
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 40px;
`;

export const PaginationButtons = styled.div`
    width: 100%;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    justify-content: center;
    display: grid;
    grid-gap: 10px;
    margin: 20px 0;
`;