import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { Container, Typography } from '@mui/material';
import { Footer } from '../components/footer';
import UseFetch from '../hooks/useFetch';
import { useEffect, useState } from 'react';


const columns = [
    { id: 'numero', label: 'Numéro', minWidth: 100 },
    { id: 'titre', label: 'Titre du document', minWidth: 200 },
    {
        id: 'annee',
        label: 'Date de publication',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'type',
        label: 'Type de document',
        minWidth: 150,
        align: 'center',
    },
    {
        id: 'action',
        label: 'Action',
        minWidth: 100,
        align: 'center',
    },
];

function createData(index, rapport) {
    return {
        numero: `#${index + 1}`,
        titre: rapport.titre,
        annee: rapport.annee, // tu peux changer ça si tu as une vraie date
        type: rapport.types, // ou une propriété dynamique si disponible
        action: (
            <a
                href={`data:application/pdf;base64,${rapport.document}`}
                download={`${rapport.titre}.pdf`}
                style={{
                    backgroundColor: '#1976d2',
                    color: 'white',
                    padding: '8px 16px',
                    border: 'none',
                    borderRadius: '4px',
                    cursor: 'pointer',
                    textDecoration: 'none',
                }}
            >
                Télécharger
            </a>
        ),
    };
}

export function RapportsEtPolitiques() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(10);

    const { rapports, getRapport, loader } = UseFetch()
   
    useEffect(() => {
        getRapport();
    }, [])

    const rows = rapports.map((rapport, index) => createData(index, rapport));

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (
        <>{
            loader===true ? <div>Chargement...{loader}</div> :
                <>
                    <Container maxWidth="lg" sx={{ mt: 10, mb: 4 }}>
                        <Typography variant="h3" align="center" sx={{ mt: 6, mb: 3, fontWeight: 600 }}>
                            Rapports et Politiques
                        </Typography>
                        <Paper sx={{ width: '100%', overflow: 'hidden' }}>

                            <TableContainer sx={{ maxHeight: 440 }}>
                                <Table stickyHeader aria-label="sticky table">
                                    <TableHead>
                                        <TableRow>
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={column.id}
                                                    align={column.align}
                                                    style={{ minWidth: column.minWidth }}
                                                >
                                                    {column.label}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {rows
                                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                            .map((row, rowIndex) => (
                                                <TableRow hover role="checkbox" tabIndex={-1} key={row.numero}>
                                                    {columns.map((column) => (
                                                        <TableCell key={column.id} align={column.align}>
                                                            {row[column.id]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                            <TablePagination
                                rowsPerPageOptions={[10, 25, 100]}
                                component="div"
                                count={rows.length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                onPageChange={handleChangePage}
                                onRowsPerPageChange={handleChangeRowsPerPage}
                            />
                        </Paper>
                    </Container>
                    <Footer />
                </>
        }

        </>
    );
}
