import { connect } from 'react-redux';
import createSelector from '../utils/createSelector';
import HomePage from './HomePage';
import { receiveFiles } from '../reducers/mainReducer';

const mapStateToProps = (state) => ({
  converters: state.main.converters
});
const mapDispatchToProps = {
  receiveFiles: receiveFiles
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
