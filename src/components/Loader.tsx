import { SpinnerDotted } from 'spinners-react';
import styled from 'styled-components';

interface ILoaderProps {
    text?: string
}

const LoaderContainer = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`

const LoaderText = styled.p`
    color: #565578;
`

function Loader({ text }: ILoaderProps) {
    return (
        <LoaderContainer>
            <SpinnerDotted color='#565578' />
            {text && <LoaderText>{text}</LoaderText>}
        </LoaderContainer>
    )
}

export default Loader;