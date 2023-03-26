import { Observer } from 'hermes-io';

const actionsFactory =(actions = {}) => Object.values(actions).reduce((accumulator, key) => {
  accumulator[key] = new Observer();
  return accumulator;
}, {});

export default actionsFactory; 
