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
  // �R���g���[���̏�����
  //
  EditTargets(false);
  var tgts = StrToJson(localStorage.txtTargets)
  LoadTargets(tgts);

  //
  // �C�x���g�o�^
  //
  // �y�ҏW�z�{�^��
  $("#btnEditTargets").click(function(){
    EditTargets(true);
  });
  // �y�ۑ��z�{�^��
  $("#btnSaveTargets").click(function(){
    SaveTargets();
    EditTargets(false);
  });
  // �y�L�����Z���z�{�^��
  $("#btnCancel").click(function(){
    LoadTargets(tgts);
    EditTargets(false);
  });
  // �y������Ԃ𕜌��z�{�^��
  $("#btnRestoreTargets").click(function () {
    chrome.runtime.sendMessage({ action: "GetDefSettings" }, function (defSettings) {
      //console.log(response.defSettings);

      // ���[�h�̂݁A�ۑ��͂��Ȃ�
      LoadTargets(defSettings.targets);
    });
  });

});

