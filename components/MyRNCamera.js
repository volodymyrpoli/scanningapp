'use strict';
import React, {PureComponent} from 'react';
import {StyleSheet, TouchableOpacity, Text, View } from 'react-native';
import {RNCamera} from 'react-native-camera';

export default class MyRNCamera extends PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      barcodes: [],
    };

    this.press = () => {
      this.camera.pausePreview();
      this.camera.resumePreview();
    };
  }

  render() {
    return (
      <View
        style={styles.container}
        ref={(ref) => {
          this.view = ref;
        }}>
        <Text style={{color: 'white', minHeight: 80}}>{"Barcodes: \n" + this.state.barcodes.join('\n')}</Text>
        <RNCamera
          ref={(ref) => {
            this.camera = ref;
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.off}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          androidRecordAudioPermissionOptions={{
            title: 'Permission to use audio recording',
            message: 'We need your permission to use your audio',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel',
          }}
          onGoogleVisionBarcodesDetected={(event) => {
            this.setState({
              barcodes: event.barcodes.map(a => a.data),
            })
          }}
          onGoogleVisionBarcodesType={
            RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.ITF
            | RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.CODE_39
            | RNCamera.Constants.GoogleVisionBarcodeDetection.BarcodeType.CODE_128
          }
          doNotSave={true}
          base64={true}
        />
        <View>
          <TouchableOpacity
            style={styles.capture}
            onPress={this.press}
            >
            <Text>
              Reset
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black',
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    width: '100%',
    height: 400,
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20,
  },
});
