const URL = 'https://nc-project-be.herokuapp.com/api/';

module.exports = {
  getCompletedWorkouts: username => fetch(`${URL}users/${username}/completed_workouts`).then(res => res.json()).then(res => res.userCompleted).catch((err) => { console.log(err); }),

};
