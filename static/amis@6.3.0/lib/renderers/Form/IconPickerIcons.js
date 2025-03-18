/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

exports.ICONS = [
    {
        name: 'Font Awesome 4.7',
        prefix: 'fa fa-',
        icons: [
            'slideshare',
            'snapchat',
            'snapchat-ghost',
            'snapchat-square',
            'soundcloud',
            'spotify',
            'stack-exchange',
            'stack-overflow'
        ]
    }
];
function setIconVendor(icons) {
    exports.ICONS = icons;
}

exports.setIconVendor = setIconVendor;
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
