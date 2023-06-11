import { FC, forwardRef } from "react";

interface IInputFieldProps {
    placeholder: string
    type: string
    name: string 
    className: string
}

const InputField = forwardRef<HTMLInputElement, IInputFieldProps>((props, ref) => {
    return (
        <input ref={ref} {...props}/>
    )
})

export default InputField