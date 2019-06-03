import React from 'react';


const Dropdown = (props) => {

  const onClick = (e) => {
    props.onClick(e);
  }

  const renderCategories = () => {
    return props.items.map(item => {
      return <button className="dropdown-item" key={item} onClick={() => onClick(item)}>{item}</button>
    })
  }
  
    return (
      <div className="dropdown">
        <button className="btn btn-secondary dropdown-toggle" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {props.title}
          </button>
  
        <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
          {renderCategories()}
        </div>
      </div>
    )
  
}

export default Dropdown;


