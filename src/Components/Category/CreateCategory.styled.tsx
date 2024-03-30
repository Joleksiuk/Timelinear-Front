import styled from 'styled-components'

export const CreateCategoryStyled = styled.div`
    display: grid;
    gap: 20px;
    grid-template-columns: 1fr;
`

export const CategoryContainerStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    &:hover {
        cursor: 'pointer';
    }
`
export const HorizontalContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
`

type Props = {
    categoryColor: string
    marginLeft?: string
}
export const ColorCircle = styled.div<Props>`
    width: 40px;
    height: 40px;
    border-radius: 10px;
    background-color: ${(props) => props?.categoryColor || '#887a96ef'};
    margin-left: ${(props) => props?.marginLeft};
`
