import React, { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import BookingCard from '../listitems/BookingCard'
import { Heading, Center, Text, HStack, ScrollView, VStack, Spinner } from "native-base"
import { REACT_APP_SERVER } from 'react-native-dotenv'
import { LoginContext } from '../context/LoginContext'

const ReservationsScreenContainer = ({ navigation, data }) => {
    const [accessToken, setAccessToken, userInfo, setUserInfo, userToken, setUserToken, userId, setUserId] = useContext(LoginContext)
    const [bookings, setBookings] = useState()
    const [isLoaded, setIsLoaded] = useState(false)

    const getAllReservations = () => {
        axios.get(`http://tablehunt.herokuapp.com/api/v1/reservations/list?userId=${userId}`,
            {
                headers: { 'Authorization': userToken }
            })
            .then(res => {
                if (res.data.status == 'AUTH FAILED') {
                    logoutUser()
                } else {
                    setBookings(res.data.data);
                    setIsLoaded(true)
                }
            })
            .catch(err => console.log("error in fetching reservations", err))
    }

    useEffect(() => {
        navigation.addListener('focus', () => {
            setIsLoaded(false);
            getAllReservations();
        });
    }, [navigation])

    return (
        <VStack bgColor="white" height="100%" >
            <Heading size="xl" mt="20" ml="6" color="danger.300" bold>
                Your Reservations
            </Heading>
            <Text fontSize={20} fontWeight="bold" color="gray.500" ml="6" mt="5" mb={2}>Upcoming</Text>

            {isLoaded ?
                <ScrollView vertical={true} w={380}
                    showsVerticalScrollIndicator={false}>
                    <VStack space={2} mb={4}>
                        {bookings.length > 0
                            ? bookings.sort((a, b) => a.time - b.time).map((el, index) => (
                                <BookingCard data={el} key={index} />
                            ))
                            : <Center fontSize={14} mt={250}>No Reservations</Center>}
                    </VStack>
                </ScrollView>
                :
                <HStack space={2} justifyContent="center">
                    <Spinner color="danger.300" accessibilityLabel="Loading cards" />
                    <Heading color="danger.300" fontSize="md">
                        Refreshing
                    </Heading>
                </HStack>
            }
        </VStack >
    );
};

export default ReservationsScreenContainer;
