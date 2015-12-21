function toggle_details(element) {
    var details = element.parentNode.lastChild.previousSibling;
    if (details.hidden) {
        element.innerHTML = "&#x25be;";
    } else {
        element.innerHTML = "&#x25b8;";
    }
    details.hidden = !details.hidden;
}
