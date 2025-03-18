/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import { __extends, __decorate, __metadata } from 'tslib';
import React from 'react';
import upperFirst from 'lodash/upperFirst';
import { getPropValue, filter, detectPropValueChanged, autobind, Renderer } from 'amis-core';
import { Icon } from 'amis-ui';

var Audio = /** @class */ (function (_super) {
    __extends(Audio, _super);
    function Audio() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            src: getPropValue(_this.props, function (props) {
                return props.src ? filter(props.src, props.data, '| raw') : undefined;
            }) || '',
            isReady: false,
            muted: false,
            playing: false,
            played: 0,
            seeking: false,
            volume: 0.8,
            prevVolume: 0.8,
            loaded: 0,
            playbackRate: 1.0,
            showHandlePlaybackRate: false,
            showHandleVolume: false
        };
        return _this;
    }
    Audio.prototype.componentWillUnmount = function () {
        clearTimeout(this.progressTimeout);
        clearTimeout(this.durationTimeout);
    };
    Audio.prototype.componentDidMount = function () {
        var autoPlay = this.props.autoPlay;
        var playing = autoPlay ? true : false;
        this.setState({
            playing: playing
        }, this.progress);
    };
    Audio.prototype.componentDidUpdate = function (prevProps) {
        var _this = this;
        var props = this.props;
        detectPropValueChanged(props, prevProps, function (value) {
            return _this.setState({
                src: value,
                playing: false
            }, function () {
                _this.audio.load();
                _this.progress();
            });
        }, function (props) { return (props.src ? filter(props.src, props.data, '| raw') : undefined); });
    };
    Audio.prototype.progress = function () {
        clearTimeout(this.progressTimeout);
        if (this.state.src && this.audio) {
            var currentTime = this.audio.currentTime || 0;
            var duration = this.audio.duration;
            var played = currentTime / duration;
            var playing = this.state.playing;
            playing = played != 1 && playing ? true : false;
            this.setState({
                played: played,
                playing: playing
            });
            this.progressTimeout = setTimeout(this.progress, this.props.progressInterval / this.state.playbackRate);
        }
    };
    Audio.prototype.audioRef = function (audio) {
        this.audio = audio;
    };
    Audio.prototype.load = function () {
        this.setState({
            isReady: true
        });
    };
    Audio.prototype.handlePlaybackRate = function (rate) {
        this.audio.playbackRate = rate;
        this.setState({
            playbackRate: rate,
            showHandlePlaybackRate: false
        });
    };
    Audio.prototype.handleMute = function () {
        if (!this.state.src) {
            return;
        }
        var _a = this.state, muted = _a.muted, prevVolume = _a.prevVolume;
        var curVolume = !muted ? 0 : prevVolume;
        this.audio.muted = !muted;
        this.setState({
            muted: !muted,
            volume: curVolume
        });
    };
    Audio.prototype.handlePlaying = function () {
        if (!this.state.src) {
            return;
        }
        var playing = this.state.playing;
        playing ? this.audio.pause() : this.audio.play();
        this.setState({
            playing: !playing
        });
    };
    Audio.prototype.getCurrentTime = function () {
        if (!this.audio || !this.state.src || !this.state.isReady) {
            return '0:00';
        }
        var duration = this.audio.duration;
        var played = this.state.played;
        return this.formatTime(duration * (played || 0));
    };
    Audio.prototype.getDuration = function () {
        if (!this.audio || !this.state.src) {
            return '0:00';
        }
        if (!this.state.isReady) {
            this.onDurationCheck();
            return '0:00';
        }
        var _a = this.audio, duration = _a.duration, seekable = _a.seekable;
        // on iOS, live streams return Infinity for the duration
        // so instead we use the end of the seekable timerange
        if (duration === Infinity && seekable.length > 0) {
            return seekable.end(seekable.length - 1);
        }
        return this.formatTime(duration);
    };
    Audio.prototype.onDurationCheck = function () {
        clearTimeout(this.durationTimeout);
        var duration = this.audio && this.audio.duration;
        if (!duration) {
            this.durationTimeout = setTimeout(this.onDurationCheck, 500);
        }
    };
    Audio.prototype.onSeekChange = function (e) {
        if (!this.state.src) {
            return;
        }
        var played = e.target.value;
        this.setState({ played: played });
    };
    Audio.prototype.onSeekMouseDown = function () {
        this.setState({ seeking: true });
    };
    Audio.prototype.onSeekMouseUp = function (e) {
        if (!this.state.src) {
            return;
        }
        if (!this.state.seeking) {
            return;
        }
        var played = e.target.value;
        var duration = this.audio.duration;
        this.audio.currentTime = duration * played;
        var loop = this.props.loop;
        var playing = this.state.playing;
        playing = played < 1 || loop ? playing : false;
        this.setState({
            playing: playing,
            seeking: false
        });
    };
    Audio.prototype.setVolume = function (e) {
        if (!this.state.src) {
            return;
        }
        var volume = e.target.value;
        this.audio.volume = volume;
        this.setState({
            volume: volume,
            prevVolume: volume
        });
    };
    Audio.prototype.formatTime = function (seconds) {
        var date = new Date(seconds * 1000);
        var hh = date.getUTCHours();
        var mm = isNaN(date.getUTCMinutes()) ? 0 : date.getUTCMinutes();
        var ss = isNaN(date.getUTCSeconds())
            ? '00'
            : this.pad(date.getUTCSeconds());
        if (hh) {
            return "".concat(hh, ":").concat(this.pad(mm), ":").concat(ss);
        }
        return "".concat(mm, ":").concat(ss);
    };
    Audio.prototype.pad = function (string) {
        return ('0' + string).slice(-2);
    };
    Audio.prototype.toggleHandlePlaybackRate = function () {
        if (!this.state.src) {
            return;
        }
        this.setState({
            showHandlePlaybackRate: !this.state.showHandlePlaybackRate
        });
    };
    Audio.prototype.toggleHandleVolume = function (type) {
        if (!this.state.src) {
            return;
        }
        this.setState({
            showHandleVolume: type
        });
    };
    Audio.prototype.renderRates = function () {
        var _this = this;
        var _a = this.props, rates = _a.rates, cx = _a.classnames;
        var _b = this.state, showHandlePlaybackRate = _b.showHandlePlaybackRate, playbackRate = _b.playbackRate;
        return rates && rates.length ? (showHandlePlaybackRate ? (React.createElement("div", { className: cx('Audio-rateControl') }, rates.map(function (rate, index) { return (React.createElement("div", { key: index, className: cx('Audio-rateControlItem'), onClick: function () { return _this.handlePlaybackRate(rate); } },
            "x",
            rate.toFixed(1))); }))) : (React.createElement("div", { className: cx('Audio-rates'), onClick: this.toggleHandlePlaybackRate },
            "x",
            playbackRate.toFixed(1)))) : null;
    };
    Audio.prototype.renderPlay = function () {
        var cx = this.props.classnames;
        var playing = this.state.playing;
        return (React.createElement("div", { className: cx('Audio-play'), onClick: this.handlePlaying }, playing ? (React.createElement(Icon, { icon: "pause", className: "icon" })) : (React.createElement(Icon, { icon: "play", className: "icon" }))));
    };
    Audio.prototype.renderTime = function () {
        var cx = this.props.classnames;
        return (React.createElement("div", { className: cx('Audio-times') },
            this.getCurrentTime(),
            " / ",
            this.getDuration()));
    };
    Audio.prototype.renderProcess = function () {
        var cx = this.props.classnames;
        var played = this.state.played;
        return (React.createElement("div", { className: cx('Audio-process') },
            React.createElement("input", { type: "range", min: 0, max: 1, step: "any", value: played || 0, onMouseDown: this.onSeekMouseDown, onChange: this.onSeekChange, onMouseUp: this.onSeekMouseUp })));
    };
    Audio.prototype.renderVolume = function () {
        var _this = this;
        var cx = this.props.classnames;
        var _a = this.state, volume = _a.volume, showHandleVolume = _a.showHandleVolume;
        return showHandleVolume ? (React.createElement("div", { className: cx('Audio-volumeControl'), onMouseLeave: function () { return _this.toggleHandleVolume(false); } },
            React.createElement("div", { className: cx('Audio-volumeControlIcon'), onClick: this.handleMute }, volume > 0 ? (React.createElement(Icon, { icon: "volume", className: "icon" })) : (React.createElement(Icon, { icon: "mute", className: "icon" }))),
            React.createElement("input", { type: "range", min: 0, max: 1, step: "any", value: volume, onChange: this.setVolume }))) : (React.createElement("div", { className: cx('Audio-volume'), onMouseEnter: function () { return _this.toggleHandleVolume(true); } }, volume > 0 ? (React.createElement(Icon, { icon: "volume", className: "icon" })) : (React.createElement(Icon, { icon: "mute", className: "icon" }))));
    };
    Audio.prototype.render = function () {
        var _this = this;
        var _a = this.props, className = _a.className, style = _a.style, inline = _a.inline, autoPlay = _a.autoPlay, loop = _a.loop, controls = _a.controls, cx = _a.classnames;
        var _b = this.state, muted = _b.muted, src = _b.src;
        return (React.createElement("div", { className: cx('Audio', className, inline ? 'Audio--inline' : ''), style: style },
            React.createElement("audio", { className: cx('Audio-original'), ref: this.audioRef, onCanPlay: this.load, autoPlay: autoPlay, controls: true, muted: muted, loop: loop },
                React.createElement("source", { src: src })),
            React.createElement("div", { className: cx('Audio-controls') }, controls &&
                controls.map(function (control, index) {
                    control = 'render' + upperFirst(control);
                    var method = control;
                    return (React.createElement(React.Fragment, { key: index }, _this[method]()));
                }))));
    };
    Audio.defaultProps = {
        inline: true,
        autoPlay: false,
        playbackRate: 1,
        loop: false,
        rates: [],
        progressInterval: 1000,
        controls: ['rates', 'play', 'time', 'process', 'volume']
    };
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "progress", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [HTMLMediaElement]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "audioRef", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "load", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "handlePlaybackRate", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "handleMute", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "handlePlaying", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "getCurrentTime", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "getDuration", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "onDurationCheck", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "onSeekChange", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "onSeekMouseDown", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "onSeekMouseUp", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Object]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "setVolume", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "formatTime", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Number]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "pad", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "toggleHandlePlaybackRate", null);
    __decorate([
        autobind,
        __metadata("design:type", Function),
        __metadata("design:paramtypes", [Boolean]),
        __metadata("design:returntype", void 0)
    ], Audio.prototype, "toggleHandleVolume", null);
    return Audio;
}(React.Component));
/** @class */ ((function (_super) {
    __extends(AudioRenderer, _super);
    function AudioRenderer() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    AudioRenderer = __decorate([
        Renderer({
            type: 'audio'
        })
    ], AudioRenderer);
    return AudioRenderer;
})(Audio));

export { Audio };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
