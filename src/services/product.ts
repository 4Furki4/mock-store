import { ProductState } from '@/features/product/productSlice'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://fakestoreapi.com/' }),
    endpoints: (builder) => ({
        getAllProducts: builder.query<ProductState[], null>({
            query: () => 'products'
        }),
        getProductById: builder.query<ProductState, number>({
            query: (id: number) => `products/${id}`
        })
    })
})

export const { useGetAllProductsQuery, useGetProductByIdQuery } = productsApi