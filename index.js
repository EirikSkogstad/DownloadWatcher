const fs = require('fs');
const path = require('path');
const chokidar = require('chokidar');
const username = require('username');
const commandLineArgs = require('command-line-args');


// Replace with ENV or config file.
const currentUsername = username.sync();
const sourcePath = path.join('C:', 'Users', currentUsername, 'Downloads');
const destinationPath = 'E:\\_Games\\_SteamF\\steamapps\\common\\Skyrim\\_ModOrganizer\\downloads';
const legalExtensions = new Set();
legalExtensions.add('.7z');
legalExtensions.add('.zip');
legalExtensions.add('.rar');

const optionDefinitions = [
  { name: 'source', alias: 's', type: String, defaultValue: sourcePath},
  { name: 'destination', alias: 'd', type: String, defaultValue: destinationPath},
  { name: 'extensions', alias: 'e', type: Set, defaultValue: legalExtensions}
];

const options = commandLineArgs(optionDefinitions);

//console.log(options.source);
//console.log(options.destination);
//options.extensions.forEach(e => console.log(e));
//legalExtensions.forEach(e => options.extensions.has(e));

printWelcome();

const watcher = chokidar.watch(sourcePath, {
  persistent: true,
  followSymlinks: false,
  ignoreInitial: true,
});

watcher.on('add', (addedPath, stats) => {
  const fileExtension = path.extname(addedPath);
  if (!options.extensions.has(fileExtension)) {
    printExtensionError(fileExtension);
    return;
  }

  const basename = path.basename(addedPath);
  const destination = path.join(destinationPath, basename);

  console.log(`Copying ${basename} to ${destination}`);

  fs.copyFile(addedPath, destination, (err) => {
    if (err) {
      console.log(err);
    }
  });
});

process.on('SIGINT', function onSigterm() {
  console.log('\nShutting down application..');
  watcher.close();
});

function printExtensionError(fileExtension) {
  // No need to log these temporary files
  const temporaryFileExtensions = new Set();
  temporaryFileExtensions.add('.tmp');
  temporaryFileExtensions.add('.crdownload');

  if (temporaryFileExtensions.has(fileExtension)) {
    return;
  }
  console.log(
      `${fileExtension} is not a legal extension. It has to be one of these extensions: `);
  options.extensions.forEach(e => console.log(e));
}


function printWelcome() {
  console.log('\n\n=============== MOD MOVER ===============');
  console.log(` Now listening for for file changes on ${sourcePath}`);
  console.log('Press CTRL + C to shutdown application.\n');
}