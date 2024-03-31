import { Box, Typography } from '@mui/material'
import { styled } from '@mui/system'
import {
    ContainerVertical,
    SingleTechnologyContainer,
    TechnologiesContainer,
} from './ProjectDescriptionPage.styled'
import ReactIcon from '../../Assets/React-icon.svg'
import TypeScriptIcon from '../../Assets/Typescript-icon.svg'
import StyledComponentsIcon from '../../Assets/styled-components-icon.svg'
import JavaIcon from '../../Assets/Java-icon.svg'
import SpringBootIcon from '../../Assets/Spring-icon.svg'
import DockerIcon from '../../Assets/Docker-icon.svg'
import MaterialUIIcon from '../../Assets/MUI-icon.svg'

const technologies = [
    {
        name: 'React',
        description: 'Biblioteka JavaScript do budowania interfejsów użytkownika.',
        icon: ReactIcon,
    },
    {
        name: 'TypeScript',
        description: 'Typowany nadzbiór JavaScript, który kompiluje do zwykłego JavaScript.',
        icon: TypeScriptIcon,
    },
    {
        name: 'Styled Components',
        description: 'Biblioteka do stylizacji komponentów React za pomocą literałów szablonów.',
        icon: StyledComponentsIcon,
    },
    {
        name: 'Java',
        description: 'Wysokopoziomowy, oparty na klasach, obiektowy język programowania.',
        icon: JavaIcon,
    },
    {
        name: 'Spring Boot',
        description: 'Framework do budowania samodzielnych aplikacji opartych na Springu.',
        icon: SpringBootIcon,
    },
    {
        name: 'Docker',
        description: 'Platforma do tworzenia, wysyłania i uruchamiania aplikacji w kontenerach.',
        icon: DockerIcon,
    },
    {
        name: 'Material UI',
        description: 'Biblioteka komponentów UI, które mogą być stylizowane za pomocą JSS.',
        icon: MaterialUIIcon,
    },
]

const TechnologyBox = styled(Box)(({ theme }) => ({
    margin: theme.spacing(1),
    textAlign: 'center',
    wordBreak: 'break-word',
}))

export default function TechnologiesPanel() {
    return (
        <ContainerVertical>
            <Typography
                sx={{
                    color: '#7b86d3',
                    fontSize: '40px',
                    wordWrap: 'break-word',
                }}
            >
                Technologie
            </Typography>
            <TechnologiesContainer>
                {technologies.map((tech, index) => (
                    <SingleTechnologyContainer>
                        <TechnologyBox key={index}>
                            <Typography variant="h6">{tech.name}</Typography>
                            <Typography variant="body2">{tech.description}</Typography>
                        </TechnologyBox>
                        <img
                            style={{ height: '40px', width: '40px' }}
                            src={tech.icon}
                            alt={tech.name + 'Logo Image'}
                        />
                    </SingleTechnologyContainer>
                ))}
            </TechnologiesContainer>
        </ContainerVertical>
    )
}
