import {
    ContentContainerStyled,
    HeaderContainer,
    HeaderContainerStyled,
    MainContainerStyled,
} from './Timeline.styled'
import { TimeEventsProvider } from '../TimeEventList/TimeEventsProvider'
import { useSingleTimelineContext } from './TimelineProvider/SingleTimelineProvider'
import TimelineUtils from './TimelineUtils'
import CircularProgress from '@mui/material/CircularProgress'
import { useEffect, useState } from 'react'
import { Divider, Typography } from '@mui/material'
import TestTimeline from './TimelineChart/TimelineChart'
import TimelinePageHeader from './TimelinePageHeader'
import TimelineActionsDropdown from './TimelineDropdown'
import EditableTextField from './EditableTextField'
import TimelineService from './TimelineProvider/TimelineService'
import GroupSearch from '../Group/Search/GroupSearch'

const MAX_TIMELINE_NAME_LENGTH = 50
const MAX_TIMELINE_DESCRIPTION_LENGTH = 250

export default function Timeline() {
    const { timeline, isLoadingData, canEdit } = useSingleTimelineContext()

    const [timelineName, setTimelineName] = useState<string>('')
    const [timelineDescription, setTimelineDescription] = useState<string>('')

    const updateTimeline = async () => {
        if (timeline?.id != null)
            await TimelineService.updateTimeline(
                {
                    name: timelineName,
                    description: timelineDescription,
                },
                timeline.id
            )
    }
    useEffect(() => {
        if (timelineName !== timeline?.name || timelineDescription !== timeline?.description)
            updateTimeline()
    }, [timelineName, timelineDescription])

    useEffect(() => {
        if (!isLoadingData) {
            setTimelineName(timeline?.name || '')
            setTimelineDescription(timeline?.description || '')
        }
    }, [isLoadingData])

    return (
        <div>
            {isLoadingData ? (
                <CircularProgress />
            ) : timeline === null || timeline === undefined ? (
                <Typography
                    sx={{
                        color: '#4c58aa',
                        fontSize: '40px',
                        wordWrap: 'break-word',
                    }}
                >
                    No timeline with this exists!
                </Typography>
            ) : (
                <TimeEventsProvider>
                    <ContentContainerStyled>
                        <HeaderContainerStyled>
                            <HeaderContainer>
                                <EditableTextField
                                    typography={
                                        <Typography
                                            sx={{
                                                color: '#4c58aa',
                                                fontSize: '30px',
                                                maxWidth: '400px',
                                                wordWrap: 'break-word',
                                            }}
                                        >
                                            {timelineName}
                                        </Typography>
                                    }
                                    maxLength={MAX_TIMELINE_NAME_LENGTH}
                                    setText={setTimelineName}
                                    defaultValue={timelineName}
                                />
                                <TimelineActionsDropdown timeline={timeline} />
                            </HeaderContainer>
                            <EditableTextField
                                typography={
                                    <Typography
                                        sx={{
                                            color: '#5d6074',
                                            fontSize: '20px',
                                            maxWidth: '500px',
                                            wordWrap: 'break-word',
                                        }}
                                    >
                                        {timelineDescription}
                                    </Typography>
                                }
                                maxLength={MAX_TIMELINE_DESCRIPTION_LENGTH}
                                setText={setTimelineDescription}
                                defaultValue={timelineDescription}
                            />

                            {canEdit && <GroupSearch timeline={timeline} />}
                            <Divider orientation="horizontal" flexItem>
                                Add event to timeline
                            </Divider>
                            <TimelinePageHeader />
                        </HeaderContainerStyled>
                        <MainContainerStyled>
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
                    </ContentContainerStyled>
                </TimeEventsProvider>
            )}
        </div>
    )
}
