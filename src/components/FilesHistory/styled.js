import styled from 'styled-components';

export const Wrapper = styled.div`
    display: grid;
    grid-auto-rows: auto;
    grid-gap: 20px;
`;

export const PaginationButtons = styled.div`
    width: 100%;
    grid-auto-flow: column;
    grid-auto-columns: min-content;
    justify-content: center;
    display: grid;
    grid-gap: 10px;
`;