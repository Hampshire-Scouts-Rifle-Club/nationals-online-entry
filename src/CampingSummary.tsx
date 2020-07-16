import React from 'react';
import HeadedSection from './HeadedSection';
import AddButton from './AddButton';

class CampingSummary extends React.Component {
    render() {
        return (
            <HeadedSection title="Camping">
                <AddButton onClick={() => this.handleClickOpen()}>Book Camping Space</AddButton>
            </HeadedSection>
        );
    }

    handleClickOpen() {
    }
}

export default CampingSummary;
