import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { useFilterContext } from './FilterProvider'
import { Alert, AlertTitle } from '@mui/material'
import { Dayjs } from 'dayjs'
import { useState } from 'react'
import styled from 'styled-components'

const DateContainerStyled = styled.div`
    display: flex;
    gap: 20px;
`
export default function FilterDate() {
    const {
        startDateFilter,
        setStartDateFilter,
        endDateFilter,
        setEndDateFilter,
    } = useFilterContext()

    const [dateError, setDateError] = useState(false)
    const validateDates = (start: Dayjs | null, end: Dayjs | null) => {
        if (start?.isAfter(end)) {
            setDateError(true)
            return
        }
        setDateError(false)
    }
    return (
        <DateContainerStyled>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="Start date"
                    value={startDateFilter}
                    onChange={(date) => {
                        setStartDateFilter(date)
                        validateDates(date, endDateFilter)
                    }}
                />
            </LocalizationProvider>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                    label="End date"
                    value={endDateFilter}
                    onChange={(date) => {
                        setEndDateFilter(date)
                        validateDates(startDateFilter, date)
                    }}
                />
            </LocalizationProvider>
            {dateError && (
                <Alert severity="warning">
                    <AlertTitle>Warning</AlertTitle>
                    Start date is later than end date!
                </Alert>
            )}
        </DateContainerStyled>
    )
}
