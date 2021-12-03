import React from 'react';
import {Link} from 'react-router-dom';
import logo from '../assets/logo/logo-beer.jpg'
import {connect} from "react-redux";
//import {logoutUser} from "../actions/user/userAction";
import {Redirect} from "react-router-dom";


//Gestion de la naivgation
class Header extends React.Component {
	
	render(){
		
		return (
			<div className="header-nav">
				<nav>
					<div className="list1">
					<a href="/"><img src={logo} alt="Logo of Beer4You"/></a>
						<Link to="/">Accueil</Link>
						<Link to="/product">Produits</Link>
					</div>
					<div className="list2">
						{this.props.user.isLogged === false && <Link to="/register">S'enregistrer</Link>} 
						{this.props.user.isLogged === false &&  <Link to="/login">Se connecter</Link> }
						
						{this.props.user.isLogged && <Link to="/admin">Admin</Link> }
						{this.props.user.isLogged && <Link to="/logout">Se déconnecter</Link> }
						{this.props.user.isLogged && <Link to="/profil">{this.props.user.infos.firstName}</Link> }
					
						<Link to="/basket">
							Panier 
						
						</Link>
					</div>
				</nav>
				<div className="header-pict">
				<div className="background_opacity"></div>
					<h1>Beer4You, à vous de décapsuler pour mieux décompresser !</h1>
				</div>
			</div>
		)
	}

}

const mapStateToProps = (store) => {
  return {
  	user: store.user
  }
}
const mapDispatchToProps = {

}

export default connect(mapStateToProps, mapDispatchToProps)(Header);