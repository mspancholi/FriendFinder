// ===============================================================================
// LOAD DATA
// We are linking our routes to a series of "data" sources.
// These data sources hold arrays of information on table-data, waitinglist, etc.
// ===============================================================================

var friendData = require("../data/friends");



// ===============================================================================
// ROUTING
// ===============================================================================

module.exports = function (app) {
  // API GET Requests
  // Below code handles when users "visit" a page.
  // In each of the below cases when a user visits a link
  // (ex: localhost:PORT/api/admin... they are shown a JSON of the data in the table)
  // ---------------------------------------------------------------------------

  app.get("/api/friends", function (req, res) {
    res.json(friendsData);
  });

  // API POST Requests
  // Below code handles when a user submits a form and thus submits data to the server.
  // In each of the below cases, when a user submits form data (a JSON object)
  // ...the JSON is pushed to the appropriate JavaScript array
  // (ex. User fills out a survey request... this data is then sent to the server...
  // Then the server saves the data to the tableData array)
  // ---------------------------------------------------------------------------

  app.post("/api/friends", function (req, res) {
    // Note the code here. Our "server" will respond to requests and let users know if they have a table or not.
    // It will do this by sending out the value "true" have a table
    // req.body is available since we're using the body parsing middleware
    // this is where a function will be called that will do the friends comparison to determine best match.

    console.log("Friend: " + JSON.stringify(req.body));
    var bestFriendData = findBestMatch(req.body);
    friendData.push(req.body);
    console.log("Best friend: " + JSON.stringify(bestFriendData));
    //$("#myModal").modal("show");
    res.json(bestFriendData);


  });
};

function findBestMatch(friendInfo) {
  var differenceArray = [];

  for (var i = 0; i < friendData.length; i++) {
    var diff = 0;
    for (var j = 0; j < friendData[i].scores.length; j++) {
      diff = diff + Math.abs(friendData[i].scores[j] - friendInfo.scores[j]);
    }

    differenceArray.push(diff);
  }

  var minIndex = findMinIndex(differenceArray);

  return friendData[minIndex];
};

function findMinIndex(differenceArray) {
  var minIndex = -1;
  if (differenceArray.length == 0) return minIndex;

  var minValue = 50;
    for (var i=0; i<differenceArray.length; i++) {
      if (differenceArray[i] < minValue) {
        minValue = differenceArray[i];
        minIndex = i;
      }
    }

  return minIndex;    
};