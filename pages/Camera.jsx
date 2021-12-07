import * as React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Modal, Image } from 'react-native';
import Constants from 'expo-constants';
import {Camera} from 'expo-camera';
import Ionicons from 'react-native-vector-icons/Ionicons';
import * as Permissions from 'expo-permissions';
import * as MediaLibrary from 'expo-media-library';
import storageConfig from '../database/firebase';
import firebase from 'firebase';
export default function CameraScreen({navigation}) {
  
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [hasPermission,setHasPermission] = useState(null);
  const [photo,setPhoto] = useState(null);
  const [open, setOpen] = useState(null);
  const camRef= useRef(null);

  const [fecha, setFecha] = useState(null);
  
  useEffect(()=>{
    (async ()=>{
      const {status} = await Camera.requestCameraPermissionsAsync();
      setHasPermission(status==='granted');
    })();
     (async ()=>{
      const {status} = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      setHasPermission(status==='granted');
    })();
  },[])

  if(hasPermission===null){
    return <View />
  }else if(hasPermission===false){
    console.log("Permission Denied");
  }

  async function takePicture(){
    if(camRef.current){
      try{
      const data = await camRef.current.takePictureAsync();
      setPhoto(data.uri);
      setOpen(true);
    }catch(error){
      console.log(error)
    }
    }
  }

  async function savePicture(){
    const asset = await MediaLibrary.createAssetAsync(photo)
    .then(()=>{
      alert('Picture saved')
    })
    .catch(error=>{
      console.log('err', error);
    })
  }

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

   function deleteFile(pathToFile, fileName) {
      const ref = firebase.storage().ref(pathToFile);
      const childRef = ref.child(fileName);
      childRef.delete()
    }
   function   deleteFolderContents(path) {
      const ref = firebase.storage().ref(path);
      ref.listAll()
      .then(dir => {
      dir.items.forEach(fileRef => {
      deleteFile(ref.fullPath, fileRef.name);
    });
      dir.prefixes.forEach(folderRef => {
      deleteFolderContents(folderRef.fullPath);
    })
  })
      .catch(error => {
        console.log(error);
      });
  }

  return (
    <SafeAreaView style={styles.container}>
      <Camera 
      style={{felx: 1}}
      type={type}
      ref={camRef}
      >
        <TouchableOpacity style={[styles.btnApp,{left:20}]} onPress={()=>{
          setType(type===Camera.Constants.Type.front ? 
          Camera.Constants.Type.back:Camera.Constants.Type.front);
        }}>
          <Ionicons name="camera-reverse" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnApp,{right:130}]} onPress={()=>{takePicture()}} >
          <Ionicons name="aperture" size={30} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={[styles.btnApp,{right:20}]} onPress={()=>{ navigation.navigate('Profile') }} >
          <Ionicons name="close" size={30} color="white" />
        </TouchableOpacity>


        {
          photo && 
          <Modal
            animationType= 'slide'
            transparent={false}
            visible={open}
          >
          <View style={{flex:1, justifyContent:'center', alignItems:'center', margin:10}}>

          <TouchableOpacity style={[styles.btnApp,{left:20}]} onPress={()=>{setOpen(false)}}>
            <Ionicons name='close-circle' size={30} color='white' />
          </TouchableOpacity>


          <TouchableOpacity style={[styles.btnApp,{right:130}]} 
          onPress={()=>{
            uploadPicture(photo)
            .then( resolve => {
              let ref = firebase
              .storage()
              .ref()
              .child(`images/profile_pick_${localStorage.getItem('user')}`)

              ref.put(resolve)
              .then( resolve => {
                alert('Image saved correctly');
                setOpen(false)
                navigation.navigate('Profile');
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
          >
            <Ionicons name='save' size={30} color='white' />
          </TouchableOpacity>
            <Image 
              style={styles.photo}
              source={{uri: photo}}
            />
          </View>
          </Modal>
        }
      </Camera>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  photo:{
    width: '80%',
    height: '70%'
  },
  btnApp: {
    position: 'absolute',
    bottom:20,
    backgroundColor: 'black',
    borderRadius:15,
    width:50,
    justifyContent: 'center',
    alignItems: 'center',
    border: 1
  }
});