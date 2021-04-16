/* eslint-disable linebreak-style */
/* selectors */
export const getStatusUser = (isLogged) => isLogged.isLogged;

// const reducerName = 'statusUser';
// const createActionName = name => `app/${reducerName}/${name}`;

// const LOAD_STATUS_USER = createActionName('LOAD_STATUS_USER');

// export const loadStatusUser = payload => ({ payload, type: LOAD_STATUS_USER });

// export const reducer = (statePart = [], action = {}) => {
//   switch (action.type) {
//     case LOAD_STATUS_USER: {
//       return {
//         ...statePart,
//         isLogged: action.payload,
//       };
//     }
//     default:
//       return statePart;
//   }
// };
