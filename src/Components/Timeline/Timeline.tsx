import TimelineChart from './TimelineChart/TimelineChart'
import CreateEventForm from '../TimeEvent/CreateTimeEvent/CreateEventForm'
import {
    EventCreationContainer,
    GridColumnContainer,
    HeaderContainer,
    HeaderContainerStyled,
    MainContainerStyled,
} from './Timeline.styled'
import { TimeEventsProvider } from '../TimeEventList/TimeEventsProvider'
import TimeEventsSearch from '../TimeEvent/TimeEventsSearch/TimeEventsSearch'
import { useSingleTimelineContext } from './TimelineProvider/SingleTimelineProvider'
import TimelineUtils from './TimelineUtils'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { TimeEvent } from '../TimeEvent/types'
import Button from '@mui/material/Button'
import { Group } from '../Group/GroupTypes'
import { Divider, Typography } from '@mui/material'
import GroupSearch from '@/Components/Group/Search/GroupSearch'
import { getCurrentUser } from '@/Services/AuthService'
import TimelineOptionDropdown from './TimelineOptionDropdown'
import useResponsiveParameters from './TimelineChart/UseResponsiveParameters'

const timelineChartParameters = {
    rootCircleRadius: 100,
    branchCircleRadius: 40,
    rootMargin: 50,
    branchWidth: 20,
    branchHeight: 200,
    dataFontSize: 30,
    iconSize: 70,
}
export default function Timeline() {
    const { canEdit, timeline, isLoadingData, addEventToTimeline } = useSingleTimelineContext()
    const [eventSearchValue, setEventSearchValue] = useState<TimeEvent>()

    const handleAddEventToTimeline = () => {
        if (eventSearchValue !== null && eventSearchValue !== undefined) {
            addEventToTimeline(eventSearchValue)
        }
    }
    const responsiveParameters = useResponsiveParameters()

    return (
        <div>
            {isLoadingData ? (
                <CircularProgress />
            ) : timeline === null || timeline === undefined ? (
                <div>No timeline with this exists!</div>
            ) : (
                <TimeEventsProvider>
                    <HeaderContainerStyled>
                        <HeaderContainer>
                            <Typography
                                sx={{
                                    color: '#4c58aa',
                                    fontSize: '40px',
                                    wordWrap: 'break-word',
                                }}
                            >
                                {timeline.name}
                            </Typography>
                        </HeaderContainer>
                        <Typography
                            sx={{
                                color: '#5d6074',
                                fontSize: '20px',
                                wordWrap: 'break-word',
                            }}
                        >
                            {timeline.description}
                        </Typography>
                        {canEdit && <GroupSearch timeline={timeline} />}
                    </HeaderContainerStyled>
                    <MainContainerStyled>
                        {canEdit && (
                            <MainContainerStyled>
                                <Divider orientation="horizontal" flexItem>
                                    Add event to timeline
                                </Divider>
                                <EventCreationContainer>
                                    <CreateEventForm isInModal={false} />
                                    <Divider orientation="vertical" flexItem>
                                        OR
                                    </Divider>
                                    <GridColumnContainer>
                                        <TimeEventsSearch setEventValue={setEventSearchValue} />
                                        <Button
                                            variant="contained"
                                            onClick={handleAddEventToTimeline}
                                        >
                                            Add to timeline
                                        </Button>
                                    </GridColumnContainer>
                                </EventCreationContainer>
                            </MainContainerStyled>
                        )}
                        <TimelineChart
                            parameters={responsiveParameters}
                            events={
                                timeline
                                    ? TimelineUtils.mapTimeEventsToTimelineEvents(
                                          timeline.timeEvents
                                      )
                                    : []
                            }
                        />
                    </MainContainerStyled>
                </TimeEventsProvider>
            )}
        </div>
    )
}
