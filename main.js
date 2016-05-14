var history = window.history;

console.log("main");

var controller = Leap.loop({enableGestures: true}, function(frame){
  if(frame.valid && frame.gestures.length > 0){
    frame.gestures.forEach(function(gesture){
        switch (gesture.type){
          case "circle":
              chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                 var code = 'window.location.reload();';
                  chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
              });
              break;
          case "keyTap":
             

              break;
          case "screenTap":
              chrome.tabs.captureVisibleTab(null, {}, function (image) {
                   chrome.downloads.download({url:image},function(downloadId){
                    //just nothing  
                   });
              });
              break;
          case "swipe":
               var isHorizontal = Math.abs(gesture.direction[0]) > Math.abs(gesture.direction[1]);
              //Classify as right-left or up-down
              if(isHorizontal){
                  if(gesture.direction[0] > 0){
                      chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                         var code = 'history.go(1);';
                          chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
                      });
                  } else {
                      chrome.tabs.query({active: true, currentWindow: true}, function (arrayOfTabs) {
                         var code = 'history.go(-1);';
                          chrome.tabs.executeScript(arrayOfTabs[0].id, {code: code});
                      });
                  }
              } else { //vertical
                  if(gesture.direction[1] > 0){
                      swipeDirection = "up";
                  } else {
                      swipeDirection = "down";
                  }                  
              }
              console.log(swipeDirection)
              break;
        }
    });
  }
});