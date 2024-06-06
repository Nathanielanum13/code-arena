// 1. Set an on change event on the video upload input
$("#video").on("change", function() {
    console.log('Trying to upload the video file: %O', this);

    if ('files' in this) {
        if (this.files.length === 0) {
            alert("Select a file to upload");
        } else {
            var $source = $('#videoSource');
            $source[0].src = URL.createObjectURL(this.files[0])
            $source.parent()[0].load();
        }
    }
});

