const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const username = require('username');

const legalExtensions = new Set();
legalExtensions.add('.7z');
legalExtensions.add('.zip');


const currentUsername = username.sync();
const watchPath = path.join('C:', 'Users', currentUsername, 'Downloads');
const destinationPath = 'E:\\_Games\\_SteamF\\steamapps\\common\\Skyrim\\_ModOrganizer\\downloads';


printWelcome();

const watcher = chokidar.watch(watchPath, {
  persistent: true,
  followSymlinks: false,
  ignoreInitial: true
});

watcher.on('add', (addedPath, stats) => {
  const fileExtension = path.extname(addedPath);
  if(!legalExtensions.has(fileExtension)) {
    printExtensionError(fileExtension);
    return;
  }


  const basename = path.basename(addedPath);
  const destination = path.join(destinationPath, basename);

  console.log(`Copying ${basename} to ${destination}`);

  fs.copyFile(addedPath, destination, (err) => {
    if(err) {
      console.log(err);
    }
  })
});

process.on('SIGINT', function onSigterm () {
  console.log('\nShutting down application..');
  watcher.close();
});

function printExtensionError(fileExtension) {
  // No need to log these temporary files
  const temporaryFileExtensions = new Set();
  set.add('.tmp');
  set.add('.crdownload');

  if(temporaryFileExtensions.has(fileExtension)) {
    return;
  }
  console.log(`${fileExtension} is not a legal extension. It has to be one of these extensions: `);
  legalExtensions.forEach(e => console.log(e));
}

function printWelcome() {
  console.log('\n\n=============== MOD MOVER ===============');
  console.log(` Now listening for for file changes on ${watchPath}`);
  console.log('Press CTRL + C to shutdown application.\n');
}