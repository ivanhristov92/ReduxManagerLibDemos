import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

export function connectModel(Model, stateToProps = () => ({})) {
  const mapStateToProps = state => {
    return {
      all: Model.selectors.getAll(state),
      modelName: Model.MODULE_NAME,
      error: Model.selectors.getError(state),
      operationStates: Model.selectors.getOperationStates(state),
      ...stateToProps(state)
    };
  };

  function mapDispatchToProps(dispatch) {
    const allActionCreators = Object.assign({}, Model.actionCreators);
    const boundActionCreators = bindActionCreators(allActionCreators, dispatch);
    return { model: boundActionCreators };
  }
  return function(Component) {
    return connect(
      mapStateToProps,
      mapDispatchToProps
    )(Component);
  };
}
