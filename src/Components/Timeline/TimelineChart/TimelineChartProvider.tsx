import { createContext, useContext, useState, ReactNode } from 'react'

export type Parameters = {
    rootCircleRadius: number
    branchCircleRadius: number
    rootMargin: number
    branchWidth: number
    branchHeight: number
    dataFontSize: number
    iconSize: number
    textMaxWidth?: number
}

const DefaultParameters: Parameters = {
    rootCircleRadius: 50,
    branchCircleRadius: 35,
    rootMargin: 50,
    branchWidth: 10,
    branchHeight: 70,
    dataFontSize: 30,
    iconSize: 70,
    textMaxWidth: 600,
}

type TimelineChartContextProps = {
    parameters: Parameters
    setParameters: (parameters: Parameters) => void
}

const DefaultTimelineChartContext: TimelineChartContextProps = {
    parameters: DefaultParameters,
    setParameters: (parameters: Parameters) => {},
}

const TimelineChartContext = createContext<TimelineChartContextProps>(
    DefaultTimelineChartContext
)

type TimelineChartProviderProps = {
    initialParams?: Parameters
    children: ReactNode
}

const TimelineChartProvider = ({
    children,
    initialParams = DefaultParameters,
}: TimelineChartProviderProps) => {
    const [parameters, setParameters] = useState<Parameters>(initialParams)

    return (
        <TimelineChartContext.Provider
            value={{
                parameters: parameters,
                setParameters: (parameters: Parameters) => {
                    setParameters(parameters)
                },
            }}
        >
            {children}
        </TimelineChartContext.Provider>
    )
}

const useTimelineChartContext = () => {
    const context = useContext<TimelineChartContextProps>(TimelineChartContext)
    if (!context) {
        throw new Error(
            'useTimelineChartContext must be used within a TimelineChartProvider'
        )
    }
    return context
}

export { TimelineChartProvider, useTimelineChartContext }
