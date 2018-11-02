
import superagent from "superagent";
import { normalize, schema } from "normalizr";
import {dispatchAnUnexpectedErrorEvent} from "redux-manager-lib";

const ROOT = "http://localhost:4000";
//
// Define a users schema
const post = new schema.Entity(
    "modelDefinitions",
    {},
    {
        processStrategy: (entity, parent, key) => {
            return {
                title: entity.title,
                content: entity.content,
                id: entity.id
            };
        }
    }
);
const arrayOfPosts = [post];


export default {
    create(){},
    read(){
        const url = `${ROOT}/explorer/swagger.json`;
        return superagent.get(url).then(response=>{
            try {
                console.log(response.body.definitions)
                let models = {
                    Post: response.body.definitions.Post,
                    $new_Post: response.body.definitions.$new_Post
                }
                return {
                    byId: models
                };
            } catch(error){
                dispatchAnUnexpectedErrorEvent(error, {
                    url,
                    response
                })
                return Promise.reject(error);
            }

        }). catch(error=>{
            return Promise.reject(error);
        })
    },
    update(){},
    delete(){}
}