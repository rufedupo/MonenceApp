import { Component } from 'react';
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class Quote extends Component {
    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="table">
                    <TableHead>
                        <TableRow>
                            <TableCell><h2>Cotação: </h2></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight:"bold" }}>USD ($)</TableCell>
                            <TableCell style={{ fontWeight:"bold" }}>EUR (€)</TableCell>
                            <TableCell style={{ fontWeight:"bold" }}>BITCOIN (BTC)</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        <TableRow>
                            <TableCell>{this.props.quoteAmounts.dolar}</TableCell>
                            <TableCell>{this.props.quoteAmounts.euro}</TableCell>
                            <TableCell>{this.props.quoteAmounts.bitcoin}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
        )
    }
}

export default Quote;