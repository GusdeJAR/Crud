import React, { useState } from "react";
import { Dialog, DialogContent, DialogTitle, Typography, TextField, DialogActions, Box, Alert, FormControlLabel, Checkbox } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import CloseIcon from "@mui/icons-material/Close";
import SaveIcon from "@mui/icons-material/Save";
import { useFormik } from "formik";
import * as Yup from "yup";
import { NegocioValues } from "../../helpers/NegocioValues"; 
//import { AddOneNegocio } from "../../../remote/post/AddOneNegocio";
import MyAddLabels from "../../../home/components/elements/atomos/MyLabels";

const AddNegocioModal = ({AddNegocioShowModal, setAddNegocioShowModal}) => {
    const [mensajeErrorAlert, setMensajeErrorAlert] = useState("");
    const [mensajeExitoAlert, setMensajeExitoAlert] = useState("");    
    const [Loading, setLoading] = useState(false);
    const formik = useFormik({
        initialValues: {
            IdInstitutoOK: "",
            IdNegocioOK: "",
            NombreNegocio: "",
            ControlaSerie: ""
        },
        validationSchema: Yup.object({
            IdInstitutoOK: Yup.string().required("Campo requerido"),
            IdNegocioOK: Yup.string().required("Campo requerido"),
            NombreNegocio: Yup.string().required("Campo requerido"),
            ControlaSerie: Yup.string().required("Campo requerido"),
        }),
        onSubmit: async (values) => {
            setLoading(true);
            setMensajeErrorAlert(null);
            setMensajeExitoAlert(null);
            try {
                const Negocio = NegocioValues(values);
                console.log("<<Negocio>>", Negocio);
                await AddOneNegocio(Negocio);
                setMensajeExitoAlert("Inventario creado y guardado Correctamente");
            } catch (e) {
                setMensajeExitoAlert(null);
                setMensajeErrorAlert("No se pudo crear el Inventario");
            }
            setLoading(false);
        },
    });
    const commonTextFieldProps = {
        onChange: formik.handleChange,
        onBlur: formik.handleBlur,
        fullWidth: true,
        margin: "dense",
        disabled: !!mensajeExitoAlert,
    };
    return(
        <Dialog 
            open={AddNegocioShowModal}
            onClose={() => setAddNegocioShowModal(false)}
            fullWidth
        >
            <form onSubmit={formik.handleSubmit}>
            <MyAddLabels
                disabled={!!mensajeExitoAlert}
                label={"Agrega Índices de Búsqueda"}
                onChangeLabels={(labels) =>
                  (formik.values.Indice = labels.join("-"))
                }
              />
                {/* FIC: Aqui va el Titulo de la Modal */}
                <DialogTitle>
                    <Typography>
                        <strong>Agregar Nuevo Inventario</strong>
                    </Typography>
                </DialogTitle>
                {/* FIC: Aqui va un tipo de control por cada Propiedad de Negocios */}
                <DialogContent 
                    sx={{ display: 'flex', flexDirection: 'column' }}
                    dividers
                >
                    {/* FIC: Campos de captura o selección */}
                    <TextField
                        id="IdInstitutoOK"
                        label="IdInstitutoOK*"
                        value={formik.values.IdInstitutoOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdInstitutoOK && Boolean(formik.errors.IdInstitutoOK) }
                        helperText={ formik.touched.IdInstitutoOK && formik.errors.IdInstitutoOK }
                    />
                    <TextField
                        id="IdNegocioOK"
                        label="IdNegocioOK*"
                        value={formik.values.IdNegocioOK}
                        {...commonTextFieldProps}
                        error={ formik.touched.IdNegocioOK && Boolean(formik.errors.IdNegocioOK) }
                        helperText={ formik.touched.IdNegocioOK && formik.errors.IdNegocioOK }
                    />
                    <TextField
                        id="NombreNegocio"
                        label="NombreNegocio*"
                        value={formik.values.NombreNegocio}
                        {...commonTextFieldProps}
                        error={ formik.touched.NombreNegocio && Boolean(formik.errors.NombreNegocio) }
                        helperText={ formik.touched.NombreNegocio && formik.errors.NombreNegocio }
                    />
                    <TextField
                        id="ControlaSerie"
                        label="ControlaSerie*"
                        value={formik.values.ControlaSerie}
                        {...commonTextFieldProps}
                        error={ formik.touched.ControlaSerie && Boolean(formik.errors.ControlaSerie) }
                        helperText={ formik.touched.ControlaSerie && formik.errors.ControlaSerie }
                    />
                </DialogContent>
                <DialogActions
                    sx={{ display: 'flex', flexDirection: 'row' }}
                >
                    <Box m="auto">
                        {mensajeErrorAlert && (
                        <Alert severity="error">
                            <b>¡ERROR!</b> ─ {mensajeErrorAlert}
                        </Alert>
                        )}
                        {mensajeExitoAlert && (
                        <Alert severity="success">
                            <b>¡ÉXITO!</b> ─ {mensajeExitoAlert}
                        </Alert>
                        )}
                    </Box>
                    {/* FIC: Boton de Cerrar. */}
                    <LoadingButton
                        color="secondary"
                        loadingPosition="start"
                        startIcon={<CloseIcon />}
                        variant="outlined"
                        onClick={() => setAddNegocioShowModal(false)}
                    >
                        <span>CERRAR</span>
                    </LoadingButton>
                     {/* FIC: Boton de Guardar. */}
                    <LoadingButton
                        color="primary"
                        loadingPosition="start"
                        startIcon={<SaveIcon />}
                        variant="contained"
                        type="submit"
                        disabled={!!mensajeExitoAlert}
                        loading={Loading} 
                    >
                        <span>GUARDAR</span>
                    </LoadingButton>
                </DialogActions>
            </form>
        </Dialog>
    );
};
export default AddNegocioModal;