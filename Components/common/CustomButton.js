import React from 'react'
import Styles from '../styles/Caraousel.module.css'
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs'

const CustomButton = ({previous,next,offset}) => {
  return (
    <div className={Styles.btn_container}>
        <button className={`${Styles.custom_btn}`} onClick={()=>previous()} >
            <BsChevronLeft/>
        </button>
        <button className={`${Styles.custom_btn}`} onClick={()=>next()}>
            <BsChevronRight/>
        </button>
    </div>
  )
}

export default CustomButton