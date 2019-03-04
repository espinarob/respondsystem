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
import {Icon}      from 'native-base';
import Constants   from '../commons/Constants.js';
import DefaultPage from './defaultPage.js';
import ReportPage  from './reportPage.js';

export default class BystanderMainPage extends Component{

	state = {
		mainPageOperation: Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE
	}

	setBystanderMainOperation = (operation)=>{
		this.setState({mainPageOperation:operation});
	}

	bystanderMainPageDisplay = ()=>{

		switch(this.state.mainPageOperation){
			case Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE:
				return 	<DefaultPage
							setBystanderMainOperation = {this.setBystanderMainOperation}
							doSetUserlocation         = {this.props.doSetUserlocation} />;
			case Constants.CIVILIAN_MAIN_PAGE.REPORT_PAGE:
				return 	<ReportPage
							setBystanderMainOperation = {this.setBystanderMainOperation} />;
		}
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.bystanderMainPageDisplay()}
	    	</React.Fragment>
	    );
	}
}