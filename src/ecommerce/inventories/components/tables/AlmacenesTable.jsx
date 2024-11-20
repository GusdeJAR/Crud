import { MaterialReactTable } from 'material-react-table';
import { Box, Stack, Tooltip, Button, IconButton, Dialog, darken } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import DeleteIcon from "@mui/icons-material/Delete";
import Autorenew from "@mui/icons-material/Autorenew";
import React, { useEffect, useState } from "react";
import AddInventoryModal from '../modals/AddInventoriesModal';
import { getInventario } from '../../../remote/get/getInventario';
import { getAllInventories } from '../../../remote/GetAllInventories';

const InventoriesColumns = [
    {
      accessorKey: "IdAlmacenOK",
      header: "ID OK",
      size: 30, //small column
    },
    {
      accessorKey: "Principal",
      header: "Principal",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadActual",
      header: "Cantidad Actual",
      size: 30, //small column
    },
    {
      accessorKey: "CantidadDisponible",
      header: "Cantidad Disponible",
      size: 150, //small column
    },
    {
      accessorKey: "CantidadApartada",
      header: "Cantidad Apartada",
      size: 50, //small column
    },
    {
      accessorKey: "CantidadTransito",
      header: "Cantidad Transito",
      size: 30, //small column
    },
    {
      accessorKey: "StockMaximo",
      header: "Stock Maximo",
      size: 150, //small column
    },
    {
      accessorKey: "StockMinimo",
      header: "Stock Minimo",
      size: 30, //small column
    },
  ];
 
 //FIC: Table - FrontEnd.
  const InventoriesTable = () => {
    const [loadingTable, setLoadingTable] = useState(true);
    const [InventoriesData, setInventoriesData] = useState([]);
    const [AddInventoryShowModal, setAddInventoryShowModal] = useState(false);
    const [idSelectedRowProduct, setIdSelectedRowProduct] = useState(null);
    const [productSel, setProductSel] = useState(null);
    async function fetchData() {
      try { 
        const AllInventoriesData = await getAllInventories();
        const InventoriesData = AllInventoriesData.flatMap(inventario => inventario.negocios.flatMap(negocio => negocio.almacenes));
        //const productos = await getProducts();
        setInventoriesData(InventoriesData);   
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
             columns={InventoriesColumns}
             data={InventoriesData}
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
                            onClick={() => setAddInventoryShowModal(true)}>
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
          <Dialog open={AddInventoryShowModal}>
            <AddInventoryModal
              AddInventoryShowModal={AddInventoryShowModal}
              setAddInventoryShowModal={setAddInventoryShowModal}
              onClose={() => setAddInventoryShowModal(false)}
            />
          </Dialog>
        </Box>
      );
  };

  export default InventoriesTable;