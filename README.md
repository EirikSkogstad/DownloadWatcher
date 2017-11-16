# DownloadWatcher
Application written i Node.js for watching a folder. When new files of a certain type(.zip and .7z) 
is added to the folder, then it's automatically copied to destination folder.

The reason I created this was because I was tired of having to copy archive files manually when I was modding games like Skyrim. 
## Requirements:
- Needs Node `8.5.0` or higher.

#### Creating executable for Windows:
`npm i pkg -g`
`pkg index.js --targets latest-win-x64`
