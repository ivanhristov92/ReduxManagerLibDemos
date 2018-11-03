import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

export function withModel(model) {

  function mapStateToProps(state){
          return {
              [model.MODEL_NAME]: {
                  all: model.selectors.getAll(state),
                  MODEL_NAME: model.MODEL_NAME,
                  error: model.selectors.getError(state),
                  operationStates: model.selectors.getOperationStates(state),
              }
          }
      }

  function mapDispatchToProps(dispatch, ownProps) {
          const allActionCreators = Object.assign({}, model.actionCreators);
          const boundActionCreators = bindActionCreators(allActionCreators, dispatch);
          return {
              [model.MODEL_NAME]:  {
                  actionCreators: boundActionCreators
              }
          }
      }


    function mergeProps (propsFromState, propsFromDispatch, ownProps) {
        function mergeInnerObjects(...args){
            let result = {};
            args.forEach(arg=>{
                Object.entries(arg).forEach(([key, value])=>{
                    if(typeof value === "object" && !Array.isArray(value) && value !== null){
                        result[key] = Object.assign({}, (result[key] || {}), value);
                    } else {
                        result[key] = value;
                    }
                });
            });
            return result;
        }


        return mergeInnerObjects(propsFromState, propsFromDispatch)
    };

    return function(Component) {
        return connect(
            mapStateToProps,
            mapDispatchToProps,
            mergeProps
    )(Component);
}
}
