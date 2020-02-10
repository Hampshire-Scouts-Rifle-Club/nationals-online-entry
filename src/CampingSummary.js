import React from 'react';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class CampingSummary extends React.Component {
    render() {
        return (
            <HeadedSection title="Camping">
                <AddButton>Book Camping Space</AddButton>
            </HeadedSection>
        );
    }
}

export default CampingSummary;
