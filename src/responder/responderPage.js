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
import {Icon}    from 'native-base';
import Constants         from '../commons/Constants.js';
import MorePage          from '../commons/MorePage.js';
import ChangePassword    from '../commons/changePassword.js';
import UserInformation   from '../commons/userInformation.js';
import PhoneNumber       from '../commons/phoneNumber.js';
import ResponderMainPage from './responderMainPage.js';
import IncidentList      from './incidentList.js';

export default class ResponderPage extends Component{

	state = {
		userOperation: Constants.RESPONDER_PAGE.MAIN_PAGE 
	}
	setHomePage = (operation)=>{
		this.setState({userOperation:operation});
	}

	responderPageContent = ()=>{
		switch(this.state.userOperation){
			case Constants.COMMON_PAGE.MORE_PAGE:
				return 	<MorePage
							doSetHomePage             = {this.setHomePage} 
							doLogoutAccount           = {this.props.doLogoutAccount} />;
			case Constants.RESPONDER_PAGE.MAIN_PAGE:
				return 	<ResponderMainPage
							doLogoutAccount           = {this.props.doLogoutAccount} />;
			case Constants.RESPONDER_PAGE.LIST_PAGE:
				return 	<IncidentList/>
			case Constants.COMMON_PAGE.CHANGE_PASS_PAGE:
				return 	<ChangePassword 
							doSubmitChangePassword    = {this.props.doSubmitChangePassword}
							doSetHomePage             = {this.setHomePage} />;
			case Constants.COMMON_PAGE.USER_INFO_PAGE:
				return	<UserInformation
							doSubmitUpdatedInfo       = {this.props.doSubmitUpdatedInfo}
							doDisplayAlertMessage     = {this.props.doDisplayAlertMessage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSetHomePage             = {this.setHomePage} />;
			case Constants.COMMON_PAGE.PHONE_NUMBER:
				return 	<PhoneNumber
							doSetHomePage             = {this.setHomePage}
							doGetLoggedAccount        = {this.props.doGetLoggedAccount}
							doSubmitPhoneNumberUpdate = {this.props.doSubmitPhoneNumberUpdate} />;
		}		

	}


	render() {
	    return (
	    	<React.Fragment>
	    		<View style={{
	    				height: '91%',
	    				width: '100%',
	    				backgroundColor: '#fff',
	    				flexDirection:'row',
	    				top: '0%'
	    		}}>
	    			{this.responderPageContent()}
	    		</View>

	    		<View style={{
	    				height: '9%',
	    				width: '100%',
	    				backgroundColor: '#88ef92',
	    				flexDirection:'row'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.RESPONDER_PAGE.MAIN_PAGE})}>
		    			<View style={{
		    					width:'33.33%',
		    					height: '100%',
		    					position: 'relative',
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						fontSize: 14,
		    						paddingTop: '7%',
		    						fontWeight: 'bold',
		    						textAlign: 'center'
		    				}}>
			    				<Icon
			    					style={{
			    						fontSize: 30,
			    						color: '#454647'
			    					}}
			    					name='ios-home'
			    					type='Ionicons'/>
			    			</Text>
		    			</View>
		    		</TouchableWithoutFeedback>

		    		<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.RESPONDER_PAGE.LIST_PAGE})}>
		    			<View style={{
		    					width:'33.33%',
		    					height: '100%',
		    					position: 'relative',
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						fontSize: 14,
		    						paddingTop: '7%',
		    						fontWeight: 'bold',
		    						textAlign: 'center'
		    				}}>
			    				<Icon
			    					style={{
			    						fontSize: 30,
			    						color: '#454647'
			    					}}
			    					name='md-paper'
			    					type='Ionicons'/>
			    			</Text>
		    			</View>
		    		</TouchableWithoutFeedback>
		    			
		    		<TouchableWithoutFeedback
	    				onPress={()=>this.setState({userOperation:Constants.COMMON_PAGE.MORE_PAGE})}>
		    			<View style={{
		    					width:'33.333%',
		    					height: '100%',
		    					position: 'relative'
		    			}}>
		    				<Text style={{
		    						height: '100%',
		    						width: '100%',
		    						fontSize: 14,
		    						paddingTop: '7%',
		    						fontWeight: 'bold',
		    						textAlign: 'center'
		    				}}>
		    					<Icon
			    					style={{
			    						fontSize: 30,
			    						color: '#454647'
			    					}}
			    					name='bars'
			    					type='FontAwesome'/>
		    				</Text>
		    			</View>
		    		</TouchableWithoutFeedback>
	    		</View>
	    	</React.Fragment>
		);
	}
}