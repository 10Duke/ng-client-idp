;(function (angular) {
  'use strict';

/**
 *  @ngdoc          module
 *  @module         td.client.api.idp
 *  @name           td.client.api.idp
 *  @description
 *
 *  # td.client.api.idp
 *
 *  This module provides a REST API -service for using IdP 1.0.1.
 *
 */
angular.module ('td.client.api.idp', []);


angular.module ('td.client.api.idp').provider ('idpApi', IdpApiProvider);

/**
 *  @ngdoc          provider
 *  @module         td.client.api.idp
 *  @name           IdpApiProvider
 *
 *  @description Use `IdpApiProvider` to change the default behavior of the
 *  {@link idpApi}.
 *
 *  ## Dependencies
 *  Requires the {@link td.client.api.idp} module to be installed.
 *
 */
function IdpApiProvider ()
{
  var defaultBaseUrl = 'https://vslidp.10duke.com/api/idp/v1';

  // Provider public interface

  // Relax "validthis"-checking, incase the provider name is lowercase
  // jshint validthis: true

  this.$get = createService;
  this.setBaseUrl = setBaseUrl;

  // jshint validthis: false


  /**
   *  @ngdoc        method
   *  @name         IdpApiProvider#setBaseUrl
   *  @description
   * 
   *  Sets the base-URL, which the service uses. This overrides properties `schemes`, `host` and
   *  `basePath` from the Swagger API JSON.
   *
   *  **NOTE**: Set the baseurl without trailing slash, e.g. `https://example.com/api`.
   *
   *  @param {string} p_defaultBaseUrl the base-URL to set.
   */
  function setBaseUrl (p_defaultBaseUrl)
  {
    defaultBaseUrl = p_defaultBaseUrl;
  }


  /** Creates the service.
   * 
   */
  createService.$inject = ['$http'];
  function createService ($http)
  {
    /**
     *  @ngdoc          service
     *  @module         td.client.api.idp
     *  @name           idpApi
     *  @description    IdP 1.0.1
     *                  Identity Provider API
     */
    var IdpApi = function ()
    {
      var self = this
        , baseUrl = defaultBaseUrl
        , headers = {}
      ;


      /**
       *  @ngdoc        method
       *  @name         idpApi#$setHeaders
       *  @kind         function
       *  @desription   Sets headers, which this service sends to the backend.
       *  @param        {Object.string} p_headers object, describing the headers. Property name is the header name,
       *                property value is the header value. Example: `{Authorization: 'Bearer 2f62f942-b531-4120-931a-10a4fb740724'}`
       */
      self.$setHeaders = function (p_headers)
      {
        headers = angular.copy (p_headers);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#listUsers
       *  @kind         function
       *  @description  Returns a user from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.query query to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `User` (user response)
       */
      self.listUsers = function (parameters)
      {
        return doRequest('get', '/aggregates/listUsers', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#createGroup
       *  @kind         function
       *  @description  Creates a new user group. Duplicates are not allowed.
       *  @param        {Group} data Group object as JSON.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Group` (group response)
       */
      self.createGroup = function (data)
      {
        return doRequest('post', '/groups', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findGroups
       *  @kind         function
       *  @description  Returns all groups from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.query query to filter by
       *  @param        {number} parameters.offset offset from where results are read
       *  @param        {number} parameters.limit maximum number of results to return
       *  @param        {string} parameters.sortBy field to sort by
       *  @param        {string} parameters.sortOrder ascending or descending sort
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `GroupList` (groups response)
       */
      self.findGroups = function (parameters)
      {
        return doRequest('get', '/groups', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#updateGroup
       *  @kind         function
       *  @description  Updates a user group. Duplicates are not allowed.
       *  @param        {Group} data Group as JSON with fields to update.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Group` (group response)
       */
      self.updateGroup = function (data)
      {
        return doRequest('put', '/groups', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findGroup
       *  @kind         function
       *  @description  Returns a Group from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Group` (user group response)
       */
      self.findGroup = function (parameters)
      {
        return doRequest('get', '/groups/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#deleteGroup
       *  @kind         function
       *  @description  deletes a single user group based on the ID supplied
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `undefined` ()
       */
      self.deleteGroup = function (parameters)
      {
        return doRequest('delete', '/groups/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#createOrganization
       *  @kind         function
       *  @description  Creates a new organization. Duplicates are not allowed.
       *  @param        {Organization} data Organization object as JSON.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Organization` (organization response)
       */
      self.createOrganization = function (data)
      {
        return doRequest('post', '/organizations', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findOrganizations
       *  @kind         function
       *  @description  Returns all organizations from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.query query to filter by
       *  @param        {number} parameters.offset offset from where results are read
       *  @param        {number} parameters.limit maximum number of results to return
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `OrganizationListList` (organizations response)
       */
      self.findOrganizations = function (parameters)
      {
        return doRequest('get', '/organizations', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#updateOrganization
       *  @kind         function
       *  @description  Updates an organization.
       *  @param        {Organization} data Organization object as JSON with fields to update.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Organization` (organization response)
       */
      self.updateOrganization = function (data)
      {
        return doRequest('put', '/organizations', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findOrganization
       *  @kind         function
       *  @description  Finds an organization based on id
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `OrganizationList` (organization response)
       */
      self.findOrganization = function (parameters)
      {
        return doRequest('get', '/organizations/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#deleteOrganization
       *  @kind         function
       *  @description  deletes a single organization based on the ID supplied.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `undefined` ()
       */
      self.deleteOrganization = function (parameters)
      {
        return doRequest('delete', '/organizations/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#exportRoles
       *  @kind         function
       *  @description  Returns a user from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.category role category to export by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Role` (exported  roles)
       */
      self.exportRoles = function (parameters)
      {
        return doRequest('get', '/roleExport/{category}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#createRole
       *  @kind         function
       *  @description  Creates a new user role. Duplicates are not allowed.
       *  @param        {Role} data Role object as JSON.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Role` (role response)
       */
      self.createRole = function (data)
      {
        return doRequest('post', '/roles', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findRoles
       *  @kind         function
       *  @description  Returns all roles from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.query query to filter by
       *  @param        {number} parameters.offset offset from where results are read
       *  @param        {number} parameters.limit maximum number of results to return
       *  @param        {string} parameters.sortBy field to sort by
       *  @param        {string} parameters.sortOrder ascending or descending sort
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `RoleList` (groups response)
       */
      self.findRoles = function (parameters)
      {
        return doRequest('get', '/roles', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#updateRole
       *  @kind         function
       *  @description  Updates a internal role. Duplicates are not allowed.
       *  @param        {Role} data Role as JSON with fields to update.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Role` (role response)
       */
      self.updateRole = function (data)
      {
        return doRequest('put', '/roles', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findRole
       *  @kind         function
       *  @description  Returns a Role from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `Role` (role response)
       */
      self.findRole = function (parameters)
      {
        return doRequest('get', '/roles/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#deleteRole
       *  @kind         function
       *  @description  deletes a single internal role based on the ID supplied
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `undefined` ()
       */
      self.deleteRole = function (parameters)
      {
        return doRequest('delete', '/roles/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#createUser
       *  @kind         function
       *  @description  Creates a new user. Duplicates are not allowed.
       *  @param        {User} data User object as JSON.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `User` (user response)
       */
      self.createUser = function (data)
      {
        return doRequest('post', '/users', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findUsers
       *  @kind         function
       *  @description  Returns all users from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.query query to filter by
       *  @param        {number} parameters.offset offset from where results are read
       *  @param        {number} parameters.limit maximum number of results to return
       *  @param        {string} parameters.sortBy field to sort by
       *  @param        {string} parameters.sortOrder ascending or descending sort
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `UserList` (users response)
       */
      self.findUsers = function (parameters)
      {
        return doRequest('get', '/users', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#updateUser
       *  @kind         function
       *  @description  Updates a user. Duplicates are not allowed.
       *  @param        {User} data User as JSON with fields to update.
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `User` (user response)
       */
      self.updateUser = function (data)
      {
        return doRequest('put', '/users', {}, data);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#findUser
       *  @kind         function
       *  @description  Returns a user from the system that the user has access to.
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `User` (user response)
       */
      self.findUser = function (parameters)
      {
        return doRequest('get', '/users/{id}', parameters);
      };


      /**
       *  @ngdoc        method
       *  @name         idpApi#deleteUser
       *  @kind         function
       *  @description  deletes a single user based on the ID supplied
       *  @param        {Object} parameters 
       *  @param        {string} parameters.id id to filter by
       *  @return       {HttpPromise} Returns a `HttpPromise` (see the Angular `$http` service). Successfully
       *                resolved promise contains `response`-object, which has property `data` of type
       *                `undefined` ()
       */
      self.deleteUser = function (parameters)
      {
        return doRequest('delete', '/users/{id}', parameters);
      };


      /** Private function to bind parameters to the URL-template
       * 
       *  @param    {string} p_url the URL-template
       *  @param    {Object} p_parameters the parameters
       *  @return   {Object} {url: <the bound url : string>, params: <query params : object>}
       */
      function bindParameters (p_url, p_parameters)
      {
        var l_url_and_parameters = {
            url:        baseUrl + p_url
          , params:     {}
        };

        angular.forEach (p_parameters, bindPathParameter);

        return (l_url_and_parameters);

        function bindPathParameter (p_value, p_name)
        {
          var l_re = new RegExp ('{' + p_name + '}');

          // If the URL contains the parameter, bind it:
          if (l_re.test (l_url_and_parameters.url)) {
            l_url_and_parameters.url = l_url_and_parameters.url.replace (l_re, p_value);
          }
          else {
            l_url_and_parameters.params [p_name] = p_value;
          }
        }
      }


      /** Private wrapper to do the the request. Used from the generated functions.
       *  
       *  @param    {string} p_method The method as it is in the Swagger-spec (lowercase, eg. 'get')
       *  @param    {string} p_url The URL for the operation from the Swagger spec
       *  @param    {Object} p_parameters parameters as an object
       *  @param    {Object} p_data Data to be sent as request body
       *  @return   {Promise} the promise as returned by `$http`-service.
       */
      function doRequest (p_method, p_url, p_parameters, p_data)
      {
        var l_url_and_parameters = bindParameters (p_url, p_parameters);

        return $http ({
            method:     p_method.toUpperCase()
          , url:        l_url_and_parameters.url
          , params:     l_url_and_parameters.params
          , headers:    headers
          , data:       p_data
        });
      }
    }; // End of IdpApi

    return (new IdpApi());


  } // End of IdpApiProvider.createService()

}// End of IdpApiProvider

}) (angular);
