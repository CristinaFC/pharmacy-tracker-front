export default class Routing
{
    /** App **/
    static home = '/';
    static id = ':id';
    static nowhere = '#';

    /** NavBar **/
    static login = '/login';
    static register = '/register';
    static searchResults = '/searchResults';

    /**Login **/
    static signInOptions = '/signInOptions';
    static signInPharmacy = '/signInPharmacy';
    static signInUser = '/signInUser';

    /** Pharmacy role**/
    static myProfile = '/myProfile';
    static editProfile = '/editProfile';
    static deleteProfile = '/deleteProfile';

    static registerpharm = '/registerpharm';

    static myProducts = '/myProducts'
    static addProduct = '/addProduct';
    static editProduct = '/editProduct';

    //static map = '/map';

    /** User role */
    static compareprice = '/compareprice';
    static products = '/products';
    static productDetails = '/product-details/';

}
