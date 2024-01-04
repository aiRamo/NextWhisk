// recipeHandler.js
import axios from 'axios';

interface NutrientInfo {
  servingSize: string;
  calories: string;
  carbohydrateContent: string;
  proteinContent: string;
  fatContent: string;
  saturatedFatContent: string;
  cholesterolContent: string;
  sodiumContent: string;
  fiberContent: string;
  sugarContent: string;
}

interface RecipeJSON {
  title: string;
  host: string;
  total_time: number;
  yields: string;
  ingredients: string[];
  instructions: string[];
  nutrients: NutrientInfo;
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


async function tryScraping(prompt: string) {
  try {
    const res = await axios.post('http://192.168.1.238:3000/scrape', { prompt });

    if (typeof res.data === 'string' && res.data.startsWith('Error')) {
      throw new Error(res.data);
    } else {
      return res.data;
    }
  } catch (error) {

  }
}

export const handleUrlRecipeParser = async (
  prompt: string, 
  setResponse: (value: string) => void, 
  setRecipeJSON: (value: RecipeJSON) => void
  ) => {
    setResponse('');
    if (prompt !== '' && urlRegex.test(prompt)) {
      try {
        const recipeData = await tryScraping(prompt);
        setRecipeJSON(recipeData);
        setResponse("Success");
      } catch (error) {
        setResponse('Error fetching response');
      }
    } else {
      setResponse('Error fetching response');
    }
};

export const validateUrlRecipeParser = async (prompt: string): Promise<string> => {
  if (prompt !== '' && urlRegex.test(prompt)) {
    try {
      const recipeData: RecipeJSON = await tryScraping(prompt);
      return recipeData && recipeData.title ? "Success" : "Invalid Recipe Data";
    } catch (error) {
      return 'Error fetching response';
    }
  } else {
    return 'Invalid URL';
  }
};