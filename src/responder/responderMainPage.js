import React, {Component} from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage, 
	Image,
	TextInput,
	TouchableWithoutFeedback} 
	from 'react-native';
import {Icon}              from 'native-base';
import Constants           from '../commons/Constants.js';
import DefaultPage         from './defaultPage.js';
import IncidentDetailsPage from './incidentDetailsPage.js'; 

export default class ResponderMainPage extends Component{

	state = {
		mainPageOperation: Constants.RESPONDER_MAIN_PAGE.DEFAULT_PAGE
	}

	setResponderMainOperation = (operation)=>{
		this.setState({mainPageOperation:operation});
	}

	responderMainPageDisplay = ()=>{

		switch(this.state.mainPageOperation){
			case Constants.RESPONDER_MAIN_PAGE.DEFAULT_PAGE:
				return 	<DefaultPage
							FirebaseObject         = {this.props.FirebaseObject}
							doSetResponderMainPage = {this.setResponderMainOperation} />;
		}
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.responderMainPageDisplay()}
	    	</React.Fragment>
	    );
	}
}