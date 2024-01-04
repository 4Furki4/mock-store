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
import { toast } from "sonner"
import { Button } from "@/components/ui/button";
import { ProductState, addProduct, deleteProduct } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { RootState } from "@/store";
import { useState } from "react";

type ProductPostRes = Omit<ProductState, 'rating'>

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long",
    }).max(150, {
        message: "Title must be at most 150 characters long",
    }),
    price: z
        .coerce.number().min(0, {
            message: "Price must be at least 0",
        }),
    description: z.string().min(5, {
        message: "Description must be at least 2 characters long",
    }).max(1000, {
        message: "Description must be at most 1000 characters long",
    }),
    category: z.string().min(2, {
        message: "Category must be at least 2 characters long",
    }).max(50, {
        message: "Category must be at most 50 characters long",
    }),
})
export default function CreateDialog() {
    const [open, setOpen] = useState(false)
    const dispatch = useDispatch()
    const products = useSelector((state: RootState) => state.product);
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            price: 0,
            description: "",
            category: "",
        },
    })
    function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ This will be type-safe and validated.
        const req = fetch(`https://fakestoreapi.com/products`, {
            method: 'POST',
            body: JSON.stringify(values)
        })
        toast.promise(req, {
            loading: 'Creating product...',
            success: () => {
                const createdProduct = {
                    ...values,
                    id: products.length + 1,
                    rating: {
                        count: 0,
                        rate: 0,
                    },
                    image: 'https://picsum.photos/400/600'
                }
                dispatch(addProduct(createdProduct))
                setOpen(false)
                return 'Product created'
            },
            error: 'Error creating product'
        }),
            form.reset()
    }
    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                Create Product
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                </DialogHeader>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <FormField control={form.control} name="title" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Title</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="price" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Price</FormLabel>
                                <FormControl>
                                    <Input {...field} type="number" step={0.01} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="description" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Input  {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <FormField control={form.control} name="category" render={({ field }) => (
                            <FormItem>
                                <FormLabel>Category</FormLabel>
                                <FormControl>
                                    <Input {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )} />
                        <Button className="mt-4" type="submit" variant={'ghost'}>
                            Create
                        </Button>
                    </form>
                </Form>
                <DialogDescription>
                    a random image will be assigned to the product.
                </DialogDescription>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button variant={'ghost'}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
