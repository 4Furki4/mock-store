import { Card, CardContent, CardDescription, CardHeader } from "@/components/ui/card"
import { Link } from "react-router-dom"
import { Skeleton } from "@/components/ui/skeleton"
import { useSelector } from "react-redux"


export default function Products() {

    const products = useSelector((state: any) => state.product)
    return (
        <>
            <div className="max-w-7xl mx-auto grid grid-cols-2 gap-4 p-4">
                {
                    products.map((product: any) => (
                        <Card key={product.title}>
                            <CardHeader>
                                {product.title}
                            </CardHeader>
                            <CardContent>
                                <CardDescription>
                                    <Link to={`/products/${product.id}`} >
                                        See details
                                    </Link>
                                </CardDescription>
                            </CardContent>
                        </Card>
                    ))
                }
            </div>
        </>
    )
}
