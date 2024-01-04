import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "@/services/product"
import { Star, Users } from "lucide-react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { setProducts } from "@/features/product/productSlice";
import { RootState } from "@/store";
import { Separator } from "@/components/ui/separator";
import EditDialog from "@/components/dialogs/EditDialog";
import DeleteDialog from "@/components/dialogs/DeleteDialog";
export default function Details() {
    const { id } = useParams()
    const dispatch = useDispatch()
    const parsedId = parseInt(id!)
    const products = useSelector((state: RootState) => state.product)
    const product = products.length > 0 ? products.find((product) => product.id === parsedId) : null
    const { data, error, isLoading } = useGetProductByIdQuery(parsedId)
    useEffect(() => {
        if (products.length === 0 && data) {
            dispatch(setProducts([data]))
        }
    }, [data, products])
    if (isLoading) {
        return <div>Loading...</div>
    }
    if (error) {
        if (error instanceof Error)
            throw new Error(error.message)
        throw new Error('Something went wrong in the server, please try again later.')
    }
    if (!data && !product) {
        throw new Error('No product found.')
    }
    return (
        <>
            <div className="max-w-7xl mx-auto p-2">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <h1 className="text-3xl font-bold text-center">
                            {product?.title || data?.title}
                        </h1>
                    </CardHeader>
                    <CardContent className="">
                        <img className="mx-auto" src={product?.image || data?.image} alt={product?.image || data?.title} />
                        <CardDescription className="pt-6">
                            {
                                product?.description || data?.description
                            }
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full flex flex-row flex-wrap sm:items-center gap-4">
                            <p className="font-bold">
                                {
                                    product?.category || data?.category
                                }
                            </p>
                            <Separator className="sm:hidden" orientation="horizontal" />
                            <Separator className="hidden sm:block sm:h-8" orientation="vertical" />
                            <p>
                                {product?.price || data?.price}$
                            </p>
                            <Separator className="sm:hidden" orientation="horizontal" />
                            <Separator className="hidden sm:block sm:h-8" orientation="vertical" />
                            <div className="flex gap-4 items-center">
                                <p className="flex gap-2">
                                    {product?.rating.rate || data?.rating.rate} <Star size={24} />
                                </p>
                                <Separator className="h-8" orientation="vertical" />
                                <p className="flex gap-2">
                                    {product?.rating.count || data?.rating.count} <Users size={24} />
                                </p>
                            </div>
                            <Separator className="sm:hidden" orientation="horizontal" />
                            <Separator className="hidden sm:block sm:h-8" orientation="vertical" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 max-sm:w-full">
                            <EditDialog className="max-sm:w-full" product={product} />
                            <DeleteDialog className="max-sm:w-full" productId={product?.id} />
                        </div>
                    </CardFooter>
                </Card>
            </div >
        </>
    )
}
