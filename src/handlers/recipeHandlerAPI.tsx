// recipeHandler.js
import axios from 'axios';

interface RecipeJSON {
  title: string;
  host: string;
  total_time: number;
  yields: string;
  ingredients: string[];
  instructions: string[];
}

const urlRegex = new RegExp(
    '^(https?:\\/\\/)?'+ // protocol
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name and extension
    '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
    '(\\:\\d+)?'+ // port
    '(\\/[-a-z\\d%_.~+]*)*'+ // path
    '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
    '(\\#[-a-z\\d_]*)?$','i' // fragment locator
);

export const handleUrlRecipeParser = async (
  prompt: string, 
  setResponse: (value: string) => void, 
  setLoading: (value: boolean) => void, 
  setRecipeJSON: (value: RecipeJSON) => void
  ) => {
    setResponse('');
    setLoading(true);
    if (prompt !== '' && urlRegex.test(prompt)) {
      
      try {
        const res = await axios.post('http://localhost:3000/chat', { prompt });
  
        // Check if the response is an error message
        if (typeof res.data === 'string' && res.data.startsWith('Error')) {
          setResponse(res.data);
        } else {
          // Assuming the response is already in the correct JSON format
          setRecipeJSON(res.data);
          setResponse("Success");
        }
      } catch (error) {
        setResponse('Error fetching response');
      } finally {
        setLoading(false);
      }
    } else {
      setResponse('Error fetching response');
      setLoading(false);
    }
};
