import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View, AsyncStorage, CheckBox, Image,TextInput,TouchableWithoutFeedback,Alert} from 'react-native';
import { Container, Icon} from 'native-base';


/* -- Custom Components  -- */
import Constants              from '../commons/Constants.js';
import ErrorConnectionPage    from '../commons/errorConnectionPage.js';
import SignUpPartTwoDashboard from './signupP2DashboardComponent.js';

const styles = StyleSheet.create({
	signUpCircleContainer: {
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
		left: 150,
		paddingLeft:15.5,
		paddingTop: 9
  	}
});


export default class SignUpDashboard extends Component<Props> {

	state = {
		secondPageisPressed  : 'false',
		inputUsername        : '',
		inputPassword        : '',
		inputBirthday        : '',
		inputConfirmPassword : '',
		inputEmail           : '',
		inputFullName        : '',
		inputHomeAddress     : '',
		inputPhoneNumber     : '',
		signUpFirstPageData  : [],
		inputBirthdayError   : '',
		inputPhoneError      : ''
	}

	componentDidMount(){
		let currentFirstPageCredential = this.props.getRegistrationCredentials;
		this.setState({
			inputUsername        : currentFirstPageCredential.registerUsername,
			inputPassword        : currentFirstPageCredential.registerPassword,
			inputBirthday        : currentFirstPageCredential.registerBirthday,
			inputConfirmPassword : currentFirstPageCredential.registerConfirmPassword,
			inputEmail           : currentFirstPageCredential.registerEmailAddress,
			inputFullName        : currentFirstPageCredential.registerFullName,
			inputHomeAddress     : currentFirstPageCredential.registerHomeAddress,
			inputPhoneNumber     : currentFirstPageCredential.registerPhoneNumber
		});
	}

