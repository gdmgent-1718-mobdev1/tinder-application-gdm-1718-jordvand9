/*
Tinder Class (Object Constructor)
-------------------------------------
1) has private variables via let-keyword id, message, createdDate, modifiedDate and deletedDate
2) a private method toString(): String representation of the class
3) return statement with public accessible properties and methods
*/
// Tinder Class (Object Constructor)
function Tinder() {
    let _id;
    let _firstName;
    let _lastName;
    let _gender;
    let _city;
    let _picture;
    let _favorite = null;

    let _createdDate;
    let _modifiedDate = null;
    let _deletedDate = null;
    
    function toString() {
        return _message;
    }

    return {
        get id() {
            return _id;
        },
        set id(value) {
            _id = value;
        }, 
        get firstName() {
            return _firstName;
        },
        set firstName(value) {
            _firstName = value;
        },
        get lastName() {
            return _lastName;
        },
        set lastName(value) {
            _lastName = value;
        },
        get gender() {
            return _gender;
        },
        set gender(value) {
            _gender = value;
        },
        get city() {
            return _city;
        },
        set city(value) {
            _city = value;
        },
        get picture() {
            return _picture;
        },
        set picture(value) {
            _picture = value;
        },
        get favorite() {
            return _favorite;
        },
        set favorite(value) {
            _favorite = value;
        },
        get createdDate() {
            return _createdDate;
        },
        set createdDate(value) {
            _createdDate = value;
        },
        get modifiedDate() {
            return _modifiedDate;
        },
        set modifiedDate(value) {
            _modifiedDate = value;
        },
        get deletedDate() {
            return _deletedDate;
        },
        set deletedDate(value) {
            _deletedDate = value;
        },
        toString: toString 
    }
};