import './RecipeSummarySection.css'

interface RSSProps {
    response: string;
    recipeJSON: { Ingredients: string[], Directions: string[]};
  }
  

const RecipeSummarySection = ({response, recipeJSON}: RSSProps) => {

    return(

        response !== '' && 
            <div className="grid-container">
                {/* Ingredients column */}
                <ul className="column">
                    <h3 className='list-header'>Ingredients</h3>
                    {Object.entries(recipeJSON.Ingredients).map(([key, value]) => (
                    <li key={key} className='list-entity'>{value + '\n'}</li>
                    ))}
                </ul>

                {/* Directions column */}
                <ul className="column">
                    <h3 className='list-header'>Directions</h3>
                    {Object.entries(recipeJSON.Directions).map(([key, value]) => (
                    <li key={key} className='list-entity'>{value + '\n'}</li>
                    ))}
                </ul>
            </div>
        
    )
}

export default RecipeSummarySection;