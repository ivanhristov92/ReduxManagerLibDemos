import superagent from "superagent";
const ROOT = "http://localhost:4000/api";
import { normalize, schema } from "normalizr";
import * as _ from "ramda";

// Define a users schema
const user = new schema.Entity(
  "users",
  {},
  {
    processStrategy: (entity, parent, key) => {
      return {
        name: entity.username,
        email: entity.email,
        id: entity.id
      };
    }
  }
);
const arrayOfusers = [user];

export default function LoopbackUserRestApi() {
  return {
    create(payload) {
      return superagent
        .post(ROOT + "/MyUsers")
        .send(payload)
        .then(response => {
          const normalizedData = normalize(response.body, user);
          return { byId: normalizedData.entities.users };
        });
    },
    read() {
      return superagent.get(ROOT + "/MyUsers").then(response => {
        const normalizedData = normalize(response.body, arrayOfusers);
        return {
          byId: normalizedData.entities.users
        };
      });
    },
    update() {},
    delete(id) {
      return superagent.del(ROOT + `/MyUsers/${id}`).then(() => ({ id }));
    }
  };
}
