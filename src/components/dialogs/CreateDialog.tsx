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
import { addProduct } from "@/features/product/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { RootState } from "@/store";
import { useState } from "react";
import { formSchema } from "@/lib/validationSchemas";
import DialogForm from "./DialogForm";

export default function CreateDialog({
    className,
    onClick
}: {
    className?: string,
    onClick?: () => void
}) {
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
            <DialogTrigger className={className} onClick={onClick} asChild>
                <Button variant={'link'}>Create Product</Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create Product</DialogTitle>
                </DialogHeader>
                <DialogForm form={form} onSubmit={onSubmit} submitButtonText="Create" />
                <DialogFooter className="sm:flex-col">
                    <DialogClose asChild>
                        <Button variant={'destructive'}>Cancel</Button>
                    </DialogClose>
                </DialogFooter>
                <DialogDescription>
                    Note: a random image will be assigned to the product.
                </DialogDescription>
            </DialogContent>
        </Dialog>
    )
}
