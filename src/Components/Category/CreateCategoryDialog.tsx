import { useState } from 'react'
import { CategoryModel } from './Category.types'
import { Backdrop, Box, Button, Fade, Modal, Typography } from '@mui/material'
import { CategoryContainerStyled, ColorCircle } from './CreateCategory.styled'
import CreateCategory from './CreateCategory'

type Props = {
    category: CategoryModel | null
    setCategory: (value: CategoryModel | null) => void
    text?: string
}
const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    zindex: 1,
}

export default function CreateCategoryDialog({
    category,
    setCategory,
    text = 'Chosen category :  ',
}: Props) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <CategoryContainerStyled>
                <Button variant="outlined" onClick={handleOpen}>
                    <Typography>
                        {text}
                        {category?.name || '  None'}
                    </Typography>
                    <ColorCircle
                        categoryColor={category?.color || '#887a96ef'}
                        marginLeft={'10px'}
                    />
                </Button>
            </CategoryContainerStyled>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={open}
                onClose={handleClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                    backdrop: {
                        timeout: 500,
                    },
                }}
            >
                <Fade in={open}>
                    <Box sx={style}>
                        <CreateCategory
                            category={category}
                            setCategory={setCategory}
                            handleClose={handleClose}
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
