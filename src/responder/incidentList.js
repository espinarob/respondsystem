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
import geolib    from 'geolib';
import Constants from '../commons/Constants.js';
import Geolocation from 'react-native-geolocation-service';


export default class IncidentList extends Component{

	state = {
		allReports: []
	}

	componentDidMount(){
		this.getAllReports();
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

	displayAllReportInList = ()=>{
		if(this.state.allReports.length!=0){

		}
		else{
			return 	<Text style={{
							height: '6%',
							width: '100%',
							top: '40%',
							position: 'relative',
							textAlign: 'center',
							textAlignVertical: 'center',
							fontSize: 16,
							fontWeight: 'bold'
					}}>
						Getting Incident Records..
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
	    			height: '9%',
	    			width: '100%',
	    			position: 'relative',
	    			backgroundColor: '#88ef92',
	    			top: '0%',
	    			flexDirection: 'row'
	    		}}>
	    			<Text style={{
	    					width:'80%',
	    					height: '100%',
	    					position:'relative',
	    					textAlign: 'center',
	    					textAlignVertical: 'center',
	    					left: '80%',
	    					fontWeight: 'bold',
	    					fontSize: 16
	    			}}>
	    				INCIDENT LIST
	    			</Text>
	    		</View>

	    		<View style={{
	    				height:'91%',
	    				width:' 100%',
	    				position: 'relative'
	    		}}>
	    			{this.displayAllReportInList()}
	    		</View>

	    	</View>
	    );
	}
}