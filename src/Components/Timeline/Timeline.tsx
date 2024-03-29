import {
    HeaderContainer,
    HeaderContainerStyled,
    MainContainerStyled,
} from './Timeline.styled'
import { TimeEventsProvider } from '../TimeEventList/TimeEventsProvider'
import { useSingleTimelineContext } from './TimelineProvider/SingleTimelineProvider'
import TimelineUtils from './TimelineUtils'
import CircularProgress from '@mui/material/CircularProgress'
import { useState } from 'react'
import { TimeEvent } from '../TimeEvent/types'
import { Divider, Typography } from '@mui/material'
import GroupSearch from '@/Components/Group/Search/GroupSearch'
import TestTimeline from './TimelineChart/TimelineChart'
import TimelinePageHeader from './TimelinePageHeader'

export default function Timeline() {
    const { canEdit, timeline, isLoadingData, addEventToTimeline } = useSingleTimelineContext()
    const [eventSearchValue, setEventSearchValue] = useState<TimeEvent>()

    const handleAddEventToTimeline = () => {
        if (eventSearchValue !== null && eventSearchValue !== undefined) {
            addEventToTimeline(eventSearchValue)
        }
    }
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
                        <Divider orientation="horizontal" flexItem style={{ padding: '20px' }}>
                            Add event to timeline
                        </Divider>
                        <TimelinePageHeader />
                        <TestTimeline
                            items={
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
