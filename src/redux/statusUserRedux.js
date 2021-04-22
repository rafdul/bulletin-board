/* eslint-disable linebreak-style */
/* selectors */
export const getStatusUser = (user) => user.active;

const reducerName = 'statusUser';
const createActionName = name => `app/${reducerName}/${name}`;

const LOAD_STATUS_USER = createActionName('LOAD_STATUS_USER');

export const loadStatusUser = payload => ({ payload, type: LOAD_STATUS_USER });

export const reducer = (statePart = [], action = {}) => {
  switch (action.type) {
    case LOAD_STATUS_USER: {
      return {
        ...statePart,
        active: action.payload.active,
      };
    }
    default:
      return statePart;
  }
};
