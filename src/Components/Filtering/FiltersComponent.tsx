import FilterCategory from './FilterCategory'
import FilterDate from './FilterDate'
import FilterTextSearch from './FilterTextSearch'
import { FiltersComponentWrapperStyled } from './FiltersComponent.styled'

export default function FiltersComponent() {
    return (
        <FiltersComponentWrapperStyled>
            <FilterCategory />
            <FilterTextSearch />
            <FilterDate />
        </FiltersComponentWrapperStyled>
    )
}
