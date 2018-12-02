// // background.js
// var connections = {};
//
// // 建立长链接监听事件
// chrome.runtime.onConnect.addListener(function (port) {
//     console.log('[background.js] chrome.runtime.onConnect in----', port);
//
//     var extensionListener = function (message, sender, sendResponse) {
//         console.log('---[background.js]  extensionListener recieve----', message);
//         // The original connection event doesn't include the tab ID of the
//         // DevTools page, so we need to send it explicitly.
//         if (message.name == 'init') {
//             connections[message.tabId] = port;
//             return;
//         }
//
//         // other message handling
//     };
//
//     // Listen to messages sent from the DevTools page
//     port.onMessage.addListener(extensionListener);
//
//     port.onDisconnect.addListener(function (port) {
//         port.onMessage.removeListener(extensionListener);
//
//         var tabs = Object.keys(connections);
//         for (var i = 0, len = tabs.length; i < len; i++) {
//             if (connections[tabs[i]] == port) {
//                 delete connections[tabs[i]];
//                 break;
//             }
//         }
//     });
// });
//
// // 从 content-script 获得消息之后，再透传到我们的 devTools 中
// // Receive message from content script and relay to the devTools page for the current tab
// chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
//     console.log('[background.js] chrome.runtime.onMessage', request)
//     // Messages from content scripts should have sender.tab set
//     if (sender.tab) {
//         var tabId = sender.tab.id;
//         if (tabId in connections) {
//             connections[tabId].postMessage(request);
//         } else {
//             console.log('Tab not found in connection list.');
//         }
//     } else {
//         console.log('sender.tab not defined.');
//     }
//
//     return true;
// });