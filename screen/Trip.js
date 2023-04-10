import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/constancy.js';

function Trip(props){
  const {id} = props.route.params;
  const [trip,setTrip] = useState(null);

  useEffect(()=>{
    axios.get(`${API_URL}/products/${id}`).then((result)=>{
      setTrip(result.data.product);
    }).catch((error)=>{
      console.error(error)
    })
  },[]);

  if(!trip){
    return <ActivityIndicator />
  }

  return(
    <View style={styles.tripInfoWrap}>
      {console.log('Trip',trip)}
      <ScrollView>
        <Image source={{uri:`${API_URL}/${trip.imageUrl}`}} style={styles.tripImg} resizeMode='cover' />
        <View style={styles.tripInfoCont}>
          <View style={styles.tripInfoBox}>
            <View style={styles.tripTag}>
              <Text style={styles.tripWhere}>{trip.p_country}</Text>
              <Text style={styles.tripTheme}>{trip.theme}</Text>
            </View>
            <Text style={styles.tripName}>{trip.p_name}</Text>
            <Text style={styles.tripCount}>잔여 수량 {trip.count}</Text>
            <View style={styles.tripArrive}>
              <Text>출발</Text>
              <Text>여행 시작 {trip.p_sdate}</Text>
              <Text>{trip.start}</Text>
              <Text>{trip.trans}</Text>
            </View>
            <View style={styles.tripArrive}>
              <Text>{trip.p_edate}</Text>
              <Text>{trip.end}</Text>
              <Text>{trip.retrans}</Text>
            </View>
          </View>
          <Text>{trip.end}</Text>
          <Text>{trip.departure}</Text>
          <Text>{trip.hotel}</Text>
          <Text>{trip.p_area}</Text>
          <Text>{trip.p_country}</Text>
          <Text>{trip.price}</Text>
          <Text>{trip.redeparture}</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  tripInfoWrap:{
    width:'100%',
    height:'100%',
    backgroundColor:'#fff'
  },
  tripInfoCont:{
    width:'100%',
    height:'100%',
    alignItems:'center',
  },
  tripInfoBox:{
    width:'90%',
    paddingVertical:15,
  },
  tripImg:{
    widht:100,
    height:300
  },
  tripTag:{
    flexDirection:'row',
    marginBottom:10,
  },
  tripWhere:{
    paddingVertical:3,
    paddingHorizontal:10,
    color:'#13608c',
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#13608c',
    borderRadius:15,
    marginRight:10,
  },
  tripTheme:{
    borderStyle:'solid',
    borderWidth:1,
    borderColor:'#fff',
    paddingVertical:3,
    paddingHorizontal:10,
    color:'#13608c',
    borderRadius:15,
    backgroundColor:'#f1f6f9'
  },
  tripName:{
    fontSize:21,
    fontWeight:600,
    marginBottom:4,
  },
  tripCount:{
    marginBottom:15,
    color:'#666'
  },
  
})

export default Trip;