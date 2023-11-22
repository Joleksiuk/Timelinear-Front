import { TextField } from '@mui/material'

type Props = {
    setAvatarSeed: (value: string) => void
}

export default function AvatarSeedSearch({ setAvatarSeed }: Props) {
    const handleChange = (event: any) => {
        setAvatarSeed(event.target.value)
    }
    return (
        <TextField
            id="outlined-basic"
            label="Outlined"
            variant="outlined"
            autoComplete="false"
            onChange={handleChange}
        />
    )
}
