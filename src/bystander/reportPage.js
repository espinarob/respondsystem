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
import Constants from '../commons/Constants.js';

export default class ReportPage extends Component{

	state = {
		timeReported : ''
	}

	componentDidMount(){
		let today = new Date();
		this.setState({timeReported:today.toString()});
	}

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
	    			backgroundColor: '#88ef92',
	    			top: '0%',
	    			flexDirection: 'row'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.setBystanderMainOperation(Constants.CIVILIAN_MAIN_PAGE.DEFAULT_PAGE)}>
		    			<Text style={{
		    					height: '100%',
		    					width: '10%',
		    					fontSize: 15,
		    					fontWeight: 'bold',
		    					textAlign: 'center',
		    					position: 'relative',
		    					paddingTop: '1.5%',
		    					left: '10%'
		    			}}>	
		    				<Icon
		    					style={{
		    						fontSize:35,
		    						color: '#454647'
		    					}}
		    					name='ios-arrow-back'
		    					type='Ionicons'/>
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>

	    		<View style={{
	    				height: '7%',
	    				width:'100%',
	    				position: 'relative',
	    				top: '2%'
	    		}}>	
	    			<Text style={{
	    					height: '100%',
	    					width: '100%',
	    					fontSize:20,
	    					fontWeight: 'bold',
	    					textAlign: 'center'
	    			}}>
	    				<Icon
	    					style={{
	    						color: '#454647',
	    						fontSize: 25
	    					}}
	    					name='alarm-light'
	    					type='MaterialCommunityIcons'/>
	    					{' '}INCIDENT REPORT
	    			</Text>
	    		</View>


	    		<Text style={{
	    				height:'6%',
	    				width:'70%',
	    				top: '4%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    				left: '10%'
	    		}}>
	    			Time and Date: {this.state.timeReported}
	    		</Text>

	    		<Text style={{
	    				height:'3.9%',
	    				width:'50%',
	    				top: '4.7%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    				left: '10%'
	    		}}>
	    			Message Report
	    		</Text>

	    		<TextInput
	    			style={{
	    				height: '8%',
	    				width: '60%',
	    				position: 'relative',
	    				fontSize: 12,
	    				borderBottomWidth:1,
	    				top: '5.2%',
	    				left: '10%',
	    				borderColor :'#454647'
	    			}}	
	    			maxLength={Constants.MSG_REPORT_MAX_LENGTH}
	    			placeholder='INPUT ADDITIONAL INFORMATION' />

	    		<Text style={{
	    				height:'3.9%',
	    				width:'50%',
	    				top: '6.7%',
	    				position: 'relative',
	    				fontSize: 12,
	    				fontWeight: 'bold',
	    				left: '10%'
	    		}}>
	    			Upload Photo
	    		</Text>

	    	</View>
	    );
	}
}