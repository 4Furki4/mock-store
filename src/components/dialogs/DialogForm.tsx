import { formSchema } from "@/lib/validationSchemas";
import { Form, FormControl, FormField, FormItem, FormMessage } from "../ui/form"
import { Input } from "../ui/input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "../ui/button";
export default function DialogForm({
    form,
    onSubmit,
    submitButtonText
}: {
    form: UseFormReturn<{
        title: string;
        price: number;
        description: string;
        category: string;
    }, any, undefined>,
    onSubmit: (values: z.infer<typeof formSchema>) => void,
    submitButtonText: string
}) {
    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
                <FormField control={form.control} name="title" render={({ field }) => (
                    <FormItem className="space-y-0">
                        <FormControl>
                            <Input placeholder="Title"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="price" render={({ field }) => (
                    <FormItem className="space-y-0">
                        <FormControl>
                            <Input placeholder="Price" {...field} type="number" step={0.01} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="description" render={({ field }) => (
                    <FormItem className="space-y-0">
                        <FormControl>
                            <Input placeholder="Description"  {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <FormField control={form.control} name="category" render={({ field }) => (
                    <FormItem className="space-y-0">
                        <FormControl>
                            <Input placeholder="Category" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )} />
                <Button className="mt-4 bg-primary hover:bg-primary hover:opacity-90" type="submit" variant={'outline'}>
                    {submitButtonText}
                </Button>
            </form>
        </Form>
    )
}
