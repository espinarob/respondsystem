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
import Constants from './Constants.js';



export default class WelcomeDashboard extends Component{

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
		    				height: '26%',
		    				width: '100%',
		    				top:'23%'
		    		}}>
		    			<Text style={{
		    					height:'50%',
		    					width: '25%',
		    					position: 'relative',
		    					left: '36%',
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
		    					left: '23%',
		    					fontSize: 40,
		    					fontWeight:'bold',
		    					color:'#454647',
		    					paddingLeft:'5%'
		    			}}>
		    				Res-Sys
		    			</Text>
		    		</View>

		    		<View style={{
		    				height: '26%',
		    				width: '100%',
		    				top:'36%'
		    		}}>
		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.LOGIN_PAGE)}>
		    				<Text style={{
		    						width:'60%',
		    						height: '25%',
		    						top: '25%',
		    						color: '#454647',
		    						paddingLeft: '21%',
		    						borderWidth:2,
		    						fontWeight: 'bold',
		    						fontSize: 20,
		    						position: 'relative',
		    						borderRadius: 10,
		    						paddingTop:'1%',
		    						left: '20%',
		    						borderColor: '#454647'
		    				}}>
		    					LOGIN
		    				</Text>
		    			</TouchableWithoutFeedback>

		    			<TouchableWithoutFeedback
		    				onPress={()=>this.props.doSetTemplateDisplay(Constants.PAGES.SIGN_UP_PAGE)}>
		    				<Text style={{
		    						width:'60%',
		    						height: '25%',
		    						top: '33%',
		    						color: '#454647',
		    						paddingLeft: '19%',
		    						borderWidth:2,
		    						fontWeight: 'bold',
		    						fontSize: 20,
		    						position: 'relative',
		    						borderRadius: 10,
		    						paddingTop:'1%',
		    						left: '20%',
		    						borderColor: '#454647'
		    				}}>
		    					SIGN-UP
		    				</Text>
		    			</TouchableWithoutFeedback>
		    		</View>
		    		<Text style={{
		    				height: '9%',
		    				width: '80%',
		    				textAlign: 'center',
		    				top: '39%',
		    				left: '10%',
		    				fontWeight: 'bold',
		    				fontSize:15,
		    				color: '#454647'
		    		}}>
		    			HELLO USER, ARE YOU NEW HERE? CHOOSE SIGN-UP NOW!
		    		</Text>
		    	</View>
		    </React.Fragment>
	    );  
  	}
}
