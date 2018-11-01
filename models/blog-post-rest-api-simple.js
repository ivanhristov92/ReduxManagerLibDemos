import superagent from "superagent";
import { normalize, schema } from "normalizr";

const ROOT = "...";

// Define a users schema
const post = new schema.Entity(
  "post",
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

export default function LoopbackUserRestApi() {
  return {
    read() {
      //Make the async call
      return superagent
        .get(ROOT + "/Posts")
        .then(response => {
          // Transform the response
          return shapeResponse(response);
        })
        .catch(error => {
          // We can adapt the error here, if we want
          return Promise.reject(error);
        });

      function shapeResponse(response) {
        // Transform and normalize the data
        const normalizedData = normalize(response.body, arrayOfPosts);
        // Adapt it to the form ReduxManagerLib expects
        return {
          byId: normalizedData.entities.post
        };
      }
    }
  };
}
