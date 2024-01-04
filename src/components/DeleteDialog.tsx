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
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { deleteProduct } from "@/features/product/productSlice";
import { useDispatch } from "react-redux";

export default function DeleteDialog({ productId }: { productId: number | null | undefined }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onDeleteProduct = useCallback(async () => {
        const response = await fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: 'DELETE',
        })
        if (response.ok) {
            navigate('/products')
            dispatch(deleteProduct(productId!))
            return
        }
    }, [productId])
    return (
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
                    <Button onClick={onDeleteProduct} variant={'destructive'}>
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
    )
}
