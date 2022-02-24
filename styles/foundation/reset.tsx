/** @jsxImportSource @emotion/react */
import { css, jsx } from '@emotion/react'

export const styleReset = css`
html,
body {
  padding: 0;
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
    Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
}

a {
  color: inherit;
  text-decoration: none;
}
p {
  margin:0;
}

* {
  box-sizing: border-box;
}

a:hover {
  text-decoration: underline;
}

h1, h2, h3, h4, h5, h6 {
    margin: 0;
}

img {
  max-width: 100%;
  display: block;
}

ul {
  padding: 0;
  margin: 0;
  list-style: none;
}

ul > li {
  display: inline-block;
  vertical-align: middle;
}

`

export const styleResetInput = css`
/* =========type="text" テキスト============
<input type="text">
===========================================*/
input[type="text"] {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  /* border: 1px solid rgba(0, 0, 0, 0.16); */
  border: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 4px;
  color: inherit;
  font-family: inherit;
  font-size: 1em;
  padding: 0.4em 0.8em;
  width: 100%;
}

input[type="text"]:focus {
  /* border: none;
  border-bottom: 1px solid rgba(0, 0, 0, 0.16); */
  box-shadow: none;
  outline: none;
}/* ===END=== */


/* =========textarea　テキストエリア============
<textarea></textarea>
===============================================*/
textarea {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  font-family: inherit;
  /* font-size: 1em; */
  height: 213px;
  padding: 0.4em 0.8em;
  width: 100%;
}

textarea:focus {
  border: 1px solid rgba(0, 0, 0, 0.32);
  box-shadow: none;
  outline: none;
}/* ===END=== */

/* =========type="radio" ラジオボタン============
<label><input type="radio" name="radio-name"><span>ラジオ１</span></label>
<label><input type="radio" name="radio-name"><span>ラジオ２</span></label>
<label><input type="radio" name="radio-name"><span>ラジオ３</span></label>
===============================================*/
input[type="radio"] {
  display: none;
}

input[type="radio"] + span {
  cursor: pointer;
  display: inline-block;
  margin: 0 0.2em 0;
  padding: 0 0 0 1.2em;
  position: relative;
  font-size: inherit;
}

input[type="radio"] + span::before {
  -webkit-transform: translateY(-50%);
  background: #fff;
  border: 1px solid #707070;
  border-radius: 50%;
  content: "";
  display: block;
  height: 12px;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
}

input[type="radio"] + span::after {
  -webkit-transform: translateY(-50%);
  background: #3B69FF;
  /* border: 1px solid transparent; */
  border-radius: 50%;
  content: "";
  height: 6px;
  left: 4px;
  opacity: 0;
  /* padding: 2px; */
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  transition: all 0.3s ease 0s;
  width: 6px;
}

input[type="radio"]:checked + span::after {
  opacity: 1;
}/* ===END=== */

/* =========type="checkbox" チェックボックス============
<label><input type="checkbox" name="check-name"><span>チェック１</span></label>
<label><input type="checkbox" name="check-name"><span>チェック２</span></label>
<label><input type="checkbox" name="check-name"><span>チェック３</span></label>
======================================================*/
.check-init {
  display: none;
}

.check-init + span {
  cursor: pointer;
  display: inline-block;
  /* margin: 0 0.2em 0; */
  padding: 0 0 0 36px;
  position: relative;
}

.check-init + span::before {
  -webkit-transform: translateY(-50%);
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 2px;
  content: "";
  display: block;
  height: 1.2em;
  left: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  width: 1.2em;
}

.check-init + span::after {
  -webkit-transform: translateY(-50%) rotate(-45deg);
  border-bottom: 3px solid #3B69FF;
  border-left: 3px solid #3B69FF;
  content: "";
  display: block;
  height: 0.6em;
  left: 0;
  margin-top: -0.2em;
  opacity: 0;
  position: absolute;
  top: 50%;
  transform: translateY(-50%) rotate(-45deg);
  transition: all 0.3s ease 0s;
  width: 1em;
}

.check-init:checked + span::after {
  opacity: 1;
}/* ===END=== */


/* =======select ドロップダウンメニュー=================
<select>
  <option>セレクトA</option>
  <option>セレクトB</option>
  <option>セレクトC</option>
</select>
======================================================*/
.select-init {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  /* background: transparent url(../img/icoon-mono.png) no-repeat center right 8px/16px 16px; */
  border: 1px solid rgba(0, 0, 0, 0.16);
  border-radius: 0;
  color: inherit;
  cursor: pointer;
  font-family: inherit;
  /* font-size: 1em; */
  padding: 0em 0.8em;
  width: 50%;
}

.select-init::-ms-expand {
  display: none;
}

.select-init:focus {
  border: 1px solid rgba(0, 0, 0, 0.32);
  box-shadow: none;
  outline: none;
}/* ===END=== */


/* ===============type="submit" ボタン=================
<input class="submit-init" type="submit" value="送信">
======================================================*/
.submit-init {
  -webkit-appearance: none;
  background-color: rgba(0, 0, 0, 0.32);
  background-image: none;
  border: none;
  border-radius: 0;
  color: #fff;
  cursor: pointer;
  display: inline-block;
  font-size: 1em;
  margin: 0 0 1em;
  padding: 0.6em 2em;
  text-decoration: none;
}

.submit-init:hover,
.submit-init:focus {
  outline: none;
}

.submit-init::-moz-focus-inner {
  border: none;
  padding: 0;
}/* ===END=== */


/* ===============ファイル選択=================
<label id="file-init-label" for="file-init">ファイルを選択</label><input type="file" id="file-init">
<input type="text" id="file-init-name" disabled>
==============================================*/
.file-init {
  display: none;
}

.file-init-label {
  background: #fff;
  border: 1px solid rgba(0, 0, 0, 0.16);
  cursor: pointer;
  padding: 0.2em 0.8em;
  font-size:12px;
  display:inline-block;
}

.file-init-name {
  -moz-appearance: none;
  -webkit-appearance: none;
  appearance: none;
  background-color: transparent;
  background-image: none;
  border: none;
  border-radius: 0;
  color: inherit;
  display: none;
  font-family: inherit;
  font-size: 1em;
  padding: 0.4em 0;
  width: 100%;
}/* ===END=== */
`