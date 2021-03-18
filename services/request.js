// const https = require("https");
const axios = require('axios');
const { urlencoded } = require('express');
const logger = require('./logger')

var request = {};

request.get_rtsp_url = async (organization_code, place_code, monitor_id) => {
    const response = await axios({
        url: "http://10.9.1.205:16000/api/get_rtsp_api/",
        method: "post",
        timeout: 30 * 1000,
        data: {
            organization_code,
            place_code
        }
    });

    // const response = {
    //     status: 200,
    //     data: [
    //         {
    //             "monitor_id": 2569,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_4?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_4?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2570,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_2?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_2?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2571,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_1?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_1?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2572,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_3?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_3?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         }
    //     ]
    // };
    const { status, data } = response;
    if (status === 200) {
        var items = data.filter(i => i.monitor_id == monitor_id);
        if (items.length > 0) {
            var item = items[0];
            var url = item.rtsp_url
            logger.info("url: " + url);
            return url;
        }
    }

    throw Error(`请求错误 ${status}`)
}

request.get_rtsp_replay_url = async (organization_code, place_code, monitor_id, start_time, end_time) => {
    const response = await axios({
        url: "http://10.9.1.205:16000/api/get_rtsp_replay_api/",
        method: "post",
        timeout: 30 * 1000,
        data: {
            organization_code,
            place_code,
            start_time,
            end_time
        }
    });
    // const response = {
    //     status: 200,
    //     data: [
    //         {
    //             "monitor_id": 2569,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_4_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_4_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2570,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_2_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_2_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2571,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_1_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_1_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         },
    //         {
    //             "monitor_id": 2572,
    //             "monitor_name": "博赞教育--文教路--",
    //             "unit_organization_code": "5392",
    //             "rtsp_url": "rtsp://10.9.1.205:20554/monitor/112.17.144.9_554_3_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "rtmp_url": "rtmp://10.9.1.205:21935/monitor/112.17.144.9_554_3_replay?vhost=__defaultVhost__&secret=035c73f7-bb6b-4889-a715-d9eb2d1925cc",
    //             "is_online": true
    //         }
    //     ]
    // };
    const { status, data } = response;
    if (status === 200) {
        var items = data.filter(i => i.monitor_id == monitor_id);
        if (items.length > 0) {
            var item = items[0];
            var url = item.rtsp_url
            logger.info("url: " + url);
            return url;
        }
    }

    throw Error(`请求错误 ${status}`)
}

/**
 * 获取海康摄像头直播地址
 * @param {string} cameraId 
 */
request.get_hik_live_url = async (cameraId) => {
    const response = await axios.get(`http://localhost:6012/api/Hik/GetLive/${cameraId}/live`);
    const { status, data } = response;
    if (status === 200) {
        const { errorCode, message } = data;
        if (errorCode === 0) {
            return data.data;
        }
        throw Error(`请求错误 ${message}`)
    }

    throw Error(`请求错误 ${status}`)
}

/**
 * 获取海康摄像头回放地址
 * @param {string} cameraId 
 * @param {string} beginTime 
 * @param {string} endTime 
 */
request.get_hik_replay_url = async (cameraId, beginTime, endTime) => {
    const response = await axios.get(`http://localhost:6012/api/Hik/GetReplay/${cameraId}/replay?beginTime=${beginTime}&endTime=${endTime}`);
    const { status, data } = response;
    if (status === 200) {
        const { errorCode, message } = data;
        if (errorCode === 0) {
            return data.data;
        }
        throw Error(`请求错误 ${message}`)
    }

    throw Error(`请求错误 ${status}`)
}

module.exports = request;