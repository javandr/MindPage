const { app, BrowserWindow } = require('electron')
const path = require('path')

const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    frame: false,  
    webPreferences: {
      preload: path.join(__dirname, 'preload.js')
    }
  })

  // Add buttons for closing, minimizing, and maximizing the window
  mainWindow.setMenu(null)
  mainWindow.maximize()
  mainWindow.setFullScreenable(false)
  mainWindow.setResizable(false)
  mainWindow.setClosable(true)

  const closeBtn = document.createElement('button')
  closeBtn.textContent = '×'
  closeBtn.classList.add('window-btn')
  closeBtn.addEventListener('click', () => mainWindow.close())
  mainWindow.document.body.appendChild(closeBtn)

  const minimizeBtn = document.createElement('button')
  minimizeBtn.textContent = '_'
  minimizeBtn.classList.add('window-btn')
  minimizeBtn.addEventListener('click', () => mainWindow.minimize())
  mainWindow.document.body.appendChild(minimizeBtn)

  const maximizeBtn = document.createElement('button')
  maximizeBtn.textContent = '□'
  maximizeBtn.classList.add('window-btn')
  maximizeBtn.addEventListener('click', () => {
    if (mainWindow.isMaximized()) {
      mainWindow.unmaximize()
      maximizeBtn.textContent = '□'
    } else {
      mainWindow.maximize()
      maximizeBtn.textContent = '❐'
    }
  })
  mainWindow.document.body.appendChild(maximizeBtn)

  // and load the index.html of the app.
  mainWindow.loadFile('index.html')
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow()

  app.on('activate', () => {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (BrowserWindow.getAllWindows().length === 0) createWindow()
  })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit()
})

