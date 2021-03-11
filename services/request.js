// const https = require("https");
const axios = require('axios');
const logger = require('./logger')

var request = {};

request.get_rtsp_url = async (organization_code, place_code) => {
    const response = await axios({
        url: "http://10.9.1.205:16000/api/get_rtsp_api/",
        method: "post",
        data: {
            organization_code,
            place_code
        }
    });

    // return response;
    return {
        status: 200,
        data: [{
            "monitor_id": 2456,
            "monitor_name": "富阳学院（大青）--",
            "unit_organization_code": null,
            "rtsp_url": "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
            "rtmp_url": "rtmp://58.200.131.2:1935/livetv/hunantv",
            "is_online": false
        },{
            "monitor_id": 2457,
            "monitor_name": "富阳学院（大青）--",
            "unit_organization_code": null,
            "rtsp_url": "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
            "rtmp_url": "rtmp://58.200.131.2:1935/livetv/hunantv",
            "is_online": false
        },{
            "monitor_id": 2458,
            "monitor_name": "富阳学院（大青）--",
            "unit_organization_code": null,
            "rtsp_url": "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
            "rtmp_url": "rtmp://58.200.131.2:1935/livetv/hunantv",
            "is_online": false
        },{
            "monitor_id": 2459,
            "monitor_name": "富阳学院（大青）--",
            "unit_organization_code": null,
            "rtsp_url": "rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mov",
            "rtmp_url": "rtmp://58.200.131.2:1935/livetv/hunantv",
            "is_online": false
        },]
    };
}

module.exports = request;