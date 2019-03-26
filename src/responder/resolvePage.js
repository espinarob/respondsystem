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


export default class ResolvePage extends Component{

	state = {
		inputRemarks: ''
	}

	resolvePageDisplay = ()=>{
		return 	<View style={{
		    			height: '100%',
		    			width: '100%',
		    			alignItems: 'center'
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
		    				onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.INCIDENT_DETAILS)}>
			    			<Text style={{
			    					height: '100%',
			    					width: '10%',
			    					fontSize: 15,
			    					fontWeight: 'bold',
			    					textAlign: 'center',
			    					position: 'relative',
			    					textAlignVertical: 'center',
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

		    		<Text style={{
		    				height: '8%',
		    				fontSize: 25,
		    				fontWeight: 'bold',
		    				textAlignVertical: 'center',
		    				textAlign: 'center',
		    				position: 'relative'
		    		}}>
		    			Resolve Incident
		    		</Text>
		    		<Text style={{
		    				height: '5%',
		    				width: '30%',
		    				position: 'relative',
		    				top: '5%',
		    				fontSize:15,
		    				fontWeight:'bold',
		    				textAlignVertical:'center'
		    		}}>	
		    			Input Remarks
		    		</Text>
		    		<TextInput 
		    			style={{
		    				height: '9%',
		    				textAlignVertical:'top',
		    				width: '65%',
		    				position:'relative',
		    				borderBottomWidth:2,
		    				paddingLeft: '3%',
		    				fontSize: 14,
		    				top:'6%'
		    			}}
		    			maxLength={Constants.REPORT_REMARKS_MAX_LENGTH}
		    			placeholder = 'INPUT INCIDENT REMARKS'
		    			onChangeText={(inputRemarks)=>this.setState({inputRemarks:inputRemarks})}/>

		    	</View>
	}

	render() {
	    return (
	    	<React.Fragment>
	    		{this.resolvePageDisplay()}
	    	</React.Fragment>
	    );
	}
}