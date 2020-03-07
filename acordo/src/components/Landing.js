import React, { Component } from 'react';
import Carousel from './Carousel';
import logo from '../assets/acordo.png';

export default class Landing extends Component {
	render() {
		return (
			<div>
				<div className="header-middle">
					{/* <Carousel /> */}
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

					<div className="faq-section">
						<b>What is Acordo?</b>
						<p>
							Acordo is a web app allowing you to generate Ethereum contracts from english sentences.
							Powered by a spaCy and OpenZepplin based server. Edit any created contracts on the right.
							Whenever you upload a contract, it's available for others to find.
						</p>
						{/* <Collapsible trigger="What is a smart contract?" />
				<Collapsible trigger="What statements can be entered?" />
				<Collapsible trigger="What are recent contracts?" /> */}
					</div>
				</div>
			</div>
		);
	}
}
