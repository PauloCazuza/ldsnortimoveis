import React from 'react';
import Navbar from '../../components/navbar';
import Footer from '../../components/footer';
import { Button } from 'react-bootstrap';
import styled from 'styled-components';
import { storiesOf } from '@storybook/react';
import DataTable, { createTheme } from 'react-data-table-component';

// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Switch from '@material-ui/core/Switch';

createTheme('solariszed', {
  text: {
    primary: '#268bd2',
    secondary: '#2aa198',
  },
  background: {
    default: '#002b36',
  },
  context: {
    background: '#cb4b16',
    text: '#FFFFFF',
  },
  divider: {
    default: '#073642',
  },
  action: {
    button: 'rgba(0,0,0,.54)',
    hover: 'rgba(0,0,0,.08)',
    disabled: 'rgba(0,0,0,.12)',
  },
});

const TextField = styled.input`
  height: 40px;
  width: 300px;
  border-radius: 3px;
  border-top-left-radius: 5px;
  border-bottom-left-radius: 5px;
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
  border: 1px solid #e5e5e5;
  padding: 0 32px 0 16px;
  margin-bottom: 50px;
  &:hover {
    cursor: pointer;
  }
`;

const ClearButton = styled(Button)`
  color: white;
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
  border-top-right-radius: 5px;
  border-bottom-right-radius: 5px;
  border: none !important;
  height: 40px;
  width: 50px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 50px;
  background: #f95c00 !important;
`;

const FilterComponent = ({ filterText, onFilter, onClear }) => (
    <>
        <TextField id="search" type="text" placeholder="Filtrar Por Nome" value={filterText} onChange={onFilter} />
        <ClearButton onClick={onClear}> <i class="fas fa-backspace"></i> </ClearButton>
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

const customStyles = {
  rows: {
    style: {
      minHeight: '72px', // override the row height
      background: 'wheat',
      color: 'black',
      fontSize: '16px'
    }
  },
  headCells: {
    style: {
      paddingLeft: '8px', // override the cell padding for head cells
      paddingRight: '8px',
      background: '#ff9900cc',
      color: 'white',
      fontSize: '18px',
    },
  },
  cells: {
    style: {
      paddingLeft: '8px', // override the cell padding for data cells
      paddingRight: '8px',
      justifyText: 'center'
    },
  },
};

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
                striped
                highlightOnHover
                pagination
                pointerOnHover
                paginationResetDefaultPage={resetPaginationToggle} // optionally, a hook to reset pagination to page 1
                subHeader
                paginationComponentOptions={DefinirPadrao}
                subHeaderComponent={subHeaderComponentMemo}
                persistTableHead
                noDataComponent={naoEncontrado}
                customStyles={customStyles}
            />
        </>
    );
};

storiesOf('Filtering', module)
    .add('Example 1', () => <BasicTable />);

export default BasicTable;