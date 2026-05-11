# Multer - Middleware for `multipart/form-data`

Multer is a node.js middleware for handling `multipart/form-data`, which is primarily used for uploading files. It is written on top of [busboy](https://github.com/mscdex/busboy) for maximum efficiency.

**NOTE:** Multer will not process any form which is not multipart (`enctype="multipart/form-data"`).

## Installation

```bash
npm install --save multer
```

## Usage

Multer adds a `body` object and a `file` or `files` object to the `request` object. The `body` object contains the values of the text fields of the form, the `file` or `files` object contains the files uploaded via the form.

### Basic Implementation (Single File)

```javascript
const express = require('express')
const multer  = require('multer')
const upload = multer({ dest: 'uploads/' })

const app = express()

app.post('/profile', upload.single('avatar'), function (req, res, next) {
  // req.file is the `avatar` file
  // req.body will hold the text fields, if there were any
})
```

### Advanced Implementation (DiskStorage)

For full control over filenames and destinations, use `diskStorage`.

```javascript
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/tmp/my-uploads')
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix)
  }
})

const upload = multer({ storage: storage })
```

## API Reference

### `multer(opts)`

Multer accepts an options object, the most basic of which is `dest`, which tells Multer where to upload the files. In case you omit the options object, the files will be kept in memory and never written to disk.

| Key | Description |
| :--- | :--- |
| `dest` or `storage` | Where to store the files |
| `fileFilter` | Function to control which files are accepted |
| `limits` | Limits of the uploaded data |
| `preservePath` | Keep the full path of files instead of just the base name |

### Methods

#### `.single(fieldname)`
Accept a single file with the name `fieldname`. The single file will be stored in `req.file`.

#### `.array(fieldname[, maxCount])`
Accept an array of files, all with the name `fieldname`. Optionally error out if more than `maxCount` files are uploaded. The array of files will be stored in `req.files`.

#### `.fields(fields)`
Accept a mix of files, specified by `fields`. An object with arrays of files will be stored in `req.files`.
`fields` should be an array of objects with `name` and optionally `maxCount`.
Example:
```javascript
[
  { name: 'avatar', maxCount: 1 },
  { name: 'gallery', maxCount: 8 }
]
```

#### `.none()`
Accept only text fields. If any file is uploaded, error with code "LIMIT_UNEXPECTED_FILE" will be issued.

#### `.any()`
Accepts all files that come over the wire. An array of files will be stored in `req.files`.

---

## 🚀 Running This Project

1. **Clone & Install**:
   ```bash
   npm install
   ```
2. **Database Configuration**:
   Ensure `.env` contains your `MONGO_URI`.
3. **Start Development**:
   ```bash
   npm run dev
   ```
   *The server will run on `http://localhost:3000`.*

---

## 🛡️ Error Handling
When encountering an error, Multer will delegate the error to Express. You can display a nice error page using the standard express way.

```javascript
const upload = multer().single('avatar')

app.post('/profile', function (req, res) {
  upload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
    } else if (err) {
      // An unknown error occurred when uploading.
    }

    // Everything went fine.
  })
})
```
