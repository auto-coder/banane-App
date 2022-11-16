import {StyleSheet,Dimensions} from 'react-native';


const deviceSize=Dimensions.get('window')

export default StyleSheet.create({
  container: {
    backgroundColor:'white',
    padding:20,
marginHorizontal:10,
    borderTopLeftRadius:20,
    borderTopRightRadius:20,
    height:deviceSize.height / 3
  },
  modal:{
    justifyContent:'flex-end',
    margin:0
  },
  input_container:{
    flex:1
  }
});
