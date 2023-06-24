import styled from 'styled-components';

export const Wrapper = styled.div`
    min-height: 100vh;
`;

export const PrecisionBadge = styled.div`
    justify-content: center;
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: ${({fontSize = 25}) => fontSize}px;
    margin: 0 0 10px 0;
    color: ${({precision: p}) => {
        if (p < 41) return '#EA2940';  
        if (p < 81) return '#FF961C';   
        if (p <= 100) return '#27AE60';   
    }};
    
`;