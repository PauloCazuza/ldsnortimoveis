import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import DataTable from 'react-data-table-component';
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';


const TextField = styled.input`
  height: 32px;
  width: 200px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;

  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  height: 34px;
  width: 32px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
`;


const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField id="search" type="text" placeholder="Filtrar Por Nome" value={filterText} onChange={onFilter} />
        <ClearButton onClick={onClear}>X</ClearButton>
    </>
);

const columns = [
    {
        name: 'Name',
        selector: 'name',
        sortable: true,
    },
    {
        name: 'Email',
        selector: 'email',
        sortable: true,
    },
    {
        name: 'Address',
        selector: 'address',
        sortable: true,
    },
];

const DefinirPadrao = { rowsPerPageText: 'Linhas por página:', rangeSeparatorText: 'de', noRowsPerPage: false }

const BasicTable = ({ columns, dados, titulo, naoEncontrado }) => {
    const [filterText, setFilterText] = React.useState('');
    const [resetPaginationToggle, setResetPaginationToggle] = React.useState(false);
    const filteredItems = dados.filter(item => item.nome && item.nome.includes(filterText));
    const [theme, setTheme] = React.useState('dark');

    const handleChange = () => {
        if (theme === 'dark') {
            setTheme('default');
        } else {
            setTheme('dark');
        }
    };

    const subHeaderComponentMemo = React.useMemo(() => {
        const handleClear = () => {
            if (filterText) {
                setResetPaginationToggle(!resetPaginationToggle);
                setFilterText('');
            }
        };

        return <FilterComponent onFilter={e => setFilterText(e.target.value)} onClear={handleClear} filterText={filterText} />;
    }, [filterText, resetPaginationToggle]);

    return (
        <>
            {/* <FormControlLabel
                label="Dark Mode"
                control={(
                    <Switch
                        checked={theme === 'dark'}
                        onChange={handleChange}
                    />
                )}
            /> */}
            <DataTable
                title={titulo}
                columns={columns}
                data={filteredItems}
                // theme={theme}
                pagination
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                paginationComponentOptions={DefinirPadrao}
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                noDataComponent={naoEncontrado}
            />
        </>
    );
};

storiesOf('Filtering', module)
    .add('Example 1', () => <BasicTable />);

export default BasicTable;