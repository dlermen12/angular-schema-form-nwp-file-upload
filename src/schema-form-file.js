/**
 * angular-schema-form-nwp-file-upload - Upload file type for Angular Schema Form
 * @version v0.1.5
 * @link https://github.com/saburab/angular-schema-form-nwp-file-upload
 * @license MIT
 */
'use strict';

angular
    .module('schemaForm')
    .config(['schemaFormProvider', 'schemaFormDecoratorsProvider', 'sfPathProvider',
        function (schemaFormProvider, schemaFormDecoratorsProvider, sfPathProvider) {
            var defaultPatternMsg = 'Wrong file type. Allowed types are ',
                defaultMaxSizeMsg1 = 'This file is too large. Maximum size allowed is ',
                defaultMaxSizeMsg2 = 'Current file size:',
                defaultMinItemsMsg = 'You have to upload at least one file',
                defaultMaxItemsMsg = 'You can\'t upload more than one file.';

            var nwpSinglefileUpload = function (name, schema, options) {
                if (schema.type === 'array' && schema.format === 'singlefile') {
                    if (schema.pattern && schema.pattern.mimeType && !schema.pattern.validationMessage) {
                        schema.pattern.validationMessage = defaultPatternMsg;
                    }
                    if (schema.maxSize && schema.maxSize.maximum && !schema.maxSize.validationMessage) {
                        schema.maxSize.validationMessage = defaultMaxSizeMsg1;
                        schema.maxSize.validationMessage2 = defaultMaxSizeMsg2;
                    }
                    if (schema.minItems && schema.minItems.minimum && !schema.minItems.validationMessage) {
                        schema.minItems.validationMessage = defaultMinItemsMsg;
                    }
                    if (schema.maxItems && schema.maxItems.maximum && !schema.maxItems.validationMessage) {
                        schema.maxItems.validationMessage = defaultMaxItemsMsg;
                    }

                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'nwpFileUpload';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.array.unshift(nwpSinglefileUpload);

            var nwpMultifileUpload = function (name, schema, options) {
                if (schema.type === 'array' && schema.format === 'multifile') {
                    if (schema.pattern && schema.pattern.mimeType && !schema.pattern.validationMessage) {
                        schema.pattern.validationMessage = defaultPatternMsg;
                    }
                    if (schema.maxSize && schema.maxSize.maximum && !schema.maxSize.validationMessage) {
                        schema.maxSize.validationMessage = defaultMaxSizeMsg1;
                        schema.maxSize.validationMessage2 = defaultMaxSizeMsg2;
                    }
                    if (schema.minItems && schema.minItems.minimum && !schema.minItems.validationMessage) {
                        schema.minItems.validationMessage = defaultMinItemsMsg;
                    }
                    if (schema.maxItems && schema.maxItems.maximum && !schema.maxItems.validationMessage) {
                        schema.maxItems.validationMessage = defaultMaxItemsMsg;
                    }

                    var f = schemaFormProvider.stdFormObj(name, schema, options);
                    f.key = options.path;
                    f.type = 'nwpFileUpload';
                    options.lookup[sfPathProvider.stringify(options.path)] = f;
                    return f;
                }
            };

            schemaFormProvider.defaults.array.unshift(nwpMultifileUpload);

            schemaFormDecoratorsProvider.addMapping(
                'bootstrapDecorator',
                'nwpFileUpload',
                'directives/decorators/bootstrap/nwp-file/nwp-file.html'
            );
        }
    ]);

angular
    .module('ngSchemaFormFile', [
        'ngFileUpload',
        'ngMessages'
    ])
    .directive('ngSchemaFile', ['Upload', '$timeout', '$q', function (Upload, $timeout, $q) {
        return {
            restrict: 'A',
            scope: true,
            require: 'ngModel',
            link: function (scope, element, attrs, ngModel) {
                scope.url = scope.form && scope.form.endpoint;
                scope.isSinglefileUpload = scope.form && scope.form.schema && scope.form.schema.format === 'singlefile';

                scope.showUploadButton = !!scope.form.showUploadButton;
                var successCallback = scope.form.successCallback || angular.noop;

                scope.selectFile = function (file) {
                    scope.picFile = file;
                };
                scope.selectFiles = function (files) {
                    scope.picFiles = files;
                };

                scope.uploadFile = function (file) {
                    file && doUpload(file);
                };

                scope.uploadFiles = function (files) {
                    files.length && angular.forEach(files, function (file, index) {
                        var length = files.length;
                        length--;
                        doUpload(file, index, length);
                    });
                };

                function doUpload(file, index, total) {
                    if (file && !file.$error && scope.url) {
                        var options = {
                            url: scope.url,
                            data: scope.form.requestData(),
                            file: {}
                        };
                        options.file = file;
                        file.upload = Upload.upload(options);

                        file.upload.then(function (response) {
                            $timeout(function () {
                                file.result = response.data;
                            });
                            var result = scope.form.post ? scope.form.post(response.data) : response.data;
                            ngModel.$setViewValue(result);
                            ngModel.$commitViewValue();

                            if (index === total) {
                                successCallback();
                            }
                        }, function (response) {
                            if (response.status > 0) {
                                scope.errorMsg = response.status + ': ' + response.data;
                            }
                        });

                        file.upload.progress(function (evt) {
                            file.progress = Math.min(100, parseInt(100.0 *
                                evt.loaded / evt.total));
                        });
                    }
                }

                scope.validateField = function () {
                    if (scope.uploadForm.file && scope.uploadForm.file.$valid && scope.picFile && !scope.picFile.$error) {
                        console.log('singlefile-form is invalid');
                    } else if (scope.uploadForm.files && scope.uploadForm.files.$valid && scope.picFiles && !scope.picFiles.$error) {
                        console.log('multifile-form is  invalid');
                    } else {
                        console.log('single- and multifile-form are valid');
                    }
                };
                scope.submit = function () {
                    if (scope.uploadForm.file && scope.uploadForm.file.$valid && scope.picFile && !scope.picFile.$error) {
                        scope.uploadFile(scope.picFile);
                    } else if (scope.uploadForm.files && scope.uploadForm.files.$valid && scope.picFiles && !scope.picFiles.$error) {
                        scope.uploadFiles(scope.picFiles);
                    }
                };
                scope.$on('schemaFormValidate', scope.validateField);
                scope.$on('schemaFormFileUploadSubmit', scope.submit);
            }
        };
    }]);
