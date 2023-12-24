import './IngredientModal.css';
import ExitIcon from '../../assets/ExitIcon.png';

interface IngredientModalProps {
    ingredients: string[];
    setIsModalOpen: (value: boolean) => void;
}

const IngredientModal = ({ingredients, setIsModalOpen} : IngredientModalProps) => {

    return (
        <div className='modal-container'>

            <button onClick={() => setIsModalOpen(false)} className='modal-exit-button'>
                <img src={ExitIcon} alt="Exit Icon" className='modal-exit-icon'/>
            </button>

            <div className='modal-content'>
                <p className='modal-title'>Ingredients</p>
                <div className='modal-ingredients-container'>
                    {ingredients.map((ingredient, index) => {
                        return (
                            <li className='modal-ingredient' key={index}>{ingredient}</li>
                        );
                    })}
                </div>
            </div>

        </div>
    );
};

export default IngredientModal;