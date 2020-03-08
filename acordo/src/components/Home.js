import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import Collapsible from 'react-collapsible';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce, uploadFile, siaUrl } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/acordo.png';

import './Home.css';
import Carousel from './Carousel';
import KeywordBubble from './KeywordBubble';

const KEYWORDS = [ 'named', 'symbol', 'with', 'tokens', 'contract', 'function', 'takes', 'returns' ];
function Home() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ lastUpload, setLastUpload ] = useState('');

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
		if (!data['code']) {
			alert('Create a contract first!');
			return;
		}

		setLoading(true);

		uploadFile(data['name'] || 'MyContract', data['code'])
			.then((res) => {
				const { skylink } = res.data;
				console.log('upload res', skylink);
				alert(`Uploaded! ${skylink}`);
				setLastUpload(skylink);
				setLoading(false);
			})
			.catch((e) => {
				console.error(e);
				setLoading(false);
			});
	};

	return (
		<div className="main-area">
			<div className="subheader">Create and discover contracts uploaded by other users</div>
			<p>Recent uploaded smart contracts</p>
			<Carousel />
			{/* <img src={logo} className="small-logo" /> */}
			<div style={{ height: '50px' }} />
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
					{KEYWORDS.map((word, i) => <KeywordBubble word={word} index={i} />)}
				</div>
				<div className="column is-half">
					<div className="header-text">See the contract on the right...</div>
					<AceEditor
						width={'900px'}
						mode="javascript"
						theme="github"
						fontSize={14}
						value={result && result.code}
						onChange={(e) => setResult({ ...result, code: e })}
						name="UNIQUE_ID_OF_DIV"
						editorProps={{ $blockScrolling: true }}
					/>,
				</div>
			</div>
			{/* <div className="breakdown-section">{JSON.stringify(codeGraph)}</div> */}
			<div className="upload-section">
				<button disabled={loading} onClick={upload} className="upload-button button is-primary">
					Upload my Result!
				</button>
			</div>
			{lastUpload && (
				<a href={siaUrl(lastUpload)} target="_blank" className="subheader">
					View Upload
				</a>
			)}
			{result.reasons &&
			result.reasons.length > 0 && (
				<div className="why-section">
					<div className="header-text">Why this result?</div>
					<div>
						{result.reasons.map((r, i) => {
							return <li key={i}>{r}</li>;
						})}
					</div>
				</div>
			)}
		</div>
	);
}
export default Home;
