import {UPDATE_USER_BIRTHDAY} from '../actions/types';
import {UPDATE_USER_NAME} from '../actions/types';
import {UPDATE_USER_LASTNAME} from '../actions/types';
import {UPDATE_USER_ADRESS} from '../actions/types';
import {UPDATE_USER_PROFILE_PHOTO} from '../actions/types';
import {UPDATE_USER_PROFILE_HEADER} from '../actions/types';
import {UPDATE_USER_PASSWORD} from '../actions/types';

const initialState = [];

function userProfileReducer(state = initialState, action) {
  switch (action.type) {
    case UPDATE_USER_BIRTHDAY:
      return;
    case UPDATE_USER_NAME:
      return;
    case UPDATE_USER_LASTNAME:
      return;
    case UPDATE_USER_ADRESS:
      return;
    case UPDATE_USER_PROFILE_PHOTO:
      return;
    case UPDATE_USER_PROFILE_HEADER:
      return;
    case UPDATE_USER_PASSWORD:
      return;
  }
}

export default userProfileReducer;