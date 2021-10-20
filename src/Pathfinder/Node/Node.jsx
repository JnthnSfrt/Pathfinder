import React, { Component } from 'react';

import '../../Styles/Node.css';

export default class Node extends Component {

    render() {
        const {
            row,
            col,
            isStart,
            isEnd,
            isVisited,
            isWall,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const extraClassName = isEnd
            ? 'node-end' :
            isStart
                ? 'node-start' :
                isWall
                    ? 'node-wall' :
                    '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={() => onMouseDown(row, col)}
                onMouseEnter={() => onMouseEnter(row, col)}
                onMouseUp={() => onMouseUp(row, col)}></div >
        );
    }
}