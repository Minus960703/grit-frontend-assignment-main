import React          from 'react'
import styles         from './Button.module.scss';

interface ButtonProps {
  value           : string | null;
  type           ?: 'DELETE' | null;
  onClickEvent   ?: () => void;
  disabled       ?: boolean
}

const Button = ({
  value,
  type,
  onClickEvent  = () => {},
  disabled      = false
}: ButtonProps) => {
  console.log(disabled)
  return (
    <button
      className={`${styles.btn} ${disabled && styles.readOnly}`}
      disabled={disabled}
      onClick={() => !disabled && onClickEvent()}
    >
      {type
        &&  <>
              <span></span>
              <span></span>
            </>
      }
      {value}
    </button>
  )
}

export { Button };