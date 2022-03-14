// import { MapView } from 'expo'
import MapView from 'react-native-maps'
import { Dimensions } from 'react-native'
import * as Location from 'expo-location'
import React, { useState, useEffect, createRef } from 'react'
import { TouchableOpacity, Image } from "react-native";

const MapInput = ({ navigation, nearbyPlaces }) => {
  const [location, setLocation] = useState()
  const mapRef = createRef()


  const getLocation = async () => {
    try {
      const { granted } = await Location.requestPermissionsAsync()
      if (!granted) return
      const {
        coords: { latitude, longitude },
      } = await Location.getCurrentPositionAsync()
      setLocation({ latitude, longitude })

      mapRef.current.animateToRegion({
        latitude: latitude,
        longitude: longitude,
        latitudeDelta: 0.005,
        longitudeDelta: 0.005
      });
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getLocation()
  }, [])
  return (
    <MapView
      ref={mapRef}
      flex={1}
      height={Dimensions.get('window').height}
      loadingEnabled={true}
      showsUserLocation={true}
      showsMyLocationButton={true}
      region={{
        latitude: location ? location.latitude : 49.246292,
        longitude: location ? location.longitude : -123.116226,
        // latitudeDelta: 0.0922,
        latitudeDelta: 0.015,
        // longitudeDelta: 0.0421,
        longitudeDelta: 0.0121,
      }}
    >
      <TouchableOpacity onPress={getLocation} style={{
        width: 40, height: 40,
        position: "absolute", bottom: 20, right: 20, borderRadius: 30, backgroundColor: "#d2d2d2"
      }}>
        {/* <Image
          style={{ width: 60, height: 60, position: "absolute", bottom: 20, right: 20, borderRadius: 30 }}
          source={require('../assets/current-location-icon.png')}

        /> */}
      </TouchableOpacity>


      {
        nearbyPlaces && nearbyPlaces.map((el, index) => (
          <MapView.Marker
            coordinate={{
              latitude: el.geometry.location.lat,
              longitude: el.geometry.location.lng
            }}
            title={el.name}
            description={`${el.vicinity}`}
          />
        ))
      }

    </MapView>
  )
}

export default MapInput
