import { Color } from "three";
import { IfcViewerAPI } from "web-ifc-viewer";
import {
    IFCWALL,
    IFCWALLSTANDARDCASE,
    IFCSLAB,
    IFCWINDOW,
    IFCMEMBER,
    IFCPLATE,
    IFCCURTAINWALL,
    IFCDOOR} from 'web-ifc';

const container = document.getElementById("viewer-container");
const viewer = new IfcViewerAPI({
    container,
    backgroundColor: new Color(0xffffff),
});
viewer.axes.setAxes();
viewer.grid.setGrid();

const input = document.getElementById("file-input");

async function loadIfc(event) {
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
input.onchange = loadIfc;