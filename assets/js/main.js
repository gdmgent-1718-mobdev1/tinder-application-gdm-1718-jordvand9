function App() {
    let _applicationDbContext,
        _tinderService,
        _tinderData,
        _tinderElement,
        _connectionStr;
    
    function init() {
        // 1. Initialize the application
        // 2. Reference to the ApplicationDbContext object
        // 3. Intialize the ApplicationDbContext with the connection string as parameter value
        // 4. Check if tinder-profiles already exist in the local storage
        _applicationDbContext = new ApplicationDbContext;
        _applicationDbContext.init('ahs-nmd-tinders');
        _tinderElement = document.querySelector('.tinder');
        _tinderService = new TinderService();
        if(_applicationDbContext.checkTinderProfiles() === true) {
            console.log('TinderProfiles already loaded');
        }
        else {
            for (var index = 0; index < 50; index++) {
                loadTinderApi();
            }
        }
        loadAllTinderProfiles();
    }

    function loadTinderApi() {
        // 1. Load the tinder API
        // 2. Set the local variable equal to the data received from the API
        // 3. Generate random tinder-profiles
        _tinderService.loadTinderApi()
            .then(function(data) {
                console.log(data);
                _tinderData = data;
                console.log(_tinderData);
                generateRandomTinderProfile();
            })
            .catch(function(reject){
                console.log("error");
            });
    }
    function loadAllTinderProfiles() {
        // 1. Get all the TinderProfiles
        // 2. Check if the tinder-profiles are empty
        // 3. Write UI of the tinder-profiles
        // 4. Add an event listener for both the favorite and unfavorite buttons
        let tinderProfiles = _applicationDbContext.getAllTinderProfiles();
        var tempstr ='';
        console.log(tinderProfiles);
        if( tinderProfiles.length <0 && tinderProfiles === null) {
            _tinderElement.innerHTML = "Geen TinderProfiles :("
        }
        else {
            tinderProfiles.forEach(function(element) {
                tempstr += 
                `
                    <div class="col s12 m4 tinderProfile" data-id="${ element.id }">
                        <div class="card">
                            <div class="card-image">
                                <img src="${ element.picture }">
                                <span class="card-title">${ element.firstName + ' ' + element.lastName }</span>
                                <a class="btn-floating halfway-fab waves-effect waves-light ${checkFavoriteStatus(element)} tinder__btn-favorite"><i class="material-icons">add</i></a>
                            </div>
                            <div class="card-content">
                                <p>Gender : ${ element.gender}</p>
                                <p>City : ${ element.city}</p>
                                <a class="waves-effect red waves-light btn tinder__btn-unfavorite">Skip</a>
                            </div>
                        </div>
                    </div>
                `
            }, this);
            
            _tinderElement.innerHTML = tempstr;
            _tinderElement.querySelectorAll('.tinderProfile').forEach(function(tinderElement) {
                tinderElement.querySelector('.tinder__btn-favorite').addEventListener('click', function(ev) {
                    ev.preventDefault();
                    const id = parseInt(this.parentElement.parentElement.parentElement.dataset.id);
                    console.log(id);
                    const favorited = _applicationDbContext.favoriteTinderProfileById(id);
                    console.log(favorited);
                    return false;
                })
                tinderElement.querySelector('.tinder__btn-unfavorite').addEventListener('click', function(ev) {
                    ev.preventDefault();
                    const id = parseInt(this.parentElement.parentElement.parentElement.dataset.id);
                    console.log(id);
                    const unfavorite = _applicationDbContext.unFavoriteTinderProfileById(id);
                    console.log(unfavorite);
                    return false;
                })
            })
            
        }
    }
    function checkFavoriteStatus (tinderProfile) {
        // 1. Get the tinder-profiles and check the favoriteStatus
        // 2. Assign a color to the corresponding status
        var tp = _applicationDbContext.getTinderProfileById(tinderProfile.id);
        var favoriteStatus = tp.favorite;
        color = '';
        if(favoriteStatus === true) {
            color = 'green'
        }
        else (
            color = 'green lighten-3'
        )
        return color;
    }
    
    function generateRandomTinderProfile() {
        // 1. Get the tinder-profiles array from the local global variable
        // 2. Create a new Tinder-Object and assign the properties
        // 3. Push the properties to the array
        console.log(_tinderData);
        if( _tinderData != null ) {
            _tinderData.results.forEach(function(element) {
                let newTinder = new Tinder();
                newTinder.firstName = element.name.first;
                newTinder.lastName = element.name.last;
                newTinder.gender = element.gender;
                newTinder.city = element.location.city;
                newTinder.picture = element.picture.large;
                console.log(newTinder.firstName);
                _applicationDbContext.addTinder(newTinder);
            }, this);
            
        }
        else(
            console.log("jammersss")
        )
    }
    return {
        init:init
    }
}
const app = new App();
app.init();
