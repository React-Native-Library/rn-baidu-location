#前言
这个RN类库，主要用于Android和IOS平台的定位使用，由于Android默认定位国内手机被墙掉，无法使用H5以及默认功能，但是IOS平台无限制，目前没有发现一个比较好的框架库，对此简单封装一下，用于使用。

#原理
Android平台采用百度定位，IOS平台采用H5 navigator定位，这样IOS平台我们就不需要引入额外的类库，减少了开发中不必要的重新配置。

#安装

npm install rn-baidu-location --save

#Android平台配置

1. ```java
private final ReactNativeHost mReactNativeHost = new ReactNativeHost(this) {
    @Override
    public boolean getUseDeveloperSupport() {
      return BuildConfig.DEBUG;
    }

    @Override
    protected List<ReactPackage> getPackages() {
      return Arrays.<ReactPackage>asList(
          new MainReactPackage(),
            new WebImagePackage(),
            new VectorIconsPackage(),
              new BaiduMapPackage(getApplicationContext())   //引入package
              );
    }
  };
  ```
  
  2. 配置settings.gradle
  
  ```javascript
  
include ':rn-baidu-location'
project(':rn-baidu-location').projectDir = new File(rootProject.projectDir, '../node_modules/rn-baidu-location/android')
  
  ```
  
  3. 配置app/build.gradle
  
  ```javascript
  dependencies {
  ...
  compile project(':rn-baidu-location')
  ...
  }
  
  ```
  
  4. 替换百度地图key
  
  ```java
  <meta-data
            android:name="com.baidu.lbsapi.API_KEY"
            android:value="your key" />
  
  ```
  
  5. 使用
  
 ```javascript
 Geolocation.getCurrentPosition('your baidu web service api key')
					.then(data => {
							//alert(JSON.stringify(data));
					})
					.catch(e =>{
							//alert('err');
					})
 ```
 
 这里我们需要传入百度web服务api key， 因为我们需要根据经纬度获取当前地址信息。
 
 
