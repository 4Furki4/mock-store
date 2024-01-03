import { createSlice } from '@reduxjs/toolkit';
export type ProductState = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
}
const initialState: ProductState[] = []
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action: {
            payload: ProductState[]
        }) => {
            return action.payload
        },
        editProduct: (state, action: {
            payload: ProductState
        }) => {
            const { id, title, price, category, description, image } = action.payload
            const existingProduct = state.find(product => product.id === id)
            if (existingProduct) {
                existingProduct.title = title
                existingProduct.price = price
                existingProduct.category = category
                existingProduct.description = description
                existingProduct.image = image
            }
        }
    }
})

export const { setProducts, editProduct } = productSlice.actions

export default productSlice.reducer

