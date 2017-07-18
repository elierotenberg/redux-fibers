import Fiber from './Fiber';

export {
  default as Fiber,
  FIBER_NOT_STARTED,
  FIBER_RUNNING,
  FIBER_REJECTED,
  FIBER_RESOLVED,
} from './Fiber';

const reduceFiber = ({ dispatch }) => next => action => {
  if (action instanceof Fiber) {
    const fiber = action;
    fiber.attach(dispatch);
    return () => fiber.detach(dispatch);
  }
  return next(action);
};

export default reduceFiber;
