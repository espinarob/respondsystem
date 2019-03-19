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
import geolib      from 'geolib';
const  responderIcon  = require('../img/map-icon/responderIcon1.png');
const  centerIcon     = require('../img/map-icon/centerIcon.png');
const  emergencyIcon  = require('../img/map-icon/emergency.png');

export default class DefaultPage extends Component{

	state = {
		allReports        : [],
		centerCoords      : [],
		nearbyFlag        : false,
		tracksViewChanges : false
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

	getLocationCenterFocus = ()=>{
		this.props.FirebaseObject
			.database()
			.ref("Center")
			.once("value",snapshot=>{
				if(snapshot.exists()){
					const initCenterCoordinates = JSON.parse(JSON.stringify(snapshot.val()));
					this.setState({centerCoords:initCenterCoordinates});
				}
			});

	}

	componentDidMount(){
		this.getAllReports();
		this.getLocationCenterFocus();
	}


	displayCenterLocation = ()=>{
		if(this.state.centerCoords.length!=0){
		 	return 	<Marker
				      	coordinate={{latitude:this.state.centerCoords.latitude,
				      		longitude:this.state.centerCoords.longitude}}
				      	title={'Center Location'}
				      	description={String(Number(this.state.centerCoords.radius)/1000)+
				      		'kms. around this center is accepted'}>

				      	<Image source={centerIcon}
				      		style={{height:40,width:40}}/>
				    </Marker>
		}
		else return;
	}


	displayMarker = ()=>{
		return 	this.state.allReports.map(report => {
					if(report.reportStatus == Constants.REPORT_STATUS.UNRESOLVED){
						return 	<Marker
							      	coordinate={{latitude:report.userLatitude,
							      		longitude:report.userLongitude}}
							      	title={report.incidentType}
							      	key  ={report.key}
							      	description={report.reportInfo}>
							      	<Image source={emergencyIcon}
						      		style={{height:40,width:40}}/>
							    </Marker>
					}	
			  	});
	}

	displayUsersLocation = ()=>{
		if(this.props.doGetMylocation.latitude){
			return 	<Marker
				      	coordinate={{latitude:this.props.doGetMylocation.latitude,
				      		longitude:this.props.doGetMylocation.longitude}}
			      		tracksViewChanges = {false}
				      	title={'Hello responder!'}
				      	description={'Here is your location'}>

				      	<Image source={responderIcon}
				      		style={{height:45,width:45}}/>
				    </Marker>
		}
		else return;
	}

	displayMap = ()=>{
		if(this.props.doGetMylocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude: this.props.doGetMylocation.latitude,
			                longitude: this.props.doGetMylocation.longitude,
			                latitudeDelta: 0.0922*2,
			                longitudeDelta: 0.0421*2,
		                }}>
		             	{this.displayUsersLocation()}
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
	    					left: '20.3%',
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