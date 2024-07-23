import React, { HTMLAttributes } from 'react'

interface TypographyProps {
    children: React.ReactNode
    className?: string
    type: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span'
}


export default function Typography({children, className, type}: TypographyProps) {
    const Tag = type
    return (
        <Tag className={className}>
            {children}
        </Tag>
    )
}
