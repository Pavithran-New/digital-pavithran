import React from "react";
import './customer.css'

export const Modelbutton = ({id,name,label,onclick,onchange}) => {
    return (
      <span className={"modelbtn"} style={{marginLeft:'20px',marginTop:'20px'}}>
        <input
          type='ratio'
          className="btn-check d-none"
          id={id}
          name={name}
          autocomplete="off"
          checked='true'
          value={label}
          onClick={onclick}
          onChange={onchange}
          // disabled={level}
        />
        <label className="btn ml-3 pt-4 border-primary" htmlFor={id}>
          {label}
        </label>
      </span>
    );
  };