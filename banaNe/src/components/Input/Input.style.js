import { Platform, StyleSheet } from 'react-native'

export default StyleSheet.create({
    container:{
        padding:5,
        margin:10,
        backgroundColor:"#c4c4c4",
        borderRadius:5,
        flexDirection:"row",
        alignItems:"center"
    },
    input:{
        flex:1,
        padding: Platform.OS === "android" ? 3 : 5
    },

})