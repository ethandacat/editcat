// ==UserScript==
// @name         EditCat
// @namespace    ethandacat-EditCatProduction
// @version      0.1.6
// @description  Edit freely. Save globally. See quickly.
// @updateURL    https://github.com/ethandacat/editcat/raw/refs/heads/main/EditCat.user.js
// @downloadURL  https://github.com/ethandacat/editcat/raw/refs/heads/main/EditCat.user.js
// @author       ethandacat
// @match        *://*/*
// @grant        none
// @icon         https://i.imgur.com/YPUwRVS.png
// ==/UserScript==

const img = `data:image/png;base64,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`;

let inspecting = false;
let sidePanel;
let overlay;
let highlightedElement = null; // Track the currently highlighted element

function showElementInfo(element) {
    const tagName = element.tagName;
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className ? `.${[...element.classList].join('.')}` : "";
    const attributes = Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`).join(", ");
    const styles = getComputedStyle(element);
    const styleList = Array.from(styles).map(key => `${key}: ${styles.getPropertyValue(key)};`);
    const styleListHtml = styleList.join("<br>");

    sidePanel.innerHTML = `
        <h3>Element Details</h3>
        <details>
            <summary><strong>Identifiers</strong></summary>
            <p>Tag: ${tagName}</p>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Classes:</strong> ${classes}</p>
        </details>
        <details>
            <summary><strong>Attributes:</strong></summary>
            <p>${attributes || "No attributes available."}</p>
        </details>
        <details>
            <summary><strong>Styles:</strong></summary>
            <pre>
                ${styleListHtml}
            </pre>
        </details>
        <details>
            <summary><strong>Edit:</strong></summary>
            <input class="editcat-style-property" style="color:white;background-color:black;height:30px;width:auto;font-family:monospace;border-radius:0;border:1px solid white;" placeholder="property">
            <b>Style</b>
            <input class="editcat-style-value" style="color:white;background-color:black;height:30px;width:auto;font-family:monospace;border-radius:0;border:1px solid white;" placeholder="value">
            <button class="editcat-style-button" style="color:white; background-color:black; border:1px solid white;">Edit</button>
        </details>
    `;
    document.getElementsByClassName("editcat-style-button")[0].onclick = function () {
        // EditCat Style Edit
        let property = document.getElementsByClassName("editcat-style-property")[0].value;
        let value = document.getElementsByClassName("editcat-style-value")[0].value;

        element.style.setProperty(property, value);
    }
}



function highlightElement(event) {
    // Check if the clicked target is the EditCat button or inside the side panel to prevent highlighting
    if (event.target.closest('#editcat-button') || sidePanel.contains(event.target)) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Remove highlight from previously highlighted element
    if (highlightedElement) {
        highlightedElement.classList.remove("editcat-selected");
        highlightedElement.style.outline = ""; // Reset the outline
    }
    highlightedElement = event.target; // Update the currently highlighted element
    highlightedElement.classList.add("editcat-selected");
    highlightedElement.style.outline = "2px solid yellow"; // Highlight the new element
    showElementInfo(highlightedElement);
}

function toggleInspector() {
    inspecting = !inspecting;

    if (inspecting) {
        // Create non-interactive background overlay
        overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100%";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "999997";
        overlay.style.pointerEvents = "none"; // Allow clicks to pass through
        document.body.appendChild(overlay);

        // Create side panel for element details
        sidePanel = document.createElement("div");
        sidePanel.style.position = "fixed";
        sidePanel.style.top = "30px";
        sidePanel.style.right = "30px";
        sidePanel.style.width = "300px";
        sidePanel.style.height = "calc(100% - 60px)";
        sidePanel.style.backgroundColor = "#222"; // Dark background
        sidePanel.style.color = "white"; // Text color
        sidePanel.style.border = "1px solid #444";
        sidePanel.style.padding = "10px";
        sidePanel.style.boxShadow = "0 0 10px rgba(0, 0, 0, 0.5)";
        sidePanel.style.overflowY = "auto";
        sidePanel.style.zIndex = "999999";
        sidePanel.style.fontFamily = "monospace";
        sidePanel.style.fontSize = "2em;";
        document.body.appendChild(sidePanel);

        document.body.addEventListener("click", highlightElement, true);
    } else {
        // Remove overlay, side panel, and event listeners
        document.body.removeEventListener("click", highlightElement, true);
        if (overlay) overlay.remove();
        if (sidePanel) sidePanel.remove();

        // Reset highlight on exit
        if (highlightedElement) {
            highlightedElement.style.outline = ""; // Remove the outline
            highlightedElement = null; // Reset the highlighted element
        }
    }
}

// Create the inspector button (with a unique ID)
const inspectButton = document.createElement("div");
inspectButton.innerHTML = `<button id='editcat-button' style='position:fixed; top:30px; left:30px; color: white; background-color:black; border-radius:20px; width:40px; height:40px; border: none; z-index:999999;'><img src='${img}' width="30" height="auto"></button>`;
inspectButton.onclick = toggleInspector;

document.body.appendChild(inspectButton);
