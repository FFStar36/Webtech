import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";

let container;
let viewer;
let properties;

// Script
setUpViewer();
const inputIFC = document.getElementById("fileInputIFC");
inputIFC.onchange = generateGLTF;
generateModelByJSON_GLTF(); // only for rollup to include function -> not good, better define in rollup config

// events
window.ondblclick = async () => {
    const result = await viewer.IFC.selector.pickIfcItem(true);
    const foundProperties = properties[result.id];
    console.log(foundProperties);
};

// functions
function getURL(fileInput){
    const file = fileInput.files[0]; // Die ausgewählte Datei
    if (!file) {
        console.error("Keine Datei ausgewählt.");
        return;
    }
    return URL.createObjectURL(file); // Die URL der ausgewählten Datei
}

async function generateModelByJSON_GLTF(){
    const URL_GLTF = getURL(document.getElementById("fileInputGLTF")); // Das Element des GLTF-Inputs
    const URL_JSON = getURL(document.getElementById("fileInputJSON")); // Das Element des GLTF-Inputs
    console.log(URL_GLTF);
    await viewer.GLTF.loadModel(URL_GLTF);

    // Load properties
    const rawProperties  = await fetch(URL_JSON);
    properties = await rawProperties.json();
}

async function setUpViewer() {
    container = document.getElementById("viewer-container");
    viewer = new IfcViewerAPI({
        container,
        backgroundColor: new Color(0xffffff),
    });
    viewer.axes.setAxes();
    viewer.grid.setGrid();
}

async function generateGLTF(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file);
    // let ifcModel = await viewer.IFC.loadIfcUrl(url);
    const result = await viewer.GLTF.exportIfcFileAsGltf({
        ifcFileUrl: url,
        getProperties: true
    });

    // Using Result and Downloading gLTF files

    // Creating Link Tag
    const link = document.createElement('a');
    document.body.appendChild(link);

    // Looping in result
    for(const categoryName in result.gltf) {
        const category = result.gltf[categoryName];

        // Looping in Category according to Levels
        for(const levelName in category) {
            const file = category[levelName].file;

            // If file is present for a level under category we will download it
            if(file) {
                // Downloading gLTF file in local machine
                link.download = `${file.name}_${categoryName}_${levelName}.gltf`;
                link.href = URL.createObjectURL(file);
                link.click();
            }
        }
    }

    // We will check for Properties in result and download the JSON file for it
    for(let jsonFile of result.json) {
        link.download = `${jsonFile.name}.json`;
        link.href = URL.createObjectURL(jsonFile);
        link.click();
    }

    // Removing the Node created for link
    link.remove();
}


