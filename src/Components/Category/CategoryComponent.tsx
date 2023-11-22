import { Tooltip, Typography } from '@mui/material'
import { CategoryModel } from './Category.types'
import { ColorCircle } from './CreateCategory.styled'

type Props = {
    category: CategoryModel | null
}

export default function CategoryComponent({ category }: Props) {
    return (
        <>
            {category === null ? (
                <Typography>None</Typography>
            ) : (
                <>
                    <Tooltip title={category?.name}>
                        <ColorCircle categoryColor={category.color} />
                    </Tooltip>
                </>
            )}
        </>
    )
}
