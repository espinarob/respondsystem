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
import MapView     from  'react-native-maps';
import Constants   from '../commons/Constants.js';
import Geolocation from 'react-native-geolocation-service';

export default class DefaultPage extends Component{

	state = {
		userLocation: []
	}
	componentDidMount(){
		Geolocation.getCurrentPosition( (position)=>{
			this.props.doSetUserlocation(position.coords);
			this.setState({userLocation:position.coords});
		}, (error) => console.log(JSON.stringify(error)),
		{ enableHighAccuracy: true, timeout: 15000, maximumAge: 10000 });
	}

	displayMap = ()=>{
		if(this.state.userLocation.latitude){
			return	<MapView style = {{height:'100%',width: '100%'}}
						provider={MapView.PROVIDER_GOOGLE}
			            region = {{
			                latitude: this.state.userLocation.latitude,
			                longitude: this.state.userLocation.longitude,
			                latitudeDelta: 0.0922*5,
			                longitudeDelta: 0.0421*5,
		                }}>

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
	    				borderRadius: 100,
	    				position: 'absolute',
	    				width: '16.7%',
	    				height: '11%',
	    				top: '85%',
	    				left: '78%',
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
		    					fontSize: 11,
		    					paddingTop: '10%',
		    					fontWeight: 'bold'
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