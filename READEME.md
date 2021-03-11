## live-server
RTSP 直播服务

*浏览器中播放效果*
![image](image.jpg)

### 使用到的相关组件及库
* [express](https://www.expressjs.com.cn/) nodejs web 开发框架
* [axios](http://www.axios-js.com/zh-cn/docs) HTTP 库
* [fluent-ffmpeg](https://github.com/fluent-ffmpeg/node-fluent-ffmpeg) FFMPEG api for nodejs
* [flv.js](https://github.com/bilibili/flv.js) HTML5 FLV Player

### 使用 websocket 播放直播的方法
1. 引用 `flv.js`
```html
<video id="video" autoplay></video>
<script src="libs/flv.js"></script>
```
2. 创建播放器
```html
<script>
        if (flvjs.isSupported()) {
                var video = document.getElementsById('video');
                var flvPlayer = flvjs.createPlayer({
                    type: 'flv',
                    isLive: true,
                    url: `ws://192.168.50.88:3000/lives`
                });
                flvPlayer.attachMediaElement(video);
                flvPlayer.load();
                flvPlayer.play();
            }
        }
    </script>
```