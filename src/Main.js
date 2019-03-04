import React, 
	{Component} 
	from 'react';
import {Platform, 
	StyleSheet, 
	Text, 
	View, 
	AsyncStorage,
	NetInfo} 
	from 'react-native';
import {Container}   from 'native-base';
import * as firebase from 'firebase';
import SyncStorage   from 'sync-storage';


/* -- Custom Components  -- */
import LoginDashboard         from './login/loginDashboardComponent.js';
import SignUpDashboard        from './sign-up/signupDashboardComponent.js';
import SignUpPartTwoDashboard from './sign-up/signupP2DashboardComponent';
import Constants              from './commons/Constants.js';
import WelcomeDashboard       from './commons/welcomeDashboard.js';
import LoadingScreen          from './commons/loadingScreen.js';
import LogDisplay             from './commons/logDisplay.js';
import HomeTemplate           from './commons/homeTemplate.js';

export default class Main extends Component{

	state = { 
		operation               : Constants.PAGES.LOADING_PAGE,
		loadingMessage          : Constants.LOADING_MESSAGES.SPLASH_SCREN,
		consoleDisplay          : '',
		validOrganizations      : [],
		accountLoggedDetails    : [],
		isOnline                : false,
		loginSuccess            : false,
		userLocation            : {},
		/* -- For Registration Credentials -- */
		registrationCredentials : {
			registerUsername        : '',
			registerPassword        : '',
			registerConfirmPassword : '',
			registerBirthday        : '',
			registerFullName        : '',
			registerEmailAddress    : '',
			registerHomeAddress     : '',
			registerPhoneNumber     : '',
			registerGender          : 'Male',
			registerOrganization    : '',
			registerCallSign        : '',
			registerRole            : Constants.USER_ROLES.CIVILIAN
		}

	}

	/* -- Start of Initialization functions --*/

	getValidOrganization = ()=>{
		firebase
			.database()
			.ref("Organizations")
			.once("value",snapshot=>{
				const initValidOrganization = [];
				let currentOrganization    = JSON.parse(JSON.stringify(snapshot.val()));
				Object
					.keys(currentOrganization)
					.forEach((organizationKey)=>{
						initValidOrganization.push(currentOrganization[organizationKey]);
					});
				this.setState({validOrganizations:initValidOrganization});
			})
			.then(()=>{
				this.displayAlertMessage('');
				this.setState({isOnline:true});
				console.log('Successfully got valid organizations for registration!');
			})
			.catch((error)=>{
				this.displayAlertMessage('Please check your internet connection');
				//setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
			});
	}

	/* -- End of Initialization functions -- */


	/* -- Start of Sign-up Process functions -- */

	saveFirstPageCredential =(firstPageCredentials)=>{
		this.setState({
			registrationCredentials : {
				registerUsername        : firstPageCredentials.inputUsername,
				registerPassword        : firstPageCredentials.inputPassword,
				registerConfirmPassword : firstPageCredentials.inputConfirmPassword,
				registerBirthday        : firstPageCredentials.inputBirthday,
				registerFullName        : firstPageCredentials.inputFullName,
				registerEmailAddress    : firstPageCredentials.inputEmail,
				registerHomeAddress     : firstPageCredentials.inputHomeAddress,
				registerPhoneNumber     : firstPageCredentials.inputPhoneNumber
			}
		});
		this.setTemplateDisplay(Constants.PAGES.SIGN_UP_PAGE_2);
	}

	saveSecondPageCredential = (secondPageCredential)=>{
		this.setState({
			registrationCredentials:{
					registerUsername        : this.state.registrationCredentials.registerUsername,
					registerPassword        : this.state.registrationCredentials.registerPassword,
					registerConfirmPassword : this.state.registrationCredentials.registerConfirmPassword,
					registerBirthday        : this.state.registrationCredentials.registerBirthday,
					registerFullName        : this.state.registrationCredentials.registerFullName,
					registerEmailAddress    : this.state.registrationCredentials.registerEmailAddress,
					registerHomeAddress     : this.state.registrationCredentials.registerHomeAddress,
					registerPhoneNumber     : this.state.registrationCredentials.registerPhoneNumber,
					registerOrganization    : secondPageCredential.inputOrganization,
					registerCallSign        : secondPageCredential.inputCallSign,
					registerGender          : secondPageCredential.inputGender,
					registerRole            : secondPageCredential.inputRole
			}
		});
	}

