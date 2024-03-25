import styled from 'styled-components'

export const ContainerStyled = styled.div`
    display: flex;
    gap: 20px;
`

export const NameAndDateContainer = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`

type BaseProps = {
    display: boolean
}

export type CircleProps = {
    width: number
    height: number
} & BaseProps

export const CircleRootStyled = styled.div<CircleProps>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    border-radius: ${(props) => props.height}px;
    background-image: ${(props) => props.display && 'linear-gradient(200deg, #a33fca, #5b7add)'};
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    z-index: 4;
`
export type InnerCircleProps = {
    width: number
    height: number
}

export const InnerCircleRootStyled = styled.div<InnerCircleProps>`
    width: calc(100% - ${(props) => props.width}px);
    height: calc(100% - ${(props) => props.width}px);
    border-radius: ${(props) => props.width}px;
    background-color: #121529;
`

export const ElementsStyled = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;
`

export const BranchContainerStyled = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
`

export type LineProps = {
    width: number
    height: number
    rootMargin: number
}

export const LineStyled = styled.div<LineProps>`
    width: ${(props) => props.width * 2}px;
    border-radius: 10px;
    background-image: linear-gradient(200deg, #5b7add, #5b7add);
    position: absolute;
    margin-top: ${(props) => props.rootMargin - 10}px;
    top: 0;
    bottom: 0;
    z-index: 3;
`

export type BranchProps = {
    width: number
    height: number
    direction: 'left' | 'right'
} & BaseProps

export const BranchStyled = styled.div<BranchProps>`
    width: ${(props) => props.width}px;
    height: ${(props) => props.height}px;
    margin: -10px;
    background-image: ${(props) => {
        if (!props.display) {
            return
        }
        if (props.direction === 'right') {
            return 'linear-gradient(200deg, #a33fca, #5b7add)'
        }
        if (props.direction === 'left') {
            return 'linear-gradient(200deg, #5b7add, #a33fca)'
        }
    }};
    position: relative;
`

export const EventDataContainer = styled.div<BaseProps>`
    color: ${(props) => (props.display ? 'white' : '#121529')};
    display: flex;
    flex-direction: column;
    padding-left: 30px;
    padding-right: 30px;
`
type TextProps = {
    textFontSize: number
    maxWidth?: number
} & BaseProps

export const TextBase = styled.div<TextProps>`
    user-select: ${(props) => (props.display ? 'text' : 'none')};
    -webkit-user-select: ${(props) => (props.display ? 'text' : 'none')};
    -ms-user-select: ${(props) => (props.display ? 'text' : 'none')};
    max-width: 500px;
    word-wrap: break-word;
`
export const DateStyled = styled(TextBase)<TextProps>`
    color: ${(props) => (props.display ? '#ffffff' : '#121529')};
    font-size: ${(props) => props.textFontSize * 1.25}px;
`
export const EventNameStyled = styled(TextBase)<TextProps>`
    color: ${(props) => (props.display ? '#4c58aa' : '#121529')};
    font-size: ${(props) => props.textFontSize * 1.5}px;
    max-width: 500px;
    word-wrap: break-word;
`
export const DescriptionStyled = styled(TextBase)<TextProps>`
    color: ${(props) => (props.display ? '#5d6074' : '#121529')};
    font-size: ${(props) => props.textFontSize}px;
    max-width: ${(props) => (props.maxWidth ? `${props.maxWidth}px` : '600px')};
    word-wrap: break-word;
`
