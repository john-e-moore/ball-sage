import React, { useState } from 'react';
import PropTypes from 'prop-types';
import '@/styles/table.css'; // Import the CSS file for styling

const Table = ({ data }) => {
    const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

    const resultData = data[0]?.result || [];

    const sortedData = React.useMemo(() => {
        if (!sortConfig.key) return resultData;

        const sorted = [...resultData].sort((a, b) => {
            if (a[sortConfig.key] < b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? -1 : 1;
            }
            if (a[sortConfig.key] > b[sortConfig.key]) {
                return sortConfig.direction === 'ascending' ? 1 : -1;
            }
            return 0;
        });

        return sorted;
    }, [resultData, sortConfig]);

    const requestSort = key => {
        let direction = 'ascending';
        if (sortConfig.key === key && sortConfig.direction === 'ascending') {
            direction = 'descending';
        }
        setSortConfig({ key, direction });
    };

    if (!resultData || resultData.length === 0) {
        return <div>No data available</div>;
    }

    const columns = Object.keys(resultData[0]);

    return (
        <table className="styled-table">
            <thead>
                <tr>
                    {columns.map(column => (
                        <th key={column} onClick={() => requestSort(column)}>
                            {column}
                            <span className="sort-arrows">
                                <span className={sortConfig.key === column && sortConfig.direction === 'ascending' ? 'active' : ''}> ▲</span>
                                <span className={sortConfig.key === column && sortConfig.direction === 'descending' ? 'active' : ''}> ▼</span>
                            </span>
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {sortedData.map((row, index) => (
                    <tr key={index}>
                        {columns.map(column => (
                            <td key={column}>
                                {typeof row[column] === 'object' ? JSON.stringify(row[column]) : row[column]}
                            </td>
                        ))}
                    </tr>
                ))}
            </tbody>
        </table>
    );
};

Table.propTypes = {
    data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default Table;