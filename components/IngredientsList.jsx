export default function IngredientsList(props) {
    const ingredientsListItems = props.ingredients.map(ingredient => (
        <li key={ingredient}>{ingredient}</li>
    ))
    return (
        <section>
            <h2>Ingredienti a disposizione:</h2>
            <ul className="ingredients-list" aria-live="polite">{ingredientsListItems}</ul>
            {props.ingredients.length > 3 && <div className="get-recipe-container">
                <div>
                    <h3>Pronto per una ricetta?</h3>
                    <p>Genera una ricetta dalla tua lista di ingredienti.</p>
                </div>
                <button onClick={props.getRecipe}>Ottieni una ricetta</button>
            </div>}
        </section>
    )
}