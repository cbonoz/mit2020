import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/acordo.png';

import './Home.css';

function Home() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});

	const [ debounceText ] = useDebounce(text, 1000);
	const [ code, setCode ] = useState('');

	useEffect(
		() => {
			console.log('debounce text', debounceText);
			if (debounceText) {
				getCode(debounceText).then((result) => {
					console.log('data', data);
					const data = result.data;
					setCode(data);
				});
			}
		},
		[ debounceText ]
	);

	return (
		<div className="main-area">
			<div className="header-middle">
				<img src={logo} className='center-logo' />
				<p>
					Powered by&nbsp;
					<a target="_blank" ahref="https://github.com/OpenZeppelin/openzeppelin-contracts">
						OpenZeppelin
					</a>
					&nbsp;Smart Contracts
				</p>
			</div>
			<div class="columns">
				<div class="column">
					<div className="header-text">Enter your description on the left...</div>
					<textarea
						onChange={(e) => setText(e.target.value)}
						class="textarea"
						placeholder="10 lines of textarea"
						rows="10"
					/>
				</div>
				<div class="column">
					<div className="header-text">See the contract on the right...</div>
					<AceEditor
						mode="javascript"
						theme="github"
						value={code}
						onChange={setCode}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>,
				</div>
			</div>
			<div className="breakdown-section">{JSON.stringify(codeGraph)}</div>
			<div className="upload-section">
				<button className="button is-primary">Upload my Result!</button>
			</div>
		</div>
	);
}
export default Home;
