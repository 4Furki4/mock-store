import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "@/services/product"
import { Star, Trash2, Users } from "lucide-react";
import { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { setProducts } from "@/features/product/productSlice";
import { RootState } from "@/store";
import { Separator } from "@/components/ui/separator";
import EditDialog from "@/components/EditDialog";
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
        return <div>error...</div>
    }
    if (!data) {
        return <div>error...</div>
    }
    return (
        <>
            <div className="max-w-7xl mx-auto p-2">
                <Card className="max-w-4xl mx-auto">
                    <CardHeader>
                        <h1 className="text-3xl font-bold text-center">
                            {product?.title || data.title}
                        </h1>
                    </CardHeader>
                    <CardContent className="">
                        <img className="mx-auto" src={data.image} alt={data.title} />
                        <CardDescription className="pt-6">
                            {
                                product?.description || data.description
                            }
                        </CardDescription>
                    </CardContent>
                    <CardFooter className="grid-cols-2">
                        <div className="w-full flex flex-row items-center gap-4 h-4">
                            <p className="font-bold">
                                {
                                    product?.category || data.category
                                }
                            </p>
                            <Separator orientation="vertical" />
                            <p>
                                {
                                    product?.price || data.price
                                }$
                            </p>
                            <Separator orientation="vertical" />
                            <p className="flex gap-2">
                                {product?.rating.rate || data.rating.rate} <Star size={24} />
                            </p>
                            <Separator orientation="vertical" />
                            <p className="flex gap-2">
                                {product?.rating.count || data.rating.count} <Users size={24} />
                            </p>
                            <Separator orientation="vertical" />
                        </div>
                        <EditDialog product={product} />
                        <Dialog>
                            <DialogTrigger className="flex gap-2 items-center ml-auto border-2 rounded-md p-2 bg-destructive hover:bg-foreground hover:text-destructive transition-color duration-75">
                                <Trash2 size={24} /> Delete
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Are you sure ?</DialogTitle>
                                </DialogHeader>
                                <DialogDescription>
                                    This action is irreversible!
                                </DialogDescription>
                                <DialogFooter>
                                    <Button variant={'destructive'}>
                                        Delete
                                    </Button>
                                    <DialogClose asChild>
                                        <Button variant={'secondary'}>
                                            Cancel
                                        </Button>
                                    </DialogClose>
                                </DialogFooter>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div >
        </>
    )
}
