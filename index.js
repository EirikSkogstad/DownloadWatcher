const path = require('path');
const username = require('username');

const currentUsername = username.sync();
const watchPath = path.join('C:', 'Users', currentUsername, 'Downloads');
const destinationPath = path.parse('E:\\_Games\\_SteamF\\steamapps\\common\\Skyrim\\_ModOrganizer\\downloads');

const fileRegex