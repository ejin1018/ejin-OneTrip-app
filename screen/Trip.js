import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, TouchableOpacity, ActivityIndicator, Alert } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/constancy.js';
import dayjs from 'dayjs';
import Plane from '../assets/icon/black-plane.png';

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

  const pressPurchase = ()=>{
    Alert.alert('구매가 완료되었습니다')
  }

  return(
    <View style={styles.tripInfoWrap}>
      <ScrollView>
        <Image source={{uri:`${API_URL}/${trip.imageUrl}`}} style={styles.tripImg} resizeMode='cover' />
        <View style={styles.tripInfoCont}>
          <View style={styles.tripInfoBox}>
            <View style={styles.tripTag}>
              <Text style={styles.tripWhere}>{trip.p_country} | {trip.p_area}</Text>
              <Text style={styles.tripTheme}>{trip.theme}</Text>
            </View>
            <Text style={styles.tripName}>{trip.p_name} - {trip.hotel}</Text>
            <Text style={styles.tripCount}>잔여 수량 {trip.count}</Text>
            <View style={styles.tripGoingBox}>
              <View style={styles.tripGoing}>
                <Text style={styles.goingTitle}>{trip.start}에서 출발</Text>
                <Text style={styles.goingDate}>{dayjs(trip.p_sdate).format("M월 DD일 A hh:mm")}</Text>
                <Text style={styles.goingAt}>{trip.departure}</Text>
              </View>
              <View style={styles.tripPlane}>
                <Image source={Plane} style={styles.tripIcon} resizeMode='cover' />
                <Text style={styles.goingWhat}>{trip.retrans}</Text>
              </View>
              <View style={styles.tripGoing}>
                <Text style={styles.goingTitle}>{trip.end} 도착</Text>
                <Text style={styles.goingDate}>{dayjs(trip.p_edate).format("M월 DD일 A hh:mm")}</Text>
                <Text style={styles.goingAt}>{trip.redeparture}</Text>
              </View>
            </View>
          </View>
          <View style={styles.tripPriceBox}>
            <Text style={styles.tripPriceText}>가격</Text>
            <Text style={styles.tripPrice}>{trip.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} 원</Text>
          </View>
        </View>
      </ScrollView>
      {trip.soldout === 1?
        <View style={styles.tripPurchase}>
          <Text style={styles.tripSoldoutBtn}>예약마감</Text>
        </View>
      :
        <TouchableOpacity onPress={pressPurchase}>
          <View style={styles.tripPurchase}>
            <Text style={styles.tripPurchaseBtn}>구매하기</Text>
          </View>
        </TouchableOpacity>
      }
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
    height:310
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
    backgroundColor:'#f1f6f9',
  },
  tripName:{
    fontSize:21,
    fontWeight:600,
    marginBottom:4,
  },
  tripCount:{
    marginBottom:20,
    color:'#666'
  },
  tripGoingBox:{
    flexDirection:'row',
    justifyContent:'space-between',
    alignItems:'center'
  },
  tripPlane:{
    alignItems:'center'
  },
  tripIcon:{
    width:20,
    height:20,
  },
  goingWhat:{
    marginTop:8,
    fontSize:13,
    color:'#13608c'
  },
  tripGoing:{
    padding:15,
    borderRadius:15,
    backgroundColor:'#f1f6f9'
  },
  goingTitle:{
    color:'#13608c',
    fontSize:15,
    fontWeight:600,
    marginBottom:3
  },
  goingDate:{
    fontSize:15,
    marginBottom:3,
  },
  goingAt:{
    marginBottom:3,
  },
  tripPriceBox:{
    width:'90%',
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  tripPriceText:{
    fontSize:15,
    marginRight:15
  },
  tripPrice:{
    fontSize:21,
    fontWeight:600,
  },
  tripPurchase:{
    width:'100%',
    backgroundColor:'#eee',
    alignItems:'center'
  },
  tripPurchaseBtn:{
    width:'100%',
    lineHeight:55,
    backgroundColor:'#13608c',
    color:'#fff',
    fontSize:17,
    fontWeight:600,
    textAlign:'center'
  },
  tripSoldoutBtn:{
    width:'100%',
    lineHeight:55,
    backgroundColor:'#aaa',
    color:'#fff',
    fontSize:17,
    fontWeight:600,
    textAlign:'center',
  }
})

export default Trip;