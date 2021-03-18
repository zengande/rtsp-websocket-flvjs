const ffmpeg = require("fluent-ffmpeg");
const webSocketStream = require("websocket-stream/stream");
const logger = require('./logger')
const request = require('./request');

/**
 * 启动 ffmpeg 进程
 * @param {*} ws 
 * @param {*} url 
 */
function start_ffmpeg(ws, url, useH264 = false) {
    const stream = webSocketStream(ws, {
        binary: true,
        browserBufferTimeout: 1000000
    }, {
        browserBufferTimeout: 1000000
    });
    var command = ffmpeg(url)
        .addInputOption("-rtsp_transport", "tcp", "-buffer_size", "102400")  // 这里可以添加一些 RTSP 优化的参数
        .on("start", function () {
            logger.debug(url, "Stream started.");
        })
        .on("codecData", function () {
            logger.debug(url, "Stream codecData.")
            // 摄像机在线处理
        })
        .on("error", function (err, stdout, stderr) {
            logger.error(url, "An error occured: ", err.message);
            logger.error(url, "stdout: ", stdout);
            logger.error(url, "stderr: ", stderr);
        })
        .on("end", function () {
            logger.debug(url, "Stream end!");
            // 摄像机断线的处理
        });

    if (useH264) {
        command.format('flv')
            .flvmeta()
            .size('720x?')
            .videoBitrate('256k')
            .videoCodec('libx264')
            .fps(10);
    } else {
        command.videoCodec('copy')
            .outputFormat("flv");
    }

    command
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
            logger.error("发生错误");
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
        .then(url => {
            start_ffmpeg(ws, url);
        })
        .catch(err => {
            logger.error("发生错误");
        });
}

function hikLiveHandler(ws, req, next) {
    logger.debug("hik live request handle");
    const { cameraId } = req.params;

    request.get_hik_live_url(cameraId)
        .then(url => {
            start_ffmpeg(ws, url)
        }).catch(err => {
            logger.error("发生错误: ");
            logger.error(err);
        });
}

function hikReplayHandler(ws, req, next) {
    logger.debug("hik replay request handle");
    const { cameraId } = req.params;
    const { beginTime, endTime } = req.query;

    request.get_hik_replay_url(cameraId, beginTime, endTime)
        .then(url => {
            start_ffmpeg(ws, url)
        }).catch(err => {
            logger.error("发生错误: ");
            logger.error(err);
        });
}

module.exports = {
    liveHandler,
    replayHandler,
    hikLiveHandler,
    hikReplayHandler
};