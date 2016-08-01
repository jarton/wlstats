
// ------------------------------------
// Constants
// ------------------------------------
export const SELECT_LIFTER = 'SELECT_LIFTER'

// ------------------------------------
// Actions
// ------------------------------------
export function selectlifter(value = 1) {
  return {
    type: SELECT_LIFTER,
    payload: value
  }
}

export const actions = {
	selectlifter
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
	[SELECT_LIFTER]: (state, action) => {
		return { selected: 1}
	}
}

// ------------------------------------
// Reducer
// ------------------------------------
const initialState = { selected: 0 } 
export default function LifterReducer (state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]

  return handler ? handler(state, action) : state
}
