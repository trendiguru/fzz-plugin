let extension = null;

if (window.extension) {
    extension = window.extension;
}
else if (window.chrome && window.chrome.extension) {
    extension = window.chrome.extension;
}

export default extension;
