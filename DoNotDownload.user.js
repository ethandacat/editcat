// ==UserScript==
// @name         EditCat
// @namespace    http://tampermonkey.net/
// @version      0.1.3
// @description  Edit freely. Save globally. See quickly.
// @author       ethandacat
// @match        *://*/*
// @grant        none
// @icon         https://i.imgur.com/YPUwRVS.png
// ==/UserScript==

let inspecting = false;
let sidePanel;
let overlay;
let highlightedElement = null; // Track the currently highlighted element
let cZIndex = "auto";

function showElementInfo(element) {
    const tagName = element.tagName;
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className ? `.${[...element.classList].join('.')}` : "";
    const attributes = Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`).join(", ");
    const styles = getComputedStyle(element);
    const styleList = Array.from(styles).map(key => `${key}: ${styles.getPropertyValue(key)};`).join("<br>");

    sidePanel.innerHTML = `
        <h3>Element Details</h3>
        <details>
            <summary><strong>Identifiers</strong> </summary>
            <p>Tag: ${tagName}</p>
            <p><strong>ID:</strong> ${id}</p>
            <p><strong>Classes:</strong> ${classes}</p>
        </details>
        <details>
            <summary><strong>Attributes:</strong></summary>
            <p>${attributes ? attributes : "No attributes available."}</p>
        </details>
        <details>
            <summary>Styles</summary>
            <pre>${styleList}</pre>
        </details>
    `;
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
        highlightedElement.style.zIndex = cZIndex;
        highlightedElement.style.outline = ""; // Reset the outline
    }
    highlightedElement = event.target; // Update the currently highlighted element
    cZIndex = highlightedElement.style.zIndex;
    highlightedElement.style.zIndex = "999998";
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
inspectButton.innerHTML = "<button id='editcat-button' style='position:fixed; top:30px; left:30px; color: white; background-color:black; border-radius:17px; width:100px; height:40px; border: none; z-index:999999;'>EditCat</button>";
inspectButton.onclick = toggleInspector;

document.body.appendChild(inspectButton);

