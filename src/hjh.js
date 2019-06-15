app.post("/cover-upload", uploader.single("file"), s3.upload, function(
    req,
    res
) {
    console.log(req.body);
    console.log("req.file: ", req.file);
    var url = `${amazonUrl}${req.file.filename}`;

    if (req.file) {
        let userId = req.session.userId;

        db.uploadCoverImg(userId, url)
            .then(results => {
                console.log(results);
                console.log("uploaded successfuly. image url: ", url);
                res.json({
                    imageUrl: url,
                    success: true
                });
            })
            .catch(e => {
                console.log("error at /uplaod", e);
            });
    } else {
        res.json({
            success: false
        });
    }
});

{this.state.uploaderVisible && (
	<Uploader
		uploaded={this.uploaded}
		onBlur={e => {this.state.uploaderVisible = false}						/>
)}