	submitRegistrationToDatabase = ()=>{
		const currentRegistrationCredential = this.state.registrationCredentials;
		firebase
			.database()
			.ref()
			.child("CallSigns")
			.orderByChild("ID")
			.equalTo(String(currentRegistrationCredential.registerCallSign))
			.once("value",snapshot=>{
				if(snapshot.exists() || currentRegistrationCredential.registerRole == Constants.USER_ROLES.CIVILIAN){
					let currentCallSign = {

						'noneKey'       : {
							status      : 'none',
							Organization: 'none'
						}

					};

					if(snapshot.exists())currentCallSign = JSON.parse(JSON.stringify(snapshot.val()));

					if( currentRegistrationCredential.registerRole == Constants.USER_ROLES.CIVILIAN || 
						(currentCallSign[Object.keys(currentCallSign)[0]]).status==
						Constants.CALL_SIGN_STATUS.NOT_TAKEN) { // validates if not taken

						if( currentRegistrationCredential.registerRole == Constants.USER_ROLES.CIVILIAN || 
							(currentCallSign[Object.keys(currentCallSign)[0]]).Organization==
							currentRegistrationCredential.registerOrganization){ // validate if the call sign exists in the organization
							firebase
								.database()
								.ref()
								.child("Accounts")
								.orderByChild("username")
								.equalTo(String(currentRegistrationCredential.registerUsername))
								.once("value",snapshot=>{
									if(snapshot.exists()){
										this.displayAlertMessage('Error 009: Username input was already taken');
										setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
									}
									else{
										firebase
								            .database()
								            .ref()
								            .child("Accounts")
								            .orderByChild("email")
								            .equalTo(String(currentRegistrationCredential.registerEmailAddress))
								            .once("value",snapshot=>{
								            	if(snapshot.exists()){
								            		this.displayAlertMessage('Error 008: Email input was already taken');
								            		setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
								            	}
								            	else{
									            	const registerAccountKey = 	firebase
															            			.database()
															            			.ref("Accounts")
															            			.push();
													const finalCredentialData = {
														'username'     : currentRegistrationCredential.registerUsername,
														'password'     : currentRegistrationCredential.registerPassword,
														'email'        : currentRegistrationCredential.registerEmailAddress,
														'birthday'     : currentRegistrationCredential.registerBirthday,
														'fullName'     : currentRegistrationCredential.registerFullName,
														'address'      : currentRegistrationCredential.registerHomeAddress,
														'phoneNumber'  : currentRegistrationCredential.registerPhoneNumber,
														'gender'       : currentRegistrationCredential.registerGender,
														'callSign'     : currentRegistrationCredential.registerCallSign,
														'organization' : (currentRegistrationCredential.role == Constants.USER_ROLES.CIVILIAN ? 
															'' : currentRegistrationCredential.registerOrganization) ,
														'role'         : currentRegistrationCredential.registerRole,
														'key'          : registerAccountKey.key
													}

													registerAccountKey
														.update(JSON.parse(JSON.stringify(finalCredentialData)))
														.then(()=>{	
															this.displayAlertMessage('Successfully Registered, Please Wait..');
															setTimeout(()=>{
																this.displayAlertMessage('');
																this.setTemplateDisplay(Constants.PAGES.WELCOME_PAGE);
															},Constants.CONSOLE_TIME_DISPLAY);
															this.refreshCredential();	
															firebase
																.database()
																.ref("CallSigns/"+String(Object.keys(currentCallSign)[0]))
																.update({
																	status: Constants.CALL_SIGN_STATUS.TAKEN
																})
																.then(()=>{
																	console.log('Successfully updated call sign status!');
																})
																.catch((error)=>{
																	this.displayAlertMessage('Check your internet connection');
																});
														})
														.catch((error)=>{
															this.displayAlertMessage('Error 007: Please check your internet connection');
															setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
															return;
														});
								            	}
								            })
								            .catch((error)=>{
								            	this.displayAlertMessage('Error 006: Please check your internet connection');
								            	setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
								            	return;
								            });
									}
								})
								.catch((error)=>{
									this.displayAlertMessage('Error 005: Please check your internet connection');
									setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
									return;
								});
						}
						else{
							this.displayAlertMessage('Error 004: The organization and call sign does not match');
							setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
							return;
						}
					}
					else{
						this.displayAlertMessage('Error 003: Call sign input is already registerd');
						setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
						return;
					}
				}
				else{
					this.displayAlertMessage('Error 002: The call sign input does not exists');
					setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
					return;
				}
			})
			.catch((error)=>{
				this.displayAlertMessage('Error 001: Please check your internet connection');
				setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
			});
	}


