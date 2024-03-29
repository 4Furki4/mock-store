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
import Spinner from "@/components/ui/spinner";
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
        return <Spinner className='absolute inset-0 m-auto' />
    }
    if (error) {
        if (error instanceof Error)
            throw new Error(error.message)
        throw new Error('Something went wrong in the server, please try again later.')
    }
    if (!data && !product) {
        throw new Error('Product not found. Added products are not persisted in the server')
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
                    <CardContent>
                        <img className="mx-auto max-h-[300px] min-h-[100px] sm:max-h-[400px] sm:min-h-[200px] object-contain" src={product?.image || data?.image} alt={product?.image || data?.title} />
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
                                {product?.price !== undefined ? product.price : data?.price}$
                            </p>
                            <Separator className="sm:hidden" orientation="horizontal" />
                            <Separator className="hidden sm:block sm:h-8" orientation="vertical" />
                            <div className="flex gap-4 items-center">
                                <p className="flex gap-2">
                                    {product?.rating.rate !== undefined ? product?.rating.rate : data?.rating.rate} <Star size={24} />
                                </p>
                                <Separator className="h-8" orientation="vertical" />
                                <p className="flex gap-2">
                                    {product?.rating.count !== undefined ? product?.rating.count : data?.rating.count} <Users size={24} />
                                </p>
                            </div>
                            <Separator className="sm:hidden" orientation="horizontal" />
                            <Separator className="hidden sm:block sm:h-8" orientation="vertical" />
                        </div>
                        <div className="flex flex-col sm:flex-row gap-2 max-sm:w-full">
                            <EditDialog className="max-sm:w-full hover:bg-primary hover:opacity-90" product={product} />
                            <DeleteDialog className="max-sm:w-full" productId={product?.id} />
                        </div>
                    </CardFooter>
                </Card>
            </div >
        </>
    )
}
