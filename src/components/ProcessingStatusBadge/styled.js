import styled from 'styled-components';

export const Badge = styled.div`
    min-width: 120px;
    margin: 0 20px;
    display: flex;
    gap: 10px;
    height: 40px; 
    padding: 0 10px;
    border-radius: 20px;
    background: ${({background}) => background};
    color: ${(color) => color};
    align-items: center;
    font-size: 1.2rem;
`;

export const SuccessBadge = styled(Badge)`
    background: #b9dbb9;
    color: #418944 !important;
`;

export const ErrorBadge = styled(Badge)`
    background: #efcaca;
    color: #d74242 !important;
`;