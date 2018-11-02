
import superagent from "superagent";
import { normalize, schema } from "normalizr";
import {dispatchAnUnexpectedErrorEvent} from "redux-manager-lib";

const ROOT = "http://localhost:4000";

export default {
    create(){},
    read(){
        const url = `${ROOT}/explorer/swagger.json`;
        return superagent.get(url).then(response=>{
            try {
                let models = {
                    BlogPost: {
                        BlogPost: response.body.definitions.Post,
                        $new_BlogPost: response.body.definitions.$new_Post
                    },
                };
                return {
                    byId: models
                };
            } catch(error){
                dispatchAnUnexpectedErrorEvent(error, {
                    url,
                    response
                });
                return Promise.reject(error);
            }

        }). catch(error=>{
            return Promise.reject(error);
        })
    },
    update(){},
    delete(){}
}
