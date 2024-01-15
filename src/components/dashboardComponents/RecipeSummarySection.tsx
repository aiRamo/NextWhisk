import './RecipeSummarySection.css'

interface RSSProps {
    response: string;
    recipeJSON: { 
        title: string,
        host: string,
        total_time: number,
        yields: string,
        ingredients: string[],
        instructions: string[]
    };
  }
  

const RecipeSummarySection = ({response, recipeJSON}: RSSProps) => {

    return(
        <>
            {response === 'Success' && (
                <div className="grid-container">
                    {/* Ingredients column */}
                    <ul className="column">
                        <h3 className='list-header'>Ingredients</h3>
                        {Object.entries(recipeJSON.ingredients).map(([key, value]) => (
                        <li key={key} className='list-entity ingredients'>{value + '\n'}</li>
                        ))}
                    </ul>

                    {/* Directions column */}
                    <ul className="column">
                        <h3 className='list-header'>Directions</h3>
                        {Object.entries(recipeJSON.instructions).map(([key, value]) => (
                        <li key={key} className='list-entity'>{value + '\n'}</li>
                        ))}
                    </ul>
                </div>
            )}
            
            {response == 'Error fetching response' && (
                <div>
                    <p className='error-message'>No recipe found at that URL</p>
                </div>
            )}
        </>
        
    )
}

export default RecipeSummarySection;