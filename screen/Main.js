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
  const [runItem,setRun] = useState([]);

  useEffect(()=>{
    axios.get(`${API_URL}/product`).then((result)=>{
      setProduct(result.data.product)
    }).catch((error)=>{
      console.error(error)
    })
    axios.get(`${API_URL}/reviews`).then((result)=>{
      setReview(result.data.review)
    }).catch((error)=>{
      console.error(error)
    })
    axios.get(`${API_URL}/productdate`).then((result)=>{
      setRun(result.data.product);
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
                        {prod.soldout == 1 && <View style={styles.soldoutBox}><Text style={styles.soldoutText}>예약마감</Text></View>}
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
                  <Image source={{uri:`${API_URL}/${review[0].r_imageUrl}`}} style={styles.reviewImage} resizeMode={'cover'}/>
                  <View style={styles.reviewContent}>
                    <Text style={styles.reviewTitle}>{review[0].r_title}</Text>
                    <View style={styles.reviewUser}>
                      <Image source={userIcon} style={styles.reviewIcon} />
                      <Text style={styles.reviewUserName}>{review[0].user_name}</Text>
                    </View>
                    <Text style={styles.reviewText}>{review[0].r_text}</Text>
                  </View>
                </View>
              </>
            )}
            <View style={styles.runWrap}>
              <Text style={styles.wrapTitle}>마감 임박 여행</Text>
                {runItem && runItem.map((runs)=>{
                  return(
                    <TouchableOpacity
                      key={runs.id}
                      onPress={()=>{props.navigation.navigate("Trip",{id:runs.id})}}
                    >
                      <View style={styles.runBox}>
                        <Image source={{uri:`${API_URL}/${runs.imageUrl}`}} style={styles.runImage} resizeMode={'cover'}/>
                        <View style={styles.runTextBox}>
                          <Text style={styles.runCount}>잔여 수량 &#91; {runs.count} &#93;</Text>
                          <Text style={styles.runTitle}>{runs.p_name}</Text>
                        </View>
                      </View>
                    </TouchableOpacity>
                  )
                })}
            </View>
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
    backgroundColor: '#fff',
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
    marginTop:35,
  },
  productsContainer:{
    width:'90%',
    flexDirection:'row',
    justifyContent:'space-between',
    flexWrap:'wrap',
    backgroundColor:'#fff',
  },
  productsBoxWrap:{
    width:'47%',
  },
  soldoutBox:{
    position:'absolute',
    top:0,
    left:0,
    width:'100%',
    height:'100%',
    backgroundColor:'#ffffffaa',
    zIndex:999,
  },
  soldoutText:{
    width:'100%',
    height:130,
    lineHeight:130,
    textAlign:'center',
    fontSize:16,
    fontWeight:900,
    color:'#dd1e1e'
  },
  productsBox:{
    marginTop:15,
    position:'relative'
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
    height:55,
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
    width:'100%',
    marginTop:35,
    overflow:'hidden',
  },
  reviewTitle:{
    fontSize:18,
    fontWeight:600,
    color:'#13608c',
  },
  reviewImage:{
    width:'100%',
    height:180,
    overflow:'hidden',
    marginTop:15,
    marginBottom:10,
    position:'relative'
  },
  reviewContent:{
    width:'60%',
    position:'absolute',
    right:10,
    bottom:-5,
    backgroundColor:'#fff',
    borderRadius:15,
    padding:20,
  },
  reviewTitle:{
    fontSize:18,
    fontWeight:600,
    color:'#13608c',
    paddingTop:10,
    borderTopWidth:1,
    borderTopColor:'#13608c',
    borderStyle:'dashed',
  },
  reviewText:{
    fontSize:14,
    marginTop:12,
    paddingBottom:10,
    borderBottomWidth:1,
    borderBottomColor:'#13608c',
    borderStyle:'dashed',
  },
  reviewUser:{
    marginTop:6,
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'flex-end'
  },
  reviewIcon:{
    width:15,
    height:15,
    marginRight:5
  }, 
  reviewUserName:{
    fontSize:14,
    color:'#839DA9'
  },
  runWrap:{
    width:'90%',
    marginTop:35,
  },
  runBox:{
    height:120,
    position:'relative',
    borderRadius:15,
    overflow:'hidden',
    marginTop:15
  },
  runImage:{
    width:'100%',
    height:120,
    position:'absolute',
    top:0,
    left:0
  },
  runTextBox:{
    position:'absolute',
    bottom:5,
    right:5,
    paddingVertical:10,
    paddingHorizontal:20,
    borderRadius:30,
    backgroundColor:'#ffffffe6'
  },
  runTitle:{
    fontSize:18,
    fontWeight:600,
    color:'#13608c',
  },
  runCount:{
    fontSize:14,
    fontWeight:600,
    color:'#13608c',
    textAlign:'right',
    marginBottom:3
  },
})

export default Main;