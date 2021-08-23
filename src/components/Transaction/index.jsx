import React, { Component } from "react";
import { TableContainer, Paper, Table, TableHead, TableBody, TableRow, TableCell } from '@material-ui/core';

class Transaction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            page: 0,
            rowsPerPage: 5
        }
    };

    render() {
        return (
            <TableContainer component={Paper}>
                <Table aria-label="table">
                    <TableHead> 
                        <TableRow>
                            <TableCell><h2>Transações: </h2></TableCell>
                        </TableRow>
                        <TableRow>
                            <TableCell style={{ fontWeight:"bold" }}>Id</TableCell>
                            <TableCell style={{ fontWeight:"bold" }}>Montante</TableCell>
                            <TableCell style={{ fontWeight:"bold" }}>Data</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {this.props.showTable ? (this.props.transactions.map(transaction => {
                            return (
                                <TableRow>
                                    <TableCell>{transaction.id}</TableCell>
                                    <TableCell>{transaction.amount}</TableCell>
                                    <TableCell>{transaction.date}</TableCell>
                                </TableRow>
                            )
                        })):""}
                    </TableBody>
                </Table>
            </TableContainer>)
    }
}

export default Transaction;