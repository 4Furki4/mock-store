import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { useSelector } from "react-redux"
import { Button } from "@/components/ui/button"


export default function Products() {
    const products = useSelector((state: any) => state.product)
    return (
        <>
            <div className="max-w-7xl mx-auto grid sm:grid-cols-2 xl:grid-cols-3 gap-4 p-4">
                {
                    products.map((product: any) => (
                        <Card key={product.title} className="flex flex-col ">
                            <CardHeader>
                                {product.title}
                            </CardHeader>
                            <CardContent className="mt-auto">
                                <CardDescription>
                                    <Button asChild variant={'link'} className="p-0 m-0">
                                        <Link to={`/products/${product.id}`} >
                                            See details
                                        </Link>
                                    </Button>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
