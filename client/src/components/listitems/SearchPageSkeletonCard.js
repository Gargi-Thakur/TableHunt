import { HStack, Center, VStack, Skeleton } from 'native-base'

const SearchPageSkeletonCard = () => {
    return (
        <Center w="100%">
            <HStack w="95%" maxW="400" borderWidth="1" space={4} rounded="md" _dark={{
                borderColor: "coolGray.500"
            }} _light={{
                borderColor: "coolGray.200"
            }} p="2">
                <Skeleton flex="1" h="145" rounded="md" startColor="coolGray.100" />
                <VStack space="2" flex="2">
                    <Skeleton h="6" rounded="full" />
                    <Skeleton.Text />
                    <Skeleton h="7" startColor="green.100" />
                </VStack>
            </HStack>
        </Center>
    )
}

export default SearchPageSkeletonCard