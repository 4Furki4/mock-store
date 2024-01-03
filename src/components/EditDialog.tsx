import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDispatch } from "react-redux"
import { ProductState, editProduct } from "@/features/product/productSlice"
import { Edit } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"

const formSchema = z.object({
    title: z.string().min(2, {
        message: "Title must be at least 2 characters long",
    }).max(50, {
        message: "Title must be at most 50 characters long",
    }),
    price: z.number().min(0, {
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
export default function EditDialog({ product }: { product: ProductState | null | undefined }) {
    console.log(product)
    const dispatch = useDispatch()
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: product?.title || "",
            price: product?.price || 0,
            description: product?.description || "",
            category: product?.category || "",
        },
    })

    // 2. Define a submit handler.
    function onSubmit(values: z.infer<typeof formSchema>) {
        // Do something with the form values.
        // ✅ This will be type-safe and validated.
        console.log(values)
    }
    return (
        <Dialog>
            <DialogTrigger className="flex gap-2 items-center ml-auto border-2 rounded-md p-2 bg-primary hover:bg-foreground hover:text-primary transition-color duration-150">
                <Edit size={24} /> Edit
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle className="mb-4">Edit product</DialogTitle>
                    <div className="grid gap-4">
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)}>
                                <FormField control={form.control} name="title" render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>Title</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="price" render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>Price</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="description" render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>Description</FormLabel>
                                        <FormControl>
                                            <Input  {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <FormField control={form.control} name="category" render={({ field, fieldState: { error } }) => (
                                    <FormItem>
                                        <FormLabel>Category</FormLabel>
                                        <FormControl>
                                            <Input {...field} />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )} />
                                <Button className="mt-4" type="submit" variant={'ghost'}>
                                    Save
                                </Button>
                            </form>
                        </Form>
                        {/* <Input required className="invalid:border-destructive invalid:focus:outline-destructive" placeholder="Product Title" type="text" value={product?.title} />
                        <Input required className="invalid:border-destructive invalid:focus:outline-destructive" step={0.01} placeholder="Product Price" type="number" defaultValue={product?.price} min={0} />
                        <Input required className="invalid:border-destructive invalid:focus:outline-destructive" placeholder="Product Description" type="text" defaultValue={product?.description} />
                        <Input required className="invalid:border-destructive invalid:focus:outline-destructive" placeholder="Product Category" type="text" defaultValue={product?.category} /> */}
                    </div>
                    <DialogFooter>
                        {/* <Button variant={'secondary'} onClick={() => {
                            // dispatch(editProduct({ ...data, title: titleInputRef.current?.value! }))
                        }}>
                            Save
                        </Button> */}
                    </DialogFooter>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
