import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import {
    CategoryContainerStyled,
    CreateCategoryStyled,
} from './CreateCategory.styled'
import { Button, Divider, TextField, Typography } from '@mui/material'
import CategorySearch from './CategorySearch'
import { CategoryModel } from './Category.types'
import CategoryService from './CategoryService'
import CategoryComponent from './CategoryComponent'

type Props = {
    category: CategoryModel | null
    setCategory: (value: CategoryModel | null) => void
}

const MAX_NAME_LENGTH = 50

export default function CreateCategory({ category, setCategory }: Props) {
    const [color, setColor] = useState(category?.color || '#aabbcc')
    const [name, setName] = useState<string>('')
    const [nameError, setNameError] = useState(false)

    const handleCreateCategory = async () => {
        try {
            const response = await CategoryService.createCategory({
                name: name,
                color: color,
            })
            setCategory(response)
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <CategoryContainerStyled>
            <CreateCategoryStyled>
                <Typography>
                    {'Chosen category: '}
                    <CategoryComponent category={category} />
                </Typography>
                <TextField
                    label="Create category"
                    value={name}
                    onChange={(e) => {
                        if (e.target.value.length <= MAX_NAME_LENGTH) {
                            setName(e.target.value)
                            setNameError(false)
                        } else {
                            setNameError(true)
                        }
                    }}
                    error={nameError}
                />
                <HexColorPicker color={color} onChange={setColor} />
                <Button
                    variant="contained"
                    onClick={() => handleCreateCategory()}
                >
                    Create Category
                </Button>
            </CreateCategoryStyled>
            <Divider flexItem orientation="vertical">
                OR
            </Divider>
            <CategorySearch
                defaultCategory={category}
                setCategory={setCategory}
            />
        </CategoryContainerStyled>
    )
}
