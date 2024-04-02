import { Typography } from '@mui/material'
import {
    ContainerVertical,
    ImageContainer,
    RequriementContainer,
    ResponsiveImage,
} from './ProjectDescriptionPage.styled'
import calendarImg from './../../Assets/calendar.png'
import timelineImg from './../../Assets/timeline.png'

const Requirement =
    'Serwis może być zrealizowany na bazie HTML 4.01 lub XHTML (dopuszczalne jest teżużycie XML+XSLT). Strony muszą być utworzone poprawnie i mieć poprawne deklaracje typu.'
const Explanation =
    'Aplikacja powstała przy użyciu HTML5. Jego konfigurację można znaleźć w pliku index.html w kodzie źródłowym ( <!DOCTYPE html> ) charakterystyczny dla HTML5. Dodatkowo wszystkie strony przeszły testy walidacyjne ze strony. https://validator.w3.org/'
const Requirement2 =
    'Wymagane jest nietrywialne formatowanie przy użyciu CSS. Poprawność reguł CSS również będzie sprawdzana walidatorem.'
const Explanation2 =
    'Większośc komponentów na stronie wykorzystuje stylizowanie komponentów za pomocą CSS. W projekcie wykorzystano pure css jak i bibliotekę styled components, pozwalająca na wykorzystanie CSS w komponentach React. Wszystkie style są zdefiniowane w plikach .css lub styled.tsx. Dodatkowo wszystkie style zostały przetestowane na różnych rozdzielczościach i urządzeniach. Najbardziej skomplikowane komponenty wykorzystujące CSS to zdecydowanie responsywny kalendarz i linia czasu'

export default function RequirementsPanel() {
    return (
        <ContainerVertical>
            <Typography
                sx={{
                    color: '#7b86d3',
                    fontSize: '40px',
                    wordWrap: 'break-word',
                }}
            >
                Wymagania projektowe
            </Typography>
            <RequriementContainer>
                <Typography
                    sx={{
                        color: '#a1a7cf',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    {Requirement}
                </Typography>
                <Typography
                    sx={{
                        color: '#edeffa',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    {Explanation}
                </Typography>
            </RequriementContainer>
            <RequriementContainer>
                <Typography
                    sx={{
                        color: '#a1a7cf',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    {Requirement2}
                </Typography>
                <Typography
                    sx={{
                        color: '#edeffa',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    {Explanation2}
                </Typography>
                <ImageContainer>
                    <ResponsiveImage src={calendarImg} alt="Calendar requirement screenshot" />
                    <ResponsiveImage src={timelineImg} alt="Timeline requirement screenshot" />
                </ImageContainer>
            </RequriementContainer>
        </ContainerVertical>
    )
}
