import { ReactNode } from 'react'

interface IButtonProps {
  // type?: 'button' | 'submit' | 'reset' | 'link'
  // href?: string
  // isLoading?: boolean
  // isDisabled?: boolean
  // onClick?: () => void

  // children: ReactNode

  // css?: string
  // target?: '_blank'
  native?: React.ButtonHTMlElement<HTMLButtonElement>
  icon?: string | JSX.Element
}

const Button = ({
  type = 'button',
  href,
  isLoading = false,
  isDisabled = false,
  children,
  css,
  target,
  onClick,
                  native = {},
  icon
}: IButtonProps): JSX.Element =>{

  return (
    <button {...native}>
      {children}
    </button>
  );


  const btnContent = (<>

    {children}

    {!href && (<>
      {!isDisabled && !isLoading &&
      (typeof icon === 'string') ? <img src={icon} alt=''/> : (icon)
      }
      {isLoading && !isDisabled && (<img src={'loadingIcon'} alt='Button is loading icon'/>)}
      {isDisabled && !isLoading && (<img src={'disabledIcon'} alt='Button is disabled icon'/>)}
    </>)}
  </>)



  return type !== 'link'? (   href ? (
      <a href={href} target={target || ''}  className={css || ''} rel={target ? 'noopener' : ''}>{btnContent}</a>
    ) :(  <button disabled={isDisabled}  className={css || ''} onClick={onClick} type={type} >{btnContent}</button>)
  ) : (
    <a
      onClick={onClick}
      href={href}
      className={css || ''}
      data-testid="button"
      target={target}
      is
      rel={target ? 'noopener' : ''}
    >
      {children}
    </a>
  )
}

export default Button


