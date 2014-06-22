var defSettings = {
  "targets": [
     "https://order.step.rakuten.co.jp/rms/mall/basket/vc*"
    ,"https://basket.step.rakuten.co.jp/rms/mall/bs/confirmorder/*"
    ,"https://basket.step.rakuten.co.jp/rms/mall/bs/confirmorderquicknormalize/*"
    ,"https://ask.step.rakuten.co.jp/rms/mall/pa/ask/vc"
    ,"https://books.step.rakuten.co.jp/rms/mall/book/bs/QuickConfirmOrder"
    ,"https://books.step.rakuten.co.jp/rms/mall/book/bs/ConfirmOrder"
    ,"https://rsvh.travel.rakuten.co.jp/rsv/RsvInput.do*"
    ,"https://prize.travel.rakuten.co.jp/frt/confirm.do"
    ,"https://auction.step.rakuten.co.jp/rms/mall/sa/vc*"
    ,"https://sa.step.rakuten.co.jp/rms/mall/sa/vc"
    ,"https://delivery.rakuten.co.jp/?module=Default&action=OrderStep"
   ]
};

// The app runtime loads the event page from a user's desktop and the onLaunch() event is fired.
// This event tells the event page what windows to launch and their dimensions.
// The lifecycle diagram here isn't the nicest to look at, but it's practical (and we will make it nicer soon).
//chrome.app.runtime.onLaunched.addListener(function() { 
//  //console.log("chrome.app.runtime.onLaunched.addListener");
//});

//Fired when the extension is first installed, when the extension is updated to a new version,
// and when Chrome is updated to a new version.
chrome.app.runtime.onInstalled.addListener(function(details) { 
  //console.log("chrome.app.runtime.onInstalled.addListener");

  if (details.reason == "install") {
    //console.log("This is a first install!");

    // Initialize setting.
    localStorage.txtTargets = JSON.stringify(defSettings.targets);

    // Open options page to notify existance.
    chrome.tabs.create({
      url: chrome.extension.getURL('options.html')
    });
  } else if (details.reason == "update") {
    //var thisVersion = chrome.runtime.getManifest().version;
    //console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");

    // 1.4 までのインストール時にターゲットが初期化されないバグ対応
    if (parseFloat(details.previousVersion) <= 1.4) {
      // If the user has no targets.
      if (localStorage.txtTargets === null || localStorage.txtTargets === "") {
        // Initialize settings.
        localStorage.txtTargets = JSON.stringify(defSettings.targets);
        // Open options page to notify existance.
        chrome.tabs.create({
          url: chrome.extension.getURL('options.html')
        });
      }
    }
  }
});

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
      case "GetDefSettings":
        sendResponse(defSettings);
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

