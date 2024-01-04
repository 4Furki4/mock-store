import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { useDispatch } from "react-redux"
import { ProductState, editProduct } from "@/features/product/productSlice"
import { Edit } from "lucide-react"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { formSchema } from "@/lib/validationSchemas"
import DialogForm from "../DialogForm"

export default function EditDialog({ product }: { product: ProductState | null | undefined }) {
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
    function onSubmit(values: z.infer<typeof formSchema>) {
        // ✅ This will be type-safe and validated.
        const req = fetch(`https://fakestoreapi.com/products/${product?.id}`, {
            method: 'PUT',
            body: JSON.stringify(values)
        })
        toast.promise(req, {
            loading: 'Updating product...',
            success: () => {
                const data: ProductState = {
                    ...values,
                    id: product?.id!,
                    image: product?.image || "",
                    rating: product?.rating || {
                        rate: 0,
                        count: 0,
                    }
                }
                dispatch(editProduct(data))
                return 'Product updated successfully'
            },
            error: 'Error updating product'
        })
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
                        <DialogForm form={form} onSubmit={onSubmit} />
                    </div>
                </DialogHeader>
            </DialogContent>
        </Dialog>
    )
}
