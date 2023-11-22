import { Validation } from '@/Services/Validation'
import { VisibilityOff, Visibility } from '@mui/icons-material'
import {
    FormControl,
    InputLabel,
    OutlinedInput,
    InputAdornment,
    IconButton,
    FormHelperText,
} from '@mui/material'
import { useState } from 'react'

type Props = {
    type: 'current-password' | 'new-password' | 'password' | 'repeat-password'
    label: string
    onChangeValue?: (value: string) => void
}
export default function PasswordField({
    type,
    label,
    onChangeValue,
}: Props): JSX.Element {
    const [isValidPassword, setIsValidPassword] = useState<boolean>(true)
    const [showPassword, setShowPassword] = useState(false)

    const handlePasswordChange = (event: any): void => {
        const isPasswordValid = Validation.isValidPassword(event.target.value)
        setIsValidPassword(isPasswordValid)
        onChangeValue?.(event.target.value)
    }

    const handleClickShowPassword = () => setShowPassword((show) => !show)

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault()
    }

    return (
        <FormControl
            sx={{ width: '100%', mt: '10px' }}
            variant="outlined"
            error={!isValidPassword}
            onChange={handlePasswordChange}
            required
            fullWidth
        >
            <InputLabel htmlFor="outlined-adornment-password">
                {label}
            </InputLabel>
            <OutlinedInput
                type={showPassword ? 'text' : 'password'}
                endAdornment={
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                }
                label={label}
                name={type}
            />
            <FormHelperText>
                {!isValidPassword &&
                    'Cannot be empty and must contain only letters or numbers'}
            </FormHelperText>
        </FormControl>
    )
}
