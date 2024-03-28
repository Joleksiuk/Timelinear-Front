import { useEffect, useState } from 'react'
import styled from 'styled-components'

type Props = {
    children: React.ReactNode
}
const ContainerStyled = styled.div<{ value: number }>`
    scale: ${(props) => props.value};
`
export default function ScalableContainer({ children }: Props) {
    const [scaleValue, setScaleValue] = useState<number>(1)
    useEffect(() => {
        const handleResize = (): void => {
            const screenWidth: number = window.innerWidth
            const x1 = 2560,
                y1 = 1.5
            const x2 = 400,
                y2 = 0.7

            let scaleFactor: number

            if (screenWidth >= x1) {
                scaleFactor = 1.5
            } else if (screenWidth <= x2) {
                scaleFactor = 0.3
            } else {
                scaleFactor = y1 + ((y2 - y1) / (x2 - x1)) * (screenWidth - x1)
            }

            setScaleValue(scaleFactor)
        }

        window.addEventListener('resize', handleResize)
        handleResize()
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return (
        <ContainerStyled data-testid="container" value={scaleValue}>
            {children}
        </ContainerStyled>
    )
}
