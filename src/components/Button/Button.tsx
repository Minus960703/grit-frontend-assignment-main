import React          from 'react'
import styles         from './Button.module.scss';

interface ButtonProps {
  value           : string | null;
  type           ?: 'DELETE' | null;
  onClickEvent   ?: () => void;
}

const Button = ({
  value,
  type,
  onClickEvent  = () => {}
}: ButtonProps) => {
  return (
    <button className={styles.btn} onClick={()=>onClickEvent()}>
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