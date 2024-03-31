import { Typography } from '@mui/material'
import { ContainerVertical, RequriementContainer } from './ProjectDescriptionPage.styled'

const Requirement =
    'Kompatybilność i „łagodna degradacja” - serwis powinien funkcjonować poprawnie i wyglądać dobrze we wszystkich popularnych przeglądarkach (najnowsze wersje), a korzystanie z serwisu powinno być też możliwe – choć zapewne nie bez zakłóceń w rodzaju nieudanego formatowania w przeglądarkach starszych lub bardziej prymitywnych pod względem możliwości prezentacyjnych (np. lynx)'

const Explanation =
    'Aplikacja przetestowana została w przeglądarkach Chrome, Opera, Opera Gaming, Edge, Fierfox. Komponenty są responsywane i wyświetlane w prawidłowy sposób. W przypadku braku możliwość prezentacyjnych lynx wyświetlany zostanie sam tekst bez stylizacji.'

const Requirement2 =
    'Dostępność dla niepełnosprawnych  w szczególności powinna być możliwa nawigacja przy użyciu oprogramowania czytającego (a zatem wszystkie istotne obrazki powinny mieć teksty alternatywne, itp.).'

const Explanation2 =
    'Każdy obraz ma tekst alternatywny, kolory dobierane zostały z tabeli proponowej przez MUI aby zawierały odpowiedni kontrast, dzięki czemu tekst będzie dobrze widoczny na każdym ekranie.'

export default function Requirements2Panel() {
    return (
        <ContainerVertical>
            <Typography
                sx={{
                    color: '#7b86d3',
                    fontSize: '30px',
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
            </RequriementContainer>
        </ContainerVertical>
    )
}
