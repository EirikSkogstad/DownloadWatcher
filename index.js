const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const username = require('username');

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
  const basename = path.basename(addedPath);
  const destination = path.join(destinationPath, basename);

  console.log(`Moving ${basename} to ${destination}`);

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


function printWelcome() {
  console.log('\n\n=============== MOD MOVER ===============');
  console.log(` Now listening for for file changes on ${watchPath}`);
  console.log('Press CTRL + C to shutdown application.\n');
}