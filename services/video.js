const ffmpeg = require("fluent-ffmpeg");
const webSocketStream = require("websocket-stream/stream");
const logger = require('./logger')
const request = require('./request');

/**
 * 启动 ffmpeg 进程
 * @param {*} ws 
 * @param {*} url 
 */
function start_ffmpeg(ws, url) {
    const stream = webSocketStream(ws, {
        binary: true,
        browserBufferTimeout: 1000000
    }, {
        browserBufferTimeout: 1000000
    });
    ffmpeg(url)
        .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
        .on("start", function () {
            logger.debug(url, "Stream started.");
        })
        .on("codecData", function () {
            logger.debug(url, "Stream codecData.")
            // 摄像机在线处理
        })
        .on("error", function (err) {
            logger.error(url, "An error occured: ", err.message);
        })
        .on("end", function () {
            logger.debug(url, "Stream end!");
            // 摄像机断线的处理
        })
        // .outputOption('-c:v libx264')
        .videoCodec('copy')
        // .outputOption("-vsync 2")
        .outputFormat("flv")
        .noAudio()
        .pipe(stream)
}

/**
 * 直播
 * @param {*}} ws 
 * @param {*} req 
 * @param {*} next 
 */
function liveHandler(ws, req, next) {
    logger.debug("live request handle");
    logger.debug(req.params)

    const { organization_code, place_code, monitor_id } = req.params;

    request.get_rtsp_url(organization_code, place_code, monitor_id)
        .then(url => {
            start_ffmpeg(ws, url)
        })
        .catch(err => {
            logger.error(err);
        });
}

/**
 * 回放
 * @param {*} ws 
 * @param {*} req 
 * @param {*} next 
 */
function replayHandler(ws, req, next) {
    logger.debug("replay request handle");
    logger.debug(req.params)

    const { organization_code, place_code, monitor_id } = req.params;
    const { start_time, end_time } = req.query;

    request.get_rtsp_replay_url(organization_code, place_code, monitor_id, start_time, end_time)
        .then(response => {
            
        })
        .catch(err => {
            logger.error(err);
        });
}

module.exports = {
    liveHandler,
    replayHandler
};