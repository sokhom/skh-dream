import { connect } from 'react-redux';
import { signOutUser } from 'modules/UserModule';
import {changeLayoutCollapsed} from 'modules/GlobalModule';
import { getUserName } from 'selectors/UserSelector';
import Authenticated from 'components/Header/Authenticated';
import GlobalHeader from 'components/globalHeader';

/**
 * Maps the state properties to the React component `props`.
 *
 * @param {Object} state The application state.
 * @returns {Object} The props passed to the react component.
 */
const mapStateToProps = state => ({
  userName: getUserName(state),
  collapsed: state.global.collapsed,
});

/**
 * Maps the store `dispatch` function to the React component `props`.
 *
 * @param {Function} dispatch The Redux store dispatch function.
 * @returns {Object} The props passed to the react component.
 */
const mapDispatchToProps = dispatch => ({
  onSignOut: () => dispatch(signOutUser()),
  onCollapse: (collapsed) => dispatch(changeLayoutCollapsed(collapsed)),
});

export default connect(mapStateToProps, mapDispatchToProps)(GlobalHeader);
