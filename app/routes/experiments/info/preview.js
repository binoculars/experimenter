import Ember from 'ember';
import AuthenticatedRouteMixin from 'ember-simple-auth/mixins/authenticated-route-mixin';

import ExpPlayerRouteMixin from 'exp-player/mixins/exp-player-route';

export default Ember.Route.extend(AuthenticatedRouteMixin, ExpPlayerRouteMixin, {
    currentUser: Ember.inject.service(),
    _getExperiment() {
        return new Ember.RSVP.Promise((resolve) => {
            resolve(this.modelFor('experiments.info'));
        });
    },
    _getSession(params, experiment) {
        return this.get('currentUser').getCurrentUser().then(([account, profile]) => {
 session.setProperties({
                id: 'PREVIEW_DATA_DISREGARD',
                experimentVersion: versionId
            });

            return session.reopen({
                save() {
                    console.log('Preview Data Save:', this._internalModel._attributes);
                    return Ember.RSVP.resolve(this);
                }
            })

            return this.store.createRecord(experiment.get('sessionCollectionId'), {
                experimentId: experiment.id,
                profileId: profile.get('id'),
                profileVersion: '', // TODO
                completed: false,
                feedback: '',
                hasReadFeedback: '',
                softwareVersion: '',
                expData: {},
                sequence: []
            });
        });
    },
    actions: {
        willTransition: function(transition) {
            // FIXME: This won't prevent back button or manual URL change. See https://guides.emberjs.com/v2.3.0/routing/preventing-and-retrying-transitions/#toc_preventing-transitions-via-code-willtransition-code
            if (this.controller.isDirty() && !confirm('Are you sure you want to exit the experiment?')) {
                transition.abort();
                return false;
            } else {
                // Bubble this action to parent routes
                return true;
            }
        }
    }
});
