import React, { Component } from 'react';

export default function KeywordBubble(props) {
	const { index, word, onClick } = props;

	return (
		<div
			key={index}
			className="keyword-bubble"
			onClick={() => {
				onClick(word);
			}}
		>
			{word}
		</div>
	);
}
