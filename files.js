const fileSelection = document.getElementById("fileSelection");
const directoryE = document.getElementById("directory");
const currentDirectoryE = document.getElementById("currentDirectory");

var filestruct = {
    "Documents" : {
        "type": "folder",
        "created": "unknown",
        "modified": "unknown",
        "accessed": "unknown",
        "children": {
            "Welcome" : {
                "type": "html",
                "created": "unknown",
                "modified": "unknown",
                "accessed": "unknown"
            },
            "Style" : {
                "type": "css",
                "created": "unknown",
                "modified": "unknown",
                "accessed": "unknown"
            },
            "Script" : {
                "type": "js",
                "created": "unknown",
                "modified": "unknown",
                "accessed": "unknown"
            },
            "Articles" : {
                "type": "folder",
                "created": "unknown",
                "modified": "unknown",
                "accessed": "unknown",
                "children": {
                    "Article 1" : {
                        "type": "html",
                        "created": "unknown",
                        "modified": "unknown",
                        "accessed": "unknown"
                    }
                }
            }
        }
    },
    "system32" : {
        "type": "folder",
        "created": "unknown",
        "modified": "unknown",
        "accessed": "unknown",
        "children": {
    
        }
    }
};

var currentPath = "C:/Documents/";

var individualFiles = document.getElementsByClassName("individualFile");

for (let i = 0; i < individualFiles.length; i++) {
    const e = individualFiles[i];
    e.onclick = (event) => {
        if (event.detail == 2) {
            console.log("hello");
        }
    }
}

function getPosition(string, subString, index) {
    return string.split(subString, index).join(subString).length;
}

function directoryToArray(dir) {
    var noRootDir = dir.replace("C:/", "");
    var slashes = noRootDir.match(/\//g);

    var foldersToDir = [];
    for (let i = 0; i < slashes.length; i++) {
        if (i == 0) {
            foldersToDir.push(noRootDir.substring(0, getPosition(noRootDir, "/", i + 1)));
        } else {
            foldersToDir.push(noRootDir.substring(getPosition(noRootDir, "/", i) + 1, getPosition(noRootDir, "/", i + 1)))
        }
    }

    return foldersToDir;
}

function openDirectiory(dir) {
    if (dir != "C:/") {
        var directoryArray = directoryToArray(dir);
    
        // get end path
    
        path = "";
    
        for (let i = 0; i < directoryArray.length; i++) {
            if (i > 0) {
                path += "."
            }
            path += `${directoryArray[i]}.children`;
        }
    
        var displayFiles = path.split('.').reduce(function(o, k) {
            return o && o[k];
        }, filestruct);
    
        // display

        currentDirectoryE.innerHTML = directoryArray[directoryArray.length - 1];
        // directoryE.innerHTML = 
    
    } else {
        var directoryArray = [];
        displayFiles = filestruct;
        currentDirectoryE.innerHTML = "This PC"
        directoryE.innerHTML = "<span>C:/</span>"
    }

    var fileSelectionInnerHTML = "";

    var displayFilesArray = [];

    for(var i in displayFiles) {
        displayFilesArray.push([i, displayFiles [i]]);
    }
    
    for (let i = 0; i < displayFilesArray.length; i++) {
        var filename = `${displayFilesArray[i][0]}.${displayFilesArray[i][1].type}`.replace(".folder", "")
        fileSelectionInnerHTML += `
        <div class="individualFile" id="${filename}">
            <img src="/assets/images/os/filetypes/${displayFilesArray[i][1].type}.svg">
            <p>${filename}</p>
        </div>`
    }

    fileSelection.innerHTML = fileSelectionInnerHTML;

    directoryEInnerHTML = "<span>C:/</span>"

    for (let i = 0; i < directoryArray.length; i++) {
        directoryEInnerHTML += `<span>${directoryArray[i]}/</span>`
    }

    directoryE.innerHTML = directoryEInnerHTML;

    directoryESpans = document.querySelectorAll("#directory > span");

    for (var i = 0; i < directoryESpans.length; i++) {
        const e = directoryESpans[i];
        let link = "C:/"
        for (let j = 0; j < i; j++) {
            link += `${directoryArray[j]}/`;
        }
        console.log(link)
        e.onclick = () => {openDirectiory(link)};
    }

    for (let i = 0; i < displayFilesArray.length; i++) {
        var filename = `${displayFilesArray[i][0]}.${displayFilesArray[i][1].type}`.replace(".folder", "")
        document.getElementById(filename).onclick = (event) => {
            if (event.detail == 2) {
                if (displayFilesArray[i][1].type == "folder") {
                    openDirectiory(`${dir}${displayFilesArray[i][0]}/`);
                }
            }
        }
    }
}

openDirectiory("C:/");