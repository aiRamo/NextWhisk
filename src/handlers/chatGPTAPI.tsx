export async function callImageToJsonIndexAPI(url: string, ingredients: string[]): Promise<any> {
    const payload = {
        url: url,
        ingredients: JSON.stringify(ingredients)
    };

    const response = await fetch('http://localhost:3000/image-to-openai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
}