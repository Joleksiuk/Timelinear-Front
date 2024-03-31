import { Typography } from '@mui/material'
import {
    ContainerVertical,
    RequriementContainer,
    ImageContainer,
} from './ProjectDescriptionPage.styled'
import navImg from './../../Assets/nav.png'
import pasekImg from './../../Assets/pasek.png'
import GithubInfo from './GithubInfo'

const Requirement =
    'Serwis powinien zawierać dobrze przemyślany, wygodny i spójny system nawigacji.'

const Explanataion =
    'Serwis posiada pasek nawigacyjny, na którym użytkownik ma dostęp do ustawień profilu oraz autentykacji. Boczny pasek zawiera wszystkie strony przekierowujące na kolejne funkcjonalności aplikacji. W przypadku rozdzielczość mniejszej niż 700 px, pasek nawigacyjny zmienia się w menu na pasku nawigacyjnym'

export default function NavigationInfoPanel() {
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
                    {Explanataion}
                </Typography>
                <ImageContainer>
                    <img
                        style={{ width: '45%', height: '45%' }}
                        src={navImg}
                        alt="Navigation bar requirement screenshot"
                    />
                    <img
                        style={{ width: '45%', height: '45%' }}
                        src={pasekImg}
                        alt="Navigation sidebar requirement screenshot"
                    />
                </ImageContainer>
            </RequriementContainer>
            <GithubInfo />
        </ContainerVertical>
    )
}
