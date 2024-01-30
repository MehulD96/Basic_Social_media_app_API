import multer from "multer"
import path from 'path';
const __dirname = path.resolve()

const storage = multer.diskStorage({
    destination: function (request, file, callback) {
        callback(null, path.join(__dirname, '/public/userimages'));
    },
    filename: function (request, file, callback) {
        const ext = file.originalname.split('.');
        callback(null, Date.now() + file.originalname);
    }
});

// Create multer instance
const upload = multer({ storage: storage }).single('image');

// Create Sequelize middleware
async function Uploads(req, res, next) {
    upload(req, res, async (err) => {
        if (err) {
           return res.status(400).send(err);
        } else {
            if (req.file) {
                if (
                    !req.file.originalname.match(/\.(pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg)$/)
                ) {
                   return res.status(400).send({
                        status: 400,
                        message: "Only allowd pdf|jpg|JPG|jpeg|JPEG|png|PNG|svg",
                    });
                } else {
                    const path = req.file.filename;
                    // path = `${frontEndUrl}/images/${path}`;
                    req.fileurl = path;
                    next();
                }
            } else {
                req.fileurl = "";
                next();
            }
        }
    });
};
export default Uploads