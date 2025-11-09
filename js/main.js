// main.js

// main program handler of EditCat

const img = 'https://i.postimg.cc/4x8jqb73/image.png'

function loadHTML(url, container) {
  fetch(url)
    .then(response => response.text())
    .then(template => {
      // Evaluate template using global window as context
      const evaluateTemplate = new Function(
        "with(window) { return `" + template + "`; }"
      );

      const renderedHTML = evaluateTemplate.call(window);

      container.innerHTML = renderedHTML;
    })
    .catch(error => {
      console.error("Error loading HTML template:", error);
    });
}

const shadowHost = document.createElement('div');
shadowHost.classList.add("editcat-shadow-host");
document.body.appendChild(shadowHost);
const shadowFace = shadowHost.attachShadow({ mode: 'open' });
const shadowRoot = document.createElement("div");
shadowRoot.classList.add("editcat-shadow-root");
shadowFace.appendChild(shadowRoot);

let inspecting = false;
let sidePanel;
let overlay;
let highlightedElement = null; // Track the currently highlighted element

function showElementInfo(element) {
    const tagName = element.tagName;
    const id = element.id ? `#${element.id}` : "";
    const classes = element.className ? `.${[...element.classList].join('.')}` : "";
    const attributes = Array.from(element.attributes).map(attr => `${attr.name}="${attr.value}"`).join("<br><br>").split("=").join(": ").split("\"").join("");
    const styles = getComputedStyle(element);
    const styleList = Array.from(styles).map(key => `${key}: ${styles.getPropertyValue(key)};`);
    const styleListHtml = styleList.join("<br>");

    loadHTML("https://github.com/ethandacat/editcat/raw/refs/heads/refactor/html/panel.html", sidePanel);

    document.getElementsByClassName("editcat-att-button")[0].onclick = function () {
        // EditCat Style Edit
        let property = document.getElementsByClassName("editcat-att-property")[0].value;
        let value = document.getElementsByClassName("editcat-att-value")[0].value;

        element.setAttribute(property, value);
    }
    document.getElementsByClassName("editcat-style-button")[0].onclick = function () {
        // EditCat Style Edit
        let property = document.getElementsByClassName("editcat-style-property")[0].value;
        let value = document.getElementsByClassName("editcat-style-value")[0].value;

        element.style.setProperty(property, value);
    }
    document.getElementsByClassName("editcat-class-button")[0].onclick = function() {
        let property = document.getElementsByClassName("editcat-class-property")[0].value;
        element.classList.add(property);
    }
    document.getElementsByClassName("editcat-class-button")[1].onclick = function() {
        let property = document.getElementsByClassName("editcat-class-property")[0].value;
        element.classList.remove(property);
    }

}



function highlightElement(event) {
    // Check if the clicked target is the EditCat button or inside the side panel to prevent highlighting
    if (shadowRoot.contains(event.target) || event.target == shadowHost) {
        return;
    }

    event.preventDefault();
    event.stopPropagation();

    // Remove highlight from previously highlighted element
    if (highlightedElement) {
        highlightedElement.classList.remove("editcat-selected");
        highlightedElement.style.outline = ""; // Reset the outline
        sidePanel.innerHTML = "<h3>Select an element!</h3>";
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
        overlay.style.borderRadius = "0";
        overlay.style.margin = "0";
        overlay.style.padding = "0";
        overlay.style.position = "fixed";
        overlay.style.top = "0";
        overlay.style.left = "0";
        overlay.style.width = "100%";
        overlay.style.height = "100vh";
        overlay.style.backgroundColor = "rgba(0, 0, 0, 0.5)";
        overlay.style.zIndex = "999997";
        overlay.style.pointerEvents = "none"; // Allow clicks to pass through
        document.body.appendChild(overlay);

        // Create side panel for element details
        sidePanel = document.createElement("div");
        sidePanel.classList.add("editcat-bg");
        sidePanel.style.margin = "0";
        sidePanel.style.padding = "0";
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
        sidePanel.style.fontSize = "1.9em;";
        sidePanel.innerHTML = "<h3>Select an element!</h3>";
        shadowRoot.appendChild(sidePanel);

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
loadHTML("https://github.com/ethandacat/editcat/raw/refs/heads/refactor/html/inspect.html");
inspectButton.onclick = toggleInspector;
inspectButton.id = "editcat-button-container";
shadowRoot.appendChild(inspectButton);

function checkToStopEditCat() {
    if (document.querySelector("#disable-editcat") != null) {
        shadowHost.remove();
        console.log("Website signaled to stop EditCat. EditCat has stopped.")
    }
}

setInterval(checkToStopEditCat, 1000);