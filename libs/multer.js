const multer = require('multer');
const path = require('path');

function generateStorage(props){
    let {location, allowMimeTypes} = props;
    return multer({
        storage: multer.diskStorage({
            destination: function (req, file, cb){
                cb(null, location);
            },
            filename: function (req, file, cb){
                const filename = Date.now() + path.extname(file.originalname);
                cb(null, filename);
            }
        }),
        fileFilter: (req, file, callback) => {
            if(!allowMimeTypes.includes(file.mimetype)) {
                const err = new Error (`Only ${allowMimeTypes.join(', ')} allowed to Upload`);
                return callback(err, false);
            }
            callback(null, true);
        },
        onError: (err, next) => {
            next(err);
        }
    });
}

function generateFilter (props) {
    let {allowMimeTypes} = props;
    return multer ({
        fileFilter: (req, file, callback) => {
            if(!allowMimeTypes.includes(file.mimetype)) {
                const err = new Error(`Only ${allowMimeTypes.join(', ')} allowed to upload`);
                return callback (err, false);
            }
            callback (null, true);
        },
        onError: (err, next) => {
            next(err);
    }
    })
}

module.exports = {
    image: generateFilter({
        allowMimeTypes: ['image/png', 'image/jpeg']
    }),

    video: generateFilter({
        allowMimeTypes: ['video/x-msvideo', 'video/mp4', 'video/mpeg']
    }),

    document: generateFilter({
        allowMimeTypes: ['application/pdf']
    }),
};