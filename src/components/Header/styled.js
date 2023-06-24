import styled from 'styled-components';

export const NavWrapper = styled.div`
    display: grid;
    grid-auto-flow: column;
    padding: 0 60px;
`;

export const ProfileWrapper = styled.div`
    justify-self: flex-end;
`;

export const HeaderWrapper = styled.div`
    width: 100%;
    box-sizing: border-box;
    padding: 10px;
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    box-shadow: 0 2px 10px 0 lightgrey;
`;

