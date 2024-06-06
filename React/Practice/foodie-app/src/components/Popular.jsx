import { useEffect, useState } from "react"

export const Popular = () => {
    const [popularRecipes, setPopularRepopularRecipes] = useState([])
    useEffect(() => {
        const getPopularRecipes = async () => {
            await fetch(
                `https://api.spoonacular.com/recipes/random?apiKey=${process.env.REACT_APP_API_KEY}&number=9`
            ).then(response => response.json()).then(data => {
                setPopularRepopularRecipes(data)
            })
        }
        getPopularRecipes()
    }, [])
    return (
        <div> {popularRecipes.map(() => <div>A</div>)}</div>
    )
}