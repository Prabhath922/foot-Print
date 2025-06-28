import { Camera, CameraCapturedPicture } from 'expo-camera';
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';

export default function CameraSearch() {
  const [hasPermission, setPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null);
//   const cameraRef = useRef<Camera>(null);
  const [cameraType, setCameraType] = useState<'back' | 'front'>('back');

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setPermission(status === 'granted');
    })();
  }, []);

//   const takePicture = async () => {
//     if (cameraRef.current) {
//       const picture: CameraCapturedPicture = await cameraRef.current.takePictureAsync();
//       setPhoto(picture.uri);
//     }
//   };

  const toggleCameraType = () => {
    setCameraType(current => current === 'back' ? 'front' : 'back');
  };

  if (hasPermission === null) {
    return (
      <View style={styles.container}>
        <Text>Requesting Camera Permission...</Text>
      </View>
    );
  }

  if (hasPermission === false) {
    return (
      <View style={styles.container}>
        <Text>Camera permission not granted. Please enable in settings.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {!photo ? (
        <>
          {/* <Camera 
            style={styles.camera} 
            ref={cameraRef}
            type={cameraType}
          /> */}
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Take Picture</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.flipButton} onPress={toggleCameraType}>
              <Text style={styles.buttonText}>Flip Camera</Text>
            </TouchableOpacity>
          </View>
        </>
      ) : (
        <>
          <Image source={{ uri: photo }} style={styles.preview} />
          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.button} onPress={() => setPhoto(null)}>
              <Text style={styles.buttonText}>Retake</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  camera: {
    flex: 1,
  },
  preview: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    padding: 20,
  },
  button: {
    backgroundColor: '#333',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  flipButton: {
    backgroundColor: '#555',
    padding: 15,
    borderRadius: 10,
    marginHorizontal: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
});