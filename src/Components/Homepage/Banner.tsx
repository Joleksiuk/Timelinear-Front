import React from 'react'
import './Banner.css'

interface BannerProps {
    title: string
    description: string
}

const Banner: React.FC<BannerProps> = ({ title, description }) => {
    const squares = Array.from({ length: 20 }, (_, i) => i)

    const generateRandomNum = ({ min, max }: { min: number; max: number }): number =>
        Math.floor(Math.random() * (max - min + 1) + min)

    return (
        <div className="intro">
            <div className="quote">
                <h1>{title}</h1>
                <p>{description}</p>
            </div>
            <div className="squares-wrapper">
                <ul className="squares">
                    {squares.map((el, i) => {
                        const size = generateRandomNum({ min: 10, max: 100 }) // Random size between 10px and 100px
                        return (
                            <li
                                key={i}
                                style={{
                                    left: `${generateRandomNum({ min: 0, max: 90 })}%`,
                                    width: `${size}px`,
                                    height: `${size}px`,
                                    animationDelay: `${generateRandomNum({ min: 0, max: 30 })}s`,
                                }}
                            />
                        )
                    })}
                </ul>
            </div>
        </div>
    )
}

export default Banner
