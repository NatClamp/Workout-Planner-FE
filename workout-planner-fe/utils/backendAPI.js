import Axios from 'axios';

const URL = 'https://nc-project-be.herokuapp.com/api/';


module.exports = {
  getCompletedWorkouts: username => fetch(`${URL}users/${username}/completed_workouts`).then(res => res.json()).then(res => res.userCompleted).catch((err) => { console.log(err); }),
  getSavedWorkouts: username => fetch(`${URL}users/${username}/saved_workouts`).then(res => res.json()).then(res => res.userSaved).catch((err) => { console.log(err); }),
//   patchUserGender: username => Axios.patch(`${URL}users/${username}/`, { isFemale: true }).then((res) => { console.log(res); }).catch((err) => { console.log(err); }),
};
