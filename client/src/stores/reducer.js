/*
 * @Description: 
 * @Author: dingxuejin
 * @Date: 2020-01-02 13:21:16
 * @LastEditTime : 2020-01-02 13:29:29
 * @LastEditors  : dingxuejin
 */
//这个数据的初始值
import { CHANGE_VALUE, SUBMIT_TYPE, SPLICE_TYPE, INIT_LIST_ACTION} from './ActionTypes';

const defaultState = {
    values: '',
    list: []
};
export default (state = defaultState , action) =>{
    if(action.type === CHANGE_VALUE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.values = action.values;
        return newState;
    }

    if(action.type === SUBMIT_TYPE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.push(newState.values);
        newState.values = '';
        return newState;
    }
    if(action.type === SPLICE_TYPE){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list.splice(action.index, 1);
        return newState;
    }

    if(action.type === INIT_LIST_ACTION){
        const newState = JSON.parse(JSON.stringify(state));
        newState.list = action.data;
        return newState;
    }
    return state;
}