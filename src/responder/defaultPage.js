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
import {Marker}    from 'react-native-maps'; 
import MapView     from 'react-native-maps';
import Constants   from '../commons/Constants.js';
import Geolocation from 'react-native-geolocation-service';
const  responderIcon  = require('../img/map-icon/responderIcon1.png');
export default class DefaultPage extends Component{

	state = {
		userLocation: [],
		allReports  : []
	}

	getAllReports = ()=>{
		this.props.FirebaseObject
			.database()
			.ref("Reports")
			.on("value",snapshot=>{
				if(snapshot.exists()){
					const allDatabaseReports = JSON.parse(JSON.stringify(snapshot.val()));
					const initAllReports     = [];
					Object
						.keys(allDatabaseReports)
						.forEach((reportKey)=>{
							initAllReports.push(allDatabaseReports[reportKey]);
						});
					this.setState({allReports:initAllReports});
				}
			});
	}

	componentDidMount(){
		this.getAllReports();
		Geolocation.getCurrentPosition( (position)=>{
			console.log(position.coords);
			this.setState({userLocation:position.coords});
		}, (error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
	}

	displayMarker = ()=>{
		if(this.state.allReports.length!=0){
			return 	this.state.allReports.map(report => (
				    	<Marker
					      	coordinate={{latitude:report.userLatitude,
					      		longitude:report.userLongitude}}
					      	title={report.incidentType}
					      	key  ={report.key}
					      	description={report.reportInfo}/>
				  	));
		}
		else return;
	}

	displayMap = ()=>{
		if(this.state.userLocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude: this.state.userLocation.latitude,
			                longitude: this.state.userLocation.longitude,
			                latitudeDelta: 0.0922*2,
			                longitudeDelta: 0.0421*2,
		                }}>
		                <Marker
					      	coordinate={{latitude:this.state.userLocation.latitude,
					      		longitude:this.state.userLocation.longitude}}
					      	title={'Hello responder!'}
					      	description={'Here is your location'}>

					      	<Image source={responderIcon}
					      		style={{height:45,width:45}}/>
					    </Marker>
		                {this.displayMarker()}
        			</MapView>
		}
		else{
			return	<Text style={{
							height: '9%',
							width: '100%',
							top: '40%',
							fontSize: 17,
							fontWeight: 'bold',
							textAlign: 'center'
					}}>
						Getting your location.. A moment..
					</Text>
		}
	}

	displayAlertForEmergency = ()=>{
		if(this.state.allReports.length!=0){
			return 	<Text style={{
	    					height:'9%',
	    					top: '6%',
	    					width:'60%',
	    					position: 'absolute',
	    					left: '20%',
	    					borderRightWidth:2,
	    					fontWeight: 'bold',
	    					fontSize: 14,
	    					color: '#000',
	    					textAlign: 'center',
	    					textAlignVertical: 'center',
	    					borderRadius: 20,
	    					backgroundColor: '#c6311d'
	    			}}>
	    				MESSAGE: EMERGENCY ALERT
	    			</Text>
		}
		else return;
	}



	render() {
	    return (
	    	<View style={{
	    			height: '100%',
	    			width: '100%'
	    	}}>	
	    		<View style={{
	    			height: '100%',
	    			width: '100%',
	    			position: 'relative'
	    		}}>
	    			{this.displayMap()}
	    		</View>

	    		{this.displayAlertForEmergency()}
    			<Text style={{
    					width: '16.7%',
    					height: '11%',
    					top:'5%',
    					position: 'absolute',
    					textAlign: 'center',
    					borderRadius: 100,
    					textAlignVertical: 'center',
    					fontSize: 11,
    					left: '80%',
    					backgroundColor: (this.state.allReports.length == 0 ?
    						'#88ef92' : '#c6311d' ),
    					fontWeight: 'bold',
    			}}>
    				<Icon
    					style={{
    						fontSize:25,
    						width:'100%'
    					}}
    					name='alarm-light'
    					type='MaterialCommunityIcons'/>{'\n'}
    					Alarm
    			</Text>
	    	</View>
	    );
	}
}