import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { useTimeEventsContext } from '@/Components/TimeEventList/TimeEventsProvider'
import { TimeEvent } from '../types'
import { useState } from 'react'

type TimeEventOption = {
    label: string
    timeEvent: TimeEvent
}

type Props = {
    setEventValue: any
}

export default function TimeEventsSearch({ setEventValue }: Props) {
    const { timeEvents } = useTimeEventsContext()
    const [value, setValue] = useState<TimeEventOption>()

    const mapTimeEventsToOption = (): Array<TimeEventOption> => {
        return timeEvents.map((timeEvent) => {
            return {
                label: timeEvent.name,
                timeEvent: timeEvent,
            }
        })
    }

    return (
        <Autocomplete
            disablePortal
            id="time-events-search"
            options={mapTimeEventsToOption()}
            onChange={(event: any, newValue: any) => {
                setValue(newValue)
                setEventValue(newValue.timeEvent)
            }}
            sx={{ width: 300 }}
            renderInput={(params) => (
                <TextField {...params} label="Search for time events" />
            )}
        />
    )
}
