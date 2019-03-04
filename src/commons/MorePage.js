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
import Constants from './Constants.js';

export default class MorePage extends Component{
	
	render() {

	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%'
	    	}}>
	    		<View style={{
	    			height: '9%',
	    			width: '100%',
	    			position: 'relative',
	    			backgroundColor: '#88ef92'
	    		}}>

	    		</View>

	    		<View style={{
	    				position: 'relative',
	    				height: '15%',
	    				width:'100%',
	    				top: '5%',
	    				flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					width: '23%',
	    					height: '100%',
	    					position: 'relative',
	    					left: '20%',
	    					paddingTop: '4.5%',
	    					textAlign: 'center',
	    					borderRadius: 100,
	    					backgroundColor : '#454647'
	    			}}>
	    				<Icon
	    					style={{
	    						fontSize:40,
	    						color: '#fff'
	    					}}
	    					name='user'
	    					type='FontAwesome'/>
	    			</Text>

	    			<Text style={{
	    					width: '70%',
	    					height: '100%',
	    					paddingLeft: '3%',
	    					left: '23%',
	    					fontSize: 16,
	    					fontWeight: 'bold'
	    			}}>
	    				Res-Sys Message: Hello user, you may view and update your account information in this section
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '4%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%'
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '50%',
	    					fontSize: 14
	    			}}>
	    				ACCOUNT AND SUPPORT
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.doLogoutAccount()}>
		    			<Text style={{
		    					height: '100%',
		    					width: '50%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
		    					paddingTop: '2%'
		    			}}>
		    				Logout Account
		    			</Text>
		    		</TouchableWithoutFeedback>

	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '50%',
	    					left: '35%',
	    					fontSize: 20,
	    					fontWeight: 'bold',
	    					paddingTop: '2%'
	    			}}>
	    				Report a Problem
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '15%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '50%',
	    					left: '35%',
	    					fontSize: 20,
	    					fontWeight: 'bold',
	    					paddingTop: '2%'
	    			}}>
	    				Legal Policies
	    			</Text>

	    		</View>

	    		<View style={{
	    				height: '4%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%'
	    		}}>
	    			<Text style={{
	    					height: '100%',
	    					width: '70%',
	    					left: '50%',
	    					fontSize: 14
	    			}}>
	    				YOUR PROFILE
	    			</Text>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.CHANGE_PASS_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '50%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
		    					paddingTop: '2%'
		    			}}>
		    				Change Password
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.USER_INFO_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '60%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
		    					paddingTop: '2%'
		    			}}>
		    				User Information
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>

	    		<View style={{
	    				height: '8%',
	    				width: '100%',
	    				flexDirection: 'row',
	    				top: '18%',
	    				borderBottomWidth: 0.5
	    		}}>
	    			<TouchableWithoutFeedback 
	    				onPress={()=>this.props.doSetHomePage(Constants.COMMON_PAGE.PHONE_NUMBER)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '60%',
		    					left: '35%',
		    					fontSize: 20,
		    					fontWeight: 'bold',
		    					paddingTop: '2%'
		    			}}>
		    				Phone Number
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>
	    	</View>
    	);
	}
}