
var ImproveAI = function(apikey, user_id, version) {

  this.apikey = apikey;
  this.user_id = user_id;
  this.base_url = "https://api.improve.ai/"
  this.version = version || "v1"

  var async = function (options)
  {
      let theUrl = options.url;
      let method = options.method || 'GET';
      let headers = options.headers || {};
      let data = options.data;
      let success = options.success;
      let error = options.error;

      // /*
      let xmlHttp = new XMLHttpRequest();
      xmlHttp.onreadystatechange = function() {
          if (xmlHttp.readyState == 4)
            if (xmlHttp.status >= 200 && xmlHttp.status < 400)
              success(xmlHttp.responseText, xmlHttp.status);
            else error(xmlHttp.responseText, xmlHttp.status);
      };
      xmlHttp.open(method, theUrl, true); // true for asynchronous
      for (let key in headers) {
        xmlHttp.setRequestHeader(key, headers[key]);
      }
      xmlHttp.send(data);
      /*/

      console.log(options);
      // $.ajax(options);

      success(JSON.stringify({
        "properties": {
          "headline": "Truck Carrying Fruit Crashes, Creates Jam"
        }
      }), 200);

      //*/
  };

  let log = function(message) {
    console.log(message);
  };

  this.choose = function(property_key, choices, funnel, completion) {

    var data = {
        "property_key": property_key,
        "choices": choices,
        "funnel": funnel,
        "user_id": this.user_id,
    };

    log(data);


    async({
        method: 'POST',
        dataType: "json",
        ContentType: "application/json",
        // dataType: 'text/plain',
        // processData: true,
        // beforeSend: function(request) {
        //   request.setRequestHeader("x-api-key", this.apikey);
          // request.setRequestHeader("Content-Type", "application/json");
        // },
        url: this.base_url + version + "/choose",
        // url: 'http://requestb.in/vqnqdgvq',
        headers: {
            "x-api-key" : this.apikey,
            // "Content-Type" : "text/plain",
        },
        data: JSON.stringify(data),
        success: function(data, status) {

            log("choose completed success: ");
            log(data);

            if (completion) {
              completion(data, status);
            }
        },
        error: function(error, status) {
          log("choose complete with error: ");
          log(error);
          if (completion) {
            completion(error, status);
          }
        }
      });
  };

  this.choose_price = function(property_key, prices, funnel, completion) {
    log({
        "_function": "choose_price",
        "property_key": property_key,
        "prices": prices,
        "funnel": funnel,
        "user_id": this.user_id,
    });
  };

  this.track = function(event, properties) {
    log({
        "_function": "track",
        "event": event,
        "properties": properties,
        "user_id": this.user_id,
    });
  };

  return this;

};

console.log("ImproveAI.js loaded");
