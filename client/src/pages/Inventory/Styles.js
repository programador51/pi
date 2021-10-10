import styled from 'styled-components';

export const ContainerRequestItem = styled.form`

    display: flex;
    justify-content: center;

    .rowInput{
        display: flex;
        align-items: center;
        input{
            min-width: 100%;
        }
        label{
            min-width: 50%;
            &::after{
                content: ":";
            }
        }
    }

`;