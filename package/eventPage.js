
// The app runtime loads the event page from a user's desktop and the onLaunch() event is fired.
// This event tells the event page what windows to launch and their dimensions.
// The lifecycle diagram here isn't the nicest to look at, but it's practical (and we will make it nicer soon).
//chrome.app.runtime.onLaunched.addListener(function() { 
//  //console.log("chrome.app.runtime.onLaunched.addListener");
//});

// The app runtime sends the onSuspend() event to the event page before unloading it.
// Your event page can listen out for this event and do clean-up tasks before the app closes.
chrome.runtime.onSuspend.addListener(function() { 
  // Do some simple clean-up tasks.
  //console.log("chrome.runtime.onSuspend.addListener");
});

// onMessage
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    //console.log(sender.tab ? "from a content script:" + sender.tab.url : "from the extension");

    // Switch by action
    switch (request.action) {
      case "IsTarget":
        var isTarget = IsTarget(sender.tab.url);
        sendResponse({result: isTarget});
        break;
      default:
        //console.log("The unknown action type has detected!");
        break;
    }
  }
);

// Judge the specified url is a target or not to be uncheck.
function IsTarget(curUrl){
  var isTarget = false;
  var targets = JSON.parse(localStorage.txtTargets);

  var ptn;
  for (var i=0; i<targets.length; i++){
    if (targets[i] === "") continue;
    ptn = targets[i];

    try{
      // Check the string has a wildcard or not.
      if (0 <= ptn.indexOf("*")) {
        // Compare the front half of a target and the url.
        ptn = ptn.split("*");
        if (0 === curUrl.indexOf(ptn[0])) {
          isTarget = true;
          break;
        }
      } else {
        // Compare the full strings.
        if (curUrl === ptn) {
          isTarget = true;
          break;
        }
      }
    } catch (e) {
      // N/A
    }
  }

  //console.log("The result of IsTarget is " + isTarget + ".");
  return isTarget;
}

