import React, { PropTypes } from 'react'
import { DiagramWidget } from 'storm-react-diagrams'
import './src.css'
import { getAlgorithm } from '../algorithm'
import {
  dropNode,
  selectNode,
  abandonNode,
  createNode,
  removeNode
} from '../actions'
import { connect } from 'react-redux'

const Loading = () => <div>Загружаю</div>

class AlgorithmPanel extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onNodeDrop = this.onNodeDrop.bind(this)
  }
  onNodeDrop(event) {
    const { algorithm } = this.state
    const { dropNode } = this.props
    const dropPoint = algorithm.getDiagramEngine().getRelativeMousePoint(event)
    dropNode({
      x: dropPoint.x,
      y: dropPoint.y
    })
  }
  componentDidMount() {
    const { selectNode, abandonNode, createNode, removeNode } = this.props
    const algorithm = getAlgorithm()

    this.setState({
      ...this.state,
      algorithm
    })

    algorithm.onNodeCreated = node => {
      createNode(node)
    }
    algorithm.onNodeRemoved = node => {
      removeNode(node)
    }

    algorithm.onSelectionChanged = (node, isSelected) => {
      if (isSelected) selectNode(node)
      else abandonNode(node)
    }

    algorithm.initialize()
  }

  render() {
    const { algorithm } = this.state

    return (
      <div
        style={{
          width: 800 + 'px',
          height: 600 + 'px',
          border: '1px solid red'
        }}
        onDrop={this.onNodeDrop}
        onDragOver={event => {
          event.preventDefault()
        }}
      >
        {algorithm ? (
          <DiagramWidget diagramEngine={algorithm.getDiagramEngine()} />
        ) : (
          <Loading />
        )}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    algorithmPanel: state.algorithmPanel
  }
}

const mapDispatchToProps = {
  dropNode,
  selectNode,
  abandonNode,
  createNode,
  removeNode
}
export default connect(mapStateToProps, mapDispatchToProps)(AlgorithmPanel)
