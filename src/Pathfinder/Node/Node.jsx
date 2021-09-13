import React, { Component } from 'react';

import './Node.css';

export default class Node extends Component {

    render() {
        const {
            row,
            col,
            isStart,
            isEnd,
            isVisited,
            isBarrier,
            onMouseDown,
            onMouseEnter,
            onMouseUp,
        } = this.props;

        const extraClassName = isEnd
            ? 'node-end' :
            isStart
                ? 'node-start' :
                isBarrier
                    ? 'node-barrier' :
                    '';

        return (
            <div
                id={`node-${row}-${col}`}
                className={`node ${extraClassName}`}
                onMouseDown={undefined}
                onMouseEnter={undefined}
                onMouseUp={undefined}></div>
        );
    }
}