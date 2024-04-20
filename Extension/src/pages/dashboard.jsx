import React, { useEffect } from 'react';
const Dashboard = () => {
    useEffect(() => {
        chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
            if (tabs && tabs.length > 0) {
                const url = tabs[0].url;
                console.log('Current tab URL:', url);
            } else {
                console.error('Unable to retrieve current tab information.');
            }
        });
        const captureScreenshot = () => {
            chrome.runtime.sendMessage({ action: 'capture' }, response => {
                console.log(response)
              if (response) {
                console.log('Screenshot captured successfully.');
              } else {
                console.error('Failed to capture screenshot.');
              }
            });
          };
      
          // Trigger the screenshot capture when the component mounts
          captureScreenshot();
    }, []);
    return ( 
        <>
            <h1>
                hello
            </h1>
        </>
     );
}
 
export default Dashboard;