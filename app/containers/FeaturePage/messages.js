/*
 * FeaturePage Messages
 *
 * This contains all the text for the FeaturePage component.
 */
import { defineMessages } from 'react-intl';

export default defineMessages({
  header: {
    id            : 'boilerplate.containers.FeaturePage.header',
    defaultMessage: 'Features',
  },
  scaffoldingHeader: {
    id            : 'boilerplate.containers.FeaturePage.scaffolding.header',
    defaultMessage: 'Quick scaffolding',
  },
  scaffoldingMessage: {
    id            : 'boilerplate.containers.FeaturePage.scaffolding.message',
    defaultMessage: `Automate the creation of components, containers, routes, selectors
  and sagas - and their tests - right from the CLI!`,
  },
  items: [
    {
      name       : 'TO DO APP',
      description: 'Application to create todo list. Enable to add, remove, edit, filter, ... todo item',
      to         : '/features/todo',
    },
    {
      name       : 'GITHUB DASHBOARD',
      description: 'Application to find out github user. Render all respositories of this user',
      to         : '/features/github-dashboard',
    },
    {
      name       : 'NPM TREND DASHBOARD',
      description: 'Application to compare npm package information.',
      to         : '/features/npm-trend-dashboard',
    },
  ],
});
