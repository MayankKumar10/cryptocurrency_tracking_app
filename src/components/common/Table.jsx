import React, { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import axios from 'axios';
import { fetchLogo } from '../../services/cryptoServices';


import { styled, createTheme, ThemeProvider } from '@mui/material/styles';
import { deepPurple } from '@mui/material/colors';
import Avatar from '@mui/material/Avatar';

const customTheme = createTheme({
  palette: {
    primary: {
      main: deepPurple[500],
    },
  },
});

const StyledAvatar = styled(Avatar)`
  ${({ theme }) => `
  cursor: pointer;
  background-color: ${theme.palette.primary.main};
  transition: ${theme.transitions.create(['background-color', 'transform'], {
    duration: theme.transitions.duration.standard,
  })};
  &:hover {
    background-color: ${theme.palette.secondary.secondary};
    transform: scale(1.3);
  }
  `}
`;


const CustomTable = ({ headers, data }) => {
  console.log('custom Table data', data);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [logoData, setLogoData] = useState(null);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  useEffect(() => {
    const logosFunction = async (slug) => {
      try {
        const response = await axios.get(
          `https://pro-api.coinmarketcap.com/v2/cryptocurrency/info?slug=${slug}&CMC_PRO_API_KEY=1a7b5dc0-566d-461f-8d53-914190919176`
        );
        console.log('slug', slug);
        setLogoData(response.data);
      } catch (error) {
        console.error('Error fetching logo', error);
      }
    };

    logosFunction('bitcoin');
  }, []);

  console.log('logosData', logoData);

  const getLogoUrl = (symbol) => {
  
    const logos = require.context('../../assets/icons', false, /\.png$/);
    const logoKeys = logos.keys();
  
    const matchingLogoKeys = logoKeys.filter((key) => {
      const keySymbol = key.match(/\/([a-z0-9]+)\.png$/)[1];
      return keySymbol.toLowerCase() === symbol.toLowerCase();
    });
  
    const logoPath = matchingLogoKeys.length > 0 ? matchingLogoKeys[0] : null;
    return logoPath ? logos(logoPath) : null;
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <TableContainer sx={{ marginTop: '2rem' }} component={Paper}>
      <Table>
        <TableHead>
          <TableRow >
            {headers.map((header) => (
              <TableCell key={header}>{header}</TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((coin) => (
            <TableRow key={coin.id}>
              <TableCell>
              <StyledAvatar>
                <img
                  src={getLogoUrl(coin?.symbol)}
                  alt={coin.name}
                  style={{ width: '30px', height: '30px' }}
                />
                </StyledAvatar>
              </TableCell>
              <TableCell>{coin.name}</TableCell>
              <TableCell>${coin.quote.USD.price.toFixed(2)}</TableCell>
              <TableCell style={{ color: coin.quote.USD.percent_change_24h >= 0 ? 'green' : 'red' }}>
                {coin.quote.USD.percent_change_24h >= 0 ? ' ▲ ' : ' ▼ '}
                {coin.quote.USD.percent_change_24h.toFixed(2)}%
              </TableCell>
              <TableCell style={{ color: coin.quote.USD.percent_change_7d >= 0 ? 'green' : 'red' }}>
                {coin.quote.USD.percent_change_7d >= 0 ? ' ▲ ' : ' ▼ '}
                {coin.quote.USD.percent_change_7d.toFixed(2)}%
              </TableCell>
              <TableCell>${coin.quote.USD.market_cap.toLocaleString()}</TableCell>
              <TableCell>${coin.quote.USD.volume_24h.toLocaleString()}</TableCell>
              <TableCell>{coin.circulating_supply.toLocaleString()}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={data.length}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </TableContainer>
  );
};

export default CustomTable;




