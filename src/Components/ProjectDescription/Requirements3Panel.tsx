import { List, ListItem, Typography } from '@mui/material'
import {
    ContainerVertical,
    RequriementContainer,
    ResponsiveImage,
} from './ProjectDescriptionPage.styled'
import databaseImg from './../../Assets/database.png'

const Requirement =
    'Poza (X)HTML i CSS serwis powinien wykorzystywać co najmniej jedną wybraną technologię spośród przedstawionych na wykładzie (np. skrypty po stronie serwera i/lub klienta, ciasteczka, bazy danych, web serwisy, SSL... - do wyboru)'

const bulletItems = [
    'Serwis posiada własną stroną serwerową, która komunikuje się z frontendem za pomocą REST API, strona serwerowa przechowuje dane w bazie danych.',
    'Serwis wykorzystuje ciasteczka do przechowywania informacji o zalogowanym użytkowniku',
    'Wszystkie dane przesyłane są za pomocą protokołu HTTPS, dzięki czemu są szyfrowane',
    'Serwis wykorzystuje również technologię JSON Web Token do autoryzacji użytkowników. Wszystkie dane przesyłane są w formacie JSON',
    'Dodatkowo dla wygody użytkownika, w pamięci podręcznej przeglądrki zapisywane jest domyśle sortowanie, przyspieszające korzystanie z aplikacji.',
]
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
                <List sx={{ listStyleType: 'disc' }}>
                    {bulletItems.map((item) => (
                        <ListItem sx={{ display: 'list-item' }}>
                            <Typography
                                sx={{
                                    color: '#edeffa',
                                    fontSize: '15px',
                                    wordWrap: 'break-word',
                                    padding: '0px 20px',
                                }}
                            >
                                {item}
                            </Typography>
                        </ListItem>
                    ))}
                </List>
                <ResponsiveImage src={databaseImg} alt="Database requirement screenshot" />
            </RequriementContainer>
        </ContainerVertical>
    )
}
