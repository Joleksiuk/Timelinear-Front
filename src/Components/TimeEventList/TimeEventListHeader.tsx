import FilterCategory from '../Filtering/FilterCategory'
import FilterDate from '../Filtering/FilterDate'
import FilterTextSearch from '../Filtering/FilterTextSearch'
import FiltersComponent from '../Filtering/FiltersComponent'
import SortingDropdown from '../Sorting/SortingDropdown'
import { TimeEventListHeaderStyled } from './TimeEventsListStyled'

export default function TimeEventListHeader() {
    return (
        <TimeEventListHeaderStyled>
            <SortingDropdown />
            <FilterCategory />
            <FilterTextSearch />
            <FilterDate />
        </TimeEventListHeaderStyled>
    )
}
