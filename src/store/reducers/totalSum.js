import { SET_SUM } from '../../services/constants';

const INITIAL_STATE = 0;

const totalSum = (state = INITIAL_STATE, actions) => {
  const { type, payload } = actions;

  switch (type) {
  case SET_SUM:
    return payload;
  default:
    return state;
  }
};

export default totalSum;
