import React, { useEffect, useState, useRef } from 'react';
import './RecipeSummarySection.css';

interface RSSProps {
    response: string;
    recipeJSON: { 
        title: string;
        host: string;
        total_time: number;
        yields: string;
        ingredients: string[];
        instructions: string[];
    };
    detectedIndex: number | null;
}

const RecipeSummarySection: React.FC<RSSProps> = ({ response, recipeJSON, detectedIndex }) => {
    const [overlayState, setOverlayState] = useState<'show' | 'fadeOut' | 'hidden'>('hidden');
    const [previousIndex, setPreviousIndex] = useState<number | null>(null);
    const listRefs = useRef<HTMLLIElement[]>([]);

    useEffect(() => {
        if (detectedIndex !== null && detectedIndex !== previousIndex) {
            setOverlayState('show');
            setPreviousIndex(detectedIndex);
            setTimeout(() => {
                setTimeout(() => {
                    setOverlayState('fadeOut');

                    setTimeout(() => {
                        setOverlayState('hidden');
                    }, 500);
                }, 500); // Match with fade-out text animation duration
            }, 1000); 
        }
    }, [detectedIndex, previousIndex]);

    if (listRefs.current.length !== recipeJSON.instructions.length) {
        listRefs.current = Array(recipeJSON.instructions.length).fill(null).map((_, i) => listRefs.current[i] || React.createRef<HTMLLIElement>());
    }

    return (
        <>
            {overlayState !== 'hidden' && (
                <div className={`overlay ${overlayState === 'fadeOut' ? 'fade-out' : ''}`}></div>
            )}
            
            {response === 'Success' && (
                <div className="grid-container">
                    {/* Ingredients column */}
                    <ul className="column">
                        <h3 className='list-header'>Ingredients</h3>
                        {recipeJSON.ingredients.map((value, index) => (
                            <li key={index} className='list-entity ingredients'>{value}</li>
                        ))}
                    </ul>

                    {/* Directions column */}
                    <ul className="column">
                        <h3 className='list-header'>Directions</h3>
                        {recipeJSON.instructions.map((value, index) => (
                            <li key={index} className={`list-entity ${index === detectedIndex ? 'highlighted' : ''}`}>
                                {value}
                                {index === detectedIndex && overlayState !== 'hidden' && (
                                    <div className={`overlay-text ${overlayState === 'fadeOut' ? 'fade-out' : ''}`}>
                                        Next Step Here!
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            
            {response === 'Error fetching response' && (
                <div>
                    <p className='error-message'>No recipe found at that URL</p>
                </div>
            )}
        </>
    );
}

export default RecipeSummarySection;
