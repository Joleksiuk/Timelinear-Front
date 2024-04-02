import Banner from '../Homepage/Banner'
import TechnologiesPanel from './TechnologiesPanel'
import RequirementsPanel from './RequirementsPanel'
import Requirements2Panel from './Requirements2Panel'
import Requirements3Panel from './Requirements3Panel'
import NavigationInfoPanel from './NavigationInfoPanel'
import Carousel from '../Carousel/Carousel'

const pageContents = [
    <Banner
        title="Opis wymagań aplikacji Timelinear"
        description="Aplikacja Timelinear to narzędzie do zarządzania czasem, które pozwala na tworzenie zadań, projektów i wydarzeń w formie interaktywnego kalendarza. Przejdź dalej aby dowiedzieć się więcej o wymaganiach projektowych."
    />,
    <TechnologiesPanel />,
    <RequirementsPanel />,
    <Requirements2Panel />,
    <Requirements3Panel />,
    <NavigationInfoPanel />,
]

export default function ProjectDescription() {
    return <Carousel pageContents={pageContents} />
}
