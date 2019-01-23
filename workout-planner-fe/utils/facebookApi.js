/* eslint-disable prefer-promise-reject-errors */
/* eslint-disable no-else-return */
import { facebook_api_key } from '../config';

const logIn = async () => {
  try {
    const result = await Expo.Facebook.logInWithReadPermissionsAsync(`${facebook_api_key}`, {
      permissions: ['public_profile'],
    });
    console.log(result);
    if (result.type === 'success') {
      return Promise.resolve(result);
    } else {
      return Promise.reject('Token missing');
    }
  } catch (err) {
    console.log(err);
    return Promise.reject(err);
  }
};

export const fbApi = { logIn };
