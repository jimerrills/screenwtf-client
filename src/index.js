const { app, globalShortcut, dialog, clipboard, shell, Tray, Menu } = require('electron');
const path = require('path');
const exec = require('child_process').exec;
const axios = require('axios');
const request = require('request');
const notifier = require('node-notifier');

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require('electron-squirrel-startup')) { // eslint-disable-line global-require
  app.quit();
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.

const commands = {
  'linux': 'gnome-screenshot -ac',
  'darwin': 'screencapture -ic',
  'win32': 'snippingtool /clip'
};

function attemptScreenshot() {
  const osType = process.platform;
  if (osType in commands) {
    const cmd = commands[osType]

    var out = exec(cmd, function(err, stdout, stderr) {
      if (err) {
        return;
      }

      const img = clipboard.readImage().toDataURL();

      request.post({
        url: 'https://screen.wtf/upload.php',
        headers: {
          'Content-type': 'multipart/form-data'
        },
        formData: {
          image: img,
          token: '[][]JIMSLIP123[][]'
        }
      }, function(error, response, body) {
        if(1) {
          if(body === "No."){
            return;
          }
          const newUrl = JSON.parse(body)['url']
          shell.openExternal(newUrl);
          clipboard.writeText(newUrl);

          notifier.notify({
            title: 'Screen.wtf',
            message: 'Link to your screenshot has been copied to your clipboard.'
          })
        }else{
          console.log(body);
        }
      });
    });

  }else{
    dialog.showErrorBox("Unsupported OS", "Your operating system doesn't support Screen.wtf")
    app.quit()
  }
}

app.on('ready', () => {
  globalShortcut.register('Alt+Q', () => {
    attemptScreenshot()
  });
});

// Quit when all windows are closed.
app.on('window-all-closed', () => {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and import them here.
