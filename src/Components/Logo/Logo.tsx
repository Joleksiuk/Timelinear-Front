import './Logo.css'

export default function Logo() {
    return (
        <div className="logo-background">
            <div className="logo-inner-background">
                <div className="circle-container">
                    <div className="circle-group">
                        <div className="logo-circle-background-first"></div>
                        <div className="logo-circle-background-second"></div>
                    </div>
                    <div className="circle-group">
                        <div className="logo-circle-background-third"></div>
                        <div className="logo-circle-background-fourth"></div>
                    </div>
                </div>
                <div className="logo-circle-inner-background">
                    <div className="pointer-circle">
                        <div className="pointer-inner-circle"></div>
                    </div>
                </div>
                <div className="pointer"></div>
            </div>
        </div>
    )
}
