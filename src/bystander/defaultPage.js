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
import {Marker}    from  'react-native-maps';
import MapView     from  'react-native-maps';
import Constants   from '../commons/Constants.js';
const  bystanderIcon  = require('../img/map-icon/responderIcon1.png');
const  centerIcon     = require('../img/map-icon/centerIcon.png');;
const  emergencyIcon  = require('../img/map-icon/emergency.png');

export default class DefaultPage extends Component{

	state = {
		allReports              : [],
		centerCoords            : [],
		tracksViewChangesUsers  : true,
		tracksViewChangesCenter : true,
		tracksViewChangesReport : true
	}

	componentDidMount(){
		this.getAllReports();
		this.getLocationCenterFocus();
	}

	onLoadUsersLocationImage = ()=>{
		if(bystanderIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesUsers:false});
			},1500);
		}
	}

	onLoadCenterLocationImage = ()=>{
		if(centerIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesCenter:false});
			},1500);
		}
			
	}

	onLoadReportIcon = ()=>{
		if(this.props.doGetEmergencyIcon){
			setTimeout(()=>{
				this.setState({tracksViewChangesReport:false});
			},1500);
		}
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

	displayCenterLocation = ()=>{
		if(this.state.centerCoords.length!=0){
		 	return 	<Marker
				      	coordinate={{latitude:this.state.centerCoords.latitude,
				      		longitude:this.state.centerCoords.longitude}}
			      		tracksViewChanges = {this.state.tracksViewChangesCenter}
				      	title={'Center Location'}
				      	description={String(Number(this.state.centerCoords.radius)/1000)+
				      		'kms. around this center is accepted'}>

				      	<Image
				      		onLoad={this.onLoadCenterLocationImage} 
				      		source={centerIcon}
				      		style={{height:40,width:40}}/>
				    </Marker>
		}
		else return;
	}

	displayMarker = ()=>{
		markers =	this.state.allReports.map(report => {
						if(report.reportStatus == Constants.REPORT_STATUS.UNRESOLVED){
							return 	<Marker
										tracksViewChanges = {this.state.tracksViewChangesReport}
								      	coordinate={{latitude:report.userLatitude,
								      		longitude:report.userLongitude}}
								      	title={report.incidentType}
								      	key  ={report.key}
								      	description={report.reportInfo}>
								      	<Image
								      		onLoad={this.onLoadReportIcon} 
								      		source={this.props.doGetEmergencyIcon}
							      			style={{height:40,width:40}}/>
								    </Marker>
						}	
			  		});
		return markers;
	}

	displayUsersLocation = ()=>{
		if(this.props.doGetMylocation.latitude){
			return	<Marker
				      	coordinate={{latitude:this.props.doGetMylocation.latitude,
				      		longitude:this.props.doGetMylocation.longitude}}
			      		tracksViewChanges = {this.state.tracksViewChangesUsers}
				      	title={'Hello bystander!'}
				      	description={'Here is your location'}>

				      	<Image
				      		onLoad={this.onLoadUsersLocationImage} 
				      		source={bystanderIcon}
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
					    {this.displayCenterLocation()}
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

	    		<View style={{
	    				position: 'absolute',
	    				width: 70,
	    				height: 70,
	    				top: '85%',
	    				left: '75%',
	    				borderRadius: 100,
	    				backgroundColor: '#88ef92',
	    				borderColor: '#000'
	    		}}>
	    			<TouchableWithoutFeedback
	    				onPress={()=>this.props.setBystanderMainOperation(Constants.CIVILIAN_MAIN_PAGE.REPORT_PAGE)}>
		    			<Text style={{
		    					width: '100%',
		    					height: '100%',
		    					position: 'relative',
		    					textAlign: 'center',
		    					textAlignVertical: 'center',
		    					fontSize: 11,
		    					fontWeight: 'bold',
		    					color: '#000'
		    			}}>
		    				<Icon
		    					style={{
		    						fontSize:25,
		    						width:'100%'
		    					}}
		    					name='add-box'
		    					type='MaterialIcons'/>{'\n'}
		    					Report
		    			</Text>
		    		</TouchableWithoutFeedback>
	    		</View>
	    	</View>
	    );
	}
}