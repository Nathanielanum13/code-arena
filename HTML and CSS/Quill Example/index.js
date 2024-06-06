var toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],  
    [ 'link', 'image', 'video', 'formula' ],         // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];
var options = {
    placeholder: 'Start your blog here...',
    theme: 'snow',
    modules: {
        toolbar: toolbarOptions
    }
};
var editor = new Quill('#editor', options);

let ed = document.querySelector("#editor")

let btn = document.querySelector("#btn")
let editArea = document.querySelector("#editor")
btn.addEventListener("click", (e) => {
    // console.log(JSON.stringify(editor.getContents()))
    console.log(ed.textContent)
})