describe ('idpApi', function()
{
  var $httpBackend
    , idpApi
    , prefix = 'http://localhost/test/api'
    , expectedHeaders = {Authorization: 'Bearer ABC123'}
    , queryString = '?.*$'
    , queryParams = {offset: '0', limit: '10', sortBy: 'name'}
    , groups = buildGroups ()
    , orgs = buildGroups ()
    , roles = buildGroups ()
    , users = buildUsers ()
  ;
  
  beforeEach (module ('td.client.api.idp'));

  beforeEach (function()
  {
    var testModule = angular.module ('td.client.api.idp.test', ['td.client.api.idp']);
    
    testModule.config (configIdpApi);

    module('td.client.api.idp', 'td.client.api.idp.test');

    inject(function($injector) {
      idpApi = $injector.get('idpApi');
      $httpBackend = $injector.get('$httpBackend');
    });
    

    configIdpApi.$inject = ['idpApiProvider'];
    function configIdpApi (idpApiProvider)
    {
      idpApiProvider.setBaseUrl (prefix);
    }

  });




  it ('should set headers', function ()
  {
    idpApi.$setHeaders (expectedHeaders);
  });
    

  describe ('with headers', function ()
  {
    beforeEach (function() {
      idpApi.$setHeaders (expectedHeaders);
    });

    afterEach (function() {
       $httpBackend.verifyNoOutstandingExpectation();
       $httpBackend.verifyNoOutstandingRequest();
    });


    it ('should call listUsers -endpoint w/o parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/aggregates/listUsers', verifyHeaders).respond (users[0]);
      idpApi.listUsers ().then(verify(users[0]), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call listUsers -endpoint w/ null parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/aggregates/listUsers', verifyHeaders).respond (users[0]);
      idpApi.listUsers ().then(verify(users[0]), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call createGroup -endpoint', function ()
    {
      $httpBackend.expectPOST(prefix + '/groups', groups[0], verifyHeaders).respond (groups[0]);
      idpApi.createGroup (groups[0]).then (verify(groups[0]), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call findGroups -endpoint w/o parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/groups', verifyHeaders).respond (groups);
      idpApi.findGroups().then (verify(groups), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call findGroups -endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(new RegExp(prefix + '/groups' + queryString), verifyHeaders).respond (toQueryWith (groups));
      idpApi.findGroups(queryParams).then (verify(groups), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call updateGroup -endpoint', function ()
    {
      $httpBackend.expectPUT(prefix + '/groups', groups[0], verifyHeaders).respond (groups[0]);
      idpApi.updateGroup (groups[0]).then (verify(groups[0]), didNotExpectError);
      $httpBackend.flush();
    });


    it ('should call findGroup-endpoint', function ()
    {
      $httpBackend.expectGET(prefix + '/groups/1', verifyHeaders).respond (groups[0]);
      idpApi.findGroup ({id: 1}).then (verify(groups[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call deleteGroup-endpoint', function ()
    {
      $httpBackend.expectDELETE(prefix + '/groups/1', verifyHeaders).respond ();
      idpApi.deleteGroup ({id: 1}).then (verifyDelete, didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call createOrganization-endpoint', function ()
    {
      $httpBackend.expectPOST(prefix + '/organizations', orgs[0], verifyHeaders).respond (orgs[0]);
      idpApi.createOrganization (orgs[0]).then (verify(orgs[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findOrganizations-endpoint w/o parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/organizations', verifyHeaders).respond (orgs);
      idpApi.findOrganizations ().then (verify(orgs), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findOrganizations-endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(new RegExp(prefix + '/organizations' + queryString), verifyHeaders).respond (toQueryWith(orgs));
      idpApi.findOrganizations (queryParams).then (verify(orgs), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call updateOrganization-endpoint', function ()
    {
      $httpBackend.expectPUT(prefix + '/organizations', orgs[0], verifyHeaders).respond (orgs[0]);
      idpApi.updateOrganization (orgs[0]).then (verify(orgs[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findOrganization-endpoint', function ()
    {
      $httpBackend.expectGET(prefix + '/organizations/1', verifyHeaders).respond (orgs[0]);
      idpApi.findOrganization ({id: 1}).then (verify(orgs[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call deleteOrganization-endpoint', function ()
    {
      $httpBackend.expectDELETE(prefix + '/organizations/1', verifyHeaders).respond (undefined);
      idpApi.deleteOrganization ({id: 1}).then (verifyDelete, didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call exportRoles-endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/roleExport/users', verifyHeaders).respond (roles);
      idpApi.exportRoles ({category: 'users'}).then (verify(roles), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call createRole-endpoint', function ()
    {
      $httpBackend.expectPOST(prefix + '/roles', roles[0], verifyHeaders).respond (roles[0]);
      idpApi.createRole (roles[0]).then (verify(roles[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findRoles-endpoint w/o parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/roles', verifyHeaders).respond (roles);
      idpApi.findRoles ().then (verify(roles), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findRoles-endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(new RegExp(prefix + '/roles' + queryString), verifyHeaders).respond (toQueryWith(roles));
      idpApi.findRoles (queryParams).then (verify(roles), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call updateRole-endpoint', function ()
    {
      $httpBackend.expectPUT(prefix + '/roles', roles[0], verifyHeaders).respond (roles[0]);
      idpApi.updateRole (roles[0]).then (verify(roles[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findRole-endpoint', function ()
    {
      $httpBackend.expectGET(prefix + '/roles/1', verifyHeaders).respond (roles[0]);
      idpApi.findRole ({id: 1}).then (verify(roles[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call deleteRole-endpoint', function ()
    {
      $httpBackend.expectDELETE(prefix + '/roles/1', verifyHeaders).respond (undefined);
      idpApi.deleteRole ({id: 1}).then (verifyDelete, didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call createUser-endpoint', function ()
    {
      $httpBackend.expectPOST(prefix + '/users', users[0], verifyHeaders).respond (users[0]);
      idpApi.createUser (users[0]).then (verify(users[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findUsers-endpoint w/o parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/users', verifyHeaders).respond (users);
      idpApi.findUsers ().then (verify(users), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findUsers-endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(new RegExp (prefix + '/users' + queryString), verifyHeaders).respond (toQueryWith(users));
      idpApi.findUsers (queryParams).then (verify(users), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call updateUser-endpoint w/ parameters', function ()
    {
      $httpBackend.expectPUT(prefix + '/users', users[0], verifyHeaders).respond (users [0]);
      idpApi.updateUser (users[0]).then (verify(users[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call findUser-endpoint w/ parameters', function ()
    {
      $httpBackend.expectGET(prefix + '/users/1', verifyHeaders).respond (users [0]);
      idpApi.findUser ({id: 1}).then (verify(users[0]), didNotExpectError);
      $httpBackend.flush();
    });

    it ('should call deleteUser-endpoint w/ parameters', function ()
    {
      $httpBackend.expectDELETE(prefix + '/users/1', verifyHeaders).respond (undefined);
      idpApi.deleteUser ({id: 1}).then (verifyDelete, didNotExpectError);
      $httpBackend.flush();
    });
  });


  
  function buildGroups ()
  {
    return [
        {id: '1', name: 'Test-1'}
      , {id: '2', name: 'Test-2'}
      , {id: '3', name: 'Test-3'}
    ];
  }

  function buildUsers ()
  {
    return [
        {id: '1', firstName: 'Test', lastname: '#1'}  
      , {id: '2', firstName: 'Test', lastname: '#2'}
      , {id: '3', firstName: 'Test', lastname: '#3'}
    ];
  }

  
  function didNotExpectError (value)
  {
    fail ('Did not expect error!' + value.status);
  }
  
  function toQueryWith (respondWith)
  {
    return function (method, url, data, headers, params)
    {
      expect (params).toEqual (queryParams);
      return ([200, respondWith]);
    };
  }

  function verify (expected)
  {
    return function (response)
    {
      expect (response.data).toEqual(expected);
    };
  }

  function verifyDelete (response)
  {
    expect (response.data).toBeUndefined();
  }


  function verifyHeaders (headers)
  {
    return (headers.Authorization && headers.Authorization === expectedHeaders.Authorization);
  }


});