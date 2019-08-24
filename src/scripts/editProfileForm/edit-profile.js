const showHideInput = require('./showHideInput');
const errorHandler = require('./errorHandler');
function editProfile () {
    const profileData = document.querySelectorAll('.profile__data');
    const saveEdit = document.querySelectorAll('.save__edit');
   
    errorHandler(saveEdit);
    showHideInput(profileData);

}

module.exports = editProfile;