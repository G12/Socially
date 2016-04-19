import angular from 'angular';
import angularMeteor from 'angular-meteor';
import uiRouter from 'angular-ui-router';
import utilsPagination from 'angular-utils-pagination';

import './partiesList.html';
import { Counts } from 'meteor/tmeasday:publish-counts';
import {Parties} from '../../../api/parties';
import { name as PartiesSort } from '../partiesSort/partiesSort';
import {name as PartyAdd} from '../partyAdd/partyAdd';
import {name as PartyRemove} from '../partyRemove/partyRemove';

class PartiesList {
  constructor($scope, $reactive) {
    'ngInject';

    $reactive(this).attach($scope);

    // Our publish function can also take parameters.
    // In that case, we would also need to pass the parameters from the client.
    // see: http://www.angular-meteor.com/api/1.3.6/reactive-context

    this.perPage = 3;
    this.page = 1;
    this.sort = {
      name: 1
    };

    this.subscribe('parties', () => [{
      limit: parseInt(this.perPage),
      skip: parseInt((this.getReactively('page') - 1) * this.perPage),
      sort: this.getReactively('sort')}
    ]);

    this.helpers({
      parties() {
        return Parties.find({}, {
          sort : this.getReactively('sort')
        });
      },
      partiesCount() {
        return Counts.get('numberOfParties');
      }
    });
  }

  pageChanged(newPage) {
    this.page = newPage;
  }

  sortChanged(sort) {
    this.sort = sort;
  }
}

const name = 'partiesList';

// create a module
export default angular.module(name, [
  angularMeteor,
  uiRouter,
  PartiesSort,
  PartyAdd,
  utilsPagination,
  PartyRemove
]).component(name, {
    templateUrl: `imports/ui/components/${name}/${name}.html`,
    controllerAs: name,
    controller: PartiesList
  })
  .config(config);

function config($stateProvider) {
  'ngInject';
  $stateProvider
    .state('parties', {
      url: '/parties',
      template: '<parties-list></parties-list>'
    });
}