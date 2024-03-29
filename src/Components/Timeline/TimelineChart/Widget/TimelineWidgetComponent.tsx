import EventIconComponent from "@/Components/IconSearch/EventIconComponent";
import { TimelineModel } from "../../TimelineProvider/types"
import { ContainerStyled, EventContainerStyled } from "./TimelineWidgetComponent.styled";
import { Typography, styled } from "@mui/material";

type Props = {
    timeline: TimelineModel;
}

const TruncatedTypography = styled(Typography)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #7b83ad;
  font-size: 15px;
`;

export default function TimelineWidgetComponent({timeline}: Props): JSX.Element {
    return (
        <ContainerStyled>
            {timeline.timeEvents.map((timeEvent) => {
                return (
                    <EventContainerStyled>
                        <EventIconComponent eventIcon={{type: timeEvent.iconType, source: timeEvent.iconSource}} style={{height: '30px', width:'30px'}}/>
                        <TruncatedTypography>{timeEvent.name}</TruncatedTypography>
                    </EventContainerStyled>
                );
            })}
        </ContainerStyled>
    );
}