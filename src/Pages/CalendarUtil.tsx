export default {
    getContrastColor(hexColor: string): string {
        const hexToRgb = (hex: string): [number, number, number] => {
            const bigint = parseInt(hex.slice(1), 16)
            return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255]
        }
        const calculateLuminance = (
            r: number,
            g: number,
            b: number
        ): number => {
            const srgb = (c: number) => {
                const channel = c / 255
                return channel <= 0.03928
                    ? channel / 12.92
                    : Math.pow((channel + 0.055) / 1.055, 2.4)
            }

            return 0.2126 * srgb(r) + 0.7152 * srgb(g) + 0.0722 * srgb(b)
        }

        const [r, g, b] = hexToRgb(hexColor)
        const luminance = calculateLuminance(r, g, b)
        const textColor = luminance > 0.5 ? '#000000' : '#ffffff'

        return textColor
    },
}
