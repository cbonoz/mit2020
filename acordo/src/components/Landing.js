import React, { Component } from 'react';
import Carousel from './Carousel';
import logo from '../assets/acordo.png';
import tree from '../assets/tree.png';

export default class Landing extends Component {
	render() {
		return (
			<div>
				<div className="header-middle">
					<div className="top-header">
						{/* <Carousel /> */}
						<img src={logo} className="center-logo" />

						<p className="subheader">
							Learn and write&nbsp;
							<a
								href="https://www.investopedia.com/news/what-erc20-and-what-does-it-mean-ethereum/"
								target="_blank"
							>
								ERC20
							</a>&nbsp;smart contracts using NLP <br />powered by&nbsp;
							<a target="_blank" ahref="https://github.com/OpenZeppelin/openzeppelin-contracts">
								OpenZeppelin
							</a>
							&nbsp;Smart Contracts.
						</p>
						<a href="/start">
							<button className="button is-primary">Get Started</button>
						</a>
					</div>
					<div className="faq-section">
						<div className="subheader">What is Acordo?</div>
						<p>
							Acordo is a web app allowing you to generate Ethereum contracts from written sentences.
							Powered by a spaCy and OpenZepplin based server. Edit any created contracts and import them
							in remix IDE. Whenever you upload a contract, it's available for others to find.
						</p>
						{/* <Collapsible trigger="What is a smart contract?" />
				<Collapsible trigger="What statements can be entered?" />
				<Collapsible trigger="What are recent contracts?" /> */}
					</div>

					<img src={tree} className="tree-image" />
				</div>
			</div>
		);
	}
}
