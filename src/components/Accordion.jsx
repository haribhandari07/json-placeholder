import React, {useState} from 'react';

const Accordion = ({title, body, handleTitleCick}) => {
    const [open, setIsOpen] = useState(false)

    const toggleAccordion = () => {
        setIsOpen(!open)
        handleTitleCick()
    }

    return (
        <div>
            <div onClick={toggleAccordion}>{title}</div>
            {open && (
                body
            )}
        </div>
    );
};

export default Accordion;
