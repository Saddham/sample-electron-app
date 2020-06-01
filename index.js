const { app, BrowserWindow, ipcMain } = require('electron')

function createWindows() {
    let appWindow = new BrowserWindow({
        width: 600,
        height: 800,
        center: true,
        minWidth: 300,
        show: false
    })

    appWindow.loadFile('./index.html')

    let aboutWindow = new BrowserWindow({
    	width: 300,
    	height: 300,
    	frame: false,
    	show: false,
    	webPreferences: {
    		nodeIntegration: true
    	}
	})

	aboutWindow.loadFile('./about.html')

    aboutWindow.on('closed', () => {
    	aboutWindow.hide()
        aboutWindow = null
    })

    ipcMain.on('closeInfoWindow', (event) => {
    	aboutWindow.hide()
    })

    appWindow.once('ready-to-show', () => {
    	appWindow.maximize()
        appWindow.show()

        setTimeout(() => {
        	aboutWindow.show()
        }, 1000)
    })

    appWindow.on('closed', () => {
    	aboutWindow.hide()
        appWindow = null
    })

}

app.on('ready', createWindows)