import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import { useEffect } from "react"
import { setProducts } from "@/features/product/productSlice"
import { useGetAllProductsQuery } from "@/services/product"
import { useDispatch } from 'react-redux'
export default function Root() {
    // fetch all products 
    const { data } = useGetAllProductsQuery(null)
    const dispatch = useDispatch()
    useEffect(() => {
        //and set them in the store
        if (data)
            dispatch(setProducts(data))
    }, [data])
    return (
        <>
            <Navbar />
            <Outlet />
            {/* Footer */}
        </>
    );
}