import React, { Component } from 'react';

export default class KeywordBubble extends Component {
	render() {
		return (
			<div key={this.props.index} className="keyword-bubble">
				{this.props.word}
			</div>
		);
	}
}
