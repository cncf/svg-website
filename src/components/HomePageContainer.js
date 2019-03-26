import { connect } from 'react-redux';
import createSelector from '../utils/createSelector';
import HomePage from './HomePage';
import { receiveFiles, removeConverter } from '../reducers/mainReducer';

const mapStateToProps = (state) => ({
  converters: state.main.converters
});
const mapDispatchToProps = {
  receiveFiles: receiveFiles,
  removeConverter: removeConverter
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
