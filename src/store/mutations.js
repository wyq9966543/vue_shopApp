import  {RECEIVE_ADDRESS, RECEIVE_CATEGORYS, RECEIVE_SHOPS, RECEIVE_ADDRESSXY} from './mutation-types'

export default {
    [RECEIVE_ADDRESSXY] (state, {addressXY}) {state.addressXY = addressXY},
    [RECEIVE_ADDRESS] (state, {address}) {state.address = address},
    [RECEIVE_CATEGORYS] (state, {categorys}) {state.categorys = categorys},
    [RECEIVE_SHOPS] (state, {shops}) {state.shops = shops},
}