import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from "@/components/ui/card";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch, useSelector } from "react-redux";
import { useGetProductByIdQuery } from "@/services/product"
import { Edit } from "lucide-react";
import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import { editProduct, setProducts } from "@/features/product/productSlice";
import { RootState } from "@/store";
export default function Details() {
    const inputRef = React.useRef<HTMLInputElement>(null)
    const { id } = useParams()
    const dispatch = useDispatch()
    const parsedId = parseInt(id!)
    const products = useSelector((state: RootState) => state.product)
    const product = products.length > 0 ? products.find((product) => product.id === parsedId) : null
    const { data, error, isLoading } = useGetProductByIdQuery(parsedId)
    useEffect(() => {
        console.log(products)
        console.log(product)
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
                <Card>
                    <CardHeader>
                        <div className="flex">

                            <h1 className="text-3xl font-bold">{product?.title || data.title}</h1>
                            <p className="text-2xl font-bold text-center ml-auto">
                                {data.category}
                            </p>
                        </div>
                    </CardHeader>
                    <CardContent className="">
                        <img className="mx-auto" src={data.image} alt={data.title} />
                        <CardDescription className="grid">
                            {data.description}
                        </CardDescription>
                    </CardContent>
                    <CardFooter>
                        <p className="text-2xl font-bold text-center">
                            Price: {data.price}$
                        </p>
                        <Dialog>
                            <DialogTrigger className="ml-auto">
                                <Edit size={24} /> Edit
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Edit product</DialogTitle>
                                    <DialogDescription>
                                        <input type="text" ref={inputRef} />
                                    </DialogDescription>
                                    <DialogFooter>
                                        <Button variant={'secondary'} onClick={() => {
                                            dispatch(editProduct({ ...data, title: inputRef.current?.value! }))
                                        }}>
                                            Save
                                        </Button>
                                    </DialogFooter>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    </CardFooter>
                </Card>
            </div >
        </>
    )
}
