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
import { Container, 
	Icon} 
	from 'native-base';


/* -- Custom Components  -- */
import Constants from '../commons/Constants.js';

const styles = StyleSheet.create({
	loginCircleContainer: {
	    borderWidth: 1,
	    borderRadius: 2,
	    borderColor: '#ddd',
	    borderBottomWidth: 2,
	    shadowColor: '#000',
	    shadowOffset: { width: 20, height: 2 },
	    shadowOpacity: 0.8,
	    shadowRadius:20,
	    elevation: 1,
	    borderRadius: 100,
		backgroundColor:'#fff',
		height: '100%',
		width: 59,
		position:'relative',
		left: 145,
		paddingLeft:15.5,
		paddingTop: 9
  	}
});


export default class LoginDashboard extends Component{

	state = {
		hidePassword  : true,
		loginUsername : '',
		loginPassword : ''
	}

	showPasswordText = ()=>{
		this.setState({hidePassword:!this.state.hidePassword});
	}

	submitLogin =()=>{
		if(this.state.loginPassword.length == 0 ||
			this.state.loginUsername.length == 0 ){
			this.props.doDisplayAlertMessage('Please input your username or password');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.props.doCheckOnline == false){
			this.props.doDisplayAlertMessage(Constants.LOADING_MESSAGES.OFFLINE);
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else{
			this.props.doSubmitLogin(this.state.loginUsername,
				this.state.loginPassword);
		}
	}

	render() {
	    return (
	    	<React.Fragment>
		    	<Image source={require('../img/background.png')}
		    		style={{height: '100%',
		    				width:'100%',
		    				resizeMode:'stretch',
		    				position:'absolute',
		    				}}/>
		    	<View style={{
		    		width:'100%',
		    		height:'100%'
		    	}}>
		    		<View style={{
		    				height: '7%',
		    				width: '100%',
		    				flexDirection: 'row',
		    				position:'relative',
		    				top: '2%'
		    		}}>
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.WELCOME_PAGE)}>
			    			<Text style={{
			    					height:'100%',
			    					position: 'relative',
			    					width: '10%',
			    					left: '23%'
			    			}}>
			    				<Icon
			    					style={{
			    						fontSize:40,
			    						color: '#454647'
			    					}}
			    					name='ios-arrow-back'
			    					type='Ionicons'/>
			    			</Text>
			    		</TouchableWithoutFeedback>
		    		</View>

		    		<View style={{
		    				height: '26%',
		    				width: '100%',
		    				top:'10%'
		    		}}>
		    			<Text style={{
		    					height:'50%',
		    					width: '25%',
		    					position: 'relative',
		    					left: '38%',
		    					paddingLeft:'5%'
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize:60,
		    						color: '#454647'
		    					}}
		    					name='fire'
		    					type='FontAwesome'/>
		    			</Text>
		    			<Text style={{
		    					height:'45%',
		    					width: '50%',
		    					position: 'relative',
		    					left: '25%',
		    					fontSize: 40,
		    					fontWeight:'bold',
		    					color:'#454647',
		    					paddingLeft:'5%'
		    			}}>
		    				Res-Sys
		    			</Text>
		    		</View>

		    		<View style={{
		    				height: '53%',
		    				width: '100%',
		    				top: '12%',
		    				position: 'relative'
		    		}}>
		    			<Text style={{
		    					fontSize: 16,
		    					height: '9%',
		    					width: '28%',
		    					left: '10%',
		    					color:'#454647',
		    					position: 'relative',
		    					top: '10%'
		    			}}>
		    				USERNAME
		    			</Text>
		    			<TextInput
		    				style={{
		    					borderBottomWidth:2,
		    					height: '20%',
		    					width: '70%',
		    					top:'10%',
		    					left:'10%',
		    					fontSize:13,
		    					paddingTop: '2%'
		    				}}	
		    				maxLength={Constants.SIGNUP_FORMS.USERNAME_MAX_LENGTH}
		    				placeholder='INPUT USERNAME HERE'
		    				onChangeText={(loginUsername)=>this.setState({loginUsername:loginUsername})}/>

		    			<Text style={{
		    					fontSize: 16,
		    					height: '9%',
		    					width: '28%',
		    					left: '10%',
		    					color:'#454647',
		    					position: 'relative',
		    					top: '14%'
		    			}}>
		    				PASSWORD
		    			</Text>

		    			<View style={{
		    					height: '20%',
		    					width: '100%',
		    					top: '10%',
		    					flexDirection: 'row',
		    					left: '10%',
		    					position: 'relative'
		    			}}>
			    			<TextInput
			    				style={{
			    					borderBottomWidth:2,
			    					height: '100%',
			    					width: '70%',
			    					fontSize:13,
			    					left: '10%',
			    					paddingTop: '2%',
			    					position: 'relative'
			    				}}	
			    				secureTextEntry={this.state.hidePassword}
			    				maxLength={Constants.SIGNUP_FORMS.PASSWORD_MAX_LENGTH}
			    				placeholder='INPUT PASSWORD HERE'
			    				onChangeText={(loginPassword)=>this.setState({loginPassword:loginPassword})}/>

			    			<TouchableWithoutFeedback
			    				onPress={()=>this.showPasswordText()}>
				    			<Text style={{
				    					position: 'relative',
				    					left: '15%',
				    					height: '55%',
				    					width: '13%',
				    					top: '5%',
				    					paddingLeft: '1%'
				    			}}>
				    				<Icon
				    					style={{
				    						fontSize:30
				    					}}
				    					name='eye'
				    					type='Entypo'/>
				    			</Text>
				    		</TouchableWithoutFeedback>
			    		</View>

			    		<Text style={{
			    				width:'40%',
			    				position: 'relative',
			    				left: '20%',
			    				textAlign: 'center',
			    				height:'13%',
			    				top:'13%',
			    				color:'#454647',
			    				fontSize: 13
			    		}}>
			    		</Text>

			    		<TouchableWithoutFeedback
			    			onPress={()=>this.submitLogin()}>
				    		<Text style={{
				    				height: '14%',
				    				width: '30%',
				    				position: 'relative',
				    				top: '13%',
				    				color:'#454647',
				    				fontWeight: 'bold',
				    				borderWidth:2,
				    				left: '35%',
				    				textAlign: 'center',
				    				textAlignVertical: 'center'
				    		}}>
				    			SUBMIT
				    		</Text>
				    	</TouchableWithoutFeedback>
		    		</View>

		    	</View>
		    </React.Fragment>
	    );  
  	}
}
