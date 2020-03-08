import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import Collapsible from 'react-collapsible';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce, uploadFile, siaUrl } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/nevros.png';
import { sendCapacity } from '../util/send';

import './Home.css';

import Carousel from './Carousel';

const NUM_TOKENS = 5;

function Send() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ lastUpload, setLastUpload ] = useState('');
	const [key, setKey] = useState('')

	const [ debounceText ] = useDebounce(text, 1000);
	const [ result, setResult ] = useState('');

	const send = async () => {
		const tokens = text.split(' ');
		if (tokens.length !== NUM_TOKENS || parseFloat(tokens[1]) == NaN) {
			const code = `Sorry, I didn't get that. Try 'Send XXX capacity to YYY'`;
			// alert(code);
			setResult({ code });

			return;
		}

		setLoading(true);

		const capacity = parseFloat(tokens[1]);
		const dest = tokens[NUM_TOKENS - 1];
		try {
			const result = await sendCapacity(key, capacity, dest);
			setResult({ code: result });
			setLoading(false);
		} catch (e) {
			console.error('error sending', e);
			setResult({ code: e.message });
			setLoading(false);
		}
	};

	return (
		<div className="main-area">
			<div className="subheader">Send Transactions using human language.</div>
			<p>Powered by</p>
			{/* <Carousel /> */}
			<img src={logo} className="small-logo" />
			<div style={{ height: '50px' }} />
			<div className="columns">
				<div className="column is-half">
					<div className="header-text">Enter your transaction on the left...</div>
					<textarea
						onChange={(e) => setText(e.target.value)}
						className="textarea"
						placeholder="Send 100 capacity to..."
						rows="10"
					/>
					<input class="input is-primary" type="text" placeholder="Enter transaction key" onChange={e => setKey(e.target.value)} />
				</div>
				<div className="column is-half">
					<div className="header-text">See the result on the right</div>
					<AceEditor
						width={'900px'}
						mode="text"
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
				<button disabled={loading} onClick={send} className="upload-button button is-primary">
					Send capacity
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
export default Send;
