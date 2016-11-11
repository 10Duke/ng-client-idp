# Angular 1.x Service for Using 10Duke IdP REST API

## Dependencies

This module has no runtime dependencies outside of AngularJS.

## Installing

* Include `10duke-ng-client-api-idp.js` (e.g. by concatenating this to your app or using
  script-tag). The `angular.js` must be loaded before this.
* Declare dependency to module `td.client.api.idp`
* Inject `idpApi` -service.


## Configuring the `idpApi`-service

Use `idpApiProvider` in `config`-phase. The provider can customize the service
with following function:

* `idpApiProvider.setBaseUrl(url)`: This method sets the baseUrl for accessing the REST API.
  The url overrides any `host`, `basePath` and `schemes` from the Swagger-JSON. The URL must
  not have a trailing slash.

Example:

```javascript
// Register module, which uses module 'td.client.api.idp'
angular.module ('my-module-name-here', ['td.client.api.idp']);

// Register a config-function.
angular.module ('my-module-name-here').config(configIdpApi);

// Inject idpApiProvider
configIdpApi.$inject=['idpApiProvider'];

// Configure the base URL:
function configIdpApi (idpApiProvider)
{
  idpApiProvider.setBaseUrl ('https://api.example.com/api');
}
```


## Using the `idpApi`-service

The steps you need to do:

* Inject the `idpApi` service to your controller, service, or component.
* Set the authorization headers with `idpApi.$setHeaders()`-function. **NOTE**:
  The service stores the headers, so you only need to set headers when the
  headers change.
* Use the functions provided in the `idpApi`-service.

The functions take one or both of following parameters, depending on the function:
* `parameters`: This is an object-hash, where the property name is the parameter
  name and property value is parameter value. The correct values depend on the
  function. E.g. `{id: 'ae072502-62be-4db8-bcaf-a2e41719d631'}`
* `data`: This is the request data, sent as request body. The type of the object
  depends on the function. Pass the data as object, it will converted to JSON
  internally.

The functions call `$http`-service internally and return the `HttpPromise` object
returned by the `$http`-service.


### Example of setting the headers

```javascript
// Example authentication service:
angular.module ('my-module-name-here').service ('AuthService', AuthService);

// Inject idpApi
AuthService.$inject = ['idpApi'];

function AuthService (idpApi)
{
  ...
  this.afterSuccessfulLogin = function (credentials)
  {
    idpApi.$setHeaders (credentials.getHeaders ());
  };
}
```


### Example of using the service for REST API calls

```javascript
angular.module ('my-module-name-here').controller ('MyController', MyController);

// Inject idpApi
MyController.$inject = ['idpApi'];

function MyController (idpApi)
{
  var self = this;
  this.user = {};


  this.readUser = function (userId)
  {
    idpApi.findUser ({id: userId}).then (onSuccess, onFailure);
  };


  this.createUser = function ()
  {
    idpApi.createUser (self.user).then (onSuccess, onFailure);
  };


  this.updateUser = function ()
  {
    idpApi.updateUser (self.user).then (onSuccess, onFailure);
  };


  function onSuccess (response)
  {
    self.user = response.data;
  }

  function onFailure (response)
  {
    console.error (response);
  }
}
```


## API-documentation

To build API-documentation, run, in the project directory:

```console
npm run build-docs
```

To access the API-documentation, first run:

```console
npm run docs
```

This activates a HTTP-server on port 8080. Access the documentation by navigating to `http://localhost:8080`
