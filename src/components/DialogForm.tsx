import { formSchema } from "@/lib/validationSchemas";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form"
import { Input } from "./ui/input";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Button } from "./ui/button";
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
                    {submitButtonText}
                </Button>
            </form>
        </Form>
    )
}