	refreshCredential = ()=>{
		this.setState({
			registrationCredentials : {
				registerUsername        : '',
				registerPassword        : '',
				registerConfirmPassword : '',
				registerBirthday        : '',
				registerFullName        : '',
				registerEmailAddress    : '',
				registerHomeAddress     : '',
				registerPhoneNumber     : '',
				registerGender          : 'Male',
				registerOrganization    : '',
				registerCallSign        : '',
				registerRole            : Constants.USER_ROLES.CIVILIAN
			}
		});
	}

	/* -- End of Sign-up Process functions --*/


	/* -- Start of Login Process functions -- */


	submitLoginToDatabase = (username,password)=>{
		firebase
			.database()
			.ref()
			.child("Accounts")
			.orderByChild("username")
			.equalTo(String(username))
			.once("value",snapshot=>{
				if(snapshot.exists()){
					let accountDetailsWithKey = JSON.parse(JSON.stringify(snapshot.val()));
					let accountKey            = Object.keys(accountDetailsWithKey);
					let accountDetails        = accountDetailsWithKey[accountKey];
					if(String(accountDetails.password) == String(password)){
						this.setState({loadingMessage:Constants.LOADING_MESSAGES.LOGGING_IN});
						this.displayAlertMessage('Welcome! You have successfully logged in!');
						this.cacheInAccountDetails(accountDetails);
						this.setTemplateDisplay(Constants.PAGES.LOADING_PAGE);
						this.setState({accountLoggedDetails:accountDetails});
						setTimeout(()=>{
							this.displayAlertMessage('');
							this.setTemplateDisplay(Constants.PAGES.HOME_PAGE);
						},Constants.CONSOLE_TIME_DISPLAY);

					}
					else{
						this.displayAlertMessage('Login Error: Incorrect Username/Password');
						setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
					}
				}
				else{
					this.displayAlertMessage('Login Error: Incorrect Username/Password');
					setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
				}
			})
			.catch((error)=>{
				this.displayAlertMessage('Login Error: Please check your internet connection');
				setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
			});
	}

	cacheInAccountDetails = (accountDetails)=>{
		SyncStorage.set(Constants.CACHE_ACCOUNT,JSON.stringify(accountDetails))
		.then(()=>{
			console.log('success storing to cache');
		})
		.catch((error)=>{
			console.log(error);
		})
	}

	checkCacheForLogin = ()=>{
		let localAccountCredentials = SyncStorage.get(Constants.CACHE_ACCOUNT);
		if(localAccountCredentials == undefined){
			this.setState({loginSuccess:false});
			this.setState({accountLoggedDetails:[]});
		}
		else{
			this.setState({loginSuccess:true});
			this.setState({accountLoggedDetails:JSON.parse(localAccountCredentials)});
			firebase
				.database()
				.ref("Accounts/"+String(JSON.parse(localAccountCredentials).key))
				.once("value",snapshot=>{
					this.cacheInAccountDetails(JSON.parse(JSON.stringify(snapshot.val())));
					this.setState({accountLoggedDetails:JSON.parse(JSON.stringify(snapshot.val()))});
				})
				.then(()=>{
					console.log('Updated');

				})
				.catch((error)=>{
					console.log('Cache Error: '+String(error));
				});
		}
		this.showSplashScreen(); 
	}

	logoutAccount = ()=>{
		SyncStorage.remove(Constants.CACHE_ACCOUNT)
		.then(()=>{
			console.log('Successfully logged out account');
			this.setState({loadingMessage:Constants.LOADING_MESSAGES.LOGGING_OUT});
			this.setTemplateDisplay(Constants.PAGES.LOADING_PAGE);
			setTimeout(()=>this.setTemplateDisplay(Constants.PAGES.WELCOME_PAGE),
				Constants.CONSOLE_TIME_DISPLAY);
		})
		.catch((error)=>{
			console.log('Error Logout: '+error);
		});
	}

	/* -- End of Login Process functions -- */


	/* -- Start of Report Module -- */

	setUserLocation = (coordinates)=>{
		this.setState({userLocation:coordinates});
	}

	/* -- End of Report Module -- */


	/* -- Start of Common Functions -- */

