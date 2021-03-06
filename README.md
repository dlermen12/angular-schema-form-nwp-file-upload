Angular Schema Form File-Upload add-on by Netzwerkplan GmbH
=================

This file upload add-on uses the angular-file-upload plugin by danial farid to provide a file upload interface. [ng-file-upload](https://github.com/danialfarid/ng-file-upload) is used.

Installation
------------
The editor is an add-on to the Bootstrap decorator. To use it, just include
`schema-form-file.min.js`.

Easiest way is to install is with bower, this will also include dependencies:
```bash
$ bower install angular-schema-form-nwp-file-upload
```

You'll need to load a few additional files to use the editor:

**Be sure to load this projects files after you load angular schema form**

Example

```HTML
<link href="https://maxcdn.bootstrapcdn.com/bootstrap/3.2.0/css/bootstrap.min.css" media="all" rel="stylesheet" />
<link href="/schema-form-file.css" media="all" rel="stylesheet" />

<script src="/bower_components/angular/angular.min.js" type="text/javascript"></script>
<script src="/bower_components/angular-messages/angular-messages.js" type="text/javascript"></script>
<script src="/bower_components/angular-sanitize/angular-sanitize.min.js" type="text/javascript"></script>
<script src="/bower_components/angular-translate/angular-translate.js" type="text/javascript"></script>
<script src="/bower_components/tv4/tv4.js" type="text/javascript"></script>
<script src="/bower_components/objectpath/lib/ObjectPath.js" type="text/javascript"></script>
<script src="/bower_components/angular-schema-form/dist/schema-form.min.js" type="text/javascript"></script>
<script src="/bower_components/angular-schema-form/dist/bootstrap-decorator.min.js" type="text/javascript"></script>
<script src="/bower_components/ng-file-upload/ng-file-upload-all.min.js" type="text/javascript"></script>
<script src="/schema-form-file.min.js" type="text/javascript"></script>
```

When you create your module, be sure to depend on this project's module as well.

```javascript
angular.module('yourModule', ['schemaForm','pascalprecht.translate', 'ngSchemaFormFile']);
```

Usage
-----
The add-on adds three new form type, `datepicker, timepicker, datetimepicker`, and three new default
mappings.

| Schema             |   Default Form type  |
|:-------------------|:------------:|
| "type": "array" and "format": "singlefile"   |   nwpFileUpload   |
| "type": "array" and "format": "multifile"   |   nwpFileUpload   |


Options
-------

### single- and multifile upload

**Example**

```javascript
{
   "schema": {
      "type":       "object",
      "title":      "Album",
      "properties": {
         "image":  {
            "title":         "Image",
            "type":          "array",
            "format":        "singlefile",
            "x-schema-form": {
               "type": "array"
            },
            "pattern":       {
               "mimeType":          "image/*",
               "validationMessage": "Falscher Dateityp: "
            },
            "maxSize":       {
               "maximum":            "2MB",
               "validationMessage":  "Erlaubte Dateigröße überschritten: ",
               "validationMessage2": "Aktuelle Dateigröße: "
            },
            "maxItems":      {
               "validationMessage": "Es wurden mehr Dateien hochgeladen als erlaubt."
            },
            "minItems":      {
               "validationMessage": "Sie müssen mindestens eine Datei hochladen"
            }
         },
         "images": {
            "title":         "Images",
            "type":          "array",
            "format":        "multifile",
            "x-schema-form": {
               "type": "array"
            },
            "pattern":       {
               "mimeType":          "image/*,!.gif",
               "validationMessage": "Falscher Dateityp: "
            },
            "maxSize":       {
               "maximum":            "2MB",
               "validationMessage":  "Erlaubte Dateigröße überschritten: ",
               "validationMessage2": "Aktuelle Dateigröße: "
            },
            "maxItems":      {
               "validationMessage": "Es wurden mehr Dateien hochgeladen als erlaubt."
            },
            "minItems":      {
               "validationMessage": "Sie müssen mindestens eine Datei hochladen"
            }
         }
      },
      "required":   [
         "images"
      ]
   },
   "form":   [
      {
         "key":      "image",
         "type":     "nwpFileUpload",
         "showUploadButton" : true,
         "endpoint": "https://angular-file-upload-cors-srv.appspot.com/upload",
         "i18n": {
                "add": "Open file browser",
                "preview": "Preview Upload",
                "filename": "File Name",
                "progress": "Progress Status",
                "upload": "Upload",
                "dragorclick": "Drag and drop your file here or click here"
         }
      },
      {
         "key":      "images",
         "type":     "nwpFileUpload",
         "endpoint": "https://angular-file-upload-cors-srv.appspot.com/upload"
      }
   ]
}
```

Labels
------

### From the form definition using i18n

In the above example, the form definition for singleFile upload, labels are defined by using the "i18n" object. 

### By using the angular translate module
If there is no i18n object defined for the form then angular translate come into play. Label will fallback to the configured translated strings. 

**Example Configuration**
```javascript
   
   yourAngularApp.config(['$translateProvider', function($translateProvider) {
        $translateProvider.translations('en', {
            'modules.upload.dndNotSupported': 'Drag n drop not surpported by your browser',
            'modules.attribute.fields.required.caption': 'Required',
            'modules.upload.descriptionSinglefile': 'Drop your file here',
            'modules.upload.descriptionMultifile': 'Drop your file(s) here',
            'buttons.add': 'Open file browser',
            'modules.upload.field.filename': 'Filename',
            'modules.upload.field.preview': 'Preview',
            'modules.upload.multiFileUpload': 'Multifile upload',
            'modules.upload.field.progress': 'Progress',
            'buttons.upload': 'Upload'
        });
        $translateProvider.preferredLanguage('en');

    }]);

```


Example pictures
-------
**Initial state**

![alt tag](https://raw.githubusercontent.com/saburab/angular-schema-form-nwp-file-upload/master/upload_1.png)


**Preview**

![alt tag](https://raw.githubusercontent.com/saburab/angular-schema-form-nwp-file-upload/master/upload_2.png)


**On error**

![alt tag](https://raw.githubusercontent.com/saburab/angular-schema-form-nwp-file-upload/master/upload_3.png)
