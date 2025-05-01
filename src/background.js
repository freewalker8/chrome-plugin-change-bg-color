chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    chrome.tabs.query({ active: true }, (tabs) => {
      console.log("Scanning tab id:", tabs[0].id);
    });
    if (request.action === 'changeBackgroundColor') {
        chrome.scripting.executeScript({ 
            target: { tabId: request.activeTabId }, 
            func: (color) => {
              // 在目标网页中执行修改背景色
              document.body.style.backgroundColor = color;
              // 搜索document上面的所有背景色为白色的块级元素，将背景色设置为变量color表示的颜色值。
              const blockElements = document.querySelectorAll('div, p, section, article, header, footer, main, nav, aside, h1, h2, h3, h4, h5, h6');
              blockElements.forEach(element => {
                // const computedStyle = window.getComputedStyle(element);           
                element.style.backgroundColor = color;
              });
              return "Injected successfully!";
            },
            args: [request.color] 
        }).then(() => {
            sendResponse({ status: '消息已接收，脚本执行成功' });
        }).catch((error) => {
            sendResponse({ status: '消息已接收，但脚本执行失败', error: error.message });
        });
    }
    sendResponse({ status: '消息已接收' });
    return true;
});