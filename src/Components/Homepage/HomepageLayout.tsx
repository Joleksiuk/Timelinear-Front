import { BannerContainer, HomepageContainerStyled } from './HomepageLayout.styled'
import Banner from './Banner'
import CalendarInfo from './Functionalities/CalendarInfo'
import TimeEventInfo from './Functionalities/TimeEventInfo'
import TimelinesInfo from './Functionalities/TimelinesInfo'
import GroupsInfo from './Functionalities/GroupsInfo'
import UserInfo from './Functionalities/UserInfo'
import Carousel from '../Carousel/Carousel'

const pages = [<TimeEventInfo />, <CalendarInfo />, <TimelinesInfo />, <GroupsInfo />, <UserInfo />]
export default function HomepageLayout() {
    return (
        <HomepageContainerStyled>
            <BannerContainer>
                <Banner
                    title="Welcome to Timelinear!"
                    description="Create time events, manage them, add the to timelines and enjoy!"
                />
            </BannerContainer>
            <Carousel pageContents={pages} />
        </HomepageContainerStyled>
    )
}
