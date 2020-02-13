const path = require("path");
const fs = require("fs");
const Transform = require("stream").Transform;


function mkdirp(dir, cb) {
    if (dir === ".") return cb();
    fs.stat(dir, function (err) {
        if (err == null) return cb(); // already exists

        const parent = path.dirname(dir);
        mkdirp(parent, function () {
            // process.stdout.write(dir.replace(/\/$/, "") + "/\n");
            fs.mkdir(dir, cb);
        });
    });
}

module.exports = function handleZipFile(err, file, location) {
    if (err) throw err;

    // track when we've closed all our file handles
    let handleCount = 0;

    function incrementHandleCount() {
        handleCount++;
    }

    function decrementHandleCount() {
        handleCount--;
        if (handleCount === 0) {
            console.log("all input and output handles closed");
        }
    }

    incrementHandleCount();
    file.on("close", function () {
        console.log("closed input file");
        decrementHandleCount();
    });

    file.readEntry();
    file.on("entry", function (entry) {
        // console.log(entry);
        if (/\/$/.test(entry.fileName)) {
            // directory file names end with '/'
            mkdirp(location + "/" + entry.fileName, function () {
                if (err) throw err;
                file.readEntry();
            });
        } else {
            // ensure parent directory exists
            mkdirp(location + "/" + path.dirname(entry.fileName), function () {
                file.openReadStream(entry, function (err, readStream) {
                    if (err) throw err;
                    // report progress through large files
                    let byteCount = 0;
                    const totalBytes = entry.uncompressedSize;
                    let lastReportedString = byteCount + "/" + totalBytes + "  0%";

                    // process.stdout.write(entry.fileName + "..." + lastReportedString);

                    function reportString(msg) {
                        let clearString = "";
                        for (let i = 0; i < lastReportedString.length; i++) {
                            clearString += "\b";
                            if (i >= msg.length) {
                                clearString += " \b";
                            }
                        }
                        // process.stdout.write(clearString + msg);
                        lastReportedString = msg;
                    }

                    // report progress at 60Hz
                    const progressInterval = setInterval(function () {
                        reportString(byteCount + "/" + totalBytes + "  " + ((byteCount / totalBytes * 100) | 0) + "%");
                    }, 1000 / 60);
                    const filter = new Transform();
                    filter._transform = function (chunk, encoding, cb) {
                        byteCount += chunk.length;
                        cb(null, chunk);
                    };
                    filter._flush = function (cb) {
                        clearInterval(progressInterval);
                        reportString("");
                        // delete the "..."
                        // process.stdout.write("\b \b\b \b\b \b\n");
                        cb();
                        file.readEntry();
                    };

                    // pump file contents
                    const writeStream = fs.createWriteStream(location + "/" + entry.fileName);
                    incrementHandleCount();
                    writeStream.on("close", decrementHandleCount);
                    readStream.pipe(filter).pipe(writeStream);
                });
            });
        }
    });
};
