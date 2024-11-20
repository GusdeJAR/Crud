import { getDetailRow } from "../helpers/Utils";

export function NegocioModel() {
    let Negocio = {
        negocios: [{
            IdNegocioOK: { type: String },
            NombreNegocio: { type: String },
            ControlaSerie: { type: String },
            detail_row: getDetailRow(), 
    }],
    };
    return Negocio
};