import Navbar from "@/components/navbar";
import { Outlet } from "react-router-dom";
import { RootState } from "@/store"
import { useEffect } from "react"
import { setProducts } from "@/features/product/productSlice"
import { useGetAllProductsQuery } from "@/services/product"
import { useSelector, useDispatch } from 'react-redux'
export default function Root() {
    const { data, error, isLoading, requestId } = useGetAllProductsQuery(null)
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state.product)
    useEffect(() => {
        console.log(products)
        if (data)
            dispatch(setProducts(data))
    }, [data, requestId])
    if (error) {
        return <div>error...</div>
    }
    if (!data) {
        return <div>error...</div>
    }
    return (
        <>
            <Navbar />
            <Outlet />
            {/* Footer */}
        </>
    );
}