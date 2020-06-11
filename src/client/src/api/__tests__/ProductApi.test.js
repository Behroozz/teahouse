import * as axios from "axios";
import { fetchProducts } from '../ProductApi'

jest.mock("axios");
axios.post.mockResolvedValue({data: { data: [{ id: 1}]}});

it('fetchProducts should resolve to correct action', async () => {
  await fetchProducts(async(cb) => {
    const response = await cb
    expect(response.type).toEqual('FETCH_PRODUCTS_SUCCESS');  
  });
});