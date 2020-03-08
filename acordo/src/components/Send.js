import React, { Component, useEffect, useState } from 'react';
import AceEditor from 'react-ace';
import Collapsible from 'react-collapsible';

import 'ace-builds/src-noconflict/mode-java';
import 'ace-builds/src-noconflict/theme-github';
import { getCode, debounce, uploadFile, siaUrl } from '../util/http';
import { useDebounce } from 'use-debounce';
import logo from '../assets/nervos.png';
import { sendCapacity } from '../util/send';

import './Home.css';

import Carousel from './Carousel';
import KeywordBubble from './KeywordBubble';

const NUM_TOKENS = 5;
const KEYWORDS = [ 'send', 'capacity', 'balance' ];

function Send() {
	const [ text, setText ] = useState('');
	const [ codeGraph, setCodeGraph ] = useState({});
	const [ loading, setLoading ] = useState(false);
	const [ lastUpload, setLastUpload ] = useState('');
	const [ key, setKey ] = useState('');

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
			let errorMessage = e.message;
			if (e.message && e.message.includes('not enough')) {
				errorMessage += ' Your wallet may not have enough balance to fund this transaction.';
			}
			setResult({ code: errorMessage });
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
						value={text}
						onChange={(e) => setText(e.target.value)}
						className="textarea"
						placeholder="Send 100 capacity to..."
						rows="10"
					/>
					<input
						class="input is-primary"
						type="text"
						placeholder="Enter transaction key"
						onChange={(e) => setKey(e.target.value)}
					/>

					<a
						style={{ float: 'left', paddingLeft: '2px', clear: 'both' }}
						href="https://docs.nervos.org/getting-started/wallet.html"
						target="_blank"
					>
						Create a wallet to get started
					</a>
					<hr />

					<h2 className="header-text">Keywords</h2>
					{KEYWORDS.map((word, i) => (
						<KeywordBubble word={word} index={i} onClick={(w) => setText(text + ' ' + w)} />
					))}
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
