import { useEffect, useState } from 'react'
import { DefaultParameters, Parameters } from './TimelineChartProvider'

// Define the base screen width and the scale step.
const BASE_WIDTH: number = 2560 // Default resolution width.
const SCALE_STEP: number = 100 // Every 100 pixels change adjusts the scale.
const SCALE_FACTOR_CHANGE_PER_STEP: number = 0.05 // Scale factor change per step.

const useResponsiveParameters = (): Parameters => {
    const [parameters, setParameters] = useState<Parameters>(DefaultParameters)

    const calculateScaleFactor = (screenWidth: number): number => {
        // Calculate the difference in width from the BASE_WIDTH.
        const widthDifference: number = screenWidth - BASE_WIDTH
        // Determine how many steps (of 100 pixels) away from the base width we are.
        const stepsAway: number = widthDifference / SCALE_STEP
        // Adjust the scale factor by 0.02 for each step away from BASE_WIDTH.
        const scaleFactor: number = 1 + stepsAway * SCALE_FACTOR_CHANGE_PER_STEP
        // Return the scale factor, ensuring it never goes below a certain minimum if needed.
        return scaleFactor
    }

    useEffect(() => {
        const handleResize = (): void => {
            const screenWidth: number = window.innerWidth
            const scaleFactor: number = calculateScaleFactor(screenWidth)

            // Apply the scale factor linearly to all parameters
            const scaledParameters: Parameters = Object.keys(DefaultParameters).reduce(
                (acc, key) => {
                    const value: any = DefaultParameters[key as keyof Parameters]
                    if (typeof value === 'number') {
                        // Apply calculated scale factor, ensuring not to scale certain parameters if necessary.
                        acc[key as keyof Parameters] = value * scaleFactor
                    } else {
                        acc[key as keyof Parameters] = value
                    }
                    return acc
                },
                {} as Parameters
            )
            setParameters(scaledParameters)
        }

        window.addEventListener('resize', handleResize)
        handleResize() // Call at initial render to set initial sizes

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    return parameters
}

export default useResponsiveParameters
