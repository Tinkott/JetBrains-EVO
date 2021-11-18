/* requirements */
const fs = require('fs')
const path = require('path')
const chalk = require('chalk')
const rimraf = require('rimraf')
const readline = require('readline-sync')


/* Program vars */
const programName = '   _____          ______             _               _______ _    _  _____  \n' +
    '  (_____)    _   (____  \\           (_)             (_______) |  | |/ ___ \\ \n' +
    '     _  ____| |_  ____)  ) ____ ____ _ ____   ___    _____  | |  | | |   | |\n' +
    '    | |/ _  )  _)|  __  ( / ___) _  | |  _ \\ /___)  |  ___)  \\ \\/ /| |   | |\n' +
    ' ___| ( (/ /| |__| |__)  ) |  ( ( | | | | | |___ |  | |_____  \\  / | |___| |\n' +
    '(____/ \\____)\\___)______/|_|   \\_||_|_|_| |_(___/   |_______)  \\/   \\_____/ \n'

const releaseVersion = '1.0r'
const JetBrainsFolderPath = process.env.APPDATA + '\\JetBrains\\'

let foldersInDict = fs.readdirSync(JetBrainsFolderPath, { withFileTypes: true })
    .filter(d => d.isDirectory())
    .map(d => d.name)
    .toString();

let folders = foldersInDict.split(',', 17).filter( (folder) => {
    return folder !== 'consentOptions'
})

/* Functions container */
async function openMenu() {

    const APP_DIR = process.env.APPDATA + '/JetBrains'
    const Q = 1

    console.log(chalk.cyan(programName))
    console.log(chalk.bgCyan.white(`version: ${releaseVersion}`))
    console.log(chalk.bold('Welcome, buddy!\n'))

    console.log(chalk.bgCyan.bold('Choose program to patch:'))
    for (let i = 0; i < folders.length; i++) {
        console.log(chalk.cyan(`[${i + Q}] - ${folders[i]}`))
    }

    console.log(chalk.redBright('\n[0] - EXIT'))
    const userChoice = readline.questionInt(chalk.white("Enter your choice: "))
    const correctedUserChoice = userChoice - Q

    if (userChoice === 0) {
        console.log(chalk.red('exiting...'))
        await new Promise(resolve => setTimeout(resolve, 1000))
        console.clear()
        process.exit(1)
    }
    folders.forEach((folder, i) => {
        if (correctedUserChoice === i) {
            const absoluteFolderPath = path.join(APP_DIR, folder)
            rimraf(`${absoluteFolderPath}/eval/**/*`, () => {
                console.log(chalk.green.bold('Successfully! Wait 2 seconds!'))
            })
        }
    })
    await new Promise(resolve => setTimeout(resolve, 2000))
    console.clear()
    return openMenu()
}

/* Program */
openMenu()