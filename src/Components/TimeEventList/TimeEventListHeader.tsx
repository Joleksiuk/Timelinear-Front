import FiltersComponent from '../Filtering/FiltersComponent'
import SortingDropdown from '../Sorting/SortingDropdown'
import { TimeEventListHeaderStyled } from './TimeEventsListStyled'

export default function TimeEventListHeader() {
    return (
        <TimeEventListHeaderStyled>
            <SortingDropdown />
            <FiltersComponent />
        </TimeEventListHeaderStyled>
    )
}
