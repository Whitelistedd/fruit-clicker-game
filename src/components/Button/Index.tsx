import React from "react";
import styles from "./Button.module.scss"

// eslint-disable-next-line react/prop-types
export const Button = ({children, className, ...props}: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <button className={`${className} ${styles.button}`} {...props}>
            {children}
        </button>
    )
}