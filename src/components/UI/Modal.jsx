import React from 'react'
import classes from './Modal.module.css'

const Modal = props => {
  return (
    <div className={classes.modal} >
        <div className={classes.backdrop} onClick={props.onClick}></div>
        <div className={classes['modal-content']}>{props.children}</div>
    </div>
  )
}

export default Modal