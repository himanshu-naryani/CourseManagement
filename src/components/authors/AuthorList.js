import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

function createData(id, name, specialization, yearsOfExpeirence) {
    return { id, name, specialization, yearsOfExpeirence };
}

let rows = [];

function AuthorList({ authors, onDeleteClick }) {
    const classes = useStyles();
    rows = authors.map(author => {
        return createData(author.id, author.name, author.specialization, author.yearsOfExpeirence);
    })

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>ID</TableCell>
                        <TableCell align="right">Name</TableCell>
                        <TableCell align="right">Specialization</TableCell>
                        <TableCell align="right">Years of Expeirence</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell component="th" scope="row">
                                {row.id}
                            </TableCell>
                            <TableCell align="right">{row.name}</TableCell>
                            <TableCell align="right">{row.specialization}</TableCell>
                            <TableCell align="right">{row.yearsOfExpeirence}</TableCell>
                            <TableCell align="right">
                                <Link to={`/author/${row.id}`}>
                                    <button
                                        className='btn btn-outline-danger'
                                    >
                                        Edit
                                    </button>
                                </Link>
                            </TableCell>
                            <TableCell align="right">
                                <button
                                    className='btn btn-outline-danger'
                                    onClick={() => onDeleteClick(row)}
                                >
                                    Delete
                                </button>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer >
    );
}

AuthorList.propTypes = {
    authors: PropTypes.array.isRequired,
    onDeleteClick: PropTypes.func.isRequired
}

export default AuthorList;