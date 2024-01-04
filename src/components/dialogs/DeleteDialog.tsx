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
import { Trash2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import { deleteProduct } from "@/features/product/productSlice";
import { useDispatch } from "react-redux";

export default function DeleteDialog({ productId, className }: { productId: number | null | undefined, className?: string }) {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const onDeleteProduct = useCallback(async () => {
        const req = fetch(`https://fakestoreapi.com/products/${productId}`, {
            method: 'DELETE',
        })
        toast.promise(req, {
            loading: 'Deleting product...',
            success: () => {
                navigate('/products')
                dispatch(deleteProduct(productId!))
                return 'Product deleted successfully'
            },
            error: 'Error deleting product'
        })
    }, [productId])
    return (
        <Dialog>
            <DialogTrigger asChild className={className}>
                <Button variant={'destructive'}>
                    <Trash2 size={24} /> Delete
                </Button>
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
