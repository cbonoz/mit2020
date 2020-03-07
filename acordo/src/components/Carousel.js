import React, { Component, useEffect, useState } from 'react';

import Slider from 'react-slick';
import { getFiles, pullFile, siaUrl } from '../util/http';

export default function Carousel() {
	const [ files, setFiles ] = useState([]);

	useEffect(() => {
		// TODO: fetch uploads
		getFiles().then((response) => {
			const { data } = response;
			console.log(data);
			setFiles(data);
		});
	}, []);

	const get = (f) => {
		window.open(siaUrl(f.skylink), '_blank');
		// pullFile(f.skylink).then((response) => {
		// 	const { data } = response;
		// 	alert(data.data);
		// });
	};

	var settings = {
		infinite: true,
		speed: 500,
		autoplay: true,
		slidesToShow: 2,
		slidesToScroll: 1
	};
	return (
		<Slider {...settings}>
			{files.map((f, i) => {
				return (
					<div key={i} onClick={() => get(f)} className="carousel-item">
						<h1>{f.name}</h1>
						<p>{f.skylink.substr(0, 40)}...</p>
					</div>
				);
			})}
		</Slider>
	);
}
