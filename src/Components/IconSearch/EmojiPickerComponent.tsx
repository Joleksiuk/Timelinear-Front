import EmojiPicker, { Theme } from 'emoji-picker-react'
import { EventIcon } from './types'
type Props = {
    setEventIcon: (value: EventIcon) => void
}

export default function EmojiPickerComponent({ setEventIcon }: Props) {
    const handleEmojiChoice = (...args: any) => {
        const eventData: EventIcon = {
            type: 'emoji',
            source: args[0].imageUrl,
        }
        setEventIcon(eventData)
    }
    return (
        <EmojiPicker
            key={'emoji-picker'}
            theme={Theme.DARK}
            onEmojiClick={handleEmojiChoice}
        />
    )
}
