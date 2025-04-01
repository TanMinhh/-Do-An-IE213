import axios from 'axios';

class ProductDataService{
    getAll(){
        return axios.get(`http://localhost:80/api/products`);
    }
    get(id){
        return axios.get(`http://localhost:80/api/products/${id}`);
    }
}
export default new ProductDataService();