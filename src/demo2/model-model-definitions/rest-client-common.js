
import superagent from "superagent";
import { normalize, schema } from "normalizr";

const ROOT = "http://localhost:4000";
//
// // Define a users schema
// const post = new schema.Entity(
//     "post",
//     {},
//     {
//         processStrategy: (entity, parent, key) => {
//             return {
//                 title: entity.title,
//                 content: entity.content,
//                 id: entity.id
//             };
//         }
//     }
// );
// const arrayOfPosts = [post];


export default {
    create(){},
    read(){
        return superagent.get(`${ROOT}/explorer/swaggerjson`).then(response=>{
            return response;
        }). catch(error=>{
            return Promise.reject(error);
        })
    },
    update(){},
    delete(){}
}