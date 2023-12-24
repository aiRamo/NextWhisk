import { motion, AnimatePresence } from 'framer-motion';
import './InstructionViewer.css';

interface InstructionViewerProps {
    instructions: string[];
}

const listVariants = {
    firstItem: { opacity: 1, y: 0, transition: { duration: 1.5, ease: [.82,0,.33,.77] } },
    secondItem: { opacity: 0, y: 0, transition: { duration: 1.5, ease: [.82,0,.33,.77] } },
    exit: { opacity: 0, y: -75, transition: { duration: 0.2, ease: [0,0,.58,1] } }
};

const InstructionViewer = ({instructions}: InstructionViewerProps) => {

    return (
        <div className='visual-assistant-instruction-info'>
            <AnimatePresence>
                {instructions.slice(0, 2).map((instruction, index) => (
                    <motion.ul 
                        key={instruction}
                        layout
                        className={`visual-assistant-list-entity`}
                        initial={index === 0 ? "firstItem" : "secondItem"}
                        animate={index === 0 ? "firstItem" : "secondItem"}
                        exit="exit"
                        variants={listVariants}
                        transition={{ duration: 1, ease: [.21,.85,.16,1.0] }}
                    >
                        {instruction}
                    </motion.ul>
                ))}
            </AnimatePresence>
        </div>
    );
};

export default InstructionViewer;