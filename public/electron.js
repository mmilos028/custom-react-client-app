const electron = require('electron');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const shell = electron.shell;

const path = require('path');
//const url = require('url');
const isDev = require('electron-is-dev');

const macaddress = require('macaddress');

const ipcMain = electron.ipcMain;
//const ipcRenderer = electron.ipcRenderer;

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow;

let DEBUG = false;

function createWindow () {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1024,
    height: 800,
    //frame: false,
    webPreferences: {
      nodeIntegration: false,
      preload: __dirname + "/preload.js",
      devTools: DEBUG
    }
  });

  process.env['ELECTRON_DISABLE_SECURITY_WARNINGS'] = 'true';
  // and load the index.html of the app.

  /*
  const startUrl = process.env.ELECTRON_START_URL || url.format({
    pathname: path.join(__dirname, '/../build/index.html'),
    protocol: 'file:',
    slashes: true
  });
  */

  mainWindow.loadURL(
    isDev
			? 'http://localhost:3000'
      : `file://${path.join(__dirname, '../build/index.html')}`
  );

  /*    
  if (isDev) {
		const {
			default: installExtension,
			REACT_DEVELOPER_TOOLS,
			REDUX_DEVTOOLS,
		} = require('electron-devtools-installer');
    
		installExtension(REACT_DEVELOPER_TOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
      });
    
	  installExtension(REDUX_DEVTOOLS)
			.then(name => {
				console.log(`Added Extension: ${name}`);
			})
			.catch(err => {
				console.log('An error occurred: ', err);
      });
     
  }
  */

	mainWindow.once('ready-to-show', () => {    
		mainWindow.show();
  });
  
  mainWindow.once('unresponsive', () => {
    mainWindow.reload();
  });

  mainWindow.webContents.on('crashed', event => {    
    mainWindow.reload();
  });

  // Open the DevTools.
  if(DEBUG)
  {
    mainWindow.webContents.openDevTools();
  }
  

  //mainWindow.maximize();
  mainWindow.setMenu(null);
    
  mainWindow.webContents.on('did-finish-load', function() {
    mainWindow.webContents.send('detect-mac-address', {data: JSON.stringify(macaddress.networkInterfaces(), null, 2)});
  });

  ipcMain.on('open-external-window', (event, arg) => {
    shell.openExternal(arg);
  });

  /*ipcMain.on("print", (event) => {
    event.sender.print();
  });*/

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.on('ready', createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On macOS it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
})

app.on('activate', function () {
  // On macOS it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (mainWindow === null) {
    createWindow();
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.