	submitChangePassword = (currentPassword,newPassword,confirmNewPassword)=>{
		console.log(this.state.accountLoggedDetails);
		if(newPassword.length<Constants.SIGNUP_FORMS.PASSWORD_MIN_LENGTH){
			this.displayAlertMessage('Minimum number of characters for password is '+
				Constants.SIGNUP_FORMS.PASSWORD_MIN_LENGTH);
			setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(String(newPassword)!=String(confirmNewPassword)){
			this.displayAlertMessage('Confirm password does not match');
			setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(String(currentPassword)!=String(this.state.accountLoggedDetails.password)){
			this.displayAlertMessage('Incorrect password!');
			setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else{
			firebase
				.database()
				.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
				.update({
					password:String(newPassword)
				})
				.then(()=>{
					firebase
						.database()
						.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
						.once("value",snapshot=>{
							this.setState({accountLoggedDetails:JSON.parse(JSON.stringify(snapshot.val()))});
							this.cacheInAccountDetails(JSON.parse(JSON.stringify(snapshot.val())));
						})
						.then(()=>{
							this.displayAlertMessage('Successfully updated password. Please wait..');
							setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
						});
				})
				.catch((error)=>{
					this.displayAlertMessage('Error in connecting to server');
					setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
				});				
		}
	}

	submitUpdatedInfo = (updateData)=>{
		this.displayAlertMessage('Updating your account. Please wait...');
		const updateAccountKey = firebase
									.database()
									.ref("Accounts/"+String(this.state.accountLoggedDetails.key));
		firebase
			.database()
			.ref()
			.child("Accounts")
			.orderByChild("email")
			.equalTo(String(updateData.email))
			.once("value",snapshot=>{
				if(snapshot.exists()){
					let accounts = Object.keys(JSON.parse(JSON.stringify(snapshot.val())));
					if(accounts.length == 1){
						updateAccountKey
							.update({
								fullName  : updateData.fullName, 
								birthday  : updateData.birthday, 
								email     : updateData.email, 
								address   : updateData.address 
							})
							.then(()=>{
								firebase
									.database()
									.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
									.once("value",snapshot=>{
										this.setState({accountLoggedDetails:JSON.parse(JSON.stringify(snapshot.val()))});
										this.cacheInAccountDetails(JSON.parse(JSON.stringify(snapshot.val())));
									})
									.then(()=>{
										this.displayAlertMessage('Successfully updated your account. Please wait..');
										setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
									});
							})
							.catch((error)=>{
								this.displayAlertMessage('Error in connecting to server');
								setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
							});
					}
					else{
						this.displayAlertMessage('Email is already taken');
						setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
					}
				}
				else{
					updateAccountKey
						.update({
							fullName  : updateData.fullName, 
							birthday  : updateData.birthday, 
							email     : updateData.email, 
							address   : updateData.address 
						})
						.then(()=>{
							firebase
								.database()
								.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
								.once("value",snapshot=>{
									this.setState({accountLoggedDetails:JSON.parse(JSON.stringify(snapshot.val()))});
									this.cacheInAccountDetails(JSON.parse(JSON.stringify(snapshot.val())));
								})
								.then(()=>{
									this.displayAlertMessage('Successfully updated your account. Please wait..');
									setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
								});
						})
						.catch((error)=>{
							this.displayAlertMessage('Error in connecting to server');
							setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
						});
				}
			})
			.catch((error)=>{
				this.displayAlertMessage('Error in connecting to server');
				setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
			});

	}

	submitPhoneNumberUpdate = (newPhoneNumber)=>{
		this.displayAlertMessage('Updating your account. Please Wait...');
		if(Number.isInteger(Number(newPhoneNumber)) == false){
			this.displayAlertMessage('Invalid phone number input');
			setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else if(Number.isNaN(Number(newPhoneNumber)) == true){
			this.displayAlertMessage('Invalid phone number input');
			setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
		}
		else{
			firebase
				.database()
				.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
				.update({
					phoneNumber: String(newPhoneNumber)
				})
				.then(()=>{
					firebase
						.database()
						.ref("Accounts/"+String(this.state.accountLoggedDetails.key))
						.once("value",snapshot=>{
							this.setState({accountLoggedDetails:JSON.parse(JSON.stringify(snapshot.val()))});
							this.cacheInAccountDetails(JSON.parse(JSON.stringify(snapshot.val())));
						})
						.then(()=>{
							this.displayAlertMessage('Successfully updated phone number. Please wait..');
							setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
						});
				})
				.catch((error)=>{
					console.log('Updating phone number error: '+String(error));
					this.displayAlertMessage('Error in connecting to server');
					setTimeout(()=>this.displayAlertMessage(''),Constants.CONSOLE_TIME_DISPLAY);
				});
		}
	}
	/* -- End of Common Functions -- */


	componentDidMount(){
		this.initializeStorage();
		if(!firebase.apps.length){
			firebase.initializeApp(Constants.FIRE_BASE_CONFIG);
		}
		NetInfo.isConnected.addEventListener('connectionChange',this.handleChangeConnectivity);
	}

	initializeStorage = async()=>{
		const data = await SyncStorage.init();
		this.checkCacheForLogin();
	}

	handleChangeConnectivity = (isConnected)=>{
		if(isConnected === true){
			this.displayAlertMessage(Constants.LOADING_MESSAGES.GETTING);
			this.getValidOrganization();
		}
		else{
			console.log('offline');
			this.setState({isOnline:false});
			this.displayAlertMessage(Constants.LOADING_MESSAGES.OFFLINE);
		}
	}


	displayAlertMessage = (message)=>{
		this.setState({consoleDisplay:message});
	}

	showSplashScreen = ()=>{
		setTimeout(()=>{
			this.setState({loadingMessage:''});
			if(this.state.loginSuccess == true){
				this.setState({loadingMessage:Constants.LOADING_MESSAGES.LOGGING_IN});
				this.setTemplateDisplay(Constants.PAGES.LOADING_PAGE);
				setTimeout(()=>{
					this.setTemplateDisplay(Constants.PAGES.HOME_PAGE);
				},Constants.CONSOLE_TIME_DISPLAY);
			}
			else this.setState({operation: Constants.PAGES.WELCOME_PAGE});
		},2500);
	}

	consoleTemplateDisplay = ()=>{
		if(this.state.consoleDisplay.length!=0){
			return 	<LogDisplay
						doGetMessage = {this.state.consoleDisplay} />
		}
		else{
			return;
		}
	}

	mainTemplateDisplay = ()=>{
		
		switch(this.state.operation){
			case Constants.PAGES.LOADING_PAGE:
				return	<LoadingScreen 
							loadingMessage             = {this.state.loadingMessage} />;
			case Constants.PAGES.WELCOME_PAGE:
				return 	<WelcomeDashboard 
							doSetTemplateDisplay       = {this.setTemplateDisplay} />;
			case Constants.PAGES.LOGIN_PAGE:
				return	<LoginDashboard
							doSetTemplateDisplay       = {this.setTemplateDisplay}
							doSubmitLogin              = {this.submitLoginToDatabase}
							doCheckOnline              = {this.state.isOnline}
							doDisplayAlertMessage      = {this.displayAlertMessage} />;
			case Constants.PAGES.HOME_PAGE:
				return 	<HomeTemplate 
							doSetUserlocation		   = {this.setUserLocation}
							doLogoutAccount			   = {this.logoutAccount}
							doGetLoggedAccount         = {this.state.accountLoggedDetails}
							doSubmitChangePassword     = {this.submitChangePassword}
							doDisplayAlertMessage      = {this.displayAlertMessage}
							doSubmitUpdatedInfo        = {this.submitUpdatedInfo}
							doSubmitPhoneNumberUpdate  = {this.submitPhoneNumberUpdate} />;
			case Constants.PAGES.SIGN_UP_PAGE:
				return <SignUpDashboard
							doSetTemplateDisplay       = {this.setTemplateDisplay} 
							doDisplayAlertMessage      = {this.displayAlertMessage}
							doSaveFirstCredential      = {this.saveFirstPageCredential}
							doRefreshCredential        = {this.refreshCredential}
							doGetValidOrganizations    = {this.state.validOrganizations}
							getRegistrationCredentials = {this.state.registrationCredentials} />;
			case Constants.PAGES.SIGN_UP_PAGE_2:
				return  <SignUpPartTwoDashboard
							doSetTemplateDisplay       = {this.setTemplateDisplay} 
							doDisplayAlertMessage      = {this.displayAlertMessage}
							doSaveSecondCredential     = {this.saveSecondPageCredential}
							doSubmitRegistration       = {this.submitRegistrationToDatabase}
							doGetValidOrganizations    = {this.state.validOrganizations}
							getRegistrationCredentials = {this.state.registrationCredentials} />;				
		}
	
	}

	setTemplateDisplay = (operation)=>{
		this.setState({operation:operation});
		return;
	}

  	render() {
	    return (
			<View style={{
				flex:1
			}}>
				{this.mainTemplateDisplay()}
				{this.consoleTemplateDisplay()}
			</View>
	    );
  }
}
