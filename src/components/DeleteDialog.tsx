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

export default function DeleteDialog({ productId }: { productId: number | null | undefined }) {
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
    )
}
