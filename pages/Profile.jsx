import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Text,
  ScrollView,
  View, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  Button, 
  Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Modal from "react-native-modal";
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from '../database/firebase';

export function ProfileScreen ({navigation}){
  const [data, setData] = useState([]);
  const [imageState, setImageState]= useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalPic, setModalPic] = useState(false);
  const [modalPreview, setModalPreview]= useState(false);
  const camRef= useRef(null);
  const profile_pic='https://firebasestorage.googleapis.com/v0/b/galleryapp-dfaf7.appspot.com/o/';
  const profile_pict = `https://firebasestorage.googleapis.com/v0/b/etdmiu2.appspot.com/o/images%2Fprofile_pick_${localStorage.getItem('user')}?alt=media&&id=${Math.random()}`
  let [image, setImage] = useState(null);  
  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
      setModalPic(true);
      uploadPicture(result.uri);
    }
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const pictureModal = () => {
    setModalPic(!modalPic);
  };

  const previewModal = () =>{
    setModalPreview(!modalPreview);
  } 

  const getData = async () =>{
    const photos = [];
    const refJson = await fetch(profile_pic, {method:'GET'});
    const pictures = await refJson.json();
    for(let i in pictures['items']){
      photos.push({
        name: pictures['items'][i]['name'],
      });
    }
    // console.log(pictures);
    console.log(imageState);
    setData(photos);
  }

  useEffect(() =>{
    getData();
  },[imageState]);

   const uploadPicture = (uri) =>{
    return new Promise((resolve, reject) =>{
      let xhr = new XMLHttpRequest();
      xhr.onerror = reject;
      xhr.onreadystatechange = () =>{
        if(xhr.readyState===4){
          resolve(xhr.response);
        }
      }
      xhr.open('GET', uri);
      xhr.responseType = 'blob';
      xhr.send();
    })
  }

return(
    <View style={styles.container}>
    <TouchableOpacity onPress={toggleModal} >
      {
        data.map(picture =>{
          const pic = picture.name.split('/')[1];
          return(
            <View style={{width:150, height:150}}>
              <Image
                style={styles.picture}
                source={{uri: profile_pict}}
               />
              
            </View>
          );
        })
      }
       <Ionicons name="camera" style={{position:'absolute', bottom:0, left:10, backgroundColor:'white',borderRadius:'100%'}} size={35} color="black"/>
      </TouchableOpacity>
{
  // modal de botones
}
      <View style={{ flex: 1 }}>
      <Modal isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
        style={{width:50}}
      >
        <View style={{ flex: 1 }}>
          <TouchableOpacity title="Take Picture" 
          onPress={()=>{navigation.navigate('Camera'),
          setModalVisible(false)}} 
          style={styles.button}
          >
          <Ionicons name="camera" size={30} color="black"/>
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
            <Ionicons name="images" size={30} color="black" onPress={()=>{pickImage()}} />
          </TouchableOpacity>

          <TouchableOpacity onPress={()=>{}} style={styles.button}>
            <Ionicons name="eye" size={30} color="black" onPress={()=>{setModalPreview(true)}} />
          </TouchableOpacity>


        </View>
      </Modal>
 {
  //  modal de imagen
 }
      <View style={{ flex: 1 }}>
      <Modal isVisible={modalPic}
      onBackdropPress={() => setModalPic(false)}
      >
        <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
          {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />}

          <TouchableOpacity style={styles.button} title="Hide modal" onPress={()=>setModalPic(false)}>
            <Ionicons name="save" size={30} color="black"
              onPress={()=>{
            uploadPicture(image)
            .then( resolve => {
              let ref = firebase
              .storage()
              .ref()
              .child(`images/profile_pick_${localStorage.getItem('user')}`)

              ref.put(resolve)
              .then( resolve => {
                alert('Image saved correctly');
                console.log("aqui",resolve);
                setModalPic(false);
              })
              .catch(error=>{
                alert('Image saved failed')
                console.log('err', error);
            });
            })
            .catch(error=>{
                console.log('err', error);
            });
          }}
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={()=>{}} style={styles.button}>
            <Ionicons name="close" size={30} color="black" onPress={()=>{setModalPic(false)}} />
          </TouchableOpacity>
          
        </View>
      </Modal>
    </View>


    {
      //modal see profile Picture
    }

    <View style={{ flex: 1 }}>
      <Modal isVisible={modalPreview}
      onBackdropPress={() => setModalPreview(false)}
      >
        <View style={{ flex: 1,alignItems:'center',justifyContent:'center' }}>
          <Image  source={{ uri: profile_pict}} style={{ width: 200, height: 200 }} />
          <TouchableOpacity onPress={()=>{}} style={styles.button}>
            <Ionicons name="close" size={30} color="black" onPress={()=>{setModalPreview(false)}} />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>

    </View>
<TouchableOpacity onPress={event => {localStorage.removeItem('user');navigation.navigate('Login')}}>
            <Ionicons name="log-out" size={30} color="red"  />
          </TouchableOpacity>
    </View>
    
  );
  
}
const styles = StyleSheet.create({
  container:{
    flex:1,
    alignItems:'center',
  },
  picture: {
    flex: 1,
    borderRadius: '100%',
    margin: 5,
  },
  button: {
    width: 50,
    height:50,
    marginTop: 20,
    backgroundColor: "#2196F3",
    padding: 15,
    borderRadius: 50,
    justifyContent:'center',
    alignItems:'center'
  },
});