import { SET_SUM } from '../../services/constants';

const setTotalSum = (payload) => ({
  type: SET_SUM,
  payload,
});

export default setTotalSum;
