import * as React from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import { EventCreationContainer, GridColumnContainer, MainContainerStyled } from './Timeline.styled'
import CreateEventForm from '../TimeEvent/CreateTimeEvent/CreateEventForm'
import TimeEventsSearch from '../TimeEvent/TimeEventsSearch/TimeEventsSearch'
import { useSingleTimelineContext } from './TimelineProvider/SingleTimelineProvider'
import { TimeEvent } from '../TimeEvent/types'
import { useState } from 'react'

export default function TimelinePageHeader() {
    const { canEdit, addEventToTimeline } = useSingleTimelineContext()
    const [eventSearchValue, setEventSearchValue] = useState<TimeEvent>()

    const handleAddEventToTimeline = () => {
        if (eventSearchValue !== null && eventSearchValue !== undefined) {
            addEventToTimeline(eventSearchValue)
        }
    }
    return (
        <>
            {canEdit && (
                <div style={{ width: '90%' }}>
                    <Accordion style={{ backgroundColor: '#24263d' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1-content"
                            id="panel1-header"
                        >
                            Create new event
                        </AccordionSummary>
                        <AccordionDetails>
                            <MainContainerStyled>
                                <EventCreationContainer>
                                    <CreateEventForm isInModal={false} />
                                </EventCreationContainer>
                            </MainContainerStyled>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion style={{ backgroundColor: '#24263d' }}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2-content"
                            id="panel2-header"
                        >
                            Add existing event
                        </AccordionSummary>
                        <AccordionDetails>
                            <GridColumnContainer>
                                <TimeEventsSearch setEventValue={setEventSearchValue} />
                                <Button variant="contained" onClick={handleAddEventToTimeline}>
                                    Add to timeline
                                </Button>
                            </GridColumnContainer>
                        </AccordionDetails>
                    </Accordion>
                </div>
            )}
        </>
    )
}
