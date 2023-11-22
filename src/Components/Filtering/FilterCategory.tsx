import CategorySearch from '../Category/CategorySearch'
import { useFilterContext } from './FilterProvider'

export default function FilterCategory() {
    const { categoryFilter, setCategoryFilter } = useFilterContext()
    return (
        <CategorySearch
            defaultCategory={categoryFilter}
            setCategory={setCategoryFilter}
        />
    )
}
