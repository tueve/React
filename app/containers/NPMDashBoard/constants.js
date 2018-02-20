/*
 * GithubDashboardConstants
 * Each action has a corresponding type, which the reducer knows and picks up on.
 * To avoid weird typos between the reducer and the actions, we save them as
 * constants here. We prefix them with 'yourproject/YourComponent' so we avoid
 * reducers accidentally picking up actions they shouldn't.
 *
 * Follow this format:
 * export const YOUR_ACTION_CONSTANT = 'yourproject/YourContainer/YOUR_ACTION_CONSTANT';
 */

export const GET_PACKAGE = 'NPMDashBoard/GET_PACKAGE';
export const INPUT_PACKAGE = 'NPMDashBoard/INPUT_PACKAGE';
export const GET_AUTO_COMPLETE_PACKAGE = 'NPMDashBoard/GET_AUTO_COMPLETE_PACKAGE';
export const REMOVE_AUTOCOMPLETE_PACKAGE = 'NPMDashBoard/REMOVE_AUTOCOMPLETE_PACKAGE';
export const ADD_PACKAGE = 'NPMDashBoard/ADD_PACKAGE';
export const REMOVE_PACKAGE = 'NPMDashBoard/REMOVE_PACKAGE';

