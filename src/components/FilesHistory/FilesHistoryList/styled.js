import styled from 'styled-components';

export const Wrapper = styled.div`
    width: 100%; 
    position: relative;
    border-radius: 10px;
    overflow: hidden;
`;

export const ProgressLayer = styled.div`
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    visibility: ${({isOpen}) => isOpen ? 'visible' : 'hidden'};
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background: rgba(230, 230, 230, ${({isOpen}) => isOpen ? 0.5 : 0});
    backdrop-filter: blur(1px);
    transition: ${({isOpen}) => isOpen ? 'visibility 0s 0s, background .3s 0s' : 'visibility .3s, background .3s'};
`;