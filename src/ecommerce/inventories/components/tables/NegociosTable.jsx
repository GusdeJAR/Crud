    import { MaterialReactTable } from 'material-react-table';
    import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
    import AddCircleIcon from "@mui/icons-material/AddCircle";
    import EditIcon from "@mui/icons-material/Edit";
    import InfoIcon from "@mui/icons-material/Info";
    import DeleteIcon from "@mui/icons-material/Delete";
    import Autorenew from "@mui/icons-material/Autorenew";
    import React, { useEffect, useState } from "react";
    import AddNegocioModal from '../modals/AddNegocioModal';
    import { getInventario } from '../../../remote/get/getInventario';
    import { getAllInventories } from '../../../remote/getAllInventories';

    const NegociosColumns = [
        {
        accessorKey: "IdInstitutoOK",
        header: "ID OK",
        size: 30, //small column
        },
        {
            accessorKey: "IdNegocioOK",
            header: "Nombre Negocio",
            size: 150, //small column
        },
        {
            accessorKey: "NombreNegocio",
            header: "Presentacion OK",
            size: 30, //small column
        },
        {
        accessorKey: "ControlaSerie",
        header: "ProdServ OK",
        size: 30, //small column
        },
    ];
    
    //FIC: Table - FrontEnd.
    const NegociosTable = () => {
        const [loadingTable, setLoadingTable] = useState(true);
        const [NegociosData, setNegociosData] = useState([]);
        const [AddNegocioshowModal, setAddNegocioshowModal] = useState(false);
        const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
        const [productSel, setProductSel] = useState(null);
        async function fetchData() {
        try {
            const AllNegociosData = await getAllInventories();
            const NegocioData = AllNegociosData.flatMap(inventario => inventario.negocios.map(negocio => ({ IdInstitutoOK: inventario.IdInstitutoOK, ...negocio })) );
            //const productos = await getProducts();
            setNegociosData(NegocioData);   
            setLoadingTable(false);
        } catch (error) {
            console.error("Error al obtener productos:", error);
        }
        }
        useEffect(() => {
        fetchData();
        }, []);
        return (
            <Box>
            <Box>
                <MaterialReactTable
                columns={NegociosColumns}
                data={NegociosData}
                state={{isLoading: loadingTable}}
                initialState={{ density: "compact", showGlobalFilter: true }}
                muiTableBodyRowProps={({ row }) => ({
                //CLIC EN UN ROW
                onClick: (event) => {
                    console.log("ROW", row.original, "ID", row.id);
                    setProductSel(row.original);
                    setIdSelectedRowProduct(row.id);
                },
                sx: {
                    //FIC: si esta cargando no debes dar click aun
                    cursor: loadingTable ? "not-allowed" : "pointer", 
                    backgroundColor:
                    idSelectedRowProduct === row.id
                        ? darken("#EFF999", 0.01)
                        : "inherit",
                },
                })}
                renderTopToolbarCustomActions={({ table }) => (
                <>
                    {/* ------- BARRA DE ACCIONES ------ */}
                    <Stack direction="row" sx={{ m: 1 }}>
                    <Box>
                        <Tooltip title="Agregar">
                            <IconButton 
                                onClick={() => setAddNegocioshowModal(true)}>
                                <AddCircleIcon />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Editar">
                        <IconButton>
                            <EditIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Eliminar">
                        <IconButton>
                            <DeleteIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Detalles ">
                        <IconButton onClick={() => getInventario(productSel.IdAlmacenOK)}>
                            <InfoIcon />
                        </IconButton>
                        </Tooltip>
                        <Tooltip title="Recargar">
                        <IconButton onClick={fetchData}>
                            <Autorenew />
                        </IconButton>
                        </Tooltip>
                    </Box>
                    </Stack>
                    {/* ------- BARRA DE ACCIONES FIN ------ */}
                </>
                )}
                />
            </Box>
            <Dialog open={AddNegocioshowModal}>
                <AddNegocioModal
                AddNegocioshowModal={AddNegocioshowModal}
                setAddNegocioshowModal={setAddNegocioshowModal}
                onClose={() => setAddNegocioshowModal(false)}
                />
            </Dialog>
            </Box>
        );
    };

    export default NegociosTable;