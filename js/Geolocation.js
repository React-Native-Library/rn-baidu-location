import {
  requireNativeComponent,
  NativeModules,
  Platform,
  DeviceEventEmitter
} from 'react-native';

import React, {
  Component,
  PropTypes
} from 'react';


const _module = NativeModules.BaiduGeolocationModule;

const checkStatus = (response) => {
		if (response.status >= 200 && response.status < 300) {
		  console.log(response);
				return response;
		}
		return response.json().then(err => Promise.reject(err));
};

const callApi = ( lng, lat, key) => {
		const url = 'https://api.map.baidu.com/geocoder/v2/?location='+lng+','+lat+'&output=json&pois=1&ak='+key;
		return fetch(url, { method: 'get'} )
			.then((response) => checkStatus(response))
			.then((res) => res.json())
			.catch(err => Promise.reject(err));
};

export default {
  getCurrentPosition(key) {
    if (Platform.OS == 'ios') {
      return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition((position) => {
          try{
		          callApi(position.coords.latitude, position.coords.longitude, key).then((data) => {
		            resolve({province: data.result.addressComponent.province, city: data.result.addressComponent.city, cityCode: data.result.cityCode});
              },err => {
		            console.log(err);
				          reject(err);
              })
          }catch (e) {
		          reject(err);
          }
        }, (error) => {
          reject(error);
        }, {
          enableHighAccuracy: true,
          timeout: 20000,
          maximumAge: 1000
        });
      });
    }
    return new Promise((resolve, reject) => {
      try {
        _module.getCurrentPosition();
      }
      catch (e) {
        reject(e);
        return;
      }
      DeviceEventEmitter.once('onGetCurrentLocationPosition', resp => {
        console.log(resp);
        resolve(resp);
      });
    });
  }
};