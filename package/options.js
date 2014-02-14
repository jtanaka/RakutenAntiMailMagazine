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

// Save targets to local storage.
function SaveTargets(){
  var text = $("#txtTargets").val().replace(/\r\n|\r/g, "\n");
  var targets = text.split("\n");
  localStorage.txtTargets = JSON.stringify(targets);
}

function LoadTargets(targets){
  var s="";
  for(var i in targets){
    if (s !== "") {
      s = s + '\n';
    }
    s = s + targets[i];
  }
  $("#txtTargets").val(s);
}

function StrToJson(str){
  var targets;
  try {
    targets = JSON.parse(str);
  } catch(e) {
    targets = [];
  }

  return targets;
}

function EditTargets(editMode){
  if (editMode) {
    $("#txtTargets").prop('disabled', false);
    $("#btnEditTargets").hide();
    $("#btnSaveTargets").show();
    $("#btnCancel").show();
    $("#btnRestoreTargets").show();
  } else {
    $("#txtTargets").prop('disabled', true);
    $("#btnEditTargets").show();
    $("#btnSaveTargets").hide();
    $("#btnCancel").hide();
    $("#btnRestoreTargets").hide();
  }
}

// Click handlers
$(function() {

  //
  // コントロールの初期化
  //
  EditTargets(false);
  var tgts = StrToJson(localStorage.txtTargets)
  LoadTargets(tgts);

  //
  // イベント登録
  //
  // 【編集】ボタン
  $("#btnEditTargets").click(function(){
    EditTargets(true);
  });
  // 【保存】ボタン
  $("#btnSaveTargets").click(function(){
    SaveTargets();
    EditTargets(false);
  });
  // 【キャンセル】ボタン
  $("#btnCancel").click(function(){
    LoadTargets(tgts);
    EditTargets(false);
  });
  // 【初期状態を復元】ボタン
  $("#btnRestoreTargets").click(function(){
    // ロードのみ、保存はしない
    LoadTargets(defSettings.targets);
  });

});

