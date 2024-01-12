import React from 'react'
import { Link } from 'react-router-dom'
import { twMerge } from "tailwind-merge"

const Button = ({ icon, onClick, children, to, dark, className }) => {
    return (
        <Link onClick={onClick} to={to} className={twMerge('flex items-center justify-center gap-2 px-4 shadow active:scale-95 transition py-1.5 text-xs font-bold bg-primary text-black', dark && "bg-black text-primary", className)}>
            {icon && <div>{icon}</div>}
            <p>{children}</p>
        </Link>
    )
}

export default Button