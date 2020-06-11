const asyncActionCreator = actionPrefix => ({
  REQUEST: `${actionPrefix}_REQUEST`,
  SUCCESS: `${actionPrefix}_SUCCESS`,
  FAILURE: `${actionPrefix}_FAILURE`,
})

const actions = {
  FETCH_PRODUCTS: 'FETCH_PRODUCTS'
}

export {
  asyncActionCreator,
  actions 
}