import GithubIcon from '../../Assets/github-icon.svg'
import { Typography } from '@mui/material'
import { ClickableContainer, ContainerVertical } from './ProjectDescriptionPage.styled'

const Requirement =
    'Kod źródłowy aplikacji znajduje się na platformie GitHub. Wszystkie zmiany w kodzie są monitorowane za pomocą systemu kontroli wersji Git. Dostęp do repozytorium jest publiczny.'

const Explanation = 'Aby udostępnic aplikację w internecie wykorzystałam hosting Render.com'

export default function GithubInfo() {
    const openFrontendRepo = () => {
        window.location.href = 'https://github.com/Joleksiuk/Timelinear-Front'
    }
    const openBackendRepo = () => {
        window.location.href = 'https://github.com/Joleksiuk/TimeLinear-Backend'
    }
    return (
        <ContainerVertical>
            <Typography
                sx={{
                    color: '#edeffa',
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
            <ClickableContainer onClick={() => openBackendRepo()}>
                <img
                    style={{ height: '50px', width: '50px' }}
                    src={GithubIcon}
                    alt="Github redirection to frontend repository"
                />
                <Typography
                    sx={{
                        color: '#edeffa',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    Frontend repository
                </Typography>
            </ClickableContainer>

            <ClickableContainer onClick={() => openBackendRepo()}>
                <img
                    style={{ height: '50px', width: '50px' }}
                    src={GithubIcon}
                    alt="Github redirection to backend repository"
                />
                <Typography
                    sx={{
                        color: '#edeffa',
                        fontSize: '15px',
                        wordWrap: 'break-word',
                        padding: '0px 20px',
                    }}
                >
                    Backend Repository{' '}
                </Typography>
            </ClickableContainer>
        </ContainerVertical>
    )
}
