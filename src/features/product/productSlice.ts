import { createSlice } from '@reduxjs/toolkit';
export type ProductState = {
    id: number,
    title: string,
    price: number,
    category: string,
    description: string,
    image: string
    rating: {
        rate: number,
        count: number
    }
}
const initialState: ProductState[] = []
const productSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (_, action: {
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
        },
        deleteProduct: (state, action: {
            payload: number
        }) => {
            const index = state.findIndex(product => product.id === action.payload)
            if (index !== -1) {
                state.splice(index, 1)
            }
        },
        addProduct: (state, action: {
            payload: ProductState
        }) => {
            const newProduct = {
                ...action.payload,
            }
            state.push(newProduct)
        }
    }
})

export const { setProducts, editProduct, deleteProduct, addProduct } = productSlice.actions
export default productSlice.reducer

