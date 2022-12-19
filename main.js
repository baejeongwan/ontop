const { app, BrowserWindow, protocol, Menu } = require('electron')
const path = require('path')

//#region Menu
const template = [
    {
        role: "filemenu"
    },
    {
        label: "Help",
        submenu: [
            {
                label: "About",
                click () {
                    require('electron').dialog.showMessageBox({message: "OnTopBrowser v" + require('electron').app.getVersion() + "\n\nBy Jayden Bae", type: "info", title: "About OnTopBrowser"})
                }
            }
        ]
    }
]
//#endregion


const createWindow = () => {
    const win = new BrowserWindow({
        height: 600,
        width: 400,
        webPreferences: {
            preload: path.join(__dirname, "preload.js"),
            webviewTag: true
        }
    })

    win.setAlwaysOnTop(true)

    win.loadFile("frame.html")

    protocol.registerFileProtocol("ontop", (req, cb) => {
        const filepath = req.url.substring(7)
        const absPath = path.join(__dirname, "ontop-internals", filepath, "index.html")
        console.log(absPath)
        cb(absPath)
    })
}

app.whenReady().then(() => {
    createWindow()
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
})

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit()
})