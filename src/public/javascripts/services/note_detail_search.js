import noteDetailService from "./note_detail.js";
import treeService from "./tree.js";
import infoService from './info.js';

const $searchString = $("#search-string");
const $component = $('#note-detail-search');
const $refreshButton = $('#note-detail-search-refresh-results-button');

function show() {
    $component.show();

    console.log(noteDetailService.getCurrentNote());

    try {
        const json = JSON.parse(noteDetailService.getCurrentNote().noteContent.content);

        $searchString.val(json.searchString);
    }
    catch (e) {
        console.log(e);
        $searchString.val('');
    }

    $searchString.on('input', noteDetailService.noteChanged);
}

function getContent() {
    return JSON.stringify({
        searchString: $searchString.val()
    });
}

$refreshButton.click(async () => {
    await noteDetailService.saveNoteIfChanged();

    treeService.reload();

    infoService.showMessage('Tree has been refreshed.');
});

export default {
    getContent,
    show,
    focus: () => null,
    onNoteChange: () => null,
    cleanup: () => null,
    scrollToTop: () => null
}