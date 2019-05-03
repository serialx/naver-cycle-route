(function(xhr) {
  console.log("injecting XHR");
  var orgConsole = console;
  console.log(orgConsole);

  var XHR = XMLHttpRequest.prototype;

  var open = XHR.open;
  var send = XHR.send;
  var setRequestHeader = XHR.setRequestHeader;

  XHR.open = function(method, url) {
    this._method = method;
    this._url = url;
    this._requestHeaders = {};
    this._startTime = (new Date()).toISOString();

    return open.apply(this, arguments);
  };

  XHR.setRequestHeader = function(header, value) {
    this._requestHeaders[header] = value;
    return setRequestHeader.apply(this, arguments);
  };

  XHR.send = function(postData) {
    var rsc = this.onreadystatechange;
    this.onreadystatechange = function() {
      if (this._url.includes("findbicycle")) {
        if(this.readyState === 4 && this.status === 200) {
          window.postMessage({type: "naver_bicycle_route", json: this.responseText}, "*");
        }
      }
      if (rsc) {
        return rsc.apply(this, arguments);
      }
    };
    return send.apply(this, arguments);
  };

})(XMLHttpRequest);
