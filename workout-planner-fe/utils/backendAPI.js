import Axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';


module.exports = {
  getCompletedWorkouts: username => fetch(`${URL}users/${username}/completed_workouts`).then(res => res.json()).catch((err) => { console.log(err); }),
  getSavedWorkouts: username => fetch(`${URL}users/${username}/saved_workouts`).then(res => res.json()).then(res => res.userSaved).catch((err) => { console.log(err); }),
  patchUser: (username, gender) => Axios.patch(`${URL}users/${username}/`, { newName: username, isFemale: gender }),
  getAllUsers: () => fetch(`${URL}users/`).then(res => res.json()),
  getSingleUser: username => fetch(`${URL}/users/${username}`),
};
