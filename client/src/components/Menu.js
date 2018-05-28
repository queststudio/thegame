import React from 'react'

const Menu = ({ onSave }) => {
  return (
    <div className="menu">
      <div className="btn" onClick={onSave}>
        <span className="txt">сохранить</span>
      </div>
    </div>
  )
}

export default Menu
