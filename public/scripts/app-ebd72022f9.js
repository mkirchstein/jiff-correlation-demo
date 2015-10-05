/**
 * @license
 *
 * Copyright (c) 2015, University of Washington Interactive Data Lab.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *
 * * Redistributions of source code must retain the above copyright notice, this
 *   list of conditions and the following disclaimer.
 *
 * * Redistributions in binary form must reproduce the above copyright notice,
 *   this list of conditions and the following disclaimer in the documentation
 *   and/or other materials provided with the distribution.
 *
 * * Neither the name of the University of Washington Interactive Data Lab
 *   nor the names of its contributors may be used to endorse or promote products
 *   derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
 * AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
 * IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE LIABLE
 * FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL
 * DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR
 * SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER
 * CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY,
 * OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
"use strict";angular.module("polestar",["ngSanitize","ngTouch","ngDragDrop","zeroclipboard","ui.select","Chronicle","LocalStorageModule","720kb.tooltips","ngOrderObjectBy","vlui"]).constant("_",window._).constant("vl",window.vl).constant("vg",window.vg).constant("ZSchema",window.ZSchema).constant("Tether",window.Tether).constant("Drop",window.Drop).constant("Blob",window.Blob).constant("URL",window.URL).constant("dl",window.dl).constant("jsondiffpatch",window.jsondiffpatch).config(["consts",function(e){window.vl.extend(e,{appId:"polestar",initialSpec:window.initialSpec||void 0})}]).config(["uiZeroclipConfigProvider",function(e){e.setZcConf({swfPath:"bower_components/zeroclipboard/dist/ZeroClipboard.swf"})}]).config(["localStorageServiceProvider",function(e){e.setPrefix("polestar")}]),angular.module("polestar").directive("vlSpecEditor",["Spec",function(e){return{templateUrl:"components/vlSpecEditor/vlSpecEditor.html",restrict:"E",scope:{},link:function(t){t.Spec=e,t.parseShorthand=e.parseShorthand,t.parseVegalite=function(t){e.parseSpec(JSON.parse(t))}}}}]),angular.module("polestar").directive("vgSpecEditor",["Spec",function(e){return{templateUrl:"components/vgSpecEditor/vgSpecEditor.html",restrict:"E",scope:{},link:function(t){t.Spec=e}}}]),angular.module("polestar").directive("shelves",function(){return{templateUrl:"components/shelves/shelves.html",restrict:"E",scope:{},replace:!0,controller:["$scope","vl","Spec","Config","Dataset","Logger","Pills",function(e,t,n,o,a,i,r){e.Spec=n,e.schema=t.schema.schema,e.pills=r,e.markChange=function(){i.logInteraction(i.actions.MARK_CHANGE,n.spec.marktype)},e.transpose=function(){t.Encoding.transpose(n.spec)},e.clear=function(){n.reset()},e.$watch("Spec.spec",function(e){i.logInteraction(i.actions.SPEC_CHANGE,e),n.update(e)},!0)}]}}),angular.module("polestar").directive("schemaListItem",["Pills",function(e){return{templateUrl:"components/schemalistitem/schemalistitem.html",restrict:"E",replace:!1,scope:{field:"="},link:function(t){t.getSchemaPill=e.getSchemaPill,t.fieldDragStart=function(){t.pill=e.getSchemaPill(t.field),e.dragStart(t.pill,null)},t.fieldDragStop=e.dragStop}}}]),angular.module("polestar").directive("schemaList",["Dataset",function(e){return{templateUrl:"components/schemalist/schemalist.html",restrict:"E",scope:{},replace:!0,controller:["$scope",function(t){t.Dataset=e}]}}]),angular.module("polestar").directive("propertyEditor",function(){return{templateUrl:"components/propertyeditor/propertyeditor.html",restrict:"E",scope:{id:"=",type:"=","enum":"=",propName:"=",group:"=",description:"=","default":"=",min:"=",max:"=",role:"="},link:function(e){e.hasAuto=void 0===e["default"],e.automodel={value:!1},e.hasAuto&&(e.automodel.value=void 0===e.group[e.propName],e.$watch("automodel.value",function(){e.automodel.value===!0&&(e.group[e.propName]=void 0)})),e.isRange=void 0!==e.max&&void 0!==e.min}}}),angular.module("polestar").directive("nullFilterDirective",["Spec",function(e){return{templateUrl:"components/nullfilterdirective/nullfilterdirective.html",restrict:"E",scope:{},link:function(t,n,o){t.Spec=e,t.updateFilter=function(){e.update()}}}}]),angular.module("polestar").directive("lyraExport",function(){return{template:'<a href="#" class="command" ng-click="export()">Export to lyra</a>',restrict:"E",replace:!0,scope:{},controller:["$scope","$timeout","Spec","Alerts",function(e,t,n,o){e["export"]=function(){var e=n.vgSpec;e||o.add("No vega spec present."),e.marks[0]["lyra.groupType"]="layer";var a="http://idl.cs.washington.edu/projects/lyra/app/",i=window.open(a,"_blank");t(function(){o.add("Please check whether lyra loaded the vega spec correctly. This feature is experimental and may not work.",5e3),i.postMessage({spec:e},a)},5e3)}}]}}),angular.module("polestar").directive("jsonInput",function(){return{restrict:"A",require:"ngModel",scope:{},link:function(e,t,n,o){var a=function(e){return JSON.stringify(e,null,"  ",80)};o.$formatters.push(a)}}}),angular.module("polestar").directive("functionSelect",["_","vl","Pills","Logger",function(e,t,n,o){return{templateUrl:"components/functionselect/functionselect.html",restrict:"E",scope:{encType:"=",schema:"=",field:"="},link:function(a){function i(){return n?n.pills[a.encType]:null}function r(e){var t=(a.schema||{}).properties;return t&&t.timeUnit&&(!t.timeUnit.supportedTypes||t.timeUnit.supportedTypes[e])?(t.timeUnit.supportedEnums?t.timeUnit.supportedEnums[e]:t.timeUnit["enum"])||[]:[]}function c(e){if(!e)return[d];var t=a.schema.properties;return t&&t.aggregate&&(!t.aggregate.supportedTypes||t.aggregate.supportedTypes[e])?(t.aggregate.supportedEnums?t.aggregate.supportedEnums[e]:t.aggregate["enum"])||[]:[]}var l,s="bin",p="",d="count";a.pills=n.pills,a.func={selected:p,list:[p]},a.selectChanged=function(){o.logInteraction(o.actions.FUNC_CHANGE,a.func.selected)},a.$watch("func.selected",function(o){var p=i(),d=e.clone(p),u=d?d.type:"";d&&(d.bin=o===s?{maxbins:l||t.schema.MAXBINS_DEFAULT}:void 0,d.aggregate=-1!==c(u).indexOf(o)?o:void 0,d.timeUnit=-1!==r(u).indexOf(o)?o:void 0,e.isEqual(p,d)||(n.pills[a.encType]=d,n.update(a.encType)))}),a.$watch("field",function(e){if(a.schema&&e){var n=e.name?e.type:"",o=a.schema.properties;e.bin&&(l=e.bin.maxbins);var i=-1!==["row","col","shape"].indexOf(a.encType),u="Q"===n,m="T"===n;if("*"===e.name&&e.aggregate===d)a.func.list=[d],a.func.selected=d;else{a.func.list=(i&&(u||m)?[]:[""]).concat(r(n)).concat(c(n).filter(function(e){return e!==d})).concat(o.bin&&o.bin.supportedTypes[n]?["bin"]:[]);var g=i&&u&&s||m&&t.schema.defaultTimeFn||p,f=e.bin?"bin":e.aggregate||e.timeUnit||g;a.func.selected=a.func.list.indexOf(f)>=0?f:g}}},!0)}}}]),angular.module("polestar").directive("fieldDefEditor",["Dataset","Pills","_","Drop","Logger",function(e,t,n,o,a){return{templateUrl:"components/fielddefeditor/fielddefeditor.html",restrict:"E",replace:!0,scope:{encType:"=",enc:"=",schema:"=fieldDefSchema",marktype:"="},link:function(i,r){function c(){return t.pills[i.encType]}var l,s;i.allowedCasting={Q:["Q","O","N"],O:["O","N"],N:["N","O"],T:["T","O","N"],G:["G","O","N"]},i.Dataset=e,i.typeNames=e.typeNames,i.pills=t.pills,l=new o({content:r.find(".shelf-properties")[0],target:r.find(".shelf-label")[0],position:"bottom left",openOn:"click"}),i.fieldInfoPopupContent=r.find(".shelf-functions")[0],i.removeField=function(){t.remove(i.encType)},i.fieldDragStart=function(){t.dragStart(t[i.encType],i.encType)},i.fieldDragStop=function(){t.dragStop()},i.fieldDropped=function(){var e=c();s&&(s=null);var o=i.schema.properties.type["enum"];n.contains(o,e.type)||(e.type=o[0]),t.dragDrop(i.encType),a.logInteraction(a.actions.FIELD_DROP,i.enc[i.encType])},i.$watch("enc[encType]",function(e){t.pills[i.encType]=e?n.cloneDeep(e):{}},!0),i.$watchGroup(["allowedCasting[Dataset.dataschema.byName[enc[encType].name].type]","enc[encType].aggregate"],function(e){var t=e[0],n=e[1];i.allowedTypes="count"===n?["Q"]:t})}}}]),angular.module("polestar").directive("configurationEditor",function(){return{templateUrl:"components/configurationeditor/configurationeditor.html",restrict:"E",scope:{},controller:["$scope","Config",function(e,t){e.Config=t}]}}),angular.module("polestar").directive("alertMessages",["Alerts",function(e){return{templateUrl:"components/alertmessages/alertmessages.html",restrict:"E",scope:{},link:function(t){t.Alerts=e}}}]),angular.module("polestar").service("Spec",["_","vl","ZSchema","Alerts","Config","Dataset",function(e,t,n,o,a,i){function r(n){for(var o in n)e.isObject(n[o])&&r(n[o]),(null===n[o]||void 0===n[o]||e.isObject(n[o])&&0===t.keys(n[o]).length||n[o]===[])&&delete n[o]}var c={spec:null,chart:{vlSpec:null,encoding:null,shorthand:null,vgSpec:null}};return c._removeEmptyFieldDefs=function(n){n.encoding=e.omit(n.encoding,function(e,o){return!e||void 0===e.name&&void 0===e.value||n.marktype&&!t.schema.schema.properties.encoding.properties[o].supportedMarktypes[n.marktype]})},c.parseShorthand=function(e){var n=t.Encoding.parseShorthand(e,a.config).toSpec();c.parseSpec(n)},c.parseSpec=function(e){c.spec=t.schema.util.merge(c.instantiate(),e)},c.instantiate=function(){var e=t.schema.instantiate();return e.marktype=t.schema.schema.properties.marktype["enum"][0],e.config=a.config,e.data=a.data,e},c.reset=function(){c.spec=c.instantiate()},c.update=function(i){i=e.cloneDeep(i||c.spec),c._removeEmptyFieldDefs(i),r(i),"encoding"in i||(i.encoding={});var l=new n;l.setRemoteReference("http://json-schema.org/draft-04/schema",{});var s=t.schema.schema,p=l.validate(i,s);if(p){t.extend(i.config,a.large());var d=t.Encoding.fromSpec(i),u=c.chart;u.fieldSet=c.spec.encoding,u.vlSpec=i,u.cleanSpec=d.toSpec(!1),u.shorthand=d.toShorthand(),console.log("chart",u.vgSpec,u.vlSpec)}else o.add({msg:l.getLastErrors()})},c.reset(),i.onUpdate.push(c.reset),c}]),angular.module("polestar").service("Pills",["vl","Spec","_","$window",function(e,t,n,o){function a(t){return e.schema.util.instantiate(r[t])}function i(t,n,i){var c=n.type,l=e.schema.getSupportedRole(i),s=l.dimension&&!l.measure;n.name&&s?"count"===n.aggregate?(n={},o.alert("COUNT not supported here!")):"Q"!==c||n.bin?"T"!==c||n.timeUnit||(n.timeUnit=e.schema.defaultTimeFn):(n.aggregate=void 0,n.bin={maxbins:e.schema.MAXBINS_DEFAULT}):n.name||(n={});var p=a(i),d=r[i].properties;for(var u in d)n[u]&&("value"===u&&n.name?delete p[u]:p[u]=n[u]);t[i]=p}var r=e.schema.schema.properties.encoding.properties,c={pills:{}};return c.getSchemaPill=function(e){return{name:e.name,type:e.type,aggregate:e.aggregate}},c.remove=function(e){delete c.pills[e],i(t.spec.encoding,{},e)},c.update=function(e){i(t.spec.encoding,c.pills[e],e)},c.dragStart=function(e,t){c.pills.dragging=e,c.pills.etDragFrom=t},c.dragStop=function(){delete c.pills.dragging},c.dragDrop=function(e){var o=n.clone(t.spec.encoding),a=c.pills.etDragFrom;a&&i(o,c.pills[a]||{},a),i(o,c.pills[e]||{},e),t.spec.encoding=o,a=null},c}]),angular.module("polestar").controller("MainCtrl",["$scope","$document","Spec","Dataset","Config","consts","Chronicle","Logger","Bookmarks",function(e,t,n,o,a,i,r,c,l){e.Spec=n,e.Dataset=o,e.Config=a,e.Bookmarks=l,e.consts=i,e.showDevPanel=!1,e.embedded=!!i.embeddedData,e.canUndo=!1,e.canRedo=!1,e.showBookmark=!1,e.hideBookmark=function(){e.showBookmark=!1},l.load(),e.embedded&&(o.dataset={values:i.embeddedData}),o.dataset={name:"Population",url:"data/population.json",id:"population",group:"sample"},o.datasets=[{name:"Population",url:"data/population.json",id:"population",group:"sample"}],o.update(o.dataset).then(function(){a.updateDataset(o.dataset),i.initialSpec&&n.parseSpec(i.initialSpec),e.chron=r.record("Spec.spec",e,!0,["Dataset.dataset","Dataset.dataschema","Dataset.stats","Config.config"]),e.canUndoRedo=function(){e.canUndo=e.chron.canUndo(),e.canRedo=e.chron.canRedo()},e.chron.addOnAdjustFunction(e.canUndoRedo),e.chron.addOnUndoFunction(e.canUndoRedo),e.chron.addOnRedoFunction(e.canUndoRedo),e.chron.addOnUndoFunction(function(){c.logInteraction(c.actions.UNDO)}),e.chron.addOnRedoFunction(function(){c.logInteraction(c.actions.REDO)}),angular.element(t).on("keydown",function(t){return t.keyCode!=="Z".charCodeAt(0)||!t.ctrlKey&&!t.metaKey||t.shiftKey?t.keyCode==="Y".charCodeAt(0)&&(t.ctrlKey||t.metaKey)?(e.chron.redo(),e.$digest(),!1):t.keyCode==="Z".charCodeAt(0)&&(t.ctrlKey||t.metaKey)&&t.shiftKey?(e.chron.redo(),e.$digest(),!1):void 0:(e.chron.undo(),e.$digest(),!1)})})}]),angular.module("polestar").run(["$templateCache",function(e){e.put("app/main/main.html",'<div ng-controller="MainCtrl"><div class="flex-root vflex full-width full-height"><div class="full-width no-shrink"><div class="card no-right-margin no-top-margin"><div class="right flex-root hflex"><div class="controls"><span ng-show="consts.debug"> </span> <a class="command" ng-click="showBookmark=true"><i class="fa fa-bookmark"></i> Bookmarks ({{Bookmarks.length}})</a> <a class="command" ng-click="chron.undo()" ng-class="{disabled: !canUndo}"><i class="fa fa-undo"></i> Undo</a> <a class="command" ng-click="chron.redo()" ng-class="{disabled: !canRedo}"><i class="fa fa-repeat"></i> Redo</a></div><div><a href="https://idl.cs.washington.edu/" target="_blank" class="logo"></a></div></div><h1><img src="assets/images/jiff_logo.png" class="jiff-logo"> Population Data <i class="fa fa-chevron-right" style="font-size: 0.75em; color: #999;"></i> Correlation</h1></div><alert-messages></alert-messages></div><div class="hflex full-width main-panel grow-1"><div class="pane data-pane noselect"><div class="card abs-100"><div class="right"><dataset-selector ng-if="!embedded"></dataset-selector></div><h2>Data</h2><schema-list></schema-list></div></div><div class="pane encoding-pane"><shelves></shelves></div><div class="pane vis-pane"><vl-plot-group class="card abs-100 no-right-margin full-vl-plot-group" chart="Spec.chart" show-bookmark="true" show-filter-null="true" show-log="true" show-mark-type="true" show-sort="true" show-transpose="true" config-set="large" show-label="true" tooltip="true" always-scrollable="true"></vl-plot-group></div></div><div class="hflex full-width dev-panel" ng-if="showDevPanel"><div class="pane config-pane"><div class="card scroll-y abs-100"><configuration-editor></configuration-editor></div></div><div class="pane vl-pane"><vl-spec-editor></vl-spec-editor></div><div class="pane vg-pane"><vg-spec-editor></vg-spec-editor></div></div></div><bookmark-list active="showBookmark" deactivate="hideBookmark();" highlighted="{}"></bookmark-list></div>'),e.put("components/alertmessages/alertmessages.html",'<div class="alert-box" ng-show="Alerts.alerts.length > 0"><div class="alert-item" ng-repeat="alert in Alerts.alerts">{{ alert.msg }} <a class="close" ng-click="Alerts.closeAlert($index)">&times;</a></div></div>'),e.put("components/configurationeditor/configurationeditor.html","<form><pre>{{ Config.config | compactJSON }}</pre></form>"),e.put("components/fielddefeditor/fielddefeditor.html",'<div class="shelf-group"><div class="shelf" ng-class="{disabled: !schema.supportedMarktypes[marktype]}"><div class="shelf-label" ng-class="{expanded: propsExpanded}"><i class="fa fa-caret-down"></i> {{ encType }}</div><div class="field-drop" ng-model="pills[encType]" data-drop="schema.supportedMarktypes[marktype]" jqyoui-droppable="{onDrop:\'fieldDropped\'}" data-jqyoui-options="{activeClass: \'drop-active\'}"><field-info ng-show="enc[encType].name" ng-class="{expanded: funcsExpanded}" field="enc[encType]" show-type="true" show-caret="true" disable-count-caret="true" popup-content="fieldInfoPopupContent" show-remove="true" remove-action="removeField()" class="selected draggable full-width" data-drag="true" ng-model="pills[encType]" jqyoui-draggable="{onStart: \'fieldDragStart\', onStop:\'fieldDragStop\'}" data-jqyoui-options="{revert: \'invalid\', helper: \'clone\'}"></field-info><span class="placeholder" ng-if="!enc[encType].name">drop a field here</span></div></div><div class="drop-container"><div class="popup-menu shelf-properties shelf-properties-{{encType}}"><div><property-editor ng-show="schema.properties.value" id="encType + \'value\'" type="schema.properties.value.type" enum="schema.properties.value.enum" prop-name="\'value\'" group="enc[encType]" description="schema.properties.value.description" min="schema.properties.value.minimum" max="schema.properties.value.maximum" role="schema.properties.value.role" default="schema.properties.value.default"></property-editor></div><div ng-repeat="group in [\'legend\', \'scale\', \'text\', \'axis\', \'bin\']" ng-show="schema.properties[group]"><h4>{{ group }}</h4><div ng-repeat="(propName, scaleProp) in schema.properties[group].properties" ng-init="id = encType + group + $index" ng-show="scaleProp.supportedTypes ? scaleProp.supportedTypes[enc[encType].type] : true"><property-editor id="id" type="scaleProp.type" enum="scaleProp.enum" prop-name="propName" group="enc[encType][group]" description="scaleProp.description" min="scaleProp.minimum" max="scaleProp.maximum" role="scaleProp.role" default="scaleProp.default"></property-editor></div></div></div><div class="popup-menu shelf-functions shelf-functions-{{encType}}"><div class="mb5"><h4>Types</h4><span ng-if="allowedTypes.length<=1">{{typeNames[enc[encType].type]}}</span> <label class="type-label" ng-if="allowedTypes.length>1" ng-repeat="type in allowedTypes"><input type="radio" ng-value="type" ng-model="enc[encType].type"> {{typeNames[type]}}</label></div><function-select field="enc[encType]" enc-type="encType" schema="schema"></function-select></div></div></div>'),e.put("components/functionselect/functionselect.html",'<div class="mb5" ng-if="func.list.length > 1 || func.list[0] !== \'\'"><h4>Functions</h4><label class="func-label field-func" ng-repeat="f in func.list"><input type="radio" ng-value="f" ng-model="func.selected" ng-change="selectChanged()"> {{f === \'avg\' ? \'mean\' : f || \'-\'}}</label></div>'),e.put("components/nullfilterdirective/nullfilterdirective.html",'<label><input ng-model="Spec.spec.config.filterNull.O" ng-change="updateFilter()" type="checkbox"> Remove null values</label>'),e.put("components/propertyeditor/propertyeditor.html",'<div><label class="prop-label" for="{{ id }}"><span class="name" title="{{ propName }}">{{ propName }}</span> <span ng-if="description" class="fa fa-question" tooltips="" tooltip-size="small" tooltip-html="<strong>{{ propName }}</strong><div class=\'tooltip-content\'>{{ description }}</div>" tooltip-side="right"></span></label><form class="inline-block" ng-switch="type + (enum !== undefined ? \'list\' : \'\')"><input id="{{ id }}" ng-switch-when="boolean" type="checkbox" ng-model="group[propName]" ng-hide="automodel.value"><select id="{{ id }}" ng-switch-when="stringlist" ng-model="group[propName]" ng-options="choice for choice in enum track by choice" ng-hide="automodel.value"></select><input id="{{ id }}" ng-switch-when="integer" ng-attr-type="{{ isRange ? \'range\' : \'number\'}}" ng-model="group[propName]" ng-model-options="{debounce: 200}" ng-attr-min="{{min}}" ng-attr-max="{{max}}" ng-hide="automodel.value" ng-attr-title="{{ isRange ? group[propName] : undefined }}"> <input id="{{ id }}" ng-attr-type="{{ role === \'color\' ? \'color\' : \'string\' }}" ng-switch-when="string" ng-model="group[propName]" ng-model-options="{debounce: 500}" ng-hide="automodel.value"> <small ng-if="hasAuto"><label>Auto <input ng-model="automodel.value" type="checkbox"></label></small></form></div>'),e.put("components/schemalist/schemalist.html",'<div class="schema full-width"><schema-list-item field="field" ng-repeat="field in Dataset.dataschema | orderBy : Dataset.fieldOrder"></schema-list-item></div>'),e.put("components/schemalistitem/schemalistitem.html",'<field-info field="field" show-type="true" show-info="true" class="pill list-item draggable full-width no-right-margin" ng-model="pill" data-drag="true" jqyoui-draggable="{placeholder: \'keep\', deepCopy: true, onStart: \'fieldDragStart\', onStop:\'fieldDragStop\'}" data-jqyoui-options="{revert: \'invalid\', helper: \'clone\'}"></field-info>'),e.put("components/shelves/shelves.html",'<div class="card scroll-y abs-100"><a class="right" ng-click="clear()"><i class="fa fa-eraser"></i> Clear</a><h2>Encoding</h2><div class="shelf-pane shelf-encoding-pane full-width"><h3>Positional</h3><field-def-editor enc-type="\'x\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.x"></field-def-editor><field-def-editor enc-type="\'y\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.y"></field-def-editor><field-def-editor enc-type="\'col\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.col"></field-def-editor><field-def-editor enc-type="\'row\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.row"></field-def-editor></div><div class="shelf-pane shelf-marks-pane full-width"><div class="right"><select class="markselect" ng-model="Spec.spec.marktype" ng-options="type for type in [\'point\', \'tick\', \'bar\', \'line\', \'area\', \'text\']" ng-change="markChange()"></select></div><h3>Marks</h3><field-def-editor enc-type="\'size\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.size"></field-def-editor><field-def-editor enc-type="\'color\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.color"></field-def-editor><field-def-editor enc-type="\'shape\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.shape"></field-def-editor><field-def-editor enc-type="\'detail\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.detail"></field-def-editor><field-def-editor enc-type="\'text\'" enc="Spec.spec.encoding" marktype="Spec.spec.marktype" field-def-schema="schema.properties.encoding.properties.text"></field-def-editor></div></div>'),e.put("components/vgSpecEditor/vgSpecEditor.html",'<div class="card scroll-y abs-100 vflex no-right-margin"><div><div class="right"><a class="command" ui-zeroclip="" zeroclip-model="Spec.chart.vgSpec | compactJSON">Copy</a><lyra-export></lyra-export></div><h3>Vega Specification</h3></div><textarea class="vgspec flex-grow-1" json-input="" disabled="disabled" type="text" ng-model="Spec.chart.vgSpec"></textarea></div>'),e.put("components/vlSpecEditor/vlSpecEditor.html",'<div class="card scroll-y abs-100 vflex"><div class="subpane no-shrink"><a ng-click="parseShorthand(Spec.chart.shorthand)" class="right command">Load</a><div class="right command"><a ui-zeroclip="" zeroclip-model="Spec.chart.shorthand">Copy</a></div><h3>Vega-lite Shorthand</h3><input class="shorthand full-width" type="text" ng-model="Spec.chart.shorthand"></div><div class="subpane flex-grow-1 vflex"><div><a ng-click="parseVegalite(Spec.chart.vlSpec)" class="right command">Load</a><div class="right command"><a ui-zeroclip="" zeroclip-model="Spec.chart.cleanSpec | compactJSON">Copy</a></div><h3>Vega-lite Encoding</h3></div><textarea class="vlspec flex-grow-1 full-height" json-input="" type="text" ng-model="Spec.chart.cleanSpec"></textarea></div></div>')}]);
