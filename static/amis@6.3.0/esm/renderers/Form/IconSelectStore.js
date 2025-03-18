/**
 * amis v6.3.0
 * build time: 2024-03-29
 * Copyright 2018-2024 baidu
 */

import cloneDeep from 'lodash/cloneDeep';
import { getDefaultLocale, makeTranslator } from 'amis-core';

var svgIcons = [];
function getSvgMountNode(nodeId) {
    if (nodeId === void 0) { nodeId = 'amis-icon-manage-mount-node'; }
    var node = document.getElementById(nodeId);
    if (node) {
        return node;
    }
    else {
        var newNode = document.createElement('div');
        newNode.setAttribute('id', nodeId);
        newNode.setAttribute('style', 'width:0;height:0;visibility:hidden;');
        if (document.body.firstElementChild) {
            document.body.insertBefore(newNode, document.body.firstElementChild);
        }
        else {
            document.body.appendChild(newNode);
        }
        return newNode;
    }
}
function mountIconSpriteToDom(sprite, nodeId) {
    var node = getSvgMountNode(nodeId);
    node && (node.innerHTML = sprite);
}
var refreshIconList = null;
function setRefreshSvgListAction(func) {
    if (func && typeof func === 'function') {
        refreshIconList = function () {
            return func({
                setSvgIconList: setSvgIconList,
                mountIconSpriteToDom: mountIconSpriteToDom
            });
        };
    }
    else {
        refreshIconList = null;
        throw new Error('setRefreshSvgListAction need a function param, not ' + typeof func);
    }
}
function setSvgIconList(groups, combine, local) {
    if (combine === void 0) { combine = true; }
    if (local === void 0) { local = getDefaultLocale(); }
    var clonedIcons = cloneDeep(groups);
    var __ = makeTranslator(local);
    if (combine) {
        var allIcons = clonedIcons
            .map(function (item) { return item.children; })
            .flat();
        svgIcons = [
            {
                name: __('IconSelect.all'),
                groupId: 'all',
                children: allIcons
            }
        ].concat(groups);
    }
    else {
        svgIcons = groups;
    }
}

export { mountIconSpriteToDom, refreshIconList, setRefreshSvgListAction, setSvgIconList, svgIcons };
window.amisVersionInfo={version:'6.3.0',buildTime:'2024-03-29'};
