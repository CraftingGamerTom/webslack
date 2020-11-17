// Switch these lines once there are useful utils
// const testUtils = require('./utils');
require('./utils');

const http = require('http');
const url = require('url');
const should = require('should');
var sinon = require('sinon');
const { BlustreamUtilities, BlustreamSDKError } = require('../lib/utilities');
const { expectation } = require('sinon');
const assert = require('assert');
const { resolve } = require('path');

describe('BlustreamUtilities: Blustream SDK Utilities', function () {

    describe('new BlustreamUtilities', function () {

        it('BlustreamUtilities can be created with a base url provided', function () {
            let utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
            utilities.should.be.an.instanceOf(BlustreamUtilities).and.have.property('_baseUrl');
        });

        it('BlustreamUtilities base url is required', function () {
            should.throws(() => new BlustreamUtilities(), BlustreamSDKError);
        });

        it('BlustreamUtilities base url must have a protocol', function () {
            should.throws(() => new BlustreamUtilities('api.notreal.blustream.io/api'), BlustreamSDKError);
        });

        it('BlustreamUtilities base url must not end with a "/" character', function () {
            should.throws(() => new BlustreamUtilities('https://api.notreal.blustream.io/api/'), BlustreamSDKError);
        });
        
    });

    describe('Private Functions', function () {
        describe('_validateUrlParams Function', function () {
            let utilities;

            before(function () {
                utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
            });

            it('_validateUrlParams with valid url params works', function () {
                should(utilities._validateUrlParams(['test1', 'test2'])).not.throw();
            });
            it('_validateUrlParams marked as not required will not throw an error', function () {
                should(utilities._validateUrlParams(undefined, false)).not.throw();
            });
            it('_validateUrlParams marked as not required still must be an array', function () {
                should.throws(() => utilities._validateUrlParams('this is a string', false), BlustreamSDKError);
            });
            it('_validateUrlParams function does not allow undefined urlParams', function () {
                should.throws(() => utilities._validateUrlParams(), BlustreamSDKError);
            });
            it('_validateUrlParams function requires the urlParams argument to be an array', function () {
                should.throws(() => utilities._validateUrlParams('this is a string'), BlustreamSDKError);
            });

        });

        describe('_validateQueryParams Function', function () {
            // TODO Write _validateQueryParams tests
        });

        describe('_validateData Function', function () {
            let utilities;

            before(function () {
                utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
            });

            it('_validateData with valid data works', function () {
                should(utilities._validateData({ key1: 'val1', key2: 2 })).not.throw();
            });
            it('_validateData function requires data', function () {
                should.throws(() => utilities._validateData(), BlustreamSDKError);
            });
            it('_validateData function requires the data to have contents', function () {
                should.throws(() => utilities._validateData({}), BlustreamSDKError);
            });
        });

        describe('_endpointFor Function', function () {
            // TODO Unit test for PUT and DELETE to end in an ID value (once implemented)
            let utilities;

            before(function () {
                utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
            });

            it('_endpointFor with no IDs is parsed properly', function () {
                let endpoint = utilities._endpointFor(['/test/path'], []);
                endpoint.should.equal('/test/path');
            });
            it('_endpointFor with 1 ID is parsed properly', function () {
                let endpoint = utilities._endpointFor(['/test/path'], ['id1']);
                endpoint.should.equal('/test/path/id1');
            });
            it('_endpointFor with 1 ID and second path is parsed properly', function () {
                let endpoint = utilities._endpointFor(['/test/path', '/path2'], ['id1']);
                endpoint.should.equal('/test/path/id1/path2');
            });
            it('_endpointFor with 2 IDs and a second path is parsed properly', function () {
                let endpoint = utilities._endpointFor(['/test/path', '/path2'], ['id1', 'id2']);
                endpoint.should.equal('/test/path/id1/path2/id2');
            });
            it('_endpointFor requires an appropriate number of paths for the number of IDs provided', function () {
                should.throws(() => utilities._endpointFor(['/test/path'], ['id1', 'id2']), BlustreamSDKError);
            });
            it('_endpointFor requires an appropriate number of IDs for the route defined', function () {
                should.throws(() => utilities._endpointFor(['/test/path', '/path2'], []), BlustreamSDKError);
            });
            it('_endpointFor requires paths the begin with a "/"', function () {
                should.throws(() => utilities._endpointFor(['test'], []), BlustreamSDKError);
            });
            it('_endpointFor paths must NOT end with a "/"', function () {
                should.throws(() => utilities._endpointFor(['/test/path/'], []), BlustreamSDKError);
            });
        });
        
        describe('xxxxx Function', function () {
            
        });

    });

    describe('Public Functions', function () {
        let utilities;

        before(function () {
            utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
        });

        describe('BlustreamUtilities Create Function', function () {
            // 'Error: getaddrinfo ENOTFOUND api.notreal.blustream.io'
            it('Create function integration works', function () {
                let theData = {key1: 'var1', key2: 'val2'};
                return utilities.create(['/test/create', '/subitem'], ['test-id'], data=theData)
                .catch(err => {
                    if(err.toString().includes('Error: getaddrinfo ENOTFOUND')) {
                        // Expected because no networking
                        resolve();
                    } else {
                        throw err;
                    }
                });
            });
        });

        describe('BlustreamUtilities Create Multipart Function', function () {
            // TODO Write multipart tests
        });

        describe('BlustreamUtilities Get Function', function () {
            it('Get function integration works', function () {
                    return utilities.get(['/test/get'], undefined, {query1: 'value1', query2: 'value2'})
                    .catch(err => {
                        if(err.toString().includes('Error: getaddrinfo ENOTFOUND')) {
                            // Expected because no networking
                            resolve();
                        } else {
                            throw err;
                        }
                    });
            });
        });

        describe('BlustreamUtilities Update Function', function () {
            it('Update function integration works', function () {
                let theData = {key1: 'var1', key2: 'val2'};
                return utilities.edit(['/test/update', '/subitem'], ['test-id'], data=theData)
                .catch(err => {
                    if(err.toString().includes('Error: getaddrinfo ENOTFOUND')) {
                        // Expected because no networking
                        resolve();
                    } else {
                        throw err;
                    }
                });
            });

        });

        describe('BlustreamUtilities Delete Function', function () {
            it('Delete function integration works', function () {
                return utilities.del(['/test/delete'], ['test-id'])
                .catch(err => {
                    if(err.toString().includes('Error: getaddrinfo ENOTFOUND')) {
                        // Expected because no networking
                        resolve();
                    } else {
                        throw err;
                    }
                });
            });

        });

    });

    describe('Response Error Handling', function () {
        let utilities;

        before(function () {
            utilities = new BlustreamUtilities('https://api.notreal.blustream.io/api');
        });

        it('If an error is recieved from Blustream, all fields are set', function () {
            let anError = new Error();

            const baseContents = JSON.parse(`{"message":"Request failed with status code 400","name":"Error","stack":"Error: Request failed with status code 400 at createError (webpack-internal:///./node_modules/axios/lib/core/createError.js:16:15) at settle (webpack-internal:///./node_modules/axios/lib/core/settle.js:17:12) at XMLHttpRequest.handleLoad (webpack-internal:///./node_modules/axios/lib/adapters/xhr.js:61:7)","config":{"url":"https://api.qa.blustream.io/api/v1/images/mask-groups/match/latest","method":"get","params":{},"data":"{}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":null}}`);
            const responseContents = JSON.parse(`{"response": {"data":{"timestamp":1594332909531,"status":400,"error":"Bad Request","message":"Required AppNames parameter 'appName' is not present","path":"/api/v1/images/mask-groups/match/latest"},"status":400,"statusText":"","headers":{"content-type":"application/json;charset=UTF-8","date":"Thu, 09 Jul 2020 22:15:09 GMT","status":"400"},"config":{"url":"https://api.qa.blustream.io/api/v1/images/mask-groups/match/latest","method":"get","params":{},"data":"{}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":null},"request":{}}}`);
            
            let baseContentsKeys = Object.keys(baseContents);
            baseContentsKeys.forEach((key) => {
                anError[key] = baseContents[key];
            });

            let responseContentsKeys = Object.keys(responseContents);
            responseContentsKeys.forEach((key) => {
                anError[key] = responseContents[key];
            });

            should.throws(() => {utilities._handleApiError(anError)}, BlustreamSDKError);
        });

        it('If the error response isnt from Blustream, remove bloated fields and return', function () {
            let anError = new Error();

            const baseContents = JSON.parse(`{"message":"Request failed with status code 400","name":"Error","stack":"Error: Request failed with status code 400 at createError (webpack-internal:///./node_modules/axios/lib/core/createError.js:16:15) at settle (webpack-internal:///./node_modules/axios/lib/core/settle.js:17:12) at XMLHttpRequest.handleLoad (webpack-internal:///./node_modules/axios/lib/adapters/xhr.js:61:7)","config":{"url":"https://api.qa.blustream.io/api/v1/images/mask-groups/match/latest","method":"get","params":{},"data":"{}","headers":{"Accept":"application/json, text/plain, */*","Content-Type":"application/json;charset=utf-8"},"transformRequest":[null],"transformResponse":[null],"timeout":0,"xsrfCookieName":"XSRF-TOKEN","xsrfHeaderName":"X-XSRF-TOKEN","maxContentLength":null}}`);
            let keys = Object.keys(baseContents);
            keys.forEach((key) => {
                anError[key] = baseContents[key];
            });

            should.throws(() => {utilities._handleApiError(anError)}, Error);
        });
        
    });
});