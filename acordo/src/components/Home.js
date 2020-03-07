import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import Collapsible from 'react-collapsible';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce, uploadFile } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/acordo.png';

import './Home.css';
import Carousel from './Carousel';
const KEYWORDS = [ 'named', 'symbol', 'with', 'tokens', 'contract' ];
function Home() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});
	const [ loading, setLoading ] = useState(false);

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
			const { skylink } = res.data;
			console.log('upload res', skylink);
			alert(`Uploaded! ${skylink}`);
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

				<p className="subheader">
					Learn and write&nbsp;
					<a
						href="https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/"
						target="_blank"
					>
						ERC20
					</a>&nbsp;smart contracts using English powered by&nbsp;
					<a target="_blank" ahref="https://github.com/OpenZeppelin/openzeppelin-contracts">
						OpenZeppelin
					</a>
					&nbsp;Smart Contracts
				</p>
			</div>
			<div className="columns">
				<div className="column is-half">
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
				<div className="column is-half">
					<div className="header-text">See the contract on the right...</div>
					<AceEditor
						width={'600px'}
						mode="javascript"
						theme="github"
						value={result && result.code}
						onChange={(e) => setResult({ ...result, code: e })}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>,
				</div>
			</div>
			{/* <div className="breakdown-section">{JSON.stringify(codeGraph)}</div> */}
			<div className="upload-section">
				<button onClick={upload} className="upload-button button is-primary">
					Upload my Result!
				</button>
			</div>

			{result.reasons &&
			result.reasons.length > 0 && (
				<div className="why-section">
					<div className="header-text">Why?</div>
					<div>
						{result.reasons.map((r, i) => {
							return <li key={i}>{r}</li>;
						})}
					</div>
				</div>
			)}

			<div className="faq-section">
				<b>What is Acordo?</b>
				<p>
					Acordo is a web app allowing you to generate Ethereum contracts from english sentences. Powered by a
					spaCy and OpenZepplin based server. Edit any created contracts on the right. Whenever you upload a
					contract, it's available for others to find.
				</p>
				{/* <Collapsible trigger="What is a smart contract?" />
				<Collapsible trigger="What statements can be entered?" />
				<Collapsible trigger="What are recent contracts?" /> */}
			</div>

			<div className="subheader">Discover contracts uploaded by other users</div>
			<Carousel />
		</div>
	);
}
export default Home;
