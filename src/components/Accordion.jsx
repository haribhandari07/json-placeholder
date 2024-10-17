import React, {useState} from 'react';
import './Accordion.css'

const Accordion = ({title, body, handleTitleClick}) => {
    const [open, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!open)
        handleTitleClick()
    }

    return (
        <div>
            <div onClick={toggleAccordion} className="accordionTitle">
                <div>
                    {title}
                </div>
                <span>+</span>
            </div>
            {open && (
                body
            )}
        </div>
    );
};

export default Accordion;
