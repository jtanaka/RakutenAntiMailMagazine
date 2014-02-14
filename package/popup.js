
// Click handlers
$(function() {
  $("#div_add").click(function(){
    $(this).fadeOut(250);
    chrome.tabs.query({active:true}, function(tabs){
      //console.log(tabs);
      AddTarget(tabs[0].url);
    });
    $(this).fadeIn(250);
  });
  
  $("#div_setting").click(function(){
    var theUrl = 'options.html';
    chrome.tabs.create({url: theUrl});
 
  });
  
  $("#div_about").click(function(){
    var theUrl = 'https://chrome.google.com/webstore/detail/rakuten-anti-mail-magazin/kclbpbfpfddcglkinajbcfcldhpdkmmk';
    chrome.tabs.create({url: theUrl});
  });

  $("#div_rankChkr").click(function(){
    var theUrl = 'https://chrome.google.com/webstore/detail/楽天市場-ジャンル別ランキング-チェッカー/cbkfbpldkdcackefdcehbinedcmefbon';
    chrome.tabs.create({url: theUrl});
  });

});

// Add the url of the current tab to target list.
function AddTarget(url){
  //console.log(url);
  var targets = JSON.parse(localStorage.txtTargets);
  targets.push(url);
  localStorage.txtTargets = JSON.stringify(targets);
}

