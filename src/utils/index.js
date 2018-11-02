import { bindActionCreators } from "redux";
import connect from "react-redux/es/connect/connect";

export function connectModel(Model, stateToProps = () => ({})) {


  let models = Array.isArray(Model) ? Model : [Model];

  const mapStateToProps = state => {


      return models.reduce((acc, model)=>{

          if(typeof model.mapStateToProps === "function"){
                return {
                    ...acc,
                    [model.model.MODEL_NAME]: model.mapStateToProps(state)
                }
          }

          return {
              ...acc,
              [model.MODEL_NAME]: {
                  all: model.selectors.getAll(state),
                  modelName: model.MODEL_NAME,
                  error: model.selectors.getError(state),
                  operationStates: model.selectors.getOperationStates(state),
                  ...stateToProps(state)
              }
          }
      }, {});

  };

  function mapDispatchToProps(dispatch, ownProps) {


      return models.reduce((acc, model)=>{

          if(typeof model.model === "object"){
              const allActionCreators = Object.assign({}, model.actionCreators);
              const boundActionCreators = bindActionCreators(allActionCreators, dispatch);
              return {
                  ...acc,
                  [model.model.MODEL_NAME]: boundActionCreators
              }
          }


          const allActionCreators = Object.assign({}, model.actionCreators);
          const boundActionCreators = bindActionCreators(allActionCreators, dispatch);
          return {
              ...acc,
              [model.MODEL_NAME]: boundActionCreators
          }
      }, {});
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
  };
}
