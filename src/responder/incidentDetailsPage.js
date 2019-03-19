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
import Geolocation from 'react-native-geolocation-service';
import ImagePicker from 'react-native-image-picker';
import Constants   from '../commons/Constants.js';
import Geocoder    from 'react-native-geocoding';


export default class IncidentDetailsPage extends Component{

	state = {

	}

	componentDidMount(){
		console.log(this.props.doGetReportDetails);
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
	    				onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.LIST_PAGE)}>
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
	    				height:'30%',
	    				width: '80%',
	    				left:'10%',
	    				position: 'absolute',
	    				top: '9%',
	    				fontSize: 16,
	    				fontWeight: 'bold',
	    				textAlignVertical: 'center',
	    				textAlign: 'center'
	    		}}>
	    			Loading...
	    		</Text>
	    		<Image
	         		source = {{uri:this.props.doGetReportDetails.imgURL}}
		         	style = {{width:'100%',position:'relative',height:'45%',resizeMode:'contain',marginBottom:'2%'}}/>
		        <Text style={{
		        		height:34,
		        		width: '100%',
		        		paddingLeft:'2%',
		        		fontSize: 12.3,
		        		paddingLeft:'2%'
		        }}>
		        	Address: {this.props.doGetReportDetails.addressName}
		        </Text>
		        <Text style={{
		        		height:17.5,
		        		width: '100%',
		        		paddingLeft:'2%',
		        		fontSize: 12.3,
		        		paddingLeft:'2%'
		        }}>
		        	Time: {this.props.doGetReportDetails.timeReported}
		        </Text>
		        <Text style={{
		        		height:17.5,
		        		width: '100%',
		        		paddingLeft:'2%',
		        		fontSize: 12.3,
		        		paddingLeft:'2%'
		        }}>
		        	Incident: {this.props.doGetReportDetails.incidentType}
		        </Text>
		        <Text style={{
		        		height:'8%',
		        		width: '100%',
		        		paddingLeft:'2%',
		        		fontSize: 15,
		        		fontWeight:'bold'
		        }}>
		        	Details: {this.props.doGetReportDetails.reportInfo}
		        </Text>
		        <View style={{
		        		height: '9%',
		        		width: '100%',
		        		justifyContent: 'space-evenly',
		        		position: 'relative',
		        		top: '15%',
		        		flexDirection: 'row'
		        }}>
		        	<TouchableWithoutFeedback
		        		onPress={()=>this.props.doSetHomePage(Constants.RESPONDER_PAGE.RESOLVE_PAGE)}>
			        	<Text style={{
			        			height: '100%',
			        			width: '30%',
			        			position: 'relative',
			        			borderRadius: 100,
			        			borderWidth: 2,
			        			textAlign:'center',
			        			textAlignVertical: 'center',
			        			fontSize: 15,
			        			fontWeight: 'bold'
			        	}}>
			        		Resolve
			        	</Text>
			        </TouchableWithoutFeedback>
		        	<Text style={{
		        			width:'50%',
		        			textAlign:'center',
		        			textAlignVertical: 'center',
		        			height: '100%',
		        			position: 'relative',
		        			borderRadius: 100,
		        			borderWidth: 2,
		        			fontSize: 15,
		        			fontWeight: 'bold'
		        	}}>
		        		Ask For Assistance
		        	</Text>
		        </View>
	    	</View>
	    );
	}
}