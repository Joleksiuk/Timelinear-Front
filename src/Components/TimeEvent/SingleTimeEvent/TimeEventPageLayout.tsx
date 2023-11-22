import { CircularProgress, Divider, Typography } from '@mui/material'
import { useSingleTimeEventContext } from './SingleTimeEventProvider'
import {
    DateContainer,
    TimeEventPageContainer,
} from './TimeEventPageLayout.styled'
import EventIconComponent from '@/Components/IconSearch/EventIconComponent'
import { ColorCircle } from '@/Components/Category/CreateCategory.styled'

export default function TimeEventPageLayout() {
    const { timeEvent, isLoadingData } = useSingleTimeEventContext()
    return (
        <TimeEventPageContainer>
            {isLoadingData ? (
                <CircularProgress />
            ) : timeEvent === null || timeEvent === undefined ? (
                <div>No timeline with this id exists!</div>
            ) : (
                <TimeEventPageContainer>
                    <EventIconComponent
                        eventIcon={{
                            type: timeEvent.iconType,
                            source: timeEvent.iconSource,
                        }}
                    />
                    <Divider orientation="horizontal" flexItem>
                        Name
                    </Divider>
                    <Typography
                        sx={{
                            color: '#4c58aa',
                            fontSize: '50px',
                            wordWrap: 'break-word',
                        }}
                    >
                        {timeEvent.name}
                    </Typography>
                    <Divider orientation="horizontal" flexItem>
                        Description
                    </Divider>
                    <Typography
                        sx={{
                            color: '#444d86',
                            fontSize: '30px',
                            wordWrap: 'break-word',
                        }}
                    >
                        {timeEvent.description}
                    </Typography>
                    <Divider orientation="horizontal" flexItem>
                        Category
                    </Divider>
                    <>
                        {timeEvent.category === null ? (
                            <Typography>None</Typography>
                        ) : (
                            <>
                                <Typography>{timeEvent.name}</Typography>
                                <ColorCircle
                                    categoryColor={
                                        timeEvent?.category.color || '#448662'
                                    }
                                />
                            </>
                        )}
                    </>
                    <Divider orientation="horizontal" flexItem>
                        Date
                    </Divider>
                    <DateContainer>
                        <Typography
                            sx={{
                                color: '#448662',
                                fontSize: '30px',
                                wordWrap: 'break-word',
                            }}
                        >
                            {timeEvent.startDate}
                        </Typography>
                        <Divider orientation="horizontal"> - </Divider>
                        <Typography
                            sx={{
                                color: '#448662',
                                fontSize: '30px',
                                wordWrap: 'break-word',
                            }}
                        >
                            {timeEvent.endDate}
                        </Typography>
                    </DateContainer>
                </TimeEventPageContainer>
            )}
        </TimeEventPageContainer>
    )
}
