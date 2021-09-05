import { AnyAction } from "redux"

export interface State {
	
}

export const initialState: State = {

}

export default (state = initialState, action:AnyAction) => {
	switch (action.type) {

	default:
		return state
	}
}

