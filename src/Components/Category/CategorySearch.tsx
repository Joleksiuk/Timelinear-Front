import TextField from '@mui/material/TextField'
import Autocomplete from '@mui/material/Autocomplete'
import { CategoryModel } from './Category.types'
import { useEffect, useState } from 'react'
import CategoryService from './CategoryService'
import { CircularProgress } from '@mui/material'

type CategoryOption = {
    label: string
    category: CategoryModel
}

type Props = {
    defaultCategory: CategoryModel | null
    setCategory: (value: CategoryModel | null) => void
}

export default function CategorySearch({ defaultCategory: category, setCategory }: Props) {
    const [categories, setCategories] = useState<Array<CategoryModel>>([])
    const [loadingData, setLoadingData] = useState<boolean>(false)

    const initCategoriesData = async () => {
        try {
            setLoadingData(true)
            const response = await CategoryService.getOwnedCategories()
            setCategories(response.categories)
            setLoadingData(false)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        initCategoriesData()
    }, [])

    const getDefaultValue = () => {
        if (category === null) {
            return null
        }
        return {
            label: category?.name || '',
            category: category || null,
        }
    }

    const mapCategoriesToOption = (): Array<CategoryOption> => {
        return categories.map((category) => {
            return {
                label: category?.name || '',
                category: category || null,
            }
        })
    }

    const handleValueChange = async (newValue: CategoryOption) => {
        if (newValue) {
            setCategory(newValue.category)
        } else {
            setCategory(null)
        }
    }

    return (
        <Autocomplete
            fullWidth
            disablePortal
            loading={loadingData}
            id="categories-search"
            options={mapCategoriesToOption()}
            onChange={(event: any, newValue: any) => {
                handleValueChange(newValue)
                console.log(event)
            }}
            defaultValue={getDefaultValue()}
            renderInput={(params) => <TextField {...params} label="Choose category" />}
            sx={{ minWidth: '200px', maxWidth: '400px' }}
        />
    )
}
