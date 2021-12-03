import React from 'react';
import beer from '../assets/logo/beer.png';

// Page Home
class Home extends React.Component {
	componentDidMount() {
	}

	render(){
		return (
			<div>
				<p id="home-presentation">Le site de vente de bière le plus côté du marché. Les bières, une passion qui se savoure depuis toujours. A vous de faire votre choix !</p>

				<img src={beer} id="homerHome"/>
			</div>
		)
	}

}

export default Home;