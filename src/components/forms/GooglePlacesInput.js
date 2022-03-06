import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Center, VStack, Text } from "native-base";
import Constants from 'expo-constants';
import { API_KEY } from "react-native-dotenv";
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

const GooglePlacesInput = () => {

    // const homePlace = {
    //     description: 'Home',
    //     geometry: { location: { lat: 49.246292, lng: -123.116226 } },
    // };

    return (

        <GooglePlacesAutocomplete
            placeholder="Search"
            query={{
                key: API_KEY,
                language: 'en', // language of the results
            }}
            onPress={(data, details = null) => console.log(data)}
            onFail={(error) => console.error(error)}
            requestUrl={{
                url:
                    'https://cors-anywhere.herokuapp.com/https://maps.googleapis.com/maps/api',
                useOnPlatform: 'web',
            }} // this in only required for use on the web. See https://git.io/JflFv more for details.
        />

    );
};

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         padding: 10,
//         paddingTop: Constants.statusBarHeight + 10,
//         backgroundColor: '#ecf0f1',
//         height: '100%',
//     },
// });

export default GooglePlacesInput;