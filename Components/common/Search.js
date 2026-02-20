import React from 'react'
import Styles from '../styles/Search.module.css'
import { AiOutlineClose } from 'react-icons/ai'

const Search = ({showSearch,setShowSearch}) => {
  return (
    <div className={Styles.search_container} style={{ transition:'all 450ms',opacity:showSearch?'1':'0', visibility:showSearch?'visible':'hidden'}} >
        <button className={Styles.close_btn} onClick={()=>setShowSearch(false)} >
            <AiOutlineClose/>
        </button>

        <div className="form-input w-100 d-flex align-items-strech justify-content-center">
          <input type="text" className={Styles.input_box} placeholder='Search Anything ' />
          <button className="primary-btn ms-2">
            Search
          </button>
        </div>


    </div>
  )
}

export default Search