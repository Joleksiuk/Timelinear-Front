import { useState } from 'react'
import { HexColorPicker } from 'react-colorful'
import {
    CategoryContainerStyled,
    CreateCategoryStyled,
    HorizontalContainer,
} from './CreateCategory.styled'
import {
    AccordionDetails,
    AccordionSummary,
    Button,
    Divider,
    TextField,
    Typography,
} from '@mui/material'
import CategorySearch from './CategorySearch'
import { CategoryModel } from './Category.types'
import CategoryService from './CategoryService'
import CategoryComponent from './CategoryComponent'
import Accordion from '@mui/material/Accordion'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

type Props = {
    category: CategoryModel | null
    setCategory: (value: CategoryModel | null) => void
    handleClose: () => void
}

const MAX_NAME_LENGTH = 20

export default function CreateCategory({ category, setCategory, handleClose }: Props) {
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
        } finally {
            handleClose()
        }
    }
    return (
        <CategoryContainerStyled>
            <HorizontalContainer>
                <Typography>{'Chosen: '}</Typography>
                <CategoryComponent category={category} />
                <Typography sx={{ paddingLeft: '5px' }}>{category?.name}</Typography>
            </HorizontalContainer>

            <CategorySearch defaultCategory={category} setCategory={setCategory} />
            <Divider flexItem orientation="vertical">
                OR
            </Divider>
            <Accordion>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    Create new category
                </AccordionSummary>
                <AccordionDetails>
                    <CreateCategoryStyled>
                        <TextField
                            label="Create category"
                            value={name}
                            onChange={(e) => {
                                if (
                                    e.target.value.length <= MAX_NAME_LENGTH ||
                                    e.target.value.length !== 0
                                ) {
                                    setName(e.target.value)
                                    setNameError(false)
                                } else {
                                    setNameError(true)
                                }
                            }}
                            error={nameError}
                        />
                        <HexColorPicker color={color} onChange={setColor} />
                        <Button variant="contained" onClick={() => handleCreateCategory()}>
                            Create Category
                        </Button>
                    </CreateCategoryStyled>
                </AccordionDetails>
            </Accordion>
            <Button variant="contained" onClick={handleClose}>
                Ok
            </Button>
        </CategoryContainerStyled>
    )
}