	goToNextPageRegistration = ()=>{
		this.props.doDisplayAlertMessage('');
		if(this.state.inputUsername.length<Constants.SIGNUP_FORMS.USERNAME_MIN_LENGTH){
			this.props.doDisplayAlertMessage('Username input length minimum is '+
				Constants.SIGNUP_FORMS.USERNAME_MIN_LENGTH+' characters');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.state.inputPassword.length<Constants.SIGNUP_FORMS.PASSWORD_MIN_LENGTH){
			this.props.doDisplayAlertMessage('Password input length minimum is '+
				Constants.SIGNUP_FORMS.PASSWORD_MIN_LENGTH+' characters');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.state.inputPassword!=this.state.inputConfirmPassword){
			this.props.doDisplayAlertMessage('The password input does not match');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.state.inputBirthday.length<Constants.SIGNUP_FORMS.BIRTHDAY_MAX_LENGTH){
			this.props.doDisplayAlertMessage('Error on format for birthday input');
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.validateInputBirthday() == false){
			this.props.doDisplayAlertMessage(this.state.inputBirthdayError);
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else if(this.validateInputPhoneNumber() == false){
			this.props.doDisplayAlertMessage(this.state.inputPhoneError);
			setTimeout(()=>this.props.doDisplayAlertMessage(''),Constants.SIGNUP_FORMS.ERROR_TIME_DISPLAY);
		}
		else{ 
			const data = {
				inputUsername        : this.state.inputUsername,
				inputPassword        : this.state.inputPassword,
				inputBirthday        : this.state.inputBirthday,
				inputConfirmPassword : this.state.inputConfirmPassword,
				inputEmail           : this.state.inputEmail,
				inputFullName        : this.state.inputFullName,
				inputHomeAddress     : this.state.inputHomeAddress,
				inputPhoneNumber     : this.state.inputPhoneNumber
			}
			this.props.doSaveFirstCredential(data);
		}
	}

	validateInputPhoneNumber = ()=>{
		let currentPhoneInput = this.state.inputPhoneNumber;
		if(currentPhoneInput.length<Constants.SIGNUP_FORMS.PHONE_NUMBER_MAX_LENGTH){
			this.setState({inputPhoneError:'Invalid phone number input'});
			return false;
		}
		else if(Number.isInteger(Number(currentPhoneInput)) == false){
			this.setState({inputPhoneError:'Error format on input phone number'});
			return false;
		}
		else{
			this.setState({inputPhoneError:''});
			return true;
		}
	}

	validateInputBirthday = ()=>{
		let today      = 	new Date();
		let currentBirthdayInput = this.state.inputBirthday;
		let getMonth   = 	Number(currentBirthdayInput[0]+currentBirthdayInput[1]);
		let getDay     = 	Number(currentBirthdayInput[3]+currentBirthdayInput[4]);
		let getYear    = 	Number(currentBirthdayInput[6]+currentBirthdayInput[7]+
						currentBirthdayInput[8]+currentBirthdayInput[9]);
		let currentYear =	today.getFullYear(); 
		if(Number.isInteger(getMonth) == false || Number.isInteger(getDay) == false ||
			Number.isInteger(getYear) == false){
			this.setState({inputBirthdayError:'Invalid input for the birthdate, check format'});
			return false;
		}
		else if(getYear>(currentYear-Constants.SIGNUP_FORMS.MINIMUM_AGE_SIGN)){
			this.setState({inputBirthdayError:'Minimum age requirement is '+
				Constants.SIGNUP_FORMS.MINIMUM_AGE_SIGN+' years old'});
			return false;
		}
		else if(getMonth>12 || getMonth<=0){ // 12 because there are 12 months only
			this.setState({inputBirthdayError:'Please input a valid month for your birthdate'});
			return false;
		}
		else if(getDay>31 || getDay<=0){ // 31 is for 31 days in a month
			this.setState({inputBirthdayError:'Please input a valid day for your birthdate'});
			return false;
		}
		else{ // success formatting for input birthdate
			this.setState({inputBirthdayError:''});
			return true;
		}
	}

	getBackToWelcomePage = ()=>{
		this.props.doSetTemplateDisplay(Constants.PAGES.WELCOME_PAGE);
		this.props.doRefreshCredential();
	}


	signUpDashboardMainDispaly = ()=>{
		if(this.props.doGetValidOrganizations.length!=0){
			return 	<React.Fragment>
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
				    				onPress={()=>this.getBackToWelcomePage()}>
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
					    		<Text style={{
				    					height: '100%',
				    					width: '47%',
				    					fontSize: 18,
				    					left: '180%',
				    					paddingTop: '2.5%',
				    					fontWeight: 'bold',
				    					position: 'relative'
				    			}}>
				    				Registration 1 of 2
				    			</Text>
				    		</View>

				    		<View style={{
				    				height: '26%',
				    				width: '100%',
				    				top:'5%'
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
				    				height:'5%',
				    				width:'100%',
				    				top:'8%',
				    				flexDirection: 'row'
				    		}}>	
				    			<Text style={{
				    					width: '38%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '30%'
				    			}}>
				    				CREATE USERNAME
				    			</Text>

				    			<Text style={{
				    					width: '38%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '170%'
				    			}}>
				    				CREATE PASSWORD
				    			</Text>
				    		</View>

				    		<View style={{
				    				height:'7%',
				    				width:'100%',
				    				top:'8%',
				    				flexDirection: 'row'
				    		}}>
				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '13%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder ='INPUT CREATED USERNAME'
				    				value       ={this.state.inputUsername}
				    				maxLength   ={Constants.SIGNUP_FORMS.USERNAME_MAX_LENGTH } 
				    				onChangeText={(inputUsername)=>this.setState({inputUsername:inputUsername})} />

				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '55%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder    ='INPUT CREATED PASSWORD'
				    				secureTextEntry={true}
				    				value          ={this.state.inputPassword}
				    				maxLength      ={Constants.SIGNUP_FORMS.PASSWORD_MAX_LENGTH }
				    				onChangeText   ={(inputPassword)=>this.setState({inputPassword:inputPassword})} />	

				    		</View>

				    		<View style={{
				    				height:'5%',
				    				width:'100%',
				    				top:'10%',
				    				flexDirection: 'row'
				    		}}>	
				    			<Text style={{
				    					width: '38%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '30%'
				    			}}>
				    				INPUT BIRTHDAY
				    			</Text>

				    			<Text style={{
				    					width: '45%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '170%'
				    			}}>
				    				CONFIRM PASSWORD
				    			</Text>
				    		</View>

				    		<View style={{
				    				height:'7%',
				    				width:'100%',
				    				top:'8%',
				    				flexDirection: 'row'
				    		}}>
				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '13%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder='BIRTHDATE (mm/dd/yyyy)'
				    				value      ={this.state.inputBirthday}
				    				maxLength  ={Constants.SIGNUP_FORMS.BIRTHDAY_MAX_LENGTH}
				    				onChangeText   ={(inputBirthday)=>this.setState({inputBirthday:inputBirthday})} />
				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '55%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder    ='CONFIRM YOUR PASSWORD'
				    				secureTextEntry={true}
				    				value          ={this.state.inputConfirmPassword}
				    				maxLength      ={Constants.SIGNUP_FORMS.PASSWORD_MAX_LENGTH }
				    				onChangeText   ={(inputConfirmPassword)=>this.setState({inputConfirmPassword:inputConfirmPassword})} />

				    		</View>

				    		<View style={{
				    				height:'5%',
				    				width:'100%',
				    				top:'10%',
				    				flexDirection: 'row'
				    		}}>	
				    			<Text style={{
				    					width: '38%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '30%'
				    			}}>
				    				FULL NAME
				    			</Text>

				    			<Text style={{
				    					width: '45%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '170%'
				    			}}>
				    				E-MAIL ADDRESS
				    			</Text>
				    		</View>

				    		<View style={{
				    				height:'7%',
				    				width:'100%',
				    				top:'8%',
				    				flexDirection: 'row'
				    		}}>
				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '13%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder ='FIRST & LAST NAME ONLY'
				    				value       ={this.state.inputFullName}
				    				maxLength   ={Constants.SIGNUP_FORMS.FULLNAME_MAX_LENGTH }
				    				onChangeText={(inputFullName)=>this.setState({inputFullName:inputFullName})} />

				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '55%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder ='EMAIL'
				    				value       ={this.state.inputEmail}
				    				maxLength   ={Constants.SIGNUP_FORMS.EMAIL_MAX_LENGTH }
				    				onChangeText={(inputEmail)=>this.setState({inputEmail:inputEmail})} />	

				    		</View>

				    		<View style={{
				    				height:'5%',
				    				width:'100%',
				    				top:'10%',
				    				flexDirection: 'row'
				    		}}>	
				    			<Text style={{
				    					width: '38%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '30%'
				    			}}>
				    				HOME ADDRESS
				    			</Text>

				    			<Text style={{
				    					width: '45%',
				    					fontSize: 14,
				    					position: 'relative',
				    					left: '170%'
				    			}}>
				    				PHONE NUMBER
				    			</Text>
				    		</View>

				    		<View style={{
				    				height:'7%',
				    				width:'100%',
				    				top:'8%',
				    				flexDirection: 'row'
				    		}}>
				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '13%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder='YOUR HOME ADDRESS'
				    				value      ={this.state.inputHomeAddress}
				    				maxLength  ={Constants.SIGNUP_FORMS.HOME_ADDRESS_MAX_LENGTH }
				    				onChangeText={(inputHomeAddress)=>this.setState({inputHomeAddress:inputHomeAddress})} />

				    			<TextInput
				    				style={{
				    					borderBottomWidth:2,
				    					height: '100%',
				    					width: '45%',
				    					fontSize:11,
				    					left: '55%',
				    					paddingTop: '2%',
				    					position: 'relative'
				    				}}
				    				placeholder='YOUR PHONE NUMBER'
				    				value      ={this.state.inputPhoneNumber}
				    				maxLength={Constants.SIGNUP_FORMS.PHONE_NUMBER_MAX_LENGTH }
				    				onChangeText={(inputPhoneNumber)=>this.setState({inputPhoneNumber:inputPhoneNumber})} />

				    		</View>

				    		<TouchableWithoutFeedback
				    			onPress={()=>this.goToNextPageRegistration()}>
					    		<Text style={{
					    				height: '7%',
					    				width: '27%',
					    				position: 'relative',
					    				top: '10%',
					    				color:'#454647',
					    				fontWeight: 'bold',
					    				borderWidth:2,
					    				left: '35%',
					    				paddingLeft: '5%',
					    				paddingTop: '3%'
					    		}}>
					    			PROCEED
					    		</Text>
					    	</TouchableWithoutFeedback>
				    	</View>
		    		</React.Fragment>
		}
		else{
			return 	<ErrorConnectionPage
						doSetTemplateDisplay = {this.props.doSetTemplateDisplay} />
		}
	}
	render() {
    	return (
    		<React.Fragment>
    			{this.signUpDashboardMainDispaly()}
    		</React.Fragment>
		);  
  	}
}