var pym = require("./lib/pym");
var ANALYTICS = require("./lib/analytics");
require("./lib/webfonts");
var { isMobile } = require("./lib/breakpoints");

var d3 = {
  ...require("d3-array/dist/d3-array.min"),
  ...require("d3-axis/dist/d3-axis.min"),
  ...require("d3-scale/dist/d3-scale.min"),
  ...require("d3-selection/dist/d3-selection.min")
};

var pymChild = null;
pym.then(function(child) {

  pymChild = child;
  child.sendHeight();
  window.addEventListener("resize", render);

  child.onMessage("on-screen", function(bucket) {
    ANALYTICS.trackEvent("on-screen", bucket);
  });
  child.onMessage("scroll-depth", function(data) {
    data = JSON.parse(data);
    ANALYTICS.trackEvent("scroll-depth", data.percent, data.seconds);
  });

});

//Add CSS styles inline for the SVG so that they get exported within the SVG file
$.get("./graphic.css", function(cssContent){
  d3.select(".graphic-wrapper svg g").append("defs").append("style").text(cssContent);
});

var render = function() {
  var container = document.querySelector(".graphic");
  //remove fallback
  container.innerHTML = "";
  var containerWidth = container.offsetWidth;

  var $container = d3.select(container);
  var svg = container.append("svg");

  //put your D3 code here

  pymChild.sendHeight();
};

//first render
render();