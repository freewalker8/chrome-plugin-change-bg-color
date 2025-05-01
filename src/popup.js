document.addEventListener('DOMContentLoaded', function() {
    const colorPicker = document.getElementById('colorPicker');
    colorPicker.addEventListener('input', changeBackgroundColor);
    const applyColorButton = document.getElementById('applyColor');
    applyColorButton.addEventListener('click', changeBackgroundColor);

    function changeBackgroundColor() {
      const selectedColor = colorPicker.value;
      chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
          const activeTabId = tabs[0].id;          
          if (!activeTabId) {
              console.error('激活标签页ID无效');
              return;
          }
          chrome.runtime.sendMessage({
            activeTabId,
            action: 'changeBackgroundColor',
            color: selectedColor
          });
      });
  }
});