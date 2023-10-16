import {ChangeEvent, forwardRef} from "react"
import { InputProps, InputRef } from './types'

export const Input = forwardRef<InputRef, InputProps>((
  props, ref) => {
  const {
    type = "text",
    value =  '',
    onChange = () => null,
    name = '',
    id = '',
    native = {},
    placeholder = '' } = props

  return(
    <input
      ref={ref}
      {...native}
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      id={id}
      onChange={(e: ChangeEvent<HTMLInputElement>) => onChange(e.target.value)}
      className="input"
    />
  )
})
