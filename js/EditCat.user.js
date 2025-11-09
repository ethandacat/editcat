// ==UserScript==
// @name         EditCat
// @namespace    ethandacat
// @version      1.0.0a
// @description  Edit freely. Save globally. See quickly.
// @updateURL    https://github.com/ethandacat/editcat/raw/refs/heads/main/EditCat.user.js
// @downloadURL  https://github.com/ethandacat/editcat/raw/refs/heads/main/EditCat.user.js
// @author       ethandacat
// @match        */*
// @resource     editcatcss https://github.com/ethandacat/editcat/raw/refs/heads/refactor/css/main.css
// @resource     icon https://i.postimg.cc/4x8jqb73/image.png
// @grant        GM_getResourceText
// @icon         https://i.postimg.cc/4x8jqb73/image.png
// @require      https://github.com/ethandacat/editcat/raw/refs/heads/refactor/js/main.js
// ==/UserScript==

(function() {
  const cssText = GM_getResourceText('editcatcss');
  const style = document.createElement('style');
  style.textContent = cssText;
  document.head.appendChild(style);
})();