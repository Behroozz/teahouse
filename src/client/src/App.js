import React from 'react';
import ProductListing from '../src/components/ProductListing'

const App = () => {
  return(
    <div>
      <h1 className="header">Teahouse</h1>
      <ProductListing />
    </div>
  )
}

export default App



// class App extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {loading: true, errorMessage: undefined, products: null}
//     }

//     loadProducts = (response) => {
//         console.log('response', response)
//         this.setState({loading: false, products: response.data});
//     }

//     errorLoading = (err) => {
//         this.setState({loading: false, errorMessage: 'There was an error loading your products.'});
//     }

//     componentDidMount() {
//         ProductService.getProducts(this.loadProducts, this.errorLoading)
//     }

//     componentWillMount() {
//         axios.defaults.timeout = 10000;
//         // axios.defaults.headers.common['Authorization'] = `Bearer ${AuthStore.getToken()}`;
//     }

//     render() {
//         return(<h2>Teahouse</h2>)
//         }
// }

// export default App;
