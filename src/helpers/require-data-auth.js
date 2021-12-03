import React, { Component } from 'react';
import { connect } from "react-redux";
import {loadBeers} from "../actions/beer/beerAction"
import axios from "axios";
import {config} from '../config';
import {Redirect} from 'react-router-dom';
import {connectUser} from '../actions/user/userAction';

//HOC de controle des data et de la sécurité
export default function(ChildComponent, withAuth = false) {
    class RequireDataAuth extends Component {

		constructor(props) {
			super(props);
			this.state = {
				redirect: false
			}
            
		}
		
		// au chargement de chaque component
		componentDidMount(){
		    
		    // si les bières ne sont pas chargé dans redux on les charge
		    if(this.props.product.beers.length === 0) {
                this.props.loadBeers();
            }
	
	    
    	    // on test si on est connecté via les information sur redux (isLogged)
    	   if(this.props.user.isLogged === false) { 
    	        //on récupère le token dans le localStorage
    	        const token = window.localStorage.getItem('b4y-token');
    	        // si le token est null et que withAuth et true
    	        if(token === null && withAuth) {
            		this.setState({redirect: true})
    	        //sinon
    	        } else {
    	            axios.get(config.api_url+"/api/v1/user/checkToken", { headers: { "x-access-token": token }})
            		.then((response)=>{
            			console.log(response);
    	                //si le status de la réponse n'est pas 200
    	                if(response.data.status !== 200) {
    	                    //si withAuth est true
    	                    if(withAuth === true) {
            					this.setState({redirect: true})
            				}
    	               //sinon
    	                }else{
    	                  //récupération de la réponse (objet infos user)
    	                  let user = response.data.user[0];
    	                  //on stock le token dans cet objet
    	                  user.token = token;
    	                  //appel de l'action connectUser du store en envoyant les infos d'utilisateur
    	                  this.props.connectUser(user);
    	                }   
            		})
    	        }         
    	   }      
		}
		
		render(){
		    if(this.state.redirect) {
				return <Redirect to="/login"/>
			}
			return (<ChildComponent {...this.props}/>)
		}
	                    
    }

    const mapStateToProps = (store) => {
    	return {
    	      //récup de ta state user
			product: store.beers,
	  		user: store.user
    	}
    }
    
    const mapDispatchToProps = {
        //appel de ton action
        loadBeers,
		connectUser
    }
    
    return connect(mapStateToProps, mapDispatchToProps)(RequireDataAuth);
}