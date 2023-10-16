import {ChangeEvent, InputHTMLAttributes, ForwardedRef} from "react"

export type InputProps = {
  type: string
  value?: string
  name?: string
  id?: string
  placeholder?: string
  onChange: (e: ChangeEvent<HTMLInputElement> | string) => void
  native?: InputHTMLAttributes<HTMLInputElement>
}

export type InputRef  = ForwardedRef<HTMLInputElement | null>;
