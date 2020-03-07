import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce, uploadFile } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/acordo.png';

import './Home.css';
const KEYWORDS = [ 'named', 'symbol', 'with', 'tokens', 'contract' ];
function Home() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});

	const [ debounceText ] = useDebounce(text, 1000);
	const [ result, setResult ] = useState('');

	useEffect(
		() => {
			console.log('debounce text', debounceText);
			if (debounceText) {
				getCode(debounceText).then((result) => {
					const data = result.data;
					console.log('data', data);
					setResult(data);
				});
			}
		},
		[ debounceText ]
	);

	const upload = () => {
		const data = result;
		if (!data['name'] || !data['code']) {
			alert('Create a contract first!');
			return;
		}
		uploadFile(data['name'], data['code']).then((res) => {
			console.log('upload res', res);
		});
	};

	const KeywordBubble = (word, i) => (
		<div key={i} className="keyword-bubble">
			{word}
		</div>
	);

	return (
		<div className="main-area">
			<div className="header-middle">
				<img src={logo} className="center-logo" />
				<p>
					Write&nbsp;
					<a
						href="https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/"
						target="_blank"
					>
						ERC20
					</a>&nbsp;smart contracts in English powered by&nbsp;
					<a target="_blank" ahref="https://github.com/OpenZeppelin/openzeppelin-contracts">
						OpenZeppelin
					</a>
					&nbsp;Smart Contracts
				</p>
			</div>
			<div className="columns">
				<div className="column">
					<div className="header-text">Enter your description on the left...</div>
					<textarea
						onChange={(e) => setText(e.target.value)}
						className="textarea"
						placeholder="I want a smart contract with..."
						rows="10"
					/>
					<h2 className="header-text">Keywords</h2>
					{KEYWORDS.map(KeywordBubble)}
				</div>
				<div className="column">
					<div className="header-text">See the contract on the right...</div>
					<AceEditor
						mode="javascript"
						theme="github"
						value={result && result.code}
						onChange={(e) => setResult({ ...result, code: e.target.value })}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>,
				</div>
			</div>
			<div className="breakdown-section">{JSON.stringify(codeGraph)}</div>
			<div className="upload-section">
				<button onClick={upload} className="button is-primary">
					Upload my Result!
				</button>
			</div>
		</div>
	);
}
export default Home;
