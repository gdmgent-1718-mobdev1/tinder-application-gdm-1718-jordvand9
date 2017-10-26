/*
ApplicationDbContext as Object-Constructor
--------------------
1) Database transactions: CRUD operations
2) Cache for loaded content / data
*/

function ApplicationDbContext () {
    let _connectionStr, 
        _dbData;
    function init(connectionStr) {
        _connectionStr = connectionStr;
        _dbData = {
            "info": {
                "title": "Tinder Application",
                "version": "1.0.",
                "modified": "2017-10-13",
                "author": "Philippe De Pauw - Waterschoot"
            },
            "settings": {},
            "tinderProfiles": []
        }; 
        if(window.localStorage.getItem(_connectionStr) != null) {
            _dbData = JSON.parse(window.localStorage.getItem(_connectionStr));
        } else {
            window.localStorage.setItem(_connectionStr, JSON.stringify(_dbData));
        }
    }
    // Get all the tinder profiles
    function getAllTinderProfiles () {
        const data = _dbData.tinderProfiles;
        if(data == null || (data != null && data.length == 0)) {
            return null;
        }
        return data;
    }
    
    function favoriteTinderProfileById(id) {
        // 1. Get the index of the profile 
        // 2. Set the favorite property to true
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = findIndexTinderProfileById(id);
        if(index == -1) {
            return false;
        }
        const tinderProfile = getTinderProfileById(id);
        tinderProfile.modifiedDate = new Date().getTime();
        tinderProfile.favorite = true;
        _dbData.tinderProfiles[index] = tinderProfile;
        save();
        return true;
    }
    function unFavoriteTinderProfileById(id) {
        // 1. Get the index of the profile 
        // 2. Set the favorite property to false
        // 3. Save to the local storage
        // 4. Return true if succeeded otherwise false        
        const index = findIndexTinderProfileById(id);
        if(index == -1) {
            return false;
        }
        const tinderProfile = getTinderProfileById(id);
        tinderProfile.modifiedDate = new Date().getTime();
        tinderProfile.favorite = false;
        _dbData.tinderProfiles[index] = tinderProfile;
        save();
        return true;
    }
    
    function getTinderProfileById (id) {
        // 1. Get the tinder-profiles from the session storage
        // 2. Search for an id-match in the tinder-profiles array 
        // 3. Return the profile if a match is found otherwise return null
        const data = _dbData.tinderProfiles;
        if(data == null) {
            return null;
        }
        // Ugly
        let match = false, i = 0, tinderProfile;
        while(!match && i < data.length) {
            tinderProfile = data[i];
            if(tinderProfile.id === id) {
                match = true;
            } else {
                i++;
            }
        }      
        if(match) {
            return tinderProfile;
        }
        return null;
    }
    function findIndexTinderProfileById (id) {
        // 1. Get all the tinder-profiles array
        // 2. Get the right tinder profile from the array
        // 3. Search for a matching profile-id
        // 4. Return the index value from the array
        const data = getAllTinderProfiles();
        if(data == null) {
            return -1;
        }

        const tpFromDB = getTinderProfileById(id);
        if(tpFromDB == null) {
            return -1;
        }

        // Ugly
        let match = false, i = 0, tinderProfile;
        while(!match && i < data.length) {
            tinderProfile = data[i];
            if(tinderProfile.id === id) {
                match = true;
            } else {
                i++;
            }
        }      
        if(match) {
            return i;
        }
        return -1;
    }
    function addTinder (tinder) {
        // 1. Generate new random id and date for the new tinder profile
        // 2. Push the profile to the array
        console.log(tinder);
        if(tinder != undefined && tinder != null) {
            tinder.id = new Date().getTime() + Math.round(Math.random()*new Date().getTime()); // create unique id
            tinder.createdDate = new Date().getTime(); // generate timestamp
            _dbData.tinderProfiles.push(tinder); // Add sticky note to the array
            console.log("array");
            console.log(_dbData.tinderProfiles);
            save(); // Save _dbData to the localstorage
            return tinder; // return the sticky note to the caller
        }
        return null;
    }
    function checkTinderProfiles() {
        // 1. Check if the array is empty
        if(_dbData.tinderProfiles.length > 0) {
            return true;
        }
        else {
            return false;
        }
    }
    function save () {
        window.localStorage.setItem(_connectionStr, JSON.stringify(_dbData)); // Write the _dbData into the localstorage via the key
        return true; // Always true in modern webbrowsers
    }
    return {
        init:init,
        checkTinderProfiles:checkTinderProfiles,
        addTinder:addTinder,
        getAllTinderProfiles:getAllTinderProfiles,
        favoriteTinderProfileById:favoriteTinderProfileById,
        unFavoriteTinderProfileById:unFavoriteTinderProfileById,
        getTinderProfileById:getTinderProfileById
    }
}

/*
*/
function TinderService() {
    const URL = "https://randomuser.me/api/";
    function loadTinderApi() {
        return AJAX.loadJsonByPromise(URL);
    }

    return {
        loadTinderApi: loadTinderApi
    }
};