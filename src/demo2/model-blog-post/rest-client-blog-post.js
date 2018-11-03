import superagent from "superagent";
import { normalize, schema } from "normalizr";

import {pathOr} from "ramda";

const ROOT = "http://localhost:4000/api";

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
    create(payload) {
      return superagent
        .post(ROOT + "/Posts")
        .send(payload)
        .then(response => {
          return shape(response);
        })
        .catch(function(response) {
          let adaptedError = adaptErrorForReact(response);
          return Promise.reject(adaptedError);
        });
      function shape(response) {
        const normalizedData = normalize(response.body, post);
        return { byId: normalizedData.entities.post };
      }
    },
    read() {
      return superagent.get(ROOT + "/Posts").then(response => {
        return shape(response);
      });
      function shape(response) {
        const normalizedData = normalize(response.body, arrayOfPosts);
        return {
          byId: normalizedData.entities.post
        };
      }
    },
    update({ title, content, id }) {
      if (!id) {
        throw new TypeError(
          "Rest api function Expected an id, but received " + id
        );
      }
      return superagent
        .put(ROOT + "/Posts")
        .send({ title, content, id })
        .then(response => {
          return shape(response);

          function shape(response) {
            const normalizedData = normalize(response.body, post);
            return { byId: normalizedData.entities.post };
          }
        })
        .catch(error => {
          return Promise.reject(adaptErrorForReact(error));
        });
    },

    delete(ids) {
      if(Array.isArray(ids)){
        return Promise.all(ids.map(id=>{
          return superagent.del(ROOT + `/Posts/${id}`)
        })).then((...responses)=>{
            return {
              ids: ids
            }
        })
      }
      return superagent.del(ROOT + `/Posts/${id}`);
    }
  };
}

function adaptErrorForReact(error) {
  if (pathOr("", ["response", "body", "error", "name"], error) === "ValidationError") {
    let messages = pathOr("", ["response", "body", "error", "details", "messages"], error);
    return {
      error: error,
      messages
    };
  }
  return error;
}
