import React from 'react';

const Rank = ({name,entries,currentPhrase}) => {
    return (
        <div>
            <div className = "white f2">
                {`${name+currentPhrase}our current entry count is...`}
            </div>
            <div className = "white f1">
                {entries}
            </div>
        </div>
    )
}

export default Rank;