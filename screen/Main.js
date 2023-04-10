import React,{useEffect,useState} from 'react';
import { StyleSheet, Text, View, Image, ScrollView, Dimensions, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { API_URL } from '../config/constancy.js';
import { StatusBar } from 'expo-status-bar';
import Carousel from 'react-native-reanimated-carousel';
import userIcon from '../assets/icon/user.png';

function Main(props){
  const [product,setProduct] = useState([]);
  const [review,setReview] = useState([]);
  useEffect(()=>{
    axios.get(`${API_URL}/product`).then((result)=>{
      setProduct(result.data.product)
    }).catch((error)=>{
      console.error(error)
    })
    axios.get(`${API_URL}/review`).then((result)=>{
      setReview(result.data.review)
    }).catch((error)=>{
      console.error(error)
    })
  },[]);
  return(
    <View style={styles.mainWrap}>
      <StatusBar style="auto" />
      
      <ScrollView>
        <View style={styles.mainContainer}>
            <Carousel 
              width={Dimensions.get('window').width}
              height = {130}
              sliderWidth={Dimensions.get('window').width} 
              itemWidth={Dimensions.get('window').width}
              itemHeight={130}
              autoPlay={true}
              scrollAnimationDuration={1000}
              data={[
                'https://port-0-ejin-onetrip-server-du3j2blg4h8hb4.sel3.cloudtype.app/upload/mainbanner.png',
                'https://port-0-ejin-onetrip-server-du3j2blg4h8hb4.sel3.cloudtype.app/upload/reviewbanner.png'
              ]}
              renderItem={(bannerPic)=>{
                return(
                  <Image source={{uri:`${bannerPic.item}`}} style={styles.bannerImg} resizeMode={'contain'} />
                )
              }}
            />
            <View style={styles.productsWrap}>
              <View style={styles.productsContainer}>
                <Text style={styles.wrapTitle}>원트립 최신 패키지</Text>
                {product && product.map((prod)=>{
                  return(
                    <TouchableOpacity 
                      style={styles.productsBoxWrap}
                      key={prod.id}
                      onPress={()=>{props.navigation.navigate("Trip",{id:prod.id})}}
                    >
                      <View style={styles.productsBox}>
                        <Image source={{uri:`${API_URL}/${prod.imageUrl}`}} style={styles.productsImg} />
                        <View style={styles.productsInfo}>
                          <Text style={styles.tripArea}>{prod.p_area}</Text>
                          <Text style={styles.tripName}>{prod.p_name}</Text>
                          <Text style={styles.tripPrice}>{prod.price} 원</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
              </View>
            </View>
            {review[0] && (
              <>
                <View style={styles.reviewWrap}>
                  <Text style={styles.reviewTitle}> {review[0].r_title}</Text>
                  <Image source={{uri:`${API_URL}/${review[0].r_imageUrl}`}} style={styles.reviewImage} resizeMode={'cover'}/>
                  <View style={styles.reviewContent}>
                    <Text style={styles.reviewText}>{review[0].r_text}</Text>
                    <View style={styles.reviewUser}>
                      <Image source={userIcon} style={styles.reviewIcon} />
                      <Text style={styles.reviewUserName}>{review[0].user_name}</Text>
                    </View>
                  </View>
                </View>
              </>
            )}
        </View>
      </ScrollView>
      
      <View style={styles.gnbWrap}>
        <View style={styles.gnbBtn}>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/149/149423.png'}} style={styles.gnbIcon} />
          <Text style={styles.gnbText}>홈</Text>
        </View>
        <View style={styles.gnbBtn}>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/149/149401.png'}} style={styles.gnbIcon} />
          <Text style={styles.gnbText}>검색</Text>
        </View>
        <View style={styles.gnbBtn}>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/149/149368.png'}} style={styles.gnbIcon} />
          <Text style={styles.gnbText}>리뷰</Text>
        </View>
        <View style={styles.gnbBtn}>
          <Image source={{uri:'https://cdn-icons-png.flaticon.com/512/149/149217.png'}} style={styles.gnbIcon} />
          <Text style={styles.gnbText}>좋아요</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  mainWrap: {
    width:'100%',
    height:'100%',
    alignItems: 'center',
    backgroundColor: '#EEF4F7',
  },
  mainContainer:{
    width:'100%',
    alignItems: 'center',
  },
  wrapTitle:{
    width:'100%',
    fontSize:18,
    fontWeight:600,
    color:'#13608c',
    textAlign:'left',
  },
  bannerImg:{
    width:'100%',
    height:'100%'
  },
  productsWrap:{
    width:'100%',
    alignItems:'center',
    marginTop:15,
  },
  productsContainer:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    backgroundColor:'#fff',
    borderRadius:15,
    padding:20
  },
  productsBoxWrap:{
    width:'47%',
  },
  productsBox:{
    marginTop:15
  },
  productsImg:{
    width:'100%',
    height:130,
    borderRadius:10,
  },
  productsInfo:{
    marginTop:8,
  },
  tripArea:{
    fontSize:14,
    color:'#839DA9'
  },
  tripName:{
    fontSize:16,
    marginTop:3,
  },
  tripPrice:{
    marginTop:3,
    fontSize:15,
    fontWeight:500
  },
  gnbWrap:{
    width:'90%',
    height:70,
    margin:10,
    borderRadius:12,
    flexDirection:'row',
    alignItems:'center',
    backgroundColor:'#fff',
    zIndex:999,
  },
  gnbBtn:{
    width:'25%',
    alignItems:'center',
  },
  gnbIcon:{
    width:20,
    height:20,
    marginBottom:3
  },
  gnbText:{
    textAlign:'center'
  },
  reviewWrap:{
    width:'90%',
    borderRadius:15,
    marginTop:15,
    padding:20,
    backgroundColor:'#fff',
    overflow:'hidden'
  },
  reviewImage:{
    width:'100%',
    height:150,
    overflow:'hidden',
    borderRadius:15,
    marginTop:15
  },
  reviewTitle:{
    fontSize:18,
    fontWeight:600,
    color:'#13608c'
  },
  reviewText:{
    fontSize:15,
    marginTop:8,
  },
  reviewUser:{
    marginTop:8,
    flexDirection:'row',
    alignItems:'center',
  },
  reviewIcon:{
    width:20,
    height:20,
    marginRight:5
  }, 
  reviewUserName:{
    fontSize:14,
    color:'#839DA9'
  },
})

export default Main;