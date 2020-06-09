import axios from 'axios'

class ProductService {

    static getProducts(successCallback, errorCallback) {
        axios.post('api/products/populate').then(successCallback).catch(errorCallback);
    }

    // static createAccount(username, password, successCallback, errorCallback) {
    //     axios.post('/users', {
    //         username: username,
    //         password: password
    //     }).then(successCallback).catch(errorCallback);
    // }

    // static loadCurrentUser(successCallback, errorCallback) {
    //     axios.get('/users/me').then(successCallback).catch(errorCallback);
    // }
}

export default ProductService;
