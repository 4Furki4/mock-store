import { RootState } from "@/store"
import { useSelector } from "react-redux"
import kitty from '@/assets/kitty-shopping.gif'
import { Link } from "react-router-dom"
export default function Home() {
    const products = useSelector((state: RootState) => state.product)
    return (
        <main className="text-center p-6">
            <h1 className="pt-16 font-bold text-2xl sm:text-3xl md:text-4xl lg:text-6xl">
                Welcome to the Mock Store!
            </h1>
            <img src={kitty} alt="cat walking to do shopping" className="mx-auto" />
            <p className="pt-4 sm:text-xl md:text-2xl lg:text-3xl">
                We have <Link to={'/products'} className="text-primary hover:underline">{products.length} products</Link> for you to choose from.
            </p>
        </main>
    )
}
