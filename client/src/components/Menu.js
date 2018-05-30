import React, { Component } from 'react'

class Menu extends Component {
  constructor(props) {
    super(props)

    this.handleLoadClick = this.handleLoadClick.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleLoadClick(evt) {
    this.refs.input.click()
  }
  handleSelect(evt) {
    const { files } = evt.target
    const { onLoad } = this.props
    if (files.length > 0) onLoad(files[0])
  }

  render() {
    const { onSave, onLoad } = this.props
    return (
      <div className="menu">
        <div className="btn" onClick={onSave}>
          <span className="txt">сохранить</span>
        </div>
        <div className="btn" onClick={this.handleLoadClick}>
          <span className="txt">загрузить</span>
        </div>
        <input
          ref="input"
          type="file"
          id="files"
          accept=".json"
          onChange={this.handleSelect}
        />
      </div>
    )
  }
}

export default Menu
