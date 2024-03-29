import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react"
import { setProducts } from "@/features/product/productSlice"
import { useGetAllProductsQuery } from "@/services/product"
import { useDispatch } from 'react-redux'
import Spinner from "@/components/ui/spinner";
export default function Root() {
    // fetch all products 
    const { data, error, isLoading } = useGetAllProductsQuery(null)
    const dispatch = useDispatch()
    useEffect(() => {
        //and set them in the store
        if (data)
            dispatch(setProducts(data))
    }, [data])
    if (isLoading) {
        return <Spinner className='absolute inset-0 m-auto' />
    }
    if (error) {
        if (error instanceof Error)
            throw new Error(error.message)
        throw new Error('Something went wrong in the server, please try again later.')
    }
    return (
        <>
            <Navbar />
            <Outlet />
            {/* Footer */}
        </>
    );
}