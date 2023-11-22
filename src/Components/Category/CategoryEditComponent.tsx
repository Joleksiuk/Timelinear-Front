import { Button, Modal, Backdrop, Fade, Box } from '@mui/material'
import { CategoryModel } from './Category.types'
import CategoryComponent from './CategoryComponent'
import CreateCategory from './CreateCategory'
import { useState } from 'react'

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

type Props = {
    category: CategoryModel | null
    setCategory: (category: CategoryModel | null) => void
}

export default function CategoryEditComponent({
    category,
    setCategory,
}: Props) {
    const [open, setOpen] = useState(false)
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)

    return (
        <div>
            <Button variant="outlined" onClick={handleOpen}>
                <CategoryComponent category={category}></CategoryComponent>
            </Button>
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
                        />
                    </Box>
                </Fade>
            </Modal>
        </div>
    )
}